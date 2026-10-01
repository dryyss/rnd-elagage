import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

/**
 * Habillage réduit (logo + pied de page sobre) pour les écrans rendus hors du
 * layout du site : erreurs de layout, erreur globale. Aucune donnée de `content/`
 * n'est nécessaire, ce qui permet de l'afficher même si la lecture du contenu échoue.
 */
export function MinimalChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-ink-900/8 bg-cream-50/80">
        <div className="container-x flex items-center justify-between py-3">
          <Link href="/" aria-label="RND Élagage, accueil" className="shrink-0">
            <Logo height={44} priority />
          </Link>
          <Link href="/contact" className="btn-primary !min-h-10 !px-4 !text-sm">
            Devis gratuit
          </Link>
        </div>
      </header>
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-ink-900/8">
        <div className="container-x flex flex-col gap-2 py-6 text-[13px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RND Élagage · Taille de haies et entretien extérieur</p>
          <nav className="flex gap-5" aria-label="Pied de page">
            <Link href="/" className="hover:text-forest-900">Accueil</Link>
            <Link href="/contact" className="hover:text-forest-900">Contact</Link>
            <Link href="/mentions-legales" className="hover:text-forest-900">Mentions légales</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
