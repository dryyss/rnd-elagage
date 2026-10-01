import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CreditCalculator } from "./CreditCalculator";
import { Reveal } from "@/components/ui/Reveal";

export function CreditImpot({ exemple }: { exemple: number }) {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-cream-50">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="halo-forest pointer-events-none absolute -right-60 -top-60 h-[880px] w-[880px]" />
      <div className="container-x relative grid gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <p className="eyebrow text-copper-400">Services à la personne</p>
          <div className="mt-6 flex items-end gap-4">
            <span className="font-display text-[clamp(5rem,12vw,9rem)] leading-[0.85] text-cream-50" style={{ fontVariationSettings: '"opsz" 144' }}>
              50
            </span>
            <span className="pb-2 font-display text-[clamp(2rem,4vw,3rem)] leading-none text-copper-400">%</span>
          </div>
          <h2 className="mt-6 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.08]">La moitié du prix vous revient.</h2>
          <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-sage-200">
            La taille de haies, la tonte et l&apos;entretien de jardin font partie des services à la personne. Vous réglez la facture, vous recevez une attestation fiscale en janvier, et 50 % du montant vous est rendu par crédit d&apos;impôt — que vous soyez imposable ou non.
          </p>
          <ul className="mt-7 space-y-3 text-[15px]">
            {[
              "Attestation fiscale annuelle fournie par nos soins",
              "Jusqu'à 5 000 € de dépenses par an, soit 2 500 € de crédit",
              "Valable pour les propriétaires comme pour les locataires",
              "Abattage, dessouchage et terrassement : non éligibles, nous vous le précisons sur chaque devis",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-copper-400" /> {t}
              </li>
            ))}
          </ul>
          <Link href="/credit-impot" className="mt-8 inline-flex items-center gap-2 font-semibold text-copper-400 hover:text-copper-100">
            Comment ça marche, en détail <ArrowRight size={16} />
          </Link>
        </Reveal>
        <Reveal delay={120} className="lg:pt-10">
          <CreditCalculator initial={exemple} />
        </Reveal>
      </div>
    </section>
  );
}
