import type { SiteConfig } from "./types";
import type { Prestation } from "@/data/prestations";
import type { Commune } from "@/data/communes";

export function localBusinessJsonLd(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${site.urlSite}/#organisation`,
    name: site.nom,
    url: site.urlSite,
    logo: `${site.urlSite}/logo-rnd.png`,
    image: `${site.urlSite}/opengraph-image`,
    telephone: site.telephone,
    email: site.email,
    founder: { "@type": "Person", name: site.gerant },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adresse.rue,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Val-d'Oise" },
      { "@type": "AdministrativeArea", name: "Nièvre" },
    ],
    priceRange: "€€",
    openingHours: "Mo-Sa 08:00-19:00",
    knowsAbout: ["Taille de haies", "Entretien de jardin", "Débroussaillage", "Abattage", "Engazonnement", "Terrassement paysager"],
  };
}

export function serviceJsonLd(site: SiteConfig, p: Prestation) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.nom,
    description: p.seoDescription,
    serviceType: p.nom,
    url: `${site.urlSite}/prestations/${p.slug}`,
    provider: { "@id": `${site.urlSite}/#organisation` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Val-d'Oise" },
      { "@type": "AdministrativeArea", name: "Nièvre" },
    ],
  };
}

export function faqJsonLd(faq: { q: string; r: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };
}

export function breadcrumbJsonLd(site: SiteConfig, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.urlSite}${it.path}`,
    })),
  };
}

export function communeJsonLd(site: SiteConfig, c: Commune) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Taille de haies et entretien de jardin à ${c.nom}`,
    url: `${site.urlSite}/zones/${c.slug}`,
    provider: { "@id": `${site.urlSite}/#organisation` },
    areaServed: {
      "@type": "City",
      name: c.nom,
      postalCode: c.codePostal,
      geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    },
  };
}
