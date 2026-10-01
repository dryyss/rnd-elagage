"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { prestations } from "@/data/prestations";
import type { SiteConfig } from "@/lib/types";
import { cn, telHref } from "@/lib/utils";

const nav = [
  { href: "/credit-impot", label: "Crédit d'impôt" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/zones", label: "Zones" },
  { href: "/a-propos", label: "À propos" },
];

export function Header({ site }: { site: SiteConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const [openFor, setOpenFor] = useState<string | null>(null);
  const pathname = usePathname();
  // Le menu mobile est considéré ouvert uniquement pour la route où il a été ouvert :
  // changer de page le referme sans effet ni setState supplémentaire.
  const open = openFor === pathname;
  const setOpen = (v: boolean) => setOpenFor(v ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "bg-cream-100/85 shadow-[0_1px_0_rgb(21_33_27/0.06)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className={cn("container-x flex items-center justify-between gap-6 transition-all duration-500", scrolled ? "py-3" : "py-5")}>
        <Link href="/" aria-label="RND Élagage, accueil" className="shrink-0">
          <Logo height={scrolled ? 40 : 48} className="transition-all duration-500" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          <div className="group relative">
            <Link
              href="/prestations/taille-de-haies"
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium text-ink-700 transition hover:bg-ink-900/5 hover:text-forest-900",
                pathname?.startsWith("/prestations") && "text-forest-900",
              )}
            >
              Prestations <ChevronDown size={14} className="transition group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="card w-[560px] overflow-hidden p-2">
                <div className="grid grid-cols-2 gap-1">
                  {prestations.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/prestations/${p.slug}`}
                      className="group/item rounded-xl px-4 py-3 transition hover:bg-sage-100"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-display text-sm text-copper-600">{p.numero}</span>
                        <span className="text-[15px] font-semibold text-forest-900">{p.nomCourt}</span>
                      </span>
                      <span className="mt-1 line-clamp-1 block text-[13px] text-ink-500">{p.accroche}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "rounded-full px-4 py-2 text-[15px] font-medium text-ink-700 transition hover:bg-ink-900/5 hover:text-forest-900",
                pathname?.startsWith(n.href) && "text-forest-900",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={telHref(site.telephone)} className="flex items-center gap-2 text-[15px] font-semibold text-forest-900 hover:text-copper-600">
            <Phone size={16} /> {site.telephone}
          </a>
          <Link href="/contact" className="btn-primary !min-h-11 !px-5">
            Devis gratuit
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 bg-cream-50 text-forest-900 lg:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu mobile plein écran */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-forest-900 text-cream-50 transition-all duration-500 ease-[var(--ease-out-expo)] lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="container-x flex items-center justify-between py-5">
          <Logo variant="light" height={40} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/20"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="container-x flex-1 overflow-y-auto pb-10" aria-label="Navigation mobile">
          <p className="eyebrow mb-3 mt-4 text-copper-400">Prestations</p>
          <ul className="grid gap-1">
            {prestations.map((p) => (
              <li key={p.slug}>
                <Link href={`/prestations/${p.slug}`} className="flex items-baseline gap-3 py-2.5 text-xl font-display">
                  <span className="text-sm text-copper-400">{p.numero}</span> {p.nomCourt}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-6 h-px bg-cream-50/10" />
          <ul className="grid gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block py-2.5 text-xl font-display">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact" className="btn-primary">
              Demander un devis gratuit
            </Link>
            <a href={telHref(site.telephone)} className="btn-ghost-light">
              <Phone size={16} /> {site.telephone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
