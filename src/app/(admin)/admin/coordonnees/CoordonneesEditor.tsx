"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/types";
import { Card, Field, SaveForm, Toggle, inputCls, textareaCls } from "../ui";

export function CoordonneesEditor({ initial }: { initial: SiteConfig }) {
  const [v, setV] = useState<SiteConfig>(initial);
  const set = <K extends keyof SiteConfig>(k: K, val: SiteConfig[K]) => setV((s) => ({ ...s, [k]: val }));

  return (
    <SaveForm contentKey="site" value={v} title="Coordonnées et informations" intro="Ces informations apparaissent dans l'en-tête, le pied de page, la page contact, les mentions légales et les données structurées pour Google.">
      <Card title="Entreprise">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom commercial">
            <input value={v.nom} onChange={(e) => set("nom", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Gérant">
            <input value={v.gerant} onChange={(e) => set("gerant", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Téléphone affiché" hint="Format 06 00 00 00 00">
            <input value={v.telephone} onChange={(e) => set("telephone", e.target.value)} className={inputCls} />
          </Field>
          <Field label="E-mail de contact" hint="Reçoit aussi les demandes de devis si DEVIS_TO_EMAIL n'est pas défini.">
            <input type="email" value={v.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
          </Field>
          <Field label="SIRET">
            <input value={v.siret} onChange={(e) => set("siret", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Horaires">
            <input value={v.horaires} onChange={(e) => set("horaires", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Délai de réponse affiché">
            <input value={v.delaiReponse} onChange={(e) => set("delaiReponse", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Mention assurance">
            <input value={v.assuranceRcPro} onChange={(e) => set("assuranceRcPro", e.target.value)} className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card title="Adresse">
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1.5fr]">
          <Field label="Rue">
            <input value={v.adresse.rue} onChange={(e) => set("adresse", { ...v.adresse, rue: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Code postal">
            <input value={v.adresse.codePostal} onChange={(e) => set("adresse", { ...v.adresse, codePostal: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Ville">
            <input value={v.adresse.ville} onChange={(e) => set("adresse", { ...v.adresse, ville: e.target.value })} className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card title="Services à la personne">
        <Toggle checked={v.servicesPersonne.actif} onChange={(c) => set("servicesPersonne", { ...v.servicesPersonne, actif: c })} label="Déclaration services à la personne active" />
        <Field label="Mention" className="mt-4">
          <textarea rows={2} value={v.servicesPersonne.mention} onChange={(e) => set("servicesPersonne", { ...v.servicesPersonne, mention: e.target.value })} className={textareaCls} />
        </Field>
      </Card>

      <Card title="Fiches Google et réseaux">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Fiche Google · Val-d'Oise (URL)">
            <input value={v.googleBusiness.valDoise} onChange={(e) => set("googleBusiness", { ...v.googleBusiness, valDoise: e.target.value })} className={inputCls} placeholder="https://g.page/…" />
          </Field>
          <Field label="Fiche Google · Nièvre (URL)">
            <input value={v.googleBusiness.nievre} onChange={(e) => set("googleBusiness", { ...v.googleBusiness, nievre: e.target.value })} className={inputCls} placeholder="https://g.page/…" />
          </Field>
          <Field label="Instagram (URL)">
            <input value={v.reseaux.instagram} onChange={(e) => set("reseaux", { ...v.reseaux, instagram: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Facebook (URL)">
            <input value={v.reseaux.facebook} onChange={(e) => set("reseaux", { ...v.reseaux, facebook: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Adresse du site (URL publique)" hint="Utilisée pour le sitemap et les données structurées.">
            <input value={v.urlSite} onChange={(e) => set("urlSite", e.target.value)} className={inputCls} />
          </Field>
        </div>
      </Card>
    </SaveForm>
  );
}
