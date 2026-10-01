"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Tarifs } from "@/lib/types";
import { AddButton, Card, Field, RemoveButton, SaveForm, Toggle, inputCls, textareaCls } from "../ui";

export function TarifsEditor({ initial }: { initial: Tarifs }) {
  const [value, setValue] = useState<Tarifs>(initial);
  const num = (s: string) => (s === "" ? 0 : Number(s.replace(",", ".")));

  return (
    <SaveForm contentKey="tarifs" value={value} title="Tarifs" intro="Montants nets de taxe. Le reste à charge après crédit d'impôt est calculé automatiquement sur le site pour les lignes marquées éligibles.">
      <Card title="Taille de haies (au mètre linéaire)">
        <div className="space-y-3">
          {value.haies.lignes.map((l, i) => (
            <div key={i} className="grid gap-3 rounded-xl border border-ink-900/8 p-4 sm:grid-cols-[1.5fr_0.7fr_auto_auto] sm:items-end">
              <Field label="Libellé">
                <input value={l.libelle} onChange={(e) => setValue((v) => ({ ...v, haies: { ...v.haies, lignes: v.haies.lignes.map((x, k) => (k === i ? { ...x, libelle: e.target.value } : x)) } }))} className={inputCls} />
              </Field>
              <Field label="Prix € / ml">
                <input type="number" step="0.5" min="0" value={l.prix} onChange={(e) => setValue((v) => ({ ...v, haies: { ...v.haies, lignes: v.haies.lignes.map((x, k) => (k === i ? { ...x, prix: num(e.target.value) } : x)) } }))} className={inputCls} />
              </Field>
              <div className="pb-2">
                <Toggle checked={l.creditImpot} onChange={(c) => setValue((v) => ({ ...v, haies: { ...v.haies, lignes: v.haies.lignes.map((x, k) => (k === i ? { ...x, creditImpot: c } : x)) } }))} label="Crédit d'impôt" />
              </div>
              <div className="pb-1">
                <RemoveButton label="Supprimer la ligne" iconOnly onClick={() => setValue((v) => ({ ...v, haies: { ...v.haies, lignes: v.haies.lignes.filter((_, k) => k !== i) } }))} />
              </div>
            </div>
          ))}
          <AddButton onClick={() => setValue((v) => ({ ...v, haies: { ...v.haies, lignes: [...v.haies.lignes, { libelle: "", prix: 0, creditImpot: true }] } }))}>
            <Plus size={14} /> Ajouter une ligne
          </AddButton>
        </div>
        <div className="mt-5 grid gap-3 border-t border-ink-900/8 pt-5 sm:grid-cols-3">
          <Field label="Évacuation : libellé">
            <input value={value.haies.evacuation.libelle} onChange={(e) => setValue((v) => ({ ...v, haies: { ...v.haies, evacuation: { ...v.haies.evacuation, libelle: e.target.value } } }))} className={inputCls} />
          </Field>
          <Field label="Évacuation : prix € / ml">
            <input type="number" step="0.5" min="0" value={value.haies.evacuation.prix} onChange={(e) => setValue((v) => ({ ...v, haies: { ...v.haies, evacuation: { ...v.haies.evacuation, prix: num(e.target.value) } } }))} className={inputCls} />
          </Field>
          <Field label="Minimum de facturation €">
            <input type="number" step="10" min="0" value={value.minimumFacturation} onChange={(e) => setValue((v) => ({ ...v, minimumFacturation: num(e.target.value) }))} className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card title="Autres prestations">
        <div className="space-y-3">
          {value.autres.map((a, i) => (
            <div key={i} className="grid gap-3 rounded-xl border border-ink-900/8 p-4 sm:grid-cols-[1.5fr_1fr_auto_auto] sm:items-end">
              <Field label="Prestation">
                <input value={a.libelle} onChange={(e) => setValue((v) => ({ ...v, autres: v.autres.map((x, k) => (k === i ? { ...x, libelle: e.target.value } : x)) }))} className={inputCls} />
              </Field>
              <Field label="Tarif affiché" hint="Texte libre : « 0,80 € / m² », « Sur devis »…">
                <input value={a.prix} onChange={(e) => setValue((v) => ({ ...v, autres: v.autres.map((x, k) => (k === i ? { ...x, prix: e.target.value } : x)) }))} className={inputCls} />
              </Field>
              <div className="pb-6">
                <Toggle checked={a.creditImpot} onChange={(c) => setValue((v) => ({ ...v, autres: v.autres.map((x, k) => (k === i ? { ...x, creditImpot: c } : x)) }))} label="Crédit d'impôt" />
              </div>
              <div className="pb-5">
                <RemoveButton label="Supprimer la ligne" iconOnly onClick={() => setValue((v) => ({ ...v, autres: v.autres.filter((_, k) => k !== i) }))} />
              </div>
            </div>
          ))}
          <AddButton onClick={() => setValue((v) => ({ ...v, autres: [...v.autres, { libelle: "", prix: "Sur devis", creditImpot: false }] }))}>
            <Plus size={14} /> Ajouter une prestation
          </AddButton>
        </div>
      </Card>

      <Card title="Exemple et avertissement">
        <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
          <Field label="Exemple affiché (crédit d'impôt)">
            <input value={value.exempleCredit.libelle} onChange={(e) => setValue((v) => ({ ...v, exempleCredit: { ...v.exempleCredit, libelle: e.target.value } }))} className={inputCls} />
          </Field>
          <Field label="Montant de l'exemple €">
            <input type="number" step="10" min="1" value={value.exempleCredit.montant} onChange={(e) => setValue((v) => ({ ...v, exempleCredit: { ...v.exempleCredit, montant: num(e.target.value) } }))} className={inputCls} />
          </Field>
        </div>
        <Field label="Avertissement sous les tableaux" className="mt-4">
          <textarea rows={2} value={value.avertissement} onChange={(e) => setValue((v) => ({ ...v, avertissement: e.target.value }))} className={textareaCls} />
        </Field>
      </Card>
    </SaveForm>
  );
}
