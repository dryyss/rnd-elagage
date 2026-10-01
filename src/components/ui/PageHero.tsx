import Image from "next/image";
import type { SiteConfig } from "@/lib/types";
import { Breadcrumb } from "./Breadcrumb";
import { cn } from "@/lib/utils";

/** En-tête de page intérieure : fil d'Ariane, eyebrow, titre, intro, image optionnelle. */
export function PageHero({
  site,
  breadcrumb,
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
  tone = "dark",
}: {
  site: SiteConfig;
  breadcrumb: { name: string; path: string }[];
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <section className={cn("relative overflow-hidden", light ? "bg-forest-900 text-cream-50" : "")}>
      {light && <div className="grain pointer-events-none absolute inset-0" />}
      {!light && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="halo-sage absolute -left-60 -top-20 h-[700px] w-[700px]" />
          <div className="grain absolute inset-0" />
        </div>
      )}
      <div className={cn("container-x relative grid gap-10 pb-14 pt-6 lg:pb-20 lg:pt-10", image && "lg:grid-cols-[1.1fr_0.9fr] lg:items-center")}>
        <div className="animate-fade-up">
          <Breadcrumb items={breadcrumb} site={site} tone={tone} />
          {eyebrow && <p className={cn("eyebrow mt-8", light ? "text-copper-400" : "text-copper-600")}>{eyebrow}</p>}
          <h1 className={cn("mt-4 text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.02]", light ? "text-cream-50" : "text-forest-900")}>{title}</h1>
          {intro && <p className={cn("mt-6 max-w-[58ch] text-[17px] leading-[1.65] sm:text-lg", light ? "text-sage-200" : "text-ink-700")}>{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-lift animate-fade-up [animation-delay:120ms]">
            <Image src={image} alt={imageAlt ?? ""} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
