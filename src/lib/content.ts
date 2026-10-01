import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Planning, Realisation, SiteConfig, Tarifs, Temoignage } from "./types";

/**
 * Couche de contenu : tout ce que le client peut modifier depuis l'admin
 * est stocké en JSON dans `content/`. Les lectures sont mémoïsées par requête.
 * Pour un hébergement sans disque persistant (Vercel), remplacer ces fonctions
 * par un stockage distant (KV, Postgres, S3) : les signatures sont stables.
 */
const CONTENT_DIR = path.join(process.cwd(), "content");

export const CONTENT_KEYS = ["site", "planning", "tarifs", "realisations", "temoignages"] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

type ContentMap = {
  site: SiteConfig;
  planning: Planning;
  tarifs: Tarifs;
  realisations: Realisation[];
  temoignages: Temoignage[];
};

async function readJson<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${key}.json`), "utf8");
  return JSON.parse(raw) as ContentMap[K];
}

export const getContent = cache(readJson);

export async function writeContent<K extends ContentKey>(key: K, data: ContentMap[K]) {
  const file = path.join(CONTENT_DIR, `${key}.json`);
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await fs.rename(tmp, file);
}

export const getSite = () => getContent("site");
export const getPlanning = () => getContent("planning");
export const getTarifs = () => getContent("tarifs");
export const getRealisations = () => getContent("realisations");
export const getTemoignages = () => getContent("temoignages");
