import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { communes, communeBySlug, communesParZone } from "@/data/communes";
import { prestations } from "@/data/prestations";
import { getPlanning, getRealisations, getSite } from "@/lib/content";
import { formatDateFr, formatPeriode, prochaineTournee, toISODate, zoneById } from "@/lib/planning";
import { communeJsonLd } from "@/lib/seo";
import { telHref } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrestationIcon } from "@/components/ui/PrestationIcon";
import { JsonLd } from "@/components/seo/JsonLd";
import { RealisationCard } from "@/components/sections/RealisationCard";
import { CreditCalculator } from "@/components/sections/CreditCalculator";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 3600;

export function generateStaticParams() {
  return communes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/zones/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = communeBySlug(slug);
  if (!c) return {};
  const title = `Taille de haies et entretien de jardin à ${c.nom} (${c.codePostal})`;
  const description = `Élagueur-paysagiste à ${c.nom} : taille de haies, débroussaillage, tonte, abattage. Devis gratuit sur place, évacuation comprise, crédit d'impôt 50 %. ${c.accroche}`;
  return { title, description, alternates: { canonical: `/zones/${c.slug}` }, openGraph: { title, description } };
}

export default async function CommunePage({ params }: PageProps<"/zones/[slug]">) {
  const { slug } = await params;
  const c = communeBySlug(slug);
  if (!c) notFound();

  const [site, planning, realisations] = await Promise.all([getSite(), getPlanning(), getRealisations()]);
  const today = toISODate(new Date());
  const zone = zoneById(planning, c.zone);
  const next = prochaineTournee(planning, c.zone, new Date(today + "T12:00:00Z"));
  const enCours = !!next && next.debut <= today;

  const chantiers = [...realisations.filter((r) => r.commune === c.nom), ...realisations.filter((r) => r.zone === c.zone && r.commune !== c.nom)].slice(0, 3);
  const voisines = c.voisines.map((s) => communeBySlug(s)).filter(Boolean) as typeof communes;
  const autres = communesParZone(c.zone).filter((x) => x.slug !== c.slug && !c.voisines.includes(x.slug));

  const faq = [
    {
      q: `Quand intervenez-vous à ${c.nom} ?`,
      r: next
        ? enCours
          ? `Nous sommes actuellement en tournée dans le ${zone.nom}, jusqu'au ${formatDateFr(next.fin, { day: "numeric", month: "long", year: "numeric" })}. À ${c.nom}, nous passons mesurer sous 48 heures.`
          : `Notre prochaine tournée dans le ${zone.nom} est prévue ${formatPeriode(next)}. Réservez votre créneau dès maintenant : le devis est préparé en amont, l'intervention calée dès notre arrivée.`
        : `Le planning des prochaines tournées dans le ${zone.nom} est en cours de publication. Contactez-nous pour être prévenu.`,
    },
    {
      q: `Le déplacement à ${c.nom} est-il facturé ?`,
      r: c.base
        ? "Non. Taverny est notre commune de base : aucun frais de déplacement, et des délais encore plus courts."
        : `Non. ${c.nom} fait partie de notre secteur de tournée : le déplacement est compris dans le prix, avec un minimum de facturation de 150 €.`,
    },
    {
      q: "Mes travaux sont-ils éligibles au crédit d'impôt ?",
      r: "La taille de haies, la tonte, le débroussaillage et l'entretien courant du jardin le sont : 50 % du montant vous est restitué. L'abattage, le dessouchage et le terrassement ne le sont pas, et nous le précisons sur chaque devis.",
    },
    {
      q: "Que faites-vous des déchets verts ?",
      r: "Ils sont évacués le jour même en remorque vers une filière agréée, ou broyés sur place pour vous servir de paillage. L'évacuation est chiffrée dans le devis.",
    },
  ];

  return (
    <>
      <PageHero
        site={site}
        breadcrumb={[
          { name: "Zones", path: "/zones" },
          { name: c.nom, path: `/zones/${c.slug}` },
        ]}
        eyebrow={`${c.departement} · ${c.codePostal}`}
        title={
          <>
            Taille de haies et entretien de jardin <span className="italic text-forest-600">à {c.nom}</span>
          </>
        }
        intro={c.intro}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/contact?cp=${c.codePostal}`} className="btn-primary">
            Devis gratuit à {c.nom} <ArrowRight size={16} />
          </Link>
          <a href={telHref(site.telephone)} className="btn-ghost">
            <Phone size={16} /> {site.telephone}
          </a>
        </div>
        {next && (
          <div className={`mt-8 inline-flex items-start gap-3 rounded-2xl p-4 ${enCours ? "bg-sage-100" : "bg-copper-100"}`}>
            <CalendarCheck size={20} className={`mt-0.5 shrink-0 ${enCours ? "text-forest-700" : "text-copper-600"}`} />
            <div className="text-[15px]">
              <p className="font-semibold text-forest-900">{enCours ? `Tournée en cours dans le ${zone.nom} jusqu'au ${formatDateFr(next.fin)}` : `Prochaine tournée dans le ${zone.nom} ${formatPeriode(next)}`}</p>
              <p className="text-ink-700">{enCours ? `Devis sur place sous 48 h à ${c.nom}.` : "Réservez votre créneau dès maintenant, le devis est préparé en amont."}</p>
            </div>
          </div>
        )}
      </PageHero>

      {/* Contexte local */}
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-copper-600">Le terrain à {c.nom}</p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.08] text-forest-900">Ce que nous voyons le plus souvent dans la commune.</h2>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {c.quartiers.map((q) => (
                <li key={q} className="rounded-full bg-cream-200 px-3 py-1 text-[13px] text-ink-700">
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[17px] leading-[1.7] text-ink-700">{c.contexte}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {c.demandes.map((d, i) => (
                <div key={d.titre} className="card p-5">
                  <span className="font-display text-sm text-copper-600">0{i + 1}</span>
                  <h3 className="mt-2 text-lg leading-snug text-forest-900">{d.titre}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{d.texte}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Prestations disponibles */}
      <section className="bg-cream-200/60 py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Prestations" title={`Toutes nos prestations à ${c.nom}.`} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {prestations.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <Link href={`/prestations/${p.slug}`} className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-forest-800 transition group-hover:bg-forest-800 group-hover:text-cream-50">
                    <PrestationIcon name={p.icon} size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-forest-900">{p.nom}</span>
                    <span className="block text-[13px] text-ink-500">
                      {p.tarifIndicatif} {p.creditImpot && "· crédit d'impôt 50 %"}
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-ink-300 transition group-hover:text-copper-600" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chantiers */}
      {chantiers.length > 0 && (
        <section className="container-x py-16 lg:py-24">
          <SectionHeading eyebrow="Réalisations" title={chantiers[0].commune === c.nom ? `Des chantiers à ${c.nom} et alentour.` : `Des chantiers dans le ${zone.nom}.`} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chantiers.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <RealisationCard r={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Crédit d'impôt */}
      <section className="relative overflow-hidden bg-forest-900 text-cream-50">
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="container-x relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <SectionHeading tone="light" eyebrow="Crédit d'impôt" title={`À ${c.nom} comme ailleurs, la moitié du prix vous revient.`} text="Taille de haies, tonte et entretien de jardin relèvent des services à la personne. Nous fournissons l'attestation fiscale chaque année." />
          <Reveal delay={100}>
            <CreditCalculator />
          </Reveal>
        </div>
      </section>

      <Faq items={faq} title={`Vos questions, à ${c.nom}.`} />

      {/* Communes voisines */}
      <section className="container-x pb-16">
        <p className="eyebrow text-ink-500">Nous intervenons aussi à</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {[...voisines, ...autres].map((v) => (
            <li key={v.slug}>
              <Link href={`/zones/${v.slug}`} className="inline-block rounded-full border border-ink-900/10 bg-cream-50 px-4 py-2 text-[14px] font-medium text-ink-700 transition hover:border-forest-700 hover:text-forest-900">
                {v.nom}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand site={site} contexte={c.nom} titre={`Un devis gratuit pour votre jardin à ${c.nom} ?`} />
      <JsonLd data={communeJsonLd(site, c)} />
    </>
  );
}
