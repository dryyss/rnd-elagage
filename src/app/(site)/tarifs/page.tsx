import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgePercent, Check, Minus } from "lucide-react";
import { getSite, getTarifs } from "@/lib/content";
import { formatEuro } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CreditCalculator } from "@/components/sections/CreditCalculator";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Tarifs taille de haies et entretien de jardin · Reste à charge après crédit d'impôt",
  description:
    "Nos tarifs indicatifs au mètre linéaire et au m², avec le montant réellement à votre charge après crédit d'impôt de 50 %. Devis définitif gratuit sur place.",
  alternates: { canonical: "/tarifs" },
};

const faqTarifs = [
  { q: "Pourquoi des tarifs « indicatifs » ?", r: "Parce qu'une haie de 3 m facile d'accès et une haie de 3 m coincée entre deux garages ne demandent pas le même temps. Les fourchettes affichées correspondent aux cas courants ; le devis sur place est ferme et gratuit." },
  { q: "Y a-t-il un minimum de facturation ?", r: "Oui, 150 € nets de taxe, déplacement et évacuation compris. En dessous, nous vous proposons de grouper avec un voisin ou d'ajouter une petite prestation d'entretien." },
  { q: "Le prix comprend-il l'évacuation ?", r: "L'évacuation est chiffrée séparément (2 € par mètre linéaire pour les haies) et toujours indiquée sur le devis. Elle est éligible au crédit d'impôt lorsqu'elle accompagne une prestation d'entretien." },
  { q: "Comment est calculé le reste à charge ?", r: "Pour les prestations éligibles, nous indiquons le prix total et le montant après crédit d'impôt de 50 %. Le crédit vous est versé par l'administration fiscale l'année suivante, sur présentation de l'attestation que nous vous remettons." },
];

export default async function TarifsPage() {
  const [site, tarifs] = await Promise.all([getSite(), getTarifs()]);
  return (
    <>
      <PageHero
        site={site}
        breadcrumb={[{ name: "Tarifs", path: "/tarifs" }]}
        eyebrow="Tarifs"
        title="Nos prix, et ce qu'il vous reste vraiment à payer."
        intro="Peu d'entreprises du secteur affichent leurs tarifs. Voici des fourchettes honnêtes, avec le montant réellement à votre charge après crédit d'impôt. Le devis définitif est établi gratuitement sur place."
      />

      <section className="container-x pb-16 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-900/8 px-7 py-5">
              <h2 className="text-2xl text-forest-900">Taille de haies</h2>
              <span className="flex items-center gap-1.5 rounded-full bg-copper-100 px-3 py-1 text-[13px] font-medium text-copper-600">
                <BadgePercent size={14} /> Crédit d&apos;impôt 50 %
              </span>
            </div>
            <table className="w-full text-[15px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-ink-500">
                  <th className="px-7 py-3 font-medium">Hauteur de la haie</th>
                  <th className="px-4 py-3 text-right font-medium">Prix / ml</th>
                  <th className="px-7 py-3 text-right font-medium">Reste à charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/8">
                {tarifs.haies.lignes.map((l) => (
                  <tr key={l.libelle} className="transition hover:bg-sage-100/50">
                    <td className="px-7 py-4 text-ink-700">{l.libelle}</td>
                    <td className="px-4 py-4 text-right font-semibold text-forest-900">{formatEuro(l.prix)}</td>
                    <td className="px-7 py-4 text-right">
                      <span className="rounded-full bg-copper-100 px-2.5 py-1 font-semibold text-copper-600">{formatEuro(l.prix / 2)}</span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-cream-200/50">
                  <td className="px-7 py-4 text-ink-700">{tarifs.haies.evacuation.libelle}</td>
                  <td className="px-4 py-4 text-right font-semibold text-forest-900">
                    {formatEuro(tarifs.haies.evacuation.prix)} <span className="text-[12px] font-normal text-ink-500">/ ml</span>
                  </td>
                  <td className="px-7 py-4 text-right">
                    <span className="rounded-full bg-copper-100 px-2.5 py-1 font-semibold text-copper-600">{formatEuro(tarifs.haies.evacuation.prix / 2)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="px-7 py-5 text-[13px] leading-relaxed text-ink-500">
              Minimum de facturation : {formatEuro(tarifs.minimumFacturation)}. {tarifs.avertissement}
            </p>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-forest-900 p-7 text-cream-50">
              <div className="grain pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className="eyebrow text-copper-400">Exemple concret</p>
                <p className="mt-4 text-[15px] leading-relaxed text-sage-200">{tarifs.exempleCredit.libelle}</p>
                <div className="mt-5 flex items-end gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-sage-300">Facturé</p>
                    <p className="font-display text-3xl line-through decoration-copper-400/70">{formatEuro(tarifs.exempleCredit.montant)}</p>
                  </div>
                  <ArrowRight className="mb-2 text-copper-400" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-sage-300">Coût réel</p>
                    <p className="font-display text-4xl text-copper-400">{formatEuro(tarifs.exempleCredit.montant / 2)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-7">
              <h3 className="text-xl text-forest-900">Ce que le devis précise toujours</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-ink-700">
                {["Le prix ferme, net de taxe", "L'évacuation ou le broyage sur place", "Le reste à charge après crédit d'impôt", "La durée prévue et la tournée concernée"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-forest-700" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="card mt-6 overflow-hidden">
          <div className="border-b border-ink-900/8 px-7 py-5">
            <h2 className="text-2xl text-forest-900">Autres prestations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-[15px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-ink-500">
                  <th className="px-7 py-3 font-medium">Prestation</th>
                  <th className="px-4 py-3 text-right font-medium">Tarif indicatif</th>
                  <th className="px-7 py-3 text-right font-medium">Crédit d&apos;impôt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/8">
                {tarifs.autres.map((a) => (
                  <tr key={a.libelle} className="transition hover:bg-sage-100/50">
                    <td className="px-7 py-4 text-ink-700">{a.libelle}</td>
                    <td className="px-4 py-4 text-right font-semibold text-forest-900">{a.prix}</td>
                    <td className="px-7 py-4 text-right">
                      {a.creditImpot ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-copper-100 px-2.5 py-1 text-[13px] font-semibold text-copper-600">
                          <BadgePercent size={13} /> Oui, −50 %
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[13px] text-ink-300">
                          <Minus size={13} /> Non
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-forest-900 text-cream-50">
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="container-x relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <SectionHeading tone="light" eyebrow="Simulateur" title="Combien vous coûtera vraiment votre entretien ?" text="Faites glisser le curseur sur le montant estimé de votre facture d'entretien : le simulateur affiche le crédit d'impôt et votre coût réel." />
          <Reveal delay={100}>
            <CreditCalculator initial={tarifs.exempleCredit.montant} />
          </Reveal>
          <Link href="/credit-impot" className="inline-flex items-center gap-2 font-semibold text-copper-400 lg:col-span-2">
            Tout comprendre sur le crédit d&apos;impôt <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Faq items={faqTarifs} title="Vos questions sur les prix." />
      <CtaBand site={site} titre="Un prix ferme, mesuré sur place, sans frais." contexte="Devis gratuit" />
    </>
  );
}
