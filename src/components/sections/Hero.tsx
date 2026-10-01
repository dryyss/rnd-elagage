import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { Planning, SiteConfig } from "@/lib/types";
import { formatDateFr, tourneeEnCours, zoneById } from "@/lib/planning";
import { telHref } from "@/lib/utils";

export function Hero({ site, planning, today }: { site: SiteConfig; planning: Planning; today: string }) {
  const enCours = tourneeEnCours(planning, new Date(today + "T12:00:00Z"));
  return (
    <section className="relative overflow-hidden">
      {/* Fond : halos sauge/cuivre très doux + grain papier */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="halo-sage absolute -left-60 -top-10 h-[760px] w-[760px]" />
        <div className="halo-copper absolute -right-52 top-20 h-[640px] w-[640px]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-12 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-14">
        <div className="animate-fade-up">
          <p className="eyebrow text-copper-600">Val-d&apos;Oise · Nièvre</p>
          <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.9rem)] leading-[0.98] text-forest-900">
            Votre haie retrouve sa ligne.
            <br />
            <span className="italic text-forest-600">
              L&apos;État vous rembourse la moitié.
            </span>
          </h1>
          <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.65] text-ink-700 sm:text-lg">
            Taille de haies, entretien de jardin et travaux extérieurs, de Taverny à Nevers. Nos prestations d&apos;entretien ouvrent droit au crédit d&apos;impôt de 50 % : une taille facturée 440 € vous coûte réellement 220 €.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary">
              Demander un devis gratuit <ArrowRight size={16} />
            </Link>
            <a href={telHref(site.telephone)} className="btn-ghost">
              <Phone size={16} /> {site.telephone}
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-ink-500">
            <li className="flex items-center gap-2">
              <Dot /> Devis gratuit sur place
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Évacuation comprise
            </li>
            <li className="flex items-center gap-2">
              <Dot /> {site.assuranceRcPro}
            </li>
          </ul>
        </div>

        {/* Composition visuelle : photo principale + carte avant/après + pastille tournée */}
        <div className="relative mx-auto w-full max-w-[560px] animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="/images/haie-thuya-alignement.jpg"
              alt="Grande haie de thuyas taillée au cordeau sous un ciel bleu"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-cream-50">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-sage-200">Taille d&apos;entretien</p>
                <p className="font-display text-xl">Haie de thuyas · 50 ml</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-4 w-[46%] overflow-hidden rounded-[1.25rem] border-[6px] border-cream-100 shadow-lift sm:-left-8">
            <div className="relative aspect-[379/400]">
              <Image src="/images/avant-apres-haie-cypres-trottoir.jpg" alt="Avant et après la taille d'une haie de cyprès sur trottoir" fill sizes="260px" className="object-cover" />
            </div>
            <div className="absolute left-3 top-3 flex gap-1">
              <span className="rounded-full bg-forest-950/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream-50 backdrop-blur">Avant</span>
              <span className="rounded-full bg-copper-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream-50">Après</span>
            </div>
          </div>

          {enCours && (
            <div className="absolute -right-2 -top-4 flex items-center gap-3 rounded-full border border-ink-900/8 bg-cream-50 py-2 pl-2 pr-5 shadow-soft sm:-right-6">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-sage-100">
                <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-forest-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-forest-600" />
              </span>
              <span className="text-[13px] leading-tight">
                <span className="block font-semibold text-forest-900">Tournée en cours · {zoneById(planning, enCours.zone).nom}</span>
                <span className="text-ink-500">jusqu&apos;au {formatDateFr(enCours.fin)}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-copper-500" aria-hidden />;
}
