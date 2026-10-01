import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { prestations } from "@/data/prestations";
import { communesParZone } from "@/data/communes";
import type { SiteConfig } from "@/lib/types";
import { telHref } from "@/lib/utils";

export function Footer({ site }: { site: SiteConfig }) {
  const vo = communesParZone("val-doise");
  const ni = communesParZone("nievre");
  return (
    <footer className="relative mt-24 overflow-hidden bg-forest-950 text-cream-50">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="container-x relative pb-28 pt-16 lg:pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" height={56} />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-sage-200">
              Taille de haies, entretien de jardin et travaux extérieurs. Une entreprise à taille humaine, deux territoires, un seul interlocuteur du devis au nettoyage final.
            </p>
            <div className="mt-6 space-y-2 text-[15px]">
              <a href={telHref(site.telephone)} className="block font-semibold hover:text-copper-400">
                {site.telephone}
              </a>
              <a href={`mailto:${site.email}`} className="block text-sage-200 hover:text-copper-400">
                {site.email}
              </a>
              <p className="text-sage-200">
                {site.gerant} · {site.adresse.ville} ({site.adresse.codePostal.slice(0, 2)})
              </p>
              <p className="text-sage-200">{site.horaires}</p>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5 text-copper-400">Prestations</p>
            <ul className="space-y-2.5 text-[15px]">
              {prestations.map((p) => (
                <li key={p.slug}>
                  <Link href={`/prestations/${p.slug}`} className="text-sage-200 transition hover:text-cream-50">
                    {p.nom}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/credit-impot" className="text-sage-200 transition hover:text-cream-50">
                  Crédit d&apos;impôt 50 %
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="text-sage-200 transition hover:text-cream-50">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-copper-400">Val-d&apos;Oise</p>
            <ul className="space-y-2.5 text-[15px]">
              {vo.map((c) => (
                <li key={c.slug}>
                  <Link href={`/zones/${c.slug}`} className="text-sage-200 transition hover:text-cream-50">
                    {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-copper-400">Nièvre</p>
            <ul className="space-y-2.5 text-[15px]">
              {ni.map((c) => (
                <li key={c.slug}>
                  <Link href={`/zones/${c.slug}`} className="text-sage-200 transition hover:text-cream-50">
                    {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-4 mt-8 text-copper-400">Informations</p>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <Link href="/a-propos" className="text-sage-200 transition hover:text-cream-50">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="text-sage-200 transition hover:text-cream-50">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-200 transition hover:text-cream-50">
                  Contact et devis
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream-50/10 pt-6 text-[13px] text-sage-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nom} · {site.assuranceRcPro}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-cream-50">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-cream-50">
              Confidentialité
            </Link>
            <a href="https://magar-developpement.fr" rel="noopener" className="hover:text-cream-50">
              Site par Magar Développement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
