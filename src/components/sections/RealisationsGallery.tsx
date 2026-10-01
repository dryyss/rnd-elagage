"use client";

import { useMemo, useState } from "react";
import type { Realisation, ZoneId } from "@/lib/types";
import { prestations } from "@/data/prestations";
import { RealisationCard } from "./RealisationCard";
import { cn } from "@/lib/utils";

/** Galerie filtrable par prestation et par zone. Les filtres sont purement client. */
export function RealisationsGallery({ realisations, initialPrestation }: { realisations: Realisation[]; initialPrestation?: string }) {
  const [prestation, setPrestation] = useState<string>(initialPrestation ?? "toutes");
  const [zone, setZone] = useState<ZoneId | "toutes">("toutes");

  const presentes = useMemo(() => prestations.filter((p) => realisations.some((r) => r.prestation === p.slug)), [realisations]);

  const filtered = useMemo(
    () => realisations.filter((r) => (prestation === "toutes" || r.prestation === prestation) && (zone === "toutes" || r.zone === zone)).sort((a, b) => b.date.localeCompare(a.date)),
    [realisations, prestation, zone],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par prestation">
          <Chip active={prestation === "toutes"} onClick={() => setPrestation("toutes")}>
            Toutes
          </Chip>
          {presentes.map((p) => (
            <Chip key={p.slug} active={prestation === p.slug} onClick={() => setPrestation(p.slug)}>
              {p.nomCourt}
            </Chip>
          ))}
        </div>
        <div className="flex gap-2" role="group" aria-label="Filtrer par zone">
          {(["toutes", "val-doise", "nievre"] as const).map((z) => (
            <Chip key={z} active={zone === z} onClick={() => setZone(z)} variant="outline">
              {z === "toutes" ? "Les deux zones" : z === "val-doise" ? "Val-d'Oise" : "Nièvre"}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[13px] text-ink-500" aria-live="polite">
        {filtered.length} chantier{filtered.length > 1 ? "s" : ""}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r, i) => (
          <RealisationCard key={r.slug} r={r} priority={i < 3} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-10 text-center text-ink-500">Aucun chantier ne correspond à ces filtres pour le moment.</p>}
    </div>
  );
}

function Chip({ children, active, onClick, variant = "solid" }: { children: React.ReactNode; active: boolean; onClick: () => void; variant?: "solid" | "outline" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-2 text-[13px] font-semibold transition",
        variant === "solid"
          ? active
            ? "bg-forest-800 text-cream-50"
            : "bg-cream-200 text-ink-700 hover:bg-sage-200"
          : active
            ? "border border-forest-800 bg-forest-800 text-cream-50"
            : "border border-ink-900/15 text-ink-700 hover:border-forest-800",
      )}
    >
      {children}
    </button>
  );
}
