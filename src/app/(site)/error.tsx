"use client";

import { ErrorPanel, type BoundaryError } from "@/components/sections/ErrorPanel";

/** Erreur dans une page du site : le layout (header, footer, barre d'appel) reste affiché. */
export default function SiteError({ error, retry }: { error: BoundaryError; retry: () => void }) {
  return <ErrorPanel error={error} retry={retry} />;
}
