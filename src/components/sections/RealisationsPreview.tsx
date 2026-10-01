import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Realisation } from "@/lib/types";
import { RealisationCard } from "./RealisationCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RealisationsPreview({ realisations }: { realisations: Realisation[] }) {
  const featured = realisations.filter((r) => r.miseEnAvant).slice(0, 4);
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="Réalisations" title="Nos chantiers, pas des photos de catalogue." text="Chaque photo vient d'un chantier réel, avec la commune, la prestation et ce qui a été fait. Les avant/après parlent d'eux-mêmes." />
        <Reveal delay={100}>
          <Link href="/realisations" className="btn-ghost">
            Toutes les réalisations <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((r, i) => (
          <Reveal key={r.slug} delay={i * 80} className="min-w-0">
            <RealisationCard r={r} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
