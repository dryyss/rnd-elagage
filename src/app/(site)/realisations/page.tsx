import type { Metadata } from "next";
import { getRealisations, getSite } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { RealisationsGallery } from "@/components/sections/RealisationsGallery";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Réalisations · Avant / après de nos chantiers de taille de haies et d'entretien",
  description:
    "Galerie avant / après de nos chantiers réels dans le Val-d'Oise et la Nièvre : taille de haies, débroussaillage, terrassement. Chaque photo est légendée et localisée.",
  alternates: { canonical: "/realisations" },
};

export default async function RealisationsPage({ searchParams }: PageProps<"/realisations">) {
  const [site, realisations, sp] = await Promise.all([getSite(), getRealisations(), searchParams]);
  const initial = typeof sp.prestation === "string" ? sp.prestation : undefined;
  return (
    <>
      <PageHero
        site={site}
        breadcrumb={[{ name: "Réalisations", path: "/realisations" }]}
        eyebrow="Réalisations"
        title="Nos chantiers, pas des photos de catalogue."
        intro="Chaque photo vient d'un chantier réel. La commune, la prestation, la longueur ou la surface et ce qui a été fait sont indiqués. Les avant / après parlent d'eux-mêmes."
      />
      <section className="container-x pb-20">
        <RealisationsGallery realisations={realisations} initialPrestation={initial} />
      </section>
      <CtaBand site={site} titre="Votre jardin pourrait être le prochain." contexte="Devis gratuit" />
    </>
  );
}
