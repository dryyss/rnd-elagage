import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Authentification admin volontairement simple : un mot de passe (ADMIN_PASSWORD)
 * et un cookie de session signé HMAC (ADMIN_SECRET). Un seul utilisateur : le client.
 */
const COOKIE = "rnd_admin";
const DUREE_MS = 1000 * 60 * 60 * 24 * 14; // 14 jours

function secret() {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD manquant dans les variables d'environnement");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
}

export async function createSession() {
  const exp = Date.now() + DUREE_MS;
  const payload = `admin.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(exp),
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthenticated() {
  if (!adminConfigured()) return false;
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return false;
  const [who, exp, sig] = token.split(".");
  if (who !== "admin" || !exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = sign(`${who}.${exp}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
