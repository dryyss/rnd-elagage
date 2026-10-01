import { Star } from "lucide-react";
import type { SiteConfig, Temoignage } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Temoignages({ temoignages, site }: { temoignages: Temoignage[]; site: SiteConfig }) {
  const hasReviews = temoignages.length > 0;
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeading
        eyebrow="Avis clients"
        title={hasReviews ? "Ce qu'en disent les voisins." : "Les avis Google arriveront ici."}
        text={
          hasReviews
            ? "Avis publiés sur Google, affichés tels quels avec le prénom et la commune. Aucun témoignage n'est écrit à la place des clients."
            : "Les fiches Google de l'entreprise sont en cours de création. Les avis seront affichés tels qu'ils sont publiés, avec le prénom et la commune. Aucun témoignage n'est écrit à la place des clients."
        }
        align="center"
      />
      {hasReviews ? (
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {temoignages.slice(0, 6).map((t, i) => (
            <Reveal key={t.prenom + t.date} delay={i * 70}>
              <figure className="card h-full p-6">
                <div className="flex gap-0.5 text-copper-500" aria-label={`${t.note} sur 5`}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={16} fill={k < t.note ? "currentColor" : "none"} />
                  ))}
                </div>
                <blockquote className="mt-4 text-[16px] leading-relaxed text-ink-700">« {t.texte} »</blockquote>
                <figcaption className="mt-4 text-[13px] text-ink-500">
                  <span className="font-semibold text-forest-900">{t.prenom}</span> · {t.commune}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {[site.googleBusiness.valDoise, site.googleBusiness.nievre].map((url, i) => (
            <div key={i} className="card flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                <Star size={20} />
              </span>
              <div className="text-[15px]">
                <p className="font-semibold text-forest-900">{i === 0 ? "Val-d'Oise" : "Nièvre"}</p>
                {url ? (
                  <a href={url} target="_blank" rel="noopener" className="text-copper-600 underline-offset-2 hover:underline">
                    Voir la fiche Google
                  </a>
                ) : (
                  <p className="text-ink-500">Fiche Google en cours de création</p>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      )}
    </section>
  );
}
