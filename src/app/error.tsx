"use client";

import { MinimalChrome } from "@/components/layout/MinimalChrome";
import { ErrorPanel, type BoundaryError } from "@/components/sections/ErrorPanel";

/**
 * Erreur survenue dans un layout de groupe (`(site)`, `(admin)`) ou dans une page
 * sans layout propre (connexion admin). Le layout racine est encore là (fonts,
 * styles), mais pas le header/footer du site : on utilise l'habillage réduit.
 */
export default function RootError({ error, retry }: { error: BoundaryError; retry: () => void }) {
  return (
    <MinimalChrome>
      <ErrorPanel error={error} retry={retry} />
    </MinimalChrome>
  );
}
