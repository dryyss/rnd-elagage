import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Planning } from "@/lib/types";
import { communesParZone } from "@/data/communes";
import { PlanningWidget } from "./PlanningWidget";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Territoires({ planning, today }: { planning: Planning; today: string }) {
  return (
    <section className="relative overflow-hidden bg-sage-100/60 py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Deux territoires" title="Une tournée toutes les six semaines, en alternance." text="Nous travaillons entre le Val-d'Oise et la Nièvre. Si nous ne sommes pas dans votre secteur cette semaine, réservez votre créneau sur la prochaine tournée : le devis est établi en amont, l'intervention planifiée dès notre arrivée." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {planning.zones.map((z, i) => {
              const communes = communesParZone(z.id);
              return (
                <Reveal key={z.id} delay={i * 100}>
                  <div className="rounded-2xl border border-ink-900/8 bg-cream-50/70 p-5">
                    <p className="font-display text-xl text-forest-900">{z.nom}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{z.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {communes.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/zones/${c.slug}`} className="inline-block rounded-full border border-ink-900/10 bg-cream-50 px-2.5 py-1 text-[12px] font-medium text-ink-700 transition hover:border-forest-700 hover:text-forest-900">
                            {c.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={200} className="mt-6">
            <Link href="/zones" className="inline-flex items-center gap-2 font-semibold text-copper-600 hover:text-copper-500">
              Toutes les communes desservies <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={120} className="lg:pt-16">
          <PlanningWidget planning={planning} today={today} />
        </Reveal>
      </div>
    </section>
  );
}
