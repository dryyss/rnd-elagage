import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Realisation } from "@/lib/types";
import { prestationBySlug } from "@/data/prestations";
import { cn } from "@/lib/utils";

export function RealisationCard({ r, priority = false, className }: { r: Realisation; priority?: boolean; className?: string }) {
  const p = prestationBySlug(r.prestation);
  const mois = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(r.date + "-15T12:00:00Z"));
  return (
    <article className={cn("card group flex h-full min-w-0 flex-col overflow-hidden", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-100">
        <Image
          src={r.image}
          alt={`${r.titre} — ${r.commune}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {r.type === "avant-apres" ? (
            <>
              <span className="rounded-full bg-forest-950/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream-50 backdrop-blur">Avant</span>
              <span className="rounded-full bg-copper-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream-50">Après</span>
            </>
          ) : (
            <span className="rounded-full bg-forest-950/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream-50 backdrop-blur">Chantier</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-[12px] font-medium uppercase tracking-wider text-copper-600">
          <span>{p?.nomCourt ?? r.prestation}</span>
          <span className="text-ink-300 normal-case tracking-normal">{mois}</span>
        </div>
        <h3 className="mt-2 text-lg leading-snug text-forest-900">{r.titre}</h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-500">{r.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink-900/8 pt-3 text-[13px] text-ink-500">
          <span className="flex shrink-0 items-center gap-1.5">
            <MapPin size={14} className="text-forest-700" /> {r.commune}
          </span>
          <span className="min-w-0 truncate text-right">{r.details}</span>
        </div>
      </div>
    </article>
  );
}
