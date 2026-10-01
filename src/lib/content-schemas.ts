import { z } from "zod";

const zoneId = z.enum(["val-doise", "nievre"]);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date au format AAAA-MM-JJ");

export const siteSchema = z.object({
  nom: z.string().min(1),
  baseline: z.string(),
  gerant: z.string().min(1),
  telephone: z.string().min(10),
  email: z.string().email(),
  adresse: z.object({ rue: z.string(), codePostal: z.string().regex(/^\d{5}$/), ville: z.string().min(1) }),
  siret: z.string(),
  horaires: z.string(),
  delaiReponse: z.string(),
  assuranceRcPro: z.string(),
  servicesPersonne: z.object({ actif: z.boolean(), mention: z.string() }),
  googleBusiness: z.object({ valDoise: z.string(), nievre: z.string() }),
  reseaux: z.object({ instagram: z.string(), facebook: z.string() }),
  urlSite: z.string().url(),
});

export const planningSchema = z.object({
  zones: z.array(
    z.object({
      id: zoneId,
      nom: z.string().min(1),
      libelleCourt: z.string().min(1),
      departements: z.array(z.string().regex(/^\d{2}$/)).min(1),
      communeBase: z.string(),
      description: z.string(),
    }),
  ),
  tournees: z
    .array(z.object({ zone: zoneId, debut: isoDate, fin: isoDate }))
    .refine((arr) => arr.every((t) => t.debut <= t.fin), "La date de fin doit suivre la date de début"),
  messageHorsZone: z.string(),
});

export const tarifsSchema = z.object({
  avertissement: z.string(),
  minimumFacturation: z.number().nonnegative(),
  haies: z.object({
    unite: z.string(),
    lignes: z.array(z.object({ libelle: z.string().min(1), prix: z.number().nonnegative(), creditImpot: z.boolean() })),
    evacuation: z.object({ libelle: z.string(), prix: z.number().nonnegative(), unite: z.string(), creditImpot: z.boolean() }),
  }),
  autres: z.array(z.object({ libelle: z.string().min(1), prix: z.string().min(1), creditImpot: z.boolean() })),
  exempleCredit: z.object({ libelle: z.string(), montant: z.number().positive() }),
});

export const realisationsSchema = z.array(
  z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/, "Slug : lettres minuscules, chiffres et tirets"),
    titre: z.string().min(1),
    prestation: z.string().min(1),
    commune: z.string().min(1),
    zone: zoneId,
    date: z.string().regex(/^\d{4}-\d{2}$/, "Date au format AAAA-MM"),
    type: z.enum(["avant-apres", "photo"]),
    image: z.string().min(1),
    details: z.string(),
    description: z.string(),
    miseEnAvant: z.boolean(),
  }),
);

export const temoignagesSchema = z.array(
  z.object({
    prenom: z.string().min(1),
    commune: z.string().min(1),
    note: z.number().int().min(1).max(5),
    texte: z.string().min(1),
    date: z.string(),
    source: z.string().optional(),
  }),
);

export const contentSchemas = {
  site: siteSchema,
  planning: planningSchema,
  tarifs: tarifsSchema,
  realisations: realisationsSchema,
  temoignages: temoignagesSchema,
} as const;
