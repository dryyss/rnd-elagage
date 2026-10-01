import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { communesParZone } from "@/data/communes";
import { getPlanning, getSite } from "@/lib/content";
import { formatPeriode, prochaineTournee, toISODate } from "@/lib/planning";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { PlanningWidget } from "@/components/sections/PlanningWidget";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Zones d'intervention · Val-d'Oise (95) et Nièvre (58)",
  description:
    "RND Élagage intervient en tournées alternées dans le Val-d'Oise (Taverny, Herblay, Franconville, Saint-Leu-la-Forêt…) et dans la Nièvre (Nevers, Varennes-Vauzelles, Fourchambault…). Planning des tournées en ligne.",
  alternates: { canonical: "/zones" },
};

export default async function ZonesPage() {
  const [site, planning] = await Promise.all([getSite(), getPlanning()]);
  const today = toISODate(new Date());
  const todayDate = new Date(today + "T12:00:00Z");

  return (
    <>
      <PageHero
        site={site}
        breadcrumb={[{ name: "Zones d'intervention", path: "/zones" }]}
        eyebrow="Zones d'intervention"
        title="Deux territoires, une tournée toutes les six semaines."
        intro="Nous alternons entre le Val-d'Oise, autour de Taverny, et la Nièvre, autour de Nevers. Saisissez votre code postal pour savoir quand nous passons près de chez vous."
      >
        <PlanningWidget planning={planning} today={today} compact />
      </PageHero>

      <section className="container-x pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {planning.zones.map((z, zi) => {
            const next = prochaineTournee(planning, z.id, todayDate);
            const enCours = next && next.debut <= today;
            const communes = communesParZone(z.id);
            return (
              <Reveal key={z.id} delay={zi * 100} className="card overflow-hidden">
                <div className="relative bg-forest-900 p-7 text-cream-50">
                  <div className="grain pointer-events-none absolute inset-0" />
                  <div className="relative">
                    <p className="eyebrow text-copper-400">{z.libelleCourt}</p>
                    <h2 className="mt-3 text-3xl">{z.nom}</h2>
                    <p className="mt-2 text-[15px] text-sage-200">{z.description}</p>
                    {next && (
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-3 py-1.5 text-[13px]">
                        <span className={`h-2 w-2 rounded-full ${enCours ? "bg-copper-400" : "bg-sage-300"}`} />
                        {enCours ? `Tournée en cours ${formatPeriode(next)}` : `Prochaine tournée ${formatPeriode(next)}`}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="divide-y divide-ink-900/8">
                  {communes.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/zones/${c.slug}`} className="group flex items-center justify-between gap-4 px-7 py-4 transition hover:bg-sage-100/60">
                        <span className="flex items-center gap-3">
                          <MapPin size={16} className="text-forest-700" />
                          <span>
                            <span className="font-semibold text-forest-900">{c.nom}</span>
                            <span className="ml-2 text-[13px] text-ink-500">{c.codePostal}</span>
                            {c.base && <span className="ml-2 rounded-full bg-copper-100 px-2 py-0.5 text-[11px] font-semibold text-copper-600">Base</span>}
                          </span>
                        </span>
                        <ArrowRight size={16} className="text-ink-300 transition group-hover:translate-x-1 group-hover:text-copper-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-center text-[14px] text-ink-500">Votre commune n&apos;est pas listée ? Nous intervenons dans tout le département concerné : indiquez simplement votre code postal dans la demande de devis.</p>
      </section>

      <CtaBand site={site} titre="Réservez votre créneau sur la prochaine tournée." contexte="Planning" />
    </>
  );
}
