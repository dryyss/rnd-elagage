"use client";

import Image from "next/image";
import { useActionState, useRef, useState } from "react";
import { Check, ImagePlus, Loader2, Trash2, TriangleAlert } from "lucide-react";
import { saveContentAction, type ActionState } from "./actions";
import type { ContentKey } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ---------- Formulaire de sauvegarde générique ---------- */

export function SaveForm({ contentKey, value, children, title, intro }: { contentKey: ContentKey; value: unknown; children: React.ReactNode; title: string; intro?: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveContentAction, null);
  return (
    <form action={action}>
      <input type="hidden" name="key" value={contentKey} />
      <input type="hidden" name="json" value={JSON.stringify(value)} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl text-forest-900">{title}</h1>
          {intro && <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500">{intro}</p>}
        </div>
        <SaveButton pending={pending} />
      </div>
      <Feedback state={state} />
      <div className="mt-6 space-y-6">{children}</div>
      <div className="mt-8 flex justify-end">
        <SaveButton pending={pending} />
      </div>
    </form>
  );
}

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" disabled={pending} className="btn-primary !min-h-11 shrink-0">
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
      {pending ? "Enregistrement…" : "Enregistrer"}
    </button>
  );
}

function Feedback({ state }: { state: ActionState }) {
  if (!state) return null;
  return (
    <div className={cn("mt-4 rounded-xl px-4 py-3 text-[14px]", state.ok ? "bg-sage-100 text-forest-900" : "bg-copper-100 text-copper-600")} role="status">
      <p className="flex items-center gap-2 font-semibold">
        {state.ok ? <Check size={16} /> : <TriangleAlert size={16} />} {state.message}
      </p>
      {state.errors && (
        <ul className="mt-2 list-disc space-y-0.5 pl-5">
          {state.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Champs ---------- */

export function Card({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="text-xl text-forest-900">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[13px] font-semibold text-forest-900">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[12px] text-ink-500">{hint}</span>}
    </label>
  );
}

export const inputCls = "h-11 w-full rounded-xl border border-ink-900/15 bg-white px-3.5 text-[15px] text-ink-900 focus:border-forest-700";
export const textareaCls = "w-full rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 focus:border-forest-700";

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px] text-ink-700">
      <span className={cn("relative h-6 w-11 rounded-full transition", checked ? "bg-forest-800" : "bg-ink-300/50")}>
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition", checked ? "left-[22px]" : "left-0.5")} />
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function RemoveButton({ onClick, label = "Supprimer", iconOnly = false }: { onClick: () => void; label?: string; iconOnly?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-900/15 text-[13px] text-ink-700 transition hover:border-copper-500 hover:text-copper-600", iconOnly ? "w-9 justify-center" : "px-3")}
      aria-label={label}
      title={label}
    >
      <Trash2 size={14} /> {!iconOnly && label}
    </button>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="btn-ghost !min-h-10 !px-4 !text-sm">
      {children}
    </button>
  );
}

/* ---------- Upload d'image ---------- */

export function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { ok: boolean; url?: string; message?: string };
      if (!data.ok || !data.url) throw new Error(data.message ?? "Échec de l'envoi");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'envoi");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  }

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-sage-100">
        {value ? <Image src={value} alt="" fill sizes="128px" className="object-cover" unoptimized={value.startsWith("/uploads/")} /> : <span className="flex h-full items-center justify-center text-ink-300"><ImagePlus size={22} /></span>}
      </div>
      <div className="flex-1 space-y-2">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/… ou /uploads/…" className={inputCls} />
        <div className="flex items-center gap-3">
          <label className="btn-ghost !min-h-9 cursor-pointer !px-3 !text-[13px]">
            {busy ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
            {busy ? "Envoi…" : "Envoyer une photo"}
            <input ref={ref} type="file" accept="image/*" className="sr-only" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </label>
          {error && <span className="text-[13px] text-copper-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}
