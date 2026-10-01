import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgePercent, Camera, Images, MapPin, Phone, Scissors, Tag } from "lucide-react";
import type { SiteConfig } from "@/lib/types";
import { telHref } from "@/lib/utils";

const raccourcis = [
  { href: "/prestations", label: "Prestations", desc: "Haies, jardin, abattage, terrassement", Icon: Scissors },
  { href: "/realisations", label: "Réalisations", desc: "Nos chantiers avant / après", Icon: Images },
  { href: "/tarifs", label: "Tarifs", desc: "Prix indicatifs au mètre et à l'heure", Icon: Tag },
  { href: "/credit-impot", label: "Crédit d'impôt", desc: "50 % remboursés sur l'entretien", Icon: BadgePercent },
  { href: "/zones", label: "Zones d'intervention", desc: "Val-d'Oise et Nièvre", Icon: MapPin },
  { href: "/contact", label: "Devis gratuit", desc: "Réponse sous 24 h", Icon: Camera },
];

/** Page 404 : hero sur fond crème avec halos, photo décalée, raccourcis vers les pages utiles. */
export function NotFoundPanel({ site }: { site: SiteConfig }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="halo-sage absolute -left-60 -top-20 h-[760px] w-[760px]" />
        <div className="halo-copper absolute -right-52 top-40 h-[620px] w-[620px]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="animate-fade-up">
          <p className="eyebrow text-copper-600">Erreur 404 · Page introuvable</p>

          <p
            aria-hidden
            className="mt-6 font-display text-[clamp(5.5rem,16vw,11rem)] leading-[0.85] tracking-[-0.04em] text-forest-900"
          >
            4<span className="italic text-forest-600">0</span>4
          </p>

          <h1 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] text-forest-900">
            Cette page a été taillée un peu court.
          </h1>
          <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-ink-700 sm:text-lg">
            L&apos;adresse n&apos;existe pas, a changé ou contient une faute de frappe. Rien de grave : tout le reste du jardin est en place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/" className="btn-forest">
              Retour à l&apos;accueil
            </Link>
            <Link href="/contact" className="btn-primary">
              Demander un devis <ArrowRight size={16} />
            </Link>
            <a href={telHref(site.telephone)} className="btn-ghost">
              <Phone size={16} /> {site.telephone}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/topiaires-ifs-jardin.jpg"
              alt="Topiaires d'ifs taillées en boules dans un jardin"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-forest-950/5 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-cream-50">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sage-200">Pendant ce temps, au jardin</p>
              <p className="mt-1 font-display text-xl leading-tight">Les ifs, eux, sont exactement là où on les attend.</p>
            </div>
          </div>

          <div className="absolute -left-3 -top-4 flex items-center gap-3 rounded-full border border-ink-900/8 bg-cream-50 py-2 pl-2 pr-5 shadow-soft sm:-left-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-copper-100 text-copper-600">
              <Scissors size={15} strokeWidth={1.75} />
            </span>
            <span className="text-[13px] leading-tight">
              <span className="block font-semibold text-forest-900">Branche coupée</span>
              <span className="text-ink-500">cette URL ne mène nulle part</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container-x pb-20 lg:pb-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-copper-600">Vous cherchiez peut-être</p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] text-forest-900">Les pages les plus utiles</h2>
          </div>
          <p className="hidden max-w-[32ch] text-right text-[14px] text-ink-500 sm:block">{site.horaires}</p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {raccourcis.map(({ href, label, desc, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="card group flex h-full items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-700 transition-colors duration-300 group-hover:bg-forest-800 group-hover:text-cream-50">
                  <Icon size={19} strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-semibold text-forest-900">
                    {label}
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper-600"
                    />
                  </span>
                  <span className="mt-1 block text-[14px] leading-snug text-ink-500">{desc}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
