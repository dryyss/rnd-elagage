import type { MetadataRoute } from "next";
import { getSite } from "@/lib/content";
import { prestations } from "@/data/prestations";
import { communes } from "@/data/communes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const base = site.urlSite.replace(/\/$/, "");
  const now = new Date();

  const statiques: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/credit-impot`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tarifs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/realisations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/zones`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const pres: MetadataRoute.Sitemap = prestations.map((p) => ({
    url: `${base}/prestations/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.principale ? 0.95 : 0.8,
  }));

  const locales: MetadataRoute.Sitemap = communes.map((c) => ({
    url: `${base}/zones/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: c.base ? 0.9 : 0.7,
  }));

  return [...statiques, ...pres, ...locales];
}
