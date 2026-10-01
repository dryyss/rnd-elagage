import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { SiteConfig } from "@/lib/types";
import { telHref } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({ site, titre = "Dites-nous ce qu'il y a à faire.", texte, contexte }: { site: SiteConfig; titre?: string; texte?: string; contexte?: string }) {
  return (
    <section className="container-x pb-4">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-forest-900 px-7 py-14 text-cream-50 sm:px-12 lg:px-16 lg:py-20">
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="halo-copper-soft pointer-events-none absolute -bottom-52 -right-40 h-[620px] w-[620px]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow text-copper-400">{contexte ?? "Devis gratuit"}</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">{titre}</h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-sage-200">
              {texte ?? `${site.delaiReponse}. Si votre commune est sur notre tournée en cours, nous passons mesurer sous 48 heures. Sinon, nous calons une date sur la prochaine.`}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/contact" className="btn-primary">
              Demander mon devis <ArrowRight size={16} />
            </Link>
            <a href={telHref(site.telephone)} className="btn-ghost-light">
              <Phone size={16} /> {site.telephone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
