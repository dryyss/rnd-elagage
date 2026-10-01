import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { getSite, getTarifs } from "@/lib/content";
import { prestations } from "@/data/prestations";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CreditCalculator } from "@/components/sections/CreditCalculator";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Crédit d'impôt 50 % sur la taille de haies et l'entretien de jardin",
  description:
    "Comment fonctionne le crédit d'impôt de 50 % sur les petits travaux de jardinage : prestations éligibles, plafond, attestation fiscale, exemples chiffrés. Val-d'Oise et Nièvre.",
  alternates: { canonical: "/credit-impot" },
};

const etapes = [
  { t: "Vous réglez la facture", d: "Par virement, chèque ou CESU préfinancé. La facture mentionne la prestation, la date et notre numéro de déclaration services à la personne." },
  { t: "Nous vous remettons l'attestation fiscale", d: "Chaque année en janvier, pour l'ensemble des prestations éligibles payées l'année précédente." },
  { t: "Vous reportez le montant sur votre déclaration", d: "Case 7DB « emploi à domicile ». Le montant est en général prérempli si vous avez déclaré via l'avance immédiate." },
  { t: "L'administration vous rembourse 50 %", d: "Par crédit d'impôt : si vous n'êtes pas imposable ou si le crédit dépasse votre impôt, la différence vous est versée." },
];

const faq = [
  { q: "Suis-je concerné si je ne paie pas d'impôt ?", r: "Oui. Il s'agit d'un crédit d'impôt et non d'une réduction : si vous n'êtes pas imposable, l'administration vous verse directement le montant du crédit." },
  { q: "Quel est le plafond ?", r: "Les petits travaux de jardinage sont plafonnés à 5 000 € de dépenses par an et par foyer fiscal, soit 2 500 € de crédit d'impôt maximum. Ce plafond s'inscrit dans le plafond global des services à la personne (12 000 € par an, majorable)." },
  { q: "Locataire, puis-je en bénéficier ?", r: "Oui, dès lors que les travaux concernent votre résidence principale ou secondaire et que vous payez la facture." },
  { q: "L'abattage est-il éligible ?", r: "Non. L'abattage, le dessouchage, l'élagage de grands arbres, le terrassement et la création de jardin ne font pas partie des petits travaux de jardinage. Nous distinguons toujours clairement les deux sur le devis et la facture." },
  { q: "Qu'est-ce que l'avance immédiate ?", r: "Un service de l'Urssaf qui vous permet de ne payer que 50 % de la facture, l'État versant directement l'autre moitié au prestataire. Nous vous indiquons si nous le proposons au moment du devis." },
];

export default async function CreditImpotPage() {
  const [site, tarifs] = await Promise.all([getSite(), getTarifs()]);
  const eligibles = prestations.filter((p) => p.creditImpot);
  const nonEligibles = prestations.filter((p) => !p.creditImpot);

  return (
    <>
      <PageHero
        site={site}
        tone="light"
        breadcrumb={[{ name: "Crédit d'impôt", path: "/credit-impot" }]}
        eyebrow="Services à la personne"
        title={
          <>
            Le crédit d&apos;impôt de 50 %, <span className="italic text-copper-400">expliqué simplement.</span>
          </>
        }
        intro="La taille de haies et l'entretien courant du jardin relèvent des services à la personne. Résultat : la moitié de ce que vous payez vous revient, que vous soyez imposable ou non. Voici comment ça marche, ce qui est éligible et ce qui ne l'est pas."
      >
        <CreditCalculator initial={tarifs.exempleCredit.montant} />
      </PageHero>

      <section className="container-x py-16 lg:py-24">
        <SectionHeading eyebrow="Le parcours" title="Quatre étapes, aucun dossier à monter." />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {etapes.map((e, i) => (
            <Reveal key={e.t} delay={i * 90} as="li">
              <div className="card h-full p-6">
                <span className="font-display text-4xl text-copper-500">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg text-forest-900">{e.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{e.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-cream-200/60 py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Éligibilité" title="Ce qui ouvre droit au crédit, et ce qui n'y ouvre pas." text="La règle est simple : l'entretien courant du jardin oui, les travaux et la création non. Nous le précisons sur chaque ligne de devis." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="card p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 text-cream-50">
                  <Check size={18} />
                </span>
                <h3 className="text-xl text-forest-900">Éligible à 50 %</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {eligibles.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/prestations/${p.slug}`} className="flex items-center justify-between gap-4 rounded-xl bg-sage-100 px-4 py-3 text-[15px] font-medium text-forest-900 transition hover:bg-sage-200">
                      {p.nom} <ArrowRight size={16} className="shrink-0 text-copper-600" />
                    </Link>
                  </li>
                ))}
                <li className="rounded-xl bg-sage-100 px-4 py-3 text-[15px] font-medium text-forest-900">Tonte, scarification, désherbage, nettoyage de massifs</li>
              </ul>
            </Reveal>
            <Reveal delay={100} className="card p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-ink-500">
                  <X size={18} />
                </span>
                <h3 className="text-xl text-forest-900">Non éligible</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {nonEligibles.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/prestations/${p.slug}`} className="flex items-center justify-between gap-4 rounded-xl bg-cream-200/70 px-4 py-3 text-[15px] font-medium text-ink-700 transition hover:bg-cream-200">
                      {p.nom} <ArrowRight size={16} className="shrink-0 text-ink-300" />
                    </Link>
                  </li>
                ))}
                <li className="rounded-xl bg-cream-200/70 px-4 py-3 text-[15px] font-medium text-ink-700">Élagage de grands arbres, plantation, création paysagère</li>
              </ul>
              <p className="mt-5 text-[13px] leading-relaxed text-ink-500">Ces prestations restent bien sûr possibles : elles sont simplement facturées sans l&apos;avantage fiscal, sur une ligne distincte.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq items={faq} title="Vos questions sur le crédit d'impôt." />
      <CtaBand site={site} titre="Un devis qui affiche votre reste à charge." contexte="Devis gratuit" />
    </>
  );
}
