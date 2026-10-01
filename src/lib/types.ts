export type ZoneId = "val-doise" | "nievre";

export interface SiteConfig {
  nom: string;
  baseline: string;
  gerant: string;
  telephone: string;
  email: string;
  adresse: { rue: string; codePostal: string; ville: string };
  siret: string;
  horaires: string;
  delaiReponse: string;
  assuranceRcPro: string;
  servicesPersonne: { actif: boolean; mention: string };
  googleBusiness: { valDoise: string; nievre: string };
  reseaux: { instagram: string; facebook: string };
  urlSite: string;
}

export interface Zone {
  id: ZoneId;
  nom: string;
  libelleCourt: string;
  departements: string[];
  communeBase: string;
  description: string;
}

export interface Tournee {
  zone: ZoneId;
  debut: string; // ISO yyyy-mm-dd
  fin: string;
}

export interface Planning {
  zones: Zone[];
  tournees: Tournee[];
  messageHorsZone: string;
}

export interface LigneHaie {
  libelle: string;
  prix: number;
  creditImpot: boolean;
}

export interface Tarifs {
  avertissement: string;
  minimumFacturation: number;
  haies: {
    unite: string;
    lignes: LigneHaie[];
    evacuation: { libelle: string; prix: number; unite: string; creditImpot: boolean };
  };
  autres: { libelle: string; prix: string; creditImpot: boolean }[];
  exempleCredit: { libelle: string; montant: number };
}

export interface Realisation {
  slug: string;
  titre: string;
  prestation: string;
  commune: string;
  zone: ZoneId;
  date: string; // yyyy-mm
  type: "avant-apres" | "photo";
  image: string;
  details: string;
  description: string;
  miseEnAvant: boolean;
}

export interface Temoignage {
  prenom: string;
  commune: string;
  note: number;
  texte: string;
  date: string;
  source?: string;
}
