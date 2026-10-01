"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "rnd-consent";
export type Consent = "accepted" | "refused";

/**
 * Bandeau de consentement minimaliste. Aucun traceur n'est chargé tant que
 * l'utilisateur n'a pas accepté. Brancher Google Ads / GA4 dans `loadTrackers`.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(KEY) as Consent | null;
    if (saved === "accepted") loadTrackers();
    if (saved) return;
    // Affichage différé : évite un rendu en cascade au montage et laisse
    // la page se peindre avant d'afficher le bandeau.
    const t = window.setTimeout(() => setVisible(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  const decide = (c: Consent) => {
    window.localStorage.setItem(KEY, c);
    setVisible(false);
    if (c === "accepted") loadTrackers();
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-md rounded-2xl border border-ink-900/10 bg-cream-50 p-5 shadow-lift lg:inset-x-auto lg:bottom-6 lg:right-6">
      <p className="text-[14px] leading-relaxed text-ink-700">
        Nous utilisons des mesures d&apos;audience et de conversion publicitaire pour savoir comment vous nous avez trouvés. Aucune donnée n&apos;est revendue.{" "}
        <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => decide("accepted")} className="btn-forest !min-h-10 flex-1 !text-sm">
          Accepter
        </button>
        <button type="button" onClick={() => decide("refused")} className="btn-ghost !min-h-10 flex-1 !text-sm">
          Refuser
        </button>
      </div>
    </div>
  );
}

function loadTrackers() {
  const id = process.env.NEXT_PUBLIC_GTAG_ID;
  if (!id || document.getElementById("gtag-js")) return;
  const s = document.createElement("script");
  s.id = "gtag-js";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer.push(args);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
}
