"use client";

import { useState } from "react";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { CRENEAU_OPTIONS, PRESTATION_OPTIONS } from "@/lib/devis-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

export function DevisForm({ defaultCp = "", defaultPrestation = "" }: { defaultCp?: string; defaultPrestation?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      nom: fd.get("nom"),
      telephone: fd.get("telephone"),
      email: fd.get("email") || "",
      codePostal: fd.get("codePostal"),
      commune: fd.get("commune") || "",
      prestation: fd.get("prestation"),
      description: fd.get("description") || "",
      creneau: fd.get("creneau"),
      consentement: fd.get("consentement") === "on",
      siteweb: fd.get("siteweb") || "",
    };
    setStatus("sending");
    setErrors({});
    setMessage(null);
    try {
      const res = await fetch("/api/devis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json()) as { ok: boolean; errors?: Record<string, string>; message?: string };
      if (data.ok) {
        setStatus("sent");
        form.reset();
        // Conversion Google Ads si le tag est chargé
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "generate_lead", { event_category: "devis" });
      } else {
        setStatus("error");
        setErrors(data.errors ?? {});
        setMessage(data.message ?? (data.errors ? "Vérifiez les champs signalés." : "Une erreur est survenue."));
      }
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer la demande. Vérifiez votre connexion ou appelez-nous.");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 text-center" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-800 text-cream-50">
          <Check size={26} />
        </span>
        <h2 className="mt-5 text-2xl text-forest-900">Demande bien reçue.</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-700">Nous vous rappelons sous 24 heures, du lundi au samedi, pour fixer le passage ou préparer le devis à distance.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-6">
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom et prénom" name="nom" error={errors.nom} required>
          <input id="nom" name="nom" autoComplete="name" required className={inputCls(errors.nom)} />
        </Field>
        <Field label="Téléphone" name="telephone" error={errors.telephone} required>
          <input id="telephone" name="telephone" type="tel" inputMode="tel" autoComplete="tel" required className={inputCls(errors.telephone)} placeholder="06 00 00 00 00" />
        </Field>
        <Field label="Code postal" name="codePostal" error={errors.codePostal} required>
          <input id="codePostal" name="codePostal" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" required defaultValue={defaultCp} className={inputCls(errors.codePostal)} />
        </Field>
        <Field label="Commune" name="commune" error={errors.commune}>
          <input id="commune" name="commune" autoComplete="address-level2" className={inputCls(errors.commune)} />
        </Field>
        <Field label="Adresse e-mail" name="email" error={errors.email} hint="Facultatif, pour recevoir le devis par écrit">
          <input id="email" name="email" type="email" autoComplete="email" className={inputCls(errors.email)} />
        </Field>
        <Field label="Prestation" name="prestation" error={errors.prestation} required>
          <select id="prestation" name="prestation" required defaultValue={defaultPrestation || ""} className={inputCls(errors.prestation)}>
            <option value="" disabled>
              Choisir…
            </option>
            {PRESTATION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Décrivez ce qu'il y a à faire" name="description" error={errors.description} hint="Longueur et hauteur de la haie, accès, présence d'une pelouse, photos à envoyer ensuite par SMS…">
            <textarea id="description" name="description" rows={4} className={cn(inputCls(errors.description), "min-h-28 resize-y py-3")} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <fieldset>
            <legend className="text-[14px] font-semibold text-forest-900">Créneau souhaité</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {CRENEAU_OPTIONS.map((o, i) => (
                <label key={o.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-ink-900/15 bg-white px-3 py-3 text-[14px] text-ink-700 transition has-[:checked]:border-forest-800 has-[:checked]:bg-sage-100 has-[:checked]:text-forest-900">
                  <input type="radio" name="creneau" value={o.value} defaultChecked={i === 0} className="accent-forest-800" />
                  {o.label}
                </label>
              ))}
            </div>
            {errors.creneau && <p className="mt-1 text-[13px] text-copper-600">{errors.creneau}</p>}
          </fieldset>
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-700">
            <input type="checkbox" name="consentement" className="mt-1 accent-forest-800" required />
            <span>
              J&apos;accepte d&apos;être recontacté au sujet de ma demande. Vos coordonnées servent uniquement à vous répondre : aucun démarchage, aucune revente.{" "}
              <a href="/politique-de-confidentialite" className="underline underline-offset-2">
                Politique de confidentialité
              </a>
            </span>
          </label>
          {errors.consentement && <p className="mt-1 text-[13px] text-copper-600">{errors.consentement}</p>}
        </div>
        {/* Honeypot : invisible pour les humains */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="siteweb">Site web</label>
          <input id="siteweb" name="siteweb" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {message && (
        <p className="mt-5 rounded-xl bg-copper-100 px-4 py-3 text-[14px] text-copper-600" role="alert">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-7 w-full sm:w-auto">
        {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        {status === "sending" ? "Envoi…" : "Demander mon devis gratuit"}
      </button>
    </form>
  );
}

function Field({ label, name, error, hint, required, children }: { label: string; name: string; error?: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-[14px] font-semibold text-forest-900">
        {label} {required && <span className="text-copper-600">*</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-[13px] text-copper-600">{error}</p> : hint ? <p className="mt-1 text-[12px] text-ink-500">{hint}</p> : null}
    </div>
  );
}

function inputCls(error?: string) {
  return cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-[16px] text-ink-900 transition placeholder:text-ink-300 focus:border-forest-700",
    error ? "border-copper-500" : "border-ink-900/15",
  );
}
