import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default async function MentionsLegalesPage() {
  const site = await getSite();
  return (
    <section className="container-x pb-20 pt-6 lg:pt-10">
      <Breadcrumb items={[{ name: "Mentions légales", path: "/mentions-legales" }]} site={site} />
      <h1 className="mt-8 text-[clamp(2rem,4vw,3rem)] text-forest-900">Mentions légales</h1>
      <div className="prose-rnd mt-8 max-w-3xl">
        <h2>Éditeur du site</h2>
        <p>
          {site.nom} — {site.gerant}, entrepreneur individuel.
          <br />
          {site.adresse.rue}, {site.adresse.codePostal} {site.adresse.ville}
          <br />
          Téléphone : {site.telephone} · E-mail : {site.email}
          <br />
          SIRET : {site.siret}
          <br />
          TVA : non applicable, article 293 B du Code général des impôts.
        </p>
        <p>
          <strong>Assurance :</strong> {site.assuranceRcPro} souscrite auprès de [compagnie, n° de contrat, couverture géographique : France].
        </p>
        <p>
          <strong>Services à la personne :</strong> déclaration enregistrée sous le numéro [SAP + SIREN] auprès de la DDETS du Val-d&apos;Oise, ou adhésion à l&apos;organisme mandataire [nom]. Les prestations éligibles ouvrent droit au crédit d&apos;impôt prévu à l&apos;article 199 sexdecies du Code général des impôts.
        </p>

        <h2>Directeur de la publication</h2>
        <p>{site.gerant}.</p>

        <h2>Conception et réalisation</h2>
        <p>
          Magar Développement — M. Andrys Magar, auto-entrepreneur, SIRET 908 058 092 00028, Garges-lès-Gonesse. <a href="https://magar-developpement.fr">magar-developpement.fr</a>
        </p>

        <h2>Hébergement</h2>
        <p>[Nom de l&apos;hébergeur, raison sociale, adresse, téléphone] — à compléter lors de la mise en ligne.</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus de ce site (textes, photographies de chantiers, logo, charte graphique) est la propriété de {site.nom} ou fait l&apos;objet d&apos;une autorisation d&apos;utilisation. Toute reproduction, même partielle, est interdite sans accord écrit préalable.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Les informations collectées via le formulaire de demande de devis sont traitées conformément à notre <a href="/politique-de-confidentialite">politique de confidentialité</a>.
        </p>

        <h2>Médiation de la consommation</h2>
        <p>Conformément à l&apos;article L612-1 du Code de la consommation, le consommateur peut recourir gratuitement au médiateur suivant : [nom et coordonnées du médiateur] — à compléter.</p>
      </div>
    </section>
  );
}
