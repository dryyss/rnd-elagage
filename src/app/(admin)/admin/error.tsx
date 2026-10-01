"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LayoutDashboard, RotateCcw, TriangleAlert } from "lucide-react";
import type { BoundaryError } from "@/components/sections/ErrorPanel";

/** Erreur dans une page d'administration : carte compacte, la navigation admin reste visible. */
export default function AdminError({ error, retry }: { error: BoundaryError; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const dev = process.env.NODE_ENV !== "production";

  return (
    <section className="card p-6 sm:p-8" role="alert">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-copper-100 text-copper-600">
          <TriangleAlert size={20} strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl text-forest-900">Cette page n&apos;a pas pu se charger</h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500">
            Une erreur s&apos;est produite pendant le chargement ou l&apos;enregistrement. Vos modifications déjà enregistrées ne sont pas perdues. Réessayez, ou revenez au tableau de bord.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => retry()} className="btn-primary !min-h-10 !px-4 !text-sm">
              <RotateCcw size={14} /> Réessayer
            </button>
            <Link href="/admin" className="btn-ghost !min-h-10 !px-4 !text-sm">
              <LayoutDashboard size={14} /> Tableau de bord
            </Link>
          </div>

          {error.digest && (
            <p className="mt-5 text-[13px] text-ink-500">
              Référence : <code className="rounded bg-cream-200 px-1.5 py-0.5 font-mono text-[12px] text-ink-700">{error.digest}</code>
            </p>
          )}

          {dev && error.message && (
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-copper-100/60 p-4 font-mono text-[12px] leading-relaxed text-copper-600">{error.message}</pre>
          )}
        </div>
      </div>
    </section>
  );
}
