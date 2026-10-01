"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Star } from "lucide-react";
import type { Realisation, ZoneId } from "@/lib/types";
import { prestations } from "@/data/prestations";
import { communes } from "@/data/communes";
import { AddButton, Card, Field, ImageUpload, RemoveButton, SaveForm, Toggle, inputCls, textareaCls } from "../ui";

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function RealisationsEditor({ initial }: { initial: Realisation[] }) {
  const [items, setItems] = useState<Realisation[]>(initial);
  const [open, setOpen] = useState<string | null>(null);

  const update = (i: number, patch: Partial<Realisation>) => setItems((arr) => arr.map((r, k) => (k === i ? { ...r, ...patch } : r)));
  const move = (i: number, dir: -1 | 1) =>
    setItems((arr) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      const copy = [...arr];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  const add = () => {
    const now = new Date();
    const r: Realisation = {
      slug: `chantier-${Date.now().toString(36)}`,
      titre: "",
      prestation: "taille-de-haies",
      commune: "",
      zone: "val-doise",
      date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
      type: "avant-apres",
      image: "",
      details: "",
      description: "",
      miseEnAvant: false,
    };
    setItems((arr) => [r, ...arr]);
    setOpen(r.slug);
  };

  return (
    <SaveForm contentKey="realisations" value={items} title="Réalisations" intro="Chaque chantier apparaît dans la galerie, sur la page de sa prestation et sur la page de sa commune. Les chantiers « mis en avant » (4 maximum conseillés) s'affichent en page d'accueil.">
      <div className="flex justify-end">
        <AddButton onClick={add}>
          <Plus size={14} /> Ajouter un chantier
        </AddButton>
      </div>
      <div className="space-y-3">
        {items.map((r, i) => {
          const isOpen = open === r.slug;
          return (
            <Card key={r.slug + i}>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setOpen(isOpen ? null : r.slug)} className="flex min-w-0 flex-1 items-center gap-3 text-left" aria-expanded={isOpen}>
                  <span className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-sage-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {r.image && <img src={r.image} alt="" className="h-full w-full object-cover" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-forest-900">{r.titre || "Nouveau chantier"}</span>
                    <span className="block text-[13px] text-ink-500">
                      {r.commune || "—"} · {prestations.find((p) => p.slug === r.prestation)?.nomCourt ?? r.prestation} · {r.date}
                    </span>
                  </span>
                  {r.miseEnAvant && <Star size={16} className="shrink-0 text-copper-500" fill="currentColor" />}
                  {isOpen ? <ChevronUp size={18} className="text-ink-300" /> : <ChevronDown size={18} className="text-ink-300" />}
                </button>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => move(i, -1)} className="h-9 w-9 rounded-full border border-ink-900/15 text-ink-500 hover:text-forest-900" aria-label="Monter">
                    ↑
                  </button>
                  <button type="button" onClick={() => move(i, 1)} className="h-9 w-9 rounded-full border border-ink-900/15 text-ink-500 hover:text-forest-900" aria-label="Descendre">
                    ↓
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="mt-5 grid gap-4 border-t border-ink-900/8 pt-5 lg:grid-cols-2">
                  <div className="lg:col-span-2">
                    <Field label="Photo" hint="Pour un avant/après, utilisez une image qui contient les deux vues (côte à côte ou l'une au-dessus de l'autre).">
                      <ImageUpload value={r.image} onChange={(url) => update(i, { image: url })} />
                    </Field>
                  </div>
                  <Field label="Titre">
                    <input
                      value={r.titre}
                      onChange={(e) => update(i, { titre: e.target.value, slug: r.slug.startsWith("chantier-") || r.slug === slugify(r.titre) ? slugify(e.target.value) || r.slug : r.slug })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Type">
                    <select value={r.type} onChange={(e) => update(i, { type: e.target.value as Realisation["type"] })} className={inputCls}>
                      <option value="avant-apres">Avant / après</option>
                      <option value="photo">Photo de chantier</option>
                    </select>
                  </Field>
                  <Field label="Prestation">
                    <select value={r.prestation} onChange={(e) => update(i, { prestation: e.target.value })} className={inputCls}>
                      {prestations.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.nom}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Mois du chantier">
                    <input type="month" value={r.date} onChange={(e) => update(i, { date: e.target.value })} className={inputCls} />
                  </Field>
                  <Field label="Commune" hint="Tapez librement, ou choisissez une commune du site pour l'y rattacher.">
                    <input list={`communes-${i}`} value={r.commune} onChange={(e) => {
                      const c = communes.find((x) => x.nom === e.target.value);
                      update(i, { commune: e.target.value, ...(c ? { zone: c.zone } : {}) });
                    }} className={inputCls} />
                    <datalist id={`communes-${i}`}>
                      {communes.map((c) => (
                        <option key={c.slug} value={c.nom} />
                      ))}
                    </datalist>
                  </Field>
                  <Field label="Zone">
                    <select value={r.zone} onChange={(e) => update(i, { zone: e.target.value as ZoneId })} className={inputCls}>
                      <option value="val-doise">Val-d&apos;Oise</option>
                      <option value="nievre">Nièvre</option>
                    </select>
                  </Field>
                  <Field label="Détails courts" hint="Ex. « 35 ml · hauteur 2,20 m · 1 journée »">
                    <input value={r.details} onChange={(e) => update(i, { details: e.target.value })} className={inputCls} />
                  </Field>
                  <Field label="Slug (adresse)" hint="Généré automatiquement depuis le titre.">
                    <input value={r.slug} onChange={(e) => update(i, { slug: slugify(e.target.value) })} className={inputCls} />
                  </Field>
                  <div className="lg:col-span-2">
                    <Field label="Description">
                      <textarea rows={3} value={r.description} onChange={(e) => update(i, { description: e.target.value })} className={textareaCls} />
                    </Field>
                  </div>
                  <div className="flex items-center justify-between lg:col-span-2">
                    <Toggle checked={r.miseEnAvant} onChange={(v) => update(i, { miseEnAvant: v })} label="Mettre en avant sur la page d'accueil" />
                    <RemoveButton onClick={() => setItems((arr) => arr.filter((_, k) => k !== i))} />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </SaveForm>
  );
}
