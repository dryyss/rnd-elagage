import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Planning, Realisation, SiteConfig, Tarifs, Temoignage } from "./types";

/**
 * Couche de contenu : tout ce que le client peut modifier depuis l'admin.
 *
 * Deux backends, choisis à l'exécution :
 * - **Vercel Blob** si `BLOB_READ_WRITE_TOKEN` est défini (hébergement Vercel,
 *   système de fichiers en lecture seule). Chaque sauvegarde écrit une nouvelle
 *   version sous `content/<clé>/<horodatage>.json` ; la lecture prend la plus
 *   récente via `list()` (appel API, jamais mis en cache). Un store public est
 *   servi par un CDN qui ignore les paramètres d'URL et met en cache jusqu'aux
 *   404 : réécrire un même chemin donnerait des lectures périmées (vérifié), une
 *   URL unique par version ne le peut pas. Tant qu'une clé n'a jamais été
 *   écrite, on retombe sur le fichier du dépôt, qui sert de contenu initial.
 * - **Disque** sinon (`content/*.json` du projet) : dev local, VPS, Docker.
 *
 * Les lectures sont mémoïsées par requête (`cache`).
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

/** Vrai quand le stockage distant est configuré (Vercel). */
export const usesBlobStorage = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const blobPrefix = (key: ContentKey) => `content/${key}/`;
/** Nombre de versions conservées par clé (historique de secours). */
const KEEP_VERSIONS = 5;

async function readLocal<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${key}.json`), "utf8");
  return JSON.parse(raw) as ContentMap[K];
}

/** Versions d'une clé, de la plus récente à la plus ancienne (horodatage dans le nom). */
async function listVersions(key: ContentKey) {
  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: blobPrefix(key), limit: 1000 });
  return blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
}

async function readBlob<K extends ContentKey>(key: K): Promise<ContentMap[K] | null> {
  const [latest] = await listVersions(key);
  if (!latest) return null;
  // Lecture directe de l'URL publique, sans en-tête d'autorisation : `get()` du
  // SDK (qui en ajoute un) est refusé en 403 depuis les fonctions Vercel alors
  // qu'il passe en local. L'URL étant propre à cette version, un éventuel cache
  // (CDN ou cache de données Next) ne peut jamais renvoyer un autre contenu.
  const res = await fetch(latest.url);
  if (!res.ok) {
    console.error(`[content] lecture de ${latest.pathname} impossible (${res.status}) ; repli sur le JSON du dépôt`);
    return null;
  }
  return (await res.json()) as ContentMap[K];
}

async function readJson<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  if (usesBlobStorage()) {
    const remote = await readBlob(key);
    if (remote) return remote;
  }
  return readLocal(key);
}

export const getContent = cache(readJson);

export async function writeContent<K extends ContentKey>(key: K, data: ContentMap[K]) {
  const json = JSON.stringify(data, null, 2) + "\n";
  if (usesBlobStorage()) {
    const { put, del } = await import("@vercel/blob");
    // Horodatage à largeur fixe : le tri lexicographique des noms suit le temps.
    const stamp = Date.now().toString().padStart(14, "0");
    await put(`${blobPrefix(key)}${stamp}.json`, json, {
      access: "public",
      contentType: "application/json; charset=utf-8",
      addRandomSuffix: true,
    });
    // Nettoyage des versions anciennes, sans bloquer la sauvegarde en cas d'échec.
    try {
      const old = (await listVersions(key)).slice(KEEP_VERSIONS);
      if (old.length) await del(old.map((b) => b.url));
    } catch (e) {
      console.warn("[content] nettoyage des anciennes versions impossible :", e);
    }
    return;
  }
  const file = path.join(CONTENT_DIR, `${key}.json`);
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, json, "utf8");
  await fs.rename(tmp, file);
}

export const getSite = () => getContent("site");
export const getPlanning = () => getContent("planning");
export const getTarifs = () => getContent("tarifs");
export const getRealisations = () => getContent("realisations");
export const getTemoignages = () => getContent("temoignages");
