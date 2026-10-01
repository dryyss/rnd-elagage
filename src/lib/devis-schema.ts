import { z } from "zod";
import { prestations } from "@/data/prestations";

export const PRESTATION_OPTIONS = [...prestations.map((p) => ({ value: p.slug, label: p.nom })), { value: "autre", label: "Autre ou je ne sais pas encore" }];

export const CRENEAU_OPTIONS = [
  { value: "des-que-possible", label: "Dès que possible" },
  { value: "sous-15-jours", label: "Sous 15 jours" },
  { value: "prochaine-tournee", label: "Sur la prochaine tournée" },
  { value: "pas-presse", label: "Pas pressé" },
];

export const devisSchema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom").max(80),
  telephone: z
    .string()
    .trim()
    .regex(/^(\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/, "Numéro de téléphone français attendu"),
  email: z.string().trim().email("Adresse e-mail invalide").max(120).or(z.literal("")),
  codePostal: z.string().trim().regex(/^\d{5}$/, "Code postal à 5 chiffres"),
  commune: z.string().trim().max(80).optional().or(z.literal("")),
  prestation: z.string().refine((v) => PRESTATION_OPTIONS.some((o) => o.value === v), "Choisissez une prestation"),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  creneau: z.string().refine((v) => CRENEAU_OPTIONS.some((o) => o.value === v), "Choisissez un créneau"),
  consentement: z.literal(true, { message: "Votre accord est nécessaire pour vous recontacter" }),
  // Honeypot : doit rester vide (vérifié dans la route, pas ici, pour répondre
  // un faux succès aux robots au lieu d'une erreur de validation).
  siteweb: z.string().max(500).optional(),
});

export type DevisInput = z.infer<typeof devisSchema>;
