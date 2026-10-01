import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteConfig } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";

export function AProposTeaser({ site }: { site: SiteConfig }) {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[750/346] overflow-hidden rounded-[1.5rem] shadow-soft sm:aspect-[4/3]">
            <Image src="/images/taille-haie-cypres-rue.jpg" alt="Véhicule d'intervention RND Élagage devant une haie de cyprès en cours de taille" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 right-6 rounded-2xl border border-ink-900/8 bg-cream-50 px-5 py-4 shadow-lift">
            <p className="font-display text-3xl text-forest-900">Taverny</p>
            <p className="text-[13px] text-ink-500">Val-d&apos;Oise · base de l&apos;entreprise</p>
          </div>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="eyebrow text-copper-600">L&apos;entreprise</p>
          <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08] text-forest-900">Un artisan, son matériel, et le même interlocuteur du devis au nettoyage.</h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-ink-700">
            RND Élagage, c&apos;est {site.gerant}, installé à Taverny. Pas de commercial, pas de sous-traitance : la personne qui vient mesurer est celle qui taille, et celle qui range. Nous travaillons en alternance entre le Val-d&apos;Oise et la Nièvre, par tournées, ce qui nous permet de grouper les chantiers et de tenir des prix justes.
          </p>
          <ul className="mt-6 grid gap-3 text-[15px] text-ink-700 sm:grid-cols-2">
            <li className="rounded-xl bg-sage-100 px-4 py-3">{site.assuranceRcPro}</li>
            <li className="rounded-xl bg-sage-100 px-4 py-3">Matériel professionnel, remorque d&apos;évacuation</li>
            <li className="rounded-xl bg-sage-100 px-4 py-3">Déclaration services à la personne</li>
            <li className="rounded-xl bg-sage-100 px-4 py-3">Devis écrit, prix fermes, pas de supplément</li>
          </ul>
          <Link href="/a-propos" className="mt-8 inline-flex items-center gap-2 font-semibold text-copper-600 hover:text-copper-500">
            En savoir plus sur l&apos;entreprise <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
