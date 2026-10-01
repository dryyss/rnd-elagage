import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { SiteConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Breadcrumb({ items, site, tone = "dark" }: { items: { name: string; path: string }[]; site: SiteConfig; tone?: "dark" | "light" }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className={cn("flex flex-wrap items-center gap-1.5 text-[13px]", tone === "light" ? "text-sage-200" : "text-ink-500")}>
      {all.map((it, i) => {
        const last = i === all.length - 1;
        return (
          <span key={`${i}-${it.path}`} className="flex items-center gap-1.5">
            {last ? (
              <span className={cn("font-medium", tone === "light" ? "text-cream-50" : "text-forest-900")} aria-current="page">
                {it.name}
              </span>
            ) : (
              <Link href={it.path} className="hover:underline underline-offset-2">
                {it.name}
              </Link>
            )}
            {!last && <ChevronRight size={12} className="opacity-60" />}
          </span>
        );
      })}
      <JsonLd data={breadcrumbJsonLd(site, all)} />
    </nav>
  );
}
