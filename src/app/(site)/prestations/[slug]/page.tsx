import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgePercent, Check, Phone, CalendarDays } from "lucide-react";
import { prestations, prestationBySlug } from "@/data/prestations";
import { getRealisations, getSite, getTarifs } from "@/lib/content";
import { serviceJsonLd } from "@/lib/seo";
import { telHref, formatEuro } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { RealisationCard } from "@/components/sections/RealisationCard";
import { Faq } from "@/components/sections/Faq";
import { PrestationsGrid } from "@/components/sections/PrestationsGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { CreditCalculator } from "@/components/sections/CreditCalculator";

export function generateStaticParams() {
  return prestations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/prestations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = prestationBySlug(slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/prestations/${p.slug}` },
    openGraph: { title: p.seoTitle, description: p.seoDescription, images: [{ url: p.image }] },
  };
}

export default async function PrestationPage({ params }: PageProps<"/prestations/[slug]">) {
  const { slug } = await params;
  const p = prestationBySlug(slug);
  if (!p) notFound();

  const [site, tarifs, realisations] = await Promise.all([getSite(), getTarifs(), getRealisations()]);
  const chantiers = realisations.filter((r) => r.prestation === p.slug).slice(0, 3);

  return (
    <>
      <PageHero
        site={site}
        breadcrumb={[
          { name: "Prestations", path: "/prestations" },
          { name: p.nom, path: `/prestations/${p.slug}` },
        ]}
        eyebrow={`Prestation ${p.numero}`}
        title={p.h1}
        intro={p.intro}
        image={p.image}
        imageAlt={p.imageAlt}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/contact?prestation=${p.slug}`} className="btn-primary">
            Devis gratuit <ArrowRight size={16} />
          </Link>
          <a href={telHref(site.telephone)} className="btn-ghost">
            <Phone size={16} /> {site.telephone}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <span className="rounded-full bg-cream-200 px-3 py-1.5 font-medium text-ink-700">{p.tarifIndicatif}</span>
          {p.creditImpot ? (
            <span className="flex items-center gap-1.5 rounded-full bg-copper-100 px-3 py-1.5 font-medium text-copper-600">
              <BadgePercent size={14} /> Éligible au crédit d&apos;impôt 50 %
            </span>
          ) : (
            <span className="rounded-full bg-cream-200 px-3 py-1.5 text-ink-500">Non éligible au crédit d&apos;impôt</span>
          )}
        </div>
      </PageHero>

      {/* Ce que nous faisons */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeading eyebrow="Ce que nous faisons" title="Quatre situations, une méthode pour chacune." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {p.blocs.map((b, i) => (
            <Reveal key={b.titre} delay={(i % 2) * 90}>
              <div className="card h-full p-7">
                <span className="font-display text-sm text-copper-600">0{i + 1}</span>
                <h3 className="mt-3 text-xl text-forest-900">{b.titre}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-ink-700">{b.texte}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Inclus + saison */}
      <section className="bg-cream-200/60 py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-copper-600">Ce qui est compris</p>
            <ul className="mt-6 space-y-4">
              {p.inclus.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-700">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-800 text-cream-50">
                    <Check size={13} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            {p.saison && (
              <div className="card p-7">
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-forest-700" size={22} />
                  <h3 className="text-xl text-forest-900">Quand intervenir</h3>
                </div>
                <p className="mt-4 text-[15px] leading-[1.7] text-ink-700">{p.saison}</p>
                <SaisonBar />
              </div>
            )}
            {p.slug === "taille-de-haies" && (
              <div className="card mt-4 p-7">
                <h3 className="text-xl text-forest-900">Tarifs indicatifs</h3>
                <table className="mt-4 w-full text-[15px]">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-ink-500">
                      <th className="pb-2 font-medium">Hauteur</th>
                      <th className="pb-2 text-right font-medium">Prix / ml</th>
                      <th className="pb-2 text-right font-medium">Reste à charge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-900/8">
                    {tarifs.haies.lignes.map((l) => (
                      <tr key={l.libelle}>
                        <td className="py-2.5 text-ink-700">{l.libelle}</td>
                        <td className="py-2.5 text-right font-semibold text-forest-900">{formatEuro(l.prix)}</td>
                        <td className="py-2.5 text-right font-semibold text-copper-600">{formatEuro(l.prix / 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-[13px] text-ink-500">
                  {tarifs.haies.evacuation.libelle} : {formatEuro(tarifs.haies.evacuation.prix)} / ml. Minimum de facturation {formatEuro(tarifs.minimumFacturation)}.
                </p>
                <Link href="/tarifs" className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-copper-600">
                  Tous les tarifs <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Crédit d'impôt */}
      {p.creditImpot && (
        <section className="relative overflow-hidden bg-forest-900 text-cream-50">
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="container-x relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
            <SectionHeading tone="light" eyebrow="Crédit d'impôt" title="Cette prestation entre dans les services à la personne." text="50 % du montant payé vous est rendu par crédit d'impôt, dans la limite de 5 000 € de dépenses par an. Nous fournissons l'attestation fiscale en janvier." />
            <Reveal delay={100}>
              <CreditCalculator initial={tarifs.exempleCredit.montant} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Chantiers liés */}
      {chantiers.length > 0 && (
        <section className="container-x py-16 lg:py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Réalisations" title={`Des chantiers de ${p.nomCourt.toLowerCase()}, en vrai.`} />
            <Link href={`/realisations?prestation=${p.slug}`} className="btn-ghost self-start">
              Voir toutes les réalisations
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chantiers.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <RealisationCard r={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Faq items={p.faq} eyebrow="Questions fréquentes" title="Vos questions, nos réponses." />
      <PrestationsGrid exclude={p.slug} />
      <CtaBand site={site} contexte={p.nom} titre={`${p.nomCourt} : demandez votre devis gratuit.`} />
      <JsonLd data={serviceJsonLd(site, p)} />
    </>
  );
}

function SaisonBar() {
  const mois = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  // Vert : période favorable ; sauge clair : tailles légères uniquement (nidification)
  const favorable = new Set([0, 1, 2, 8, 9, 10, 11]);
  return (
    <div className="mt-6">
      <div className="grid grid-cols-12 gap-1">
        {mois.map((m, i) => (
          <div key={i} className="text-center">
            <div className={`h-2 rounded-full ${favorable.has(i) ? "bg-forest-700" : "bg-sage-200"}`} />
            <span className="mt-1.5 block text-[11px] text-ink-500">{m}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-[12px] text-ink-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-forest-700" /> Période favorable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-sage-200" /> Tailles légères uniquement
        </span>
      </div>
    </div>
  );
}
