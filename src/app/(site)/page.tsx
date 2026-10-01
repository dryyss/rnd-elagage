import type { Metadata } from "next";
import { getPlanning, getRealisations, getSite, getTarifs, getTemoignages } from "@/lib/content";
import { toISODate } from "@/lib/planning";
import { Hero } from "@/components/sections/Hero";
import { Reassurance } from "@/components/sections/Reassurance";
import { CreditImpot } from "@/components/sections/CreditImpot";
import { PrestationsGrid } from "@/components/sections/PrestationsGrid";
import { Territoires } from "@/components/sections/Territoires";
import { RealisationsPreview } from "@/components/sections/RealisationsPreview";
import { Etapes } from "@/components/sections/Etapes";
import { AProposTeaser } from "@/components/sections/AProposTeaser";
import { Temoignages } from "@/components/sections/Temoignages";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

// Regénération horaire : le statut « tournée en cours » dépend de la date du jour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "RND Élagage · Taille de haies et entretien extérieur · Val-d'Oise et Nièvre" },
  description:
    "Taille de haies, entretien de jardin, abattage et travaux extérieurs à Taverny, dans le Val-d'Oise et autour de Nevers. Devis gratuit sur place, évacuation comprise, 50 % de crédit d'impôt.",
  alternates: { canonical: "/" },
};

const faqAccueil = [
  {
    q: "Comment fonctionne le crédit d'impôt de 50 % ?",
    r: "La taille de haies, la tonte et l'entretien courant du jardin relèvent des services à la personne. Vous payez la facture, nous vous remettons une attestation fiscale en janvier, et 50 % du montant vous est restitué par l'administration fiscale, que vous soyez imposable ou non, dans la limite de 5 000 € de dépenses par an.",
  },
  {
    q: "Quand intervenez-vous dans ma commune ?",
    r: "Nous alternons entre le Val-d'Oise et la Nièvre par tournées d'environ six semaines. Saisissez votre code postal dans le module de planning pour connaître la tournée en cours ou la prochaine, et réservez votre créneau à l'avance.",
  },
  {
    q: "Le devis est-il vraiment gratuit ?",
    r: "Oui. Nous passons mesurer sur place sans frais ni engagement, et le devis écrit indique le prix ferme ainsi que le reste à charge après crédit d'impôt quand la prestation est éligible.",
  },
  {
    q: "Que deviennent les déchets verts ?",
    r: "Ils sont évacués le jour même en remorque vers une filière agréée, ou broyés sur place si vous souhaitez récupérer le paillage. L'évacuation est chiffrée dans chaque devis.",
  },
];

export default async function Accueil() {
  const [site, planning, tarifs, realisations, temoignages] = await Promise.all([getSite(), getPlanning(), getTarifs(), getRealisations(), getTemoignages()]);
  const today = toISODate(new Date());

  return (
    <>
      <Hero site={site} planning={planning} today={today} />
      <Reassurance />
      <PrestationsGrid />
      <CreditImpot exemple={tarifs.exempleCredit.montant} />
      <Territoires planning={planning} today={today} />
      <RealisationsPreview realisations={realisations} />
      <Etapes />
      <AProposTeaser site={site} />
      <Temoignages temoignages={temoignages} site={site} />
      <Faq items={faqAccueil} />
      <CtaBand site={site} />
    </>
  );
}
