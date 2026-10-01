import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default async function ConfidentialitePage() {
  const site = await getSite();
  return (
    <section className="container-x pb-20 pt-6 lg:pt-10">
      <Breadcrumb items={[{ name: "Politique de confidentialité", path: "/politique-de-confidentialite" }]} site={site} />
      <h1 className="mt-8 text-[clamp(2rem,4vw,3rem)] text-forest-900">Politique de confidentialité</h1>
      <div className="prose-rnd mt-8 max-w-3xl">
        <p>
          {site.nom} ({site.gerant}, {site.adresse.ville}) est responsable du traitement des données collectées sur ce site. Nous collectons le strict nécessaire pour répondre à vos demandes et mesurer l&apos;efficacité de notre communication.
        </p>

        <h2>Données collectées</h2>
        <ul>
          <li>
            <strong>Formulaire de devis :</strong> nom, téléphone, e-mail (facultatif), code postal et commune, description des travaux, créneau souhaité.
          </li>
          <li>
            <strong>Mesure d&apos;audience et conversions publicitaires :</strong> données de navigation et identifiants techniques, uniquement après votre consentement via le bandeau prévu à cet effet.
          </li>
        </ul>

        <h2>Finalités et base légale</h2>
        <ul>
          <li>Répondre à votre demande de devis et organiser l&apos;intervention — exécution de mesures précontractuelles.</li>
          <li>Mesurer l&apos;audience du site et la performance de nos campagnes — consentement.</li>
        </ul>

        <h2>Durée de conservation</h2>
        <ul>
          <li>Demandes commerciales : trois ans à compter du dernier contact.</li>
          <li>Traceurs de mesure d&apos;audience : treize mois maximum.</li>
        </ul>

        <h2>Destinataires et sous-traitants</h2>
        <p>
          Vos données sont destinées à {site.nom}. Elles transitent par nos prestataires techniques : hébergeur du site, service d&apos;envoi d&apos;e-mails transactionnels, outil de mesure d&apos;audience et régie publicitaire, qui agissent sur nos instructions. Certains de ces prestataires peuvent être situés hors de l&apos;Union européenne ; les transferts sont alors encadrés par les clauses contractuelles types de la Commission européenne.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données, ainsi que du droit de retirer votre consentement à tout moment. Pour l&apos;exercer, écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également introduire une réclamation auprès de la CNIL.
        </p>

        <h2>Cookies</h2>
        <p>
          Aucun traceur de mesure d&apos;audience ou publicitaire n&apos;est déposé avant votre accord. Vous pouvez modifier votre choix à tout moment en effaçant les données de ce site dans votre navigateur. Le site utilise par ailleurs un stockage local strictement nécessaire pour mémoriser votre choix.
        </p>
      </div>
    </section>
  );
}
