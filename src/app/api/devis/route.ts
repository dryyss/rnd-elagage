import { NextResponse } from "next/server";
import { devisSchema, PRESTATION_OPTIONS, CRENEAU_OPTIONS } from "@/lib/devis-schema";
import { getPlanning, getSite } from "@/lib/content";
import { zoneFromCodePostal } from "@/lib/planning";

// Limitation de débit très simple, en mémoire (suffisante pour un site vitrine, un seul processus).
const hits = new Map<string, { n: number; t: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 10 * 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Trop de demandes. Réessayez dans quelques minutes ou appelez-nous." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  const parsed = devisSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const d = parsed.data;
  // Honeypot rempli : on fait semblant d'accepter, sans rien envoyer.
  if (d.siteweb) return NextResponse.json({ ok: true });

  const [site, planning] = await Promise.all([getSite(), getPlanning()]);
  const zone = zoneFromCodePostal(planning, d.codePostal);
  const prestationLabel = PRESTATION_OPTIONS.find((o) => o.value === d.prestation)?.label ?? d.prestation;
  const creneauLabel = CRENEAU_OPTIONS.find((o) => o.value === d.creneau)?.label ?? d.creneau;

  const lignes = [
    `Nom : ${d.nom}`,
    `Téléphone : ${d.telephone}`,
    `E-mail : ${d.email || "—"}`,
    `Code postal : ${d.codePostal}${d.commune ? ` (${d.commune})` : ""}`,
    `Zone : ${zone ? zone.nom : "hors zone"}`,
    `Prestation : ${prestationLabel}`,
    `Créneau souhaité : ${creneauLabel}`,
    "",
    "Description :",
    d.description || "—",
  ];
  const texte = lignes.join("\n");
  const sujet = `[Devis] ${prestationLabel} · ${d.codePostal} · ${d.nom}`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEVIS_TO_EMAIL || site.email;
  const from = process.env.DEVIS_FROM_EMAIL || "RND Élagage <devis@rnd-elagage.fr>";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        replyTo: d.email || undefined,
        subject: sujet,
        text: texte,
      });
    } catch (err) {
      console.error("[devis] envoi e-mail échoué", err);
      return NextResponse.json({ ok: false, message: "L'envoi a échoué. Appelez-nous directement, nous vous répondrons tout de suite." }, { status: 502 });
    }
  } else {
    // Pas de clé configurée : on journalise pour ne rien perdre en développement.
    console.info(`[devis] (RESEND_API_KEY absente)\n${sujet}\n${texte}`);
  }

  return NextResponse.json({ ok: true, zone: zone?.id ?? null });
}
