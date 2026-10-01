import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getPlanning, getSite } from "@/lib/content";
import { toISODate } from "@/lib/planning";
import { telHref } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import { DevisForm } from "@/components/forms/DevisForm";
import { PlanningWidget } from "@/components/sections/PlanningWidget";

export const metadata: Metadata = {
  title: "Demande de devis gratuit · Taille de haies et entretien de jardin",
  description: "Décrivez vos travaux, nous vous rappelons sous 24 h. Devis gratuit sur place dans le Val-d'Oise et la Nièvre, reste à charge après crédit d'impôt indiqué.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const [site, planning, sp] = await Promise.all([getSite(), getPlanning(), searchParams]);
  const cp = typeof sp.cp === "string" ? sp.cp : "";
  const prestation = typeof sp.prestation === "string" ? sp.prestation : "";
  const today = toISODate(new Date());

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="halo-copper absolute -right-60 -top-20 h-[700px] w-[700px]" />
        <div className="grain absolute inset-0" />
      </div>
      <div className="container-x pb-20 pt-6 lg:pt-10">
        <Breadcrumb items={[{ name: "Contact et devis", path: "/contact" }]} site={site} />
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="eyebrow text-copper-600">Devis gratuit</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.02] text-forest-900">Dites-nous ce qu&apos;il y a à faire.</h1>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-ink-700">
              {site.delaiReponse}, du lundi au samedi. Si votre commune est sur notre tournée en cours, nous passons mesurer sous 48 heures. Sinon, nous préparons le devis à distance et nous calons une date sur la prochaine tournée.
            </p>

            <ul className="mt-8 space-y-4 text-[15px]">
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-cream-50">
                  <Phone size={18} />
                </span>
                <a href={telHref(site.telephone)} className="font-semibold text-forest-900 hover:text-copper-600">
                  {site.telephone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <Mail size={18} />
                </span>
                <a href={`mailto:${site.email}`} className="text-ink-700 hover:text-copper-600">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <Clock size={18} />
                </span>
                <span className="text-ink-700">{site.horaires}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <MapPin size={18} />
                </span>
                <span className="text-ink-700">
                  {site.adresse.ville} ({site.adresse.codePostal}) · Val-d&apos;Oise et Nièvre
                </span>
              </li>
            </ul>

            <div className="mt-10">
              <p className="eyebrow mb-4 text-ink-500">Quand passons-nous chez vous ?</p>
              <PlanningWidget planning={planning} today={today} compact />
            </div>
          </div>

          <Reveal delay={100}>
            <DevisForm defaultCp={cp} defaultPrestation={prestation} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
