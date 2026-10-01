"use client";

import { Fraunces, Manrope } from "next/font/google";
import { MinimalChrome } from "@/components/layout/MinimalChrome";
import { ErrorPanel, type BoundaryError } from "@/components/sections/ErrorPanel";
import "./globals.css";

// Même configuration que `layout.tsx` : ce fichier remplace entièrement le layout
// racine quand celui-ci plante, il doit donc recharger polices et styles lui-même.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: "400", display: "swap", adjustFontFallback: true });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", adjustFontFallback: true });

export default function GlobalError({ error, retry }: { error: BoundaryError; retry: () => void }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <title>Erreur technique · RND Élagage</title>
        <meta name="robots" content="noindex" />
        <MinimalChrome>
          <ErrorPanel error={error} retry={retry} />
        </MinimalChrome>
      </body>
    </html>
  );
}
