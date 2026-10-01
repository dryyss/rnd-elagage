import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const etapes = [
  {
    n: "01",
    titre: "Vous décrivez le besoin",
    texte: "Par téléphone ou via le formulaire, en deux minutes. Nous vous rappelons sous 24 h pour fixer un passage.",
  },
  {
    n: "02",
    titre: "Nous mesurons et chiffrons sur place",
    texte: "Visite gratuite : longueur, hauteur, accès, volume de déchets. Le devis est précis, le reste à charge après crédit d'impôt y figure.",
  },
  {
    n: "03",
    titre: "Nous intervenons sur la tournée",
    texte: "Date calée selon le planning de votre zone. Matériel professionnel, protection des abords, travail au cordeau.",
  },
  {
    n: "04",
    titre: "Nettoyage, évacuation, attestation",
    texte: "Rien ne reste sur place. Vous recevez la facture, puis l'attestation fiscale en janvier pour votre déclaration.",
  },
];

export function Etapes() {
  return (
    <section className="bg-cream-200/60 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Comment ça se passe" title="Quatre étapes, aucune surprise." align="center" />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {etapes.map((e, i) => (
            <Reveal key={e.n} delay={i * 90} as="li" className="relative">
              <div className="card h-full p-6">
                <span className="font-display text-4xl text-copper-500">
                  {e.n}
                </span>
                <h3 className="mt-4 text-lg leading-snug text-forest-900">{e.titre}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{e.texte}</p>
              </div>
              {i < etapes.length - 1 && <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-copper-400/60 lg:block" aria-hidden />}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
