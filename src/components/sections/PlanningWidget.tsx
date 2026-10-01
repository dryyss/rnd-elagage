"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";
import type { Planning, ZoneId } from "@/lib/types";
import { formatDateFr, formatPeriode, prochaineTournee, sortTournees, zoneById, zoneFromCodePostal } from "@/lib/planning";
import { cn } from "@/lib/utils";

/**
 * Module planning : le visiteur saisit son code postal, on lui dit si la tournée
 * est en cours dans son secteur ou quand est la prochaine. `today` est fourni par
 * le serveur pour un rendu identique côté client.
 */
export function PlanningWidget({ planning, today, compact = false }: { planning: Planning; today: string; compact?: boolean }) {
  const [cp, setCp] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const zone = useMemo(() => (submitted && submitted.length === 5 ? zoneFromCodePostal(planning, submitted) : null), [submitted, planning]);

  const result = useMemo(() => {
    if (!zone) return null;
    const todayDate = new Date(today + "T12:00:00Z");
    const next = prochaineTournee(planning, zone.id, todayDate);
    if (!next) return { zone, status: "aucune" as const, tournee: null };
    const enCours = next.debut <= today;
    return { zone, status: enCours ? ("en-cours" as const) : ("a-venir" as const), tournee: next };
  }, [zone, planning, today]);

  return (
    <div className={cn("rounded-[1.5rem] border border-ink-900/8 bg-cream-50 shadow-soft", compact ? "p-5" : "p-6 sm:p-8")}>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(cp);
        }}
      >
        <div className="relative flex-1">
          <MapPin size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            placeholder="Votre code postal"
            value={cp}
            onChange={(e) => {
              setCp(e.target.value.replace(/\D/g, "").slice(0, 5));
              setSubmitted(null);
            }}
            className="h-13 w-full rounded-full border border-ink-900/15 bg-white pl-11 pr-4 text-[16px] text-ink-900 placeholder:text-ink-300 focus:border-forest-700"
            aria-label="Code postal"
          />
        </div>
        <button type="submit" className="btn-forest" disabled={cp.length !== 5}>
          Quand passez-vous ?
        </button>
      </form>

      <div aria-live="polite" className="mt-5 min-h-6">
        {submitted && submitted.length === 5 && !zone && (
          <p className="text-[15px] leading-relaxed text-ink-700">{planning.messageHorsZone}</p>
        )}
        {result && result.status === "en-cours" && result.tournee && (
          <div className="flex items-start gap-3 rounded-2xl bg-sage-100 p-4">
            <CalendarCheck className="mt-0.5 shrink-0 text-forest-700" size={20} />
            <div>
              <p className="font-semibold text-forest-900">
                Nous sommes dans le {result.zone.nom} jusqu&apos;au {formatDateFr(result.tournee.fin, { day: "numeric", month: "long" })}.
              </p>
              <p className="mt-1 text-[15px] text-ink-700">Devis sur place sous 48 h, intervention planifiée dans la foulée.</p>
              <Link href={`/contact?cp=${submitted}`} className="mt-3 inline-flex items-center gap-1 text-[15px] font-semibold text-copper-600">
                Demander un passage <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
        {result && result.status === "a-venir" && result.tournee && (
          <div className="flex items-start gap-3 rounded-2xl bg-copper-100 p-4">
            <CalendarCheck className="mt-0.5 shrink-0 text-copper-600" size={20} />
            <div>
              <p className="font-semibold text-forest-900">
                Prochaine tournée dans le {result.zone.nom} {formatPeriode(result.tournee)}.
              </p>
              <p className="mt-1 text-[15px] text-ink-700">Réservez votre créneau dès maintenant : le devis est préparé en amont, l&apos;intervention calée dès notre arrivée.</p>
              <Link href={`/contact?cp=${submitted}`} className="mt-3 inline-flex items-center gap-1 text-[15px] font-semibold text-copper-600">
                Réserver un créneau <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
        {result && result.status === "aucune" && (
          <p className="text-[15px] text-ink-700">Le planning des prochaines tournées dans le {result.zone.nom} n&apos;est pas encore publié. Contactez-nous, nous vous tiendrons informé.</p>
        )}
      </div>

      {!compact && <ZonesTimeline planning={planning} today={today} />}
    </div>
  );
}

function ZonesTimeline({ planning, today }: { planning: Planning; today: string }) {
  const upcoming = sortTournees(planning.tournees).filter((t) => t.fin >= today).slice(0, 4);
  return (
    <div className="mt-6 border-t border-ink-900/8 pt-5">
      <p className="eyebrow mb-3 text-ink-500">Calendrier des tournées</p>
      <ol className="grid gap-2 sm:grid-cols-2">
        {upcoming.map((t) => {
          const enCours = t.debut <= today;
          return (
            <li key={t.debut + t.zone} className={cn("flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[14px]", enCours ? "bg-forest-800 text-cream-50" : "bg-sage-100 text-ink-700")}>
              <span className="font-semibold">{zoneById(planning, t.zone as ZoneId).nom}</span>
              <span className={cn(enCours ? "text-sage-200" : "text-ink-500")}>
                {enCours ? `jusqu'au ${formatDateFr(t.fin)}` : `${formatDateFr(t.debut)} → ${formatDateFr(t.fin)}`}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
