"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Planning, Tournee, ZoneId } from "@/lib/types";
import { sortTournees, toISODate } from "@/lib/planning";
import { AddButton, Card, Field, RemoveButton, SaveForm, inputCls, textareaCls } from "../ui";

export function PlanningEditor({ initial }: { initial: Planning }) {
  const [value, setValue] = useState<Planning>(initial);
  const today = toISODate(new Date());

  const setTournee = (i: number, patch: Partial<Tournee>) => setValue((v) => ({ ...v, tournees: v.tournees.map((t, k) => (k === i ? { ...t, ...patch } : t)) }));

  const addTournee = () => {
    const last = sortTournees(value.tournees).at(-1);
    const start = last ? addDays(last.fin, 2) : today;
    const zone: ZoneId = last ? (last.zone === "val-doise" ? "nievre" : "val-doise") : "val-doise";
    setValue((v) => ({ ...v, tournees: [...v.tournees, { zone, debut: start, fin: addDays(start, 41) }] }));
  };

  const tournees = value.tournees.map((t, i) => ({ t, i })).sort((a, b) => a.t.debut.localeCompare(b.t.debut));

  return (
    <SaveForm contentKey="planning" value={value} title="Planning des tournées" intro="Le site affiche automatiquement la tournée en cours et la prochaine, et oriente les visiteurs selon leur code postal. Ajoutez les tournées au fur et à mesure ; les tournées passées peuvent être supprimées.">
      <Card
        title="Tournées"
        actions={
          <AddButton onClick={addTournee}>
            <Plus size={14} /> Ajouter une tournée
          </AddButton>
        }
      >
        <div className="space-y-3">
          {tournees.map(({ t, i }) => {
            const passee = t.fin < today;
            const enCours = t.debut <= today && today <= t.fin;
            return (
              <div key={i} className={`grid gap-3 rounded-xl border p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end ${enCours ? "border-forest-700 bg-sage-100/60" : passee ? "border-ink-900/8 opacity-60" : "border-ink-900/8"}`}>
                <Field label="Zone">
                  <select value={t.zone} onChange={(e) => setTournee(i, { zone: e.target.value as ZoneId })} className={inputCls}>
                    {value.zones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.nom}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Début">
                  <input type="date" value={t.debut} onChange={(e) => setTournee(i, { debut: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Fin">
                  <input type="date" value={t.fin} min={t.debut} onChange={(e) => setTournee(i, { fin: e.target.value })} className={inputCls} />
                </Field>
                <div className="flex items-center gap-3 pb-0.5">
                  {enCours && <span className="rounded-full bg-forest-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream-50">En cours</span>}
                  {passee && <span className="text-[12px] text-ink-500">Passée</span>}
                  <RemoveButton onClick={() => setValue((v) => ({ ...v, tournees: v.tournees.filter((_, k) => k !== i) }))} label="Supprimer la tournée" iconOnly />
                </div>
              </div>
            );
          })}
          {tournees.length === 0 && <p className="text-[14px] text-ink-500">Aucune tournée. Ajoutez-en une pour que le module planning s&apos;affiche.</p>}
        </div>
      </Card>

      <Card title="Zones">
        <div className="grid gap-4 lg:grid-cols-2">
          {value.zones.map((z, i) => (
            <div key={z.id} className="space-y-3 rounded-xl border border-ink-900/8 p-4">
              <p className="font-display text-lg text-forest-900">{z.nom}</p>
              <Field label="Départements couverts" hint="Numéros à deux chiffres, séparés par des virgules (ex. 95, 93)">
                <input
                  value={z.departements.join(", ")}
                  onChange={(e) => {
                    const deps = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                    setValue((v) => ({ ...v, zones: v.zones.map((zz, k) => (k === i ? { ...zz, departements: deps } : zz)) }));
                  }}
                  className={inputCls}
                />
              </Field>
              <Field label="Description affichée">
                <textarea rows={2} value={z.description} onChange={(e) => setValue((v) => ({ ...v, zones: v.zones.map((zz, k) => (k === i ? { ...zz, description: e.target.value } : zz)) }))} className={textareaCls} />
              </Field>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Message hors zone">
        <Field label="Affiché quand le code postal saisi n'est dans aucune zone">
          <textarea rows={2} value={value.messageHorsZone} onChange={(e) => setValue((v) => ({ ...v, messageHorsZone: e.target.value }))} className={textareaCls} />
        </Field>
      </Card>
    </SaveForm>
  );
}

function addDays(iso: string, n: number) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
