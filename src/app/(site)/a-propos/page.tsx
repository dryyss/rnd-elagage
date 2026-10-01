import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Wrench, Receipt } from "lucide-react";
import { getSite } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Etapes } from "@/components/sections/Etapes";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "À propos · Artisan paysagiste à Taverny (95) et Nevers (58)",
  description:
    "RND Élagage, c'est Bryan Renard, artisan installé à Taverny. Taille de haies et entretien extérieur dans le Val-d'Oise et la Nièvre, en tournées alternées. Assurance RC pro, matériel professionnel.",
  alternates: { canonical: "/a-propos" },
};

const valeurs = [
  { icon: Wrench, t: "Le bon geste pour chaque essence", d: "Un cyprès de Leyland ne se taille pas comme un laurier. Nous connaissons les tolérances de chaque essence et nous vous disons ce qui est possible avant de couper." },
  { icon: Truck, t: "Rien ne reste sur place", d: "Remorque, broyeur, souffleur : le chantier est rendu propre, les déchets évacués ou broyés en paillage, les allées soufflées." },
  { icon: Shield, t: "Assuré, déclaré, transparent", d: "Assurance responsabilité civile professionnelle, déclaration services à la personne, devis écrit et prix fermes. Pas de supplément découvert le jour J." },
  { icon: Receipt, t: "Le crédit d'impôt, vraiment mis en avant", d: "Chaque devis affiche le reste à charge après crédit d'impôt, et l'attestation fiscale vous parvient chaque janvier sans que vous ayez à la réclamer." },
];

export default async function AProposPage() {
  const site = await getSite();
  return (
    <>
      <PageHero
        site={site}
        breadcrumb={[{ name: "À propos", path: "/a-propos" }]}
        eyebrow="L'entreprise"
        title="Un artisan, deux territoires, un seul interlocuteur."
        intro={`RND Élagage, c'est ${site.gerant}, installé à Taverny dans le Val-d'Oise. Pas de commercial, pas de sous-traitance : la personne qui vient mesurer est celle qui taille, et celle qui range.`}
        image="/images/taille-haie-cypres-rue.jpg"
        imageAlt="Véhicule d'intervention RND Élagage devant une haie de cyprès"
      />

      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-copper-600">Pourquoi deux zones</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.08] text-forest-900">Entre le Val-d&apos;Oise et la Nièvre, par tournées.</h2>
          </Reveal>
          <Reveal delay={100} className="prose-rnd">
            <p>
              Nous intervenons en alternance sur deux territoires : la région parisienne, autour de Taverny, et la Nièvre, autour de Nevers. Chaque tournée dure environ six semaines. Cette organisation nous permet de grouper les chantiers d&apos;un même secteur, de limiter les déplacements et de tenir des prix justes sur des prestations qui, ailleurs, se facturent souvent au déplacement.
            </p>
            <p>
              Concrètement : si nous sommes dans votre zone, nous passons mesurer sous 48 heures. Sinon, nous préparons le devis à distance à partir de vos photos et de vos mesures, nous réservons votre créneau sur la prochaine tournée, et nous confirmons la date à notre arrivée. Le planning des tournées est publié sur le site et tenu à jour.
            </p>
            <p>
              Notre activité est aussi saisonnière. De septembre à mars, place aux tailles importantes, aux remises en forme et aux abattages. Au printemps et en été, nous privilégions l&apos;entretien courant, les tontes, le débroussaillage et les tailles légères, en respectant la période de nidification.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-200/60 py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Notre façon de travailler" title="Ce que vous pouvez attendre de nous." align="center" />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {valeurs.map((v, i) => (
              <Reveal key={v.t} delay={(i % 2) * 90}>
                <div className="card flex h-full gap-5 p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest-800 text-cream-50">
                    <v.icon size={22} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-xl text-forest-900">{v.t}</h3>
                    <p className="mt-2 text-[15px] leading-[1.7] text-ink-700">{v.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
              <Image src="/images/avant-apres-haie-laurier-route.jpg" alt="Avant / après : haie de lauriers en bord de route" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[1.25rem]">
              <Image src="/images/avant-apres-haie-cypres-jardin.jpg" alt="Avant / après : haie de cyprès redressée" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow text-copper-600">Matériel et méthode</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.08] text-forest-900">Du matériel professionnel, et le cordeau tendu avant la première coupe.</h2>
            <div className="prose-rnd mt-6">
              <p>
                Taille-haies thermiques et à batterie, perches télescopiques pour les hauteurs jusqu&apos;à 4 m, tronçonneuses, débroussailleuse à lame, broyeur de branches et remorque d&apos;évacuation. Pour les grandes longueurs, un niveau laser garantit une arête parfaitement droite.
              </p>
              <p>
                Avant de commencer, nous bâchons les massifs et les terrasses. Après, nous soufflons les allées, nous chargeons la remorque, et nous faisons le tour du jardin avec vous.
              </p>
            </div>
            <Link href="/realisations" className="mt-8 inline-flex items-center gap-2 font-semibold text-copper-600">
              Voir nos chantiers <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Etapes />
      <CtaBand site={site} titre="Parlons de votre jardin." />
    </>
  );
}
