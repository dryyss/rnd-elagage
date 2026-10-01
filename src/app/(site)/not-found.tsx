import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow text-copper-600">Erreur 404</p>
      <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-forest-900">Cette page a été taillée un peu court.</h1>
      <p className="mt-5 max-w-md text-[17px] text-ink-700">L&apos;adresse n&apos;existe pas ou plus. Revenez à l&apos;accueil ou demandez directement un devis.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-forest">
          Retour à l&apos;accueil
        </Link>
        <Link href="/contact" className="btn-primary">
          Devis gratuit <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
