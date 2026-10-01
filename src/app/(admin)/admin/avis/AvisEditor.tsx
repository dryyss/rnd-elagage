"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Temoignage } from "@/lib/types";
import { AddButton, Card, Field, RemoveButton, SaveForm, inputCls, textareaCls } from "../ui";

export function AvisEditor({ initial }: { initial: Temoignage[] }) {
  const [items, setItems] = useState<Temoignage[]>(initial);
  const update = (i: number, patch: Partial<Temoignage>) => setItems((arr) => arr.map((t, k) => (k === i ? { ...t, ...patch } : t)));

  return (
    <SaveForm contentKey="temoignages" value={items} title="Avis clients" intro="Recopiez ici les avis publiés sur Google, tels quels, avec le prénom et la commune. Tant qu'il n'y a aucun avis, le site affiche un état d'attente honnête plutôt que des témoignages inventés.">
      <div className="flex justify-end">
        <AddButton onClick={() => setItems((arr) => [{ prenom: "", commune: "", note: 5, texte: "", date: new Date().toISOString().slice(0, 10), source: "Google" }, ...arr])}>
          <Plus size={14} /> Ajouter un avis
        </AddButton>
      </div>
      <div className="space-y-3">
        {items.map((t, i) => (
          <Card key={i}>
            <div className="grid gap-3 sm:grid-cols-4">
              <Field label="Prénom">
                <input value={t.prenom} onChange={(e) => update(i, { prenom: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Commune">
                <input value={t.commune} onChange={(e) => update(i, { commune: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Note (1 à 5)">
                <input type="number" min={1} max={5} value={t.note} onChange={(e) => update(i, { note: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Date">
                <input type="date" value={t.date} onChange={(e) => update(i, { date: e.target.value })} className={inputCls} />
              </Field>
              <div className="sm:col-span-4">
                <Field label="Texte de l'avis">
                  <textarea rows={3} value={t.texte} onChange={(e) => update(i, { texte: e.target.value })} className={textareaCls} />
                </Field>
              </div>
              <div className="flex items-end justify-between sm:col-span-4">
                <Field label="Source">
                  <input value={t.source ?? ""} onChange={(e) => update(i, { source: e.target.value })} className={inputCls} placeholder="Google" />
                </Field>
                <RemoveButton onClick={() => setItems((arr) => arr.filter((_, k) => k !== i))} />
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="rounded-xl border border-dashed border-ink-900/15 p-6 text-center text-[14px] text-ink-500">Aucun avis pour le moment.</p>}
      </div>
    </SaveForm>
  );
}
