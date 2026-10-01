"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, House, RotateCcw } from "lucide-react";

export type BoundaryError = Error & { digest?: string };

/**
 * Panneau d'erreur technique, même langage visuel que la 404 (halos, grain, titre
 * Fraunces). Utilisé par toutes les frontières `error.tsx` du site.
 * En production, Next ne transmet pas le message des erreurs serveur : on affiche
 * la référence (`digest`) pour la retrouver dans les logs.
 */
export function ErrorPanel({ error, retry }: { error: BoundaryError; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const dev = process.env.NODE_ENV !== "production";

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="halo-sage absolute -left-60 -top-20 h-[760px] w-[760px]" />
        <div className="halo-copper absolute -right-52 top-20 h-[620px] w-[620px]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28 lg:pt-16">
        <div className="animate-fade-up">
          <p className="eyebrow text-copper-600">Erreur technique</p>

          <p aria-hidden className="mt-6 font-display text-[clamp(4.5rem,13vw,9rem)] leading-[0.9] tracking-[-0.04em] text-forest-900">
            Oups<span className="italic text-copper-500">.</span>
          </p>

          <h1 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] text-forest-900">Une branche a cassé en cours de route.</h1>
          <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-ink-700 sm:text-lg">
            Quelque chose s&apos;est mal passé de notre côté. Le plus souvent, un simple nouvel essai suffit. Sinon, l&apos;accueil et le formulaire de devis restent accessibles.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => retry()} className="btn-primary">
              <RotateCcw size={16} /> Réessayer
            </button>
            <Link href="/" className="btn-forest">
              <House size={16} /> Accueil
            </Link>
            <Link href="/contact" className="btn-ghost">
              Nous écrire <ArrowRight size={16} />
            </Link>
          </div>

          {error.digest && (
            <p className="mt-8 text-[13px] text-ink-500">
              Référence à nous communiquer si le problème persiste :{" "}
              <code className="rounded bg-cream-200 px-1.5 py-0.5 font-mono text-[12px] text-ink-700">{error.digest}</code>
            </p>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[520px] animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="card relative overflow-hidden p-7 sm:p-9">
            <div className="halo-copper-soft pointer-events-none absolute -right-24 -top-24 h-72 w-72" />
            <p className="eyebrow text-copper-600">Ce que vous pouvez faire</p>
            <ol className="mt-5 space-y-4">
              <Etape n="1" titre="Réessayer" texte="La page se recharge et, dans la plupart des cas, repart normalement." />
              <Etape n="2" titre="Revenir plus tard" texte="Si l'incident vient de chez nous, il est généralement résolu en quelques minutes." />
              <Etape n="3" titre="Nous prévenir" texte="Un message avec la référence ci-contre nous aide à corriger rapidement." />
            </ol>
          </div>

          {dev && error.message && (
            <details className="mt-4 rounded-[1.25rem] border border-copper-500/30 bg-copper-100/60 p-4 text-[13px] text-copper-600">
              <summary className="cursor-pointer font-semibold">Détail (visible en développement uniquement)</summary>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed text-ink-700">{error.message}</pre>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}

function Etape({ n, titre, texte }: { n: string; titre: string; texte: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 font-display text-[15px] text-forest-800">{n}</span>
      <span>
        <span className="block font-semibold text-forest-900">{titre}</span>
        <span className="mt-0.5 block text-[14px] leading-snug text-ink-500">{texte}</span>
      </span>
    </li>
  );
}
