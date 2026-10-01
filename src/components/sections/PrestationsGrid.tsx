import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgePercent } from "lucide-react";
import { prestations } from "@/data/prestations";
import { PrestationIcon } from "@/components/ui/PrestationIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function PrestationsGrid({ exclude }: { exclude?: string }) {
  const list = prestations.filter((p) => p.slug !== exclude);
  const [first, ...rest] = list;
  const showHero = !exclude;
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="Nos prestations" title={<>Le cœur du métier d&apos;abord, le reste autour.</>} text="Six prestations, un seul interlocuteur. Les tarifs de départ sont indicatifs : le devis définitif est établi gratuitement sur place, après mesure." />
        <Reveal delay={100}>
          <Link href="/tarifs" className="btn-ghost">
            Voir tous les tarifs
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {showHero && (
          <Reveal className="md:col-span-2 lg:row-span-2">
            <Link href={`/prestations/${first.slug}`} className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-forest-900 p-7 text-cream-50 shadow-soft">
              <Image src={first.image} alt={first.imageAlt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover opacity-70 transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-copper-400">{first.numero} · Prestation principale</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/20 transition group-hover:bg-copper-500 group-hover:border-copper-500">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">{first.nom}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-sage-200">{first.accroche}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px]">
                  <span className="rounded-full bg-cream-50/10 px-3 py-1 font-medium">{first.tarifIndicatif}</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-copper-500/90 px-3 py-1 font-medium">
                    <BadgePercent size={14} /> Crédit d&apos;impôt 50 %
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        )}
        {(showHero ? rest : list).map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 80}>
            <Link href={`/prestations/${p.slug}`} className={cn("card group flex h-full flex-col p-6 transition duration-500 hover:-translate-y-1 hover:shadow-lift")}>
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-forest-800 transition group-hover:bg-forest-800 group-hover:text-cream-50">
                  <PrestationIcon name={p.icon} size={22} />
                </span>
                <span className="font-display text-sm text-copper-600">{p.numero}</span>
              </div>
              <h3 className="mt-5 text-xl leading-snug text-forest-900">{p.nom}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">{p.accroche}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px]">
                <span className="rounded-full bg-cream-200 px-3 py-1 font-medium text-ink-700">{p.tarifIndicatif}</span>
                {p.creditImpot ? (
                  <span className="flex items-center gap-1 rounded-full bg-copper-100 px-3 py-1 font-medium text-copper-600">
                    <BadgePercent size={13} /> −50 %
                  </span>
                ) : (
                  <span className="rounded-full px-1 py-1 text-ink-300">hors crédit d&apos;impôt</span>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
