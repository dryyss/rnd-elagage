import type { Planning, Tournee, Zone, ZoneId } from "./types";

/** Utilitaires planning, sans dépendance serveur : utilisables côté client. */

export function zoneFromCodePostal(planning: Planning, cp: string): Zone | null {
  const dept = cp.trim().slice(0, 2);
  return planning.zones.find((z) => z.departements.includes(dept)) ?? null;
}

export function sortTournees(tournees: Tournee[]) {
  return [...tournees].sort((a, b) => a.debut.localeCompare(b.debut));
}

export function tourneeEnCours(planning: Planning, today = new Date()): Tournee | null {
  const iso = toISODate(today);
  return planning.tournees.find((t) => t.debut <= iso && iso <= t.fin) ?? null;
}

export function prochaineTournee(planning: Planning, zone: ZoneId, today = new Date()): Tournee | null {
  const iso = toISODate(today);
  return sortTournees(planning.tournees).find((t) => t.zone === zone && t.fin >= iso) ?? null;
}

export function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function formatDateFr(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", opts).format(new Date(Date.UTC(y, m - 1, d)));
}

export function formatPeriode(t: Tournee) {
  const sameYear = t.debut.slice(0, 4) === t.fin.slice(0, 4);
  const debut = formatDateFr(t.debut, sameYear ? { day: "numeric", month: "long" } : { day: "numeric", month: "long", year: "numeric" });
  const fin = formatDateFr(t.fin, { day: "numeric", month: "long", year: "numeric" });
  return `du ${debut} au ${fin}`;
}

export function zoneById(planning: Planning, id: ZoneId) {
  return planning.zones.find((z) => z.id === id)!;
}
