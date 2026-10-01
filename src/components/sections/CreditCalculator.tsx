"use client";

import { useState } from "react";
import { formatEuro } from "@/lib/utils";

const PLAFOND_DEPENSES = 5000; // petits travaux de jardinage, par an et par foyer

export function CreditCalculator({ initial = 440 }: { initial?: number }) {
  const [montant, setMontant] = useState(initial);
  const eligible = Math.min(montant, PLAFOND_DEPENSES);
  const credit = Math.round(eligible * 0.5);
  const reste = montant - credit;

  return (
    <div className="rounded-[1.5rem] border border-cream-50/10 bg-cream-50/5 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor="montant" className="text-sm font-medium text-sage-200">
          Montant de la facture d&apos;entretien
        </label>
        <output className="font-display text-2xl text-cream-50" htmlFor="montant">
          {formatEuro(montant)}
        </output>
      </div>
      <input
        id="montant"
        type="range"
        min={150}
        max={3000}
        step={10}
        value={montant}
        onChange={(e) => setMontant(Number(e.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-cream-50/15 accent-copper-500"
        aria-valuetext={formatEuro(montant)}
      />
      <div className="mt-2 flex justify-between text-[11px] uppercase tracking-wider text-sage-300">
        <span>150 €</span>
        <span>3 000 €</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-cream-50/5 p-4">
          <p className="text-xs uppercase tracking-wider text-sage-300">Crédit d&apos;impôt</p>
          <p className="mt-1 font-display text-3xl text-sage-200">− {formatEuro(credit)}</p>
        </div>
        <div className="rounded-2xl bg-copper-500 p-4 text-cream-50 shadow-[0_12px_32px_-12px_rgb(185_98_46/0.8)]">
          <p className="text-xs uppercase tracking-wider text-cream-50/80">Coût réel pour vous</p>
          <p className="mt-1 font-display text-3xl">{formatEuro(reste)}</p>
        </div>
      </div>
      <p className="mt-5 text-[13px] leading-relaxed text-sage-300">
        Calcul sur la base de 50 % des dépenses d&apos;entretien de jardin, plafonnées à {formatEuro(PLAFOND_DEPENSES)} par an et par foyer. Le crédit est versé par l&apos;administration fiscale, que vous soyez imposable ou non.
      </p>
    </div>
  );
}
