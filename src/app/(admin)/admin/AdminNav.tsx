"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarRange, Euro, Images, LayoutDashboard, MessageSquareQuote, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/planning", label: "Planning des tournées", icon: CalendarRange },
  { href: "/admin/realisations", label: "Réalisations", icon: Images },
  { href: "/admin/tarifs", label: "Tarifs", icon: Euro },
  { href: "/admin/avis", label: "Avis clients", icon: MessageSquareQuote },
  { href: "/admin/coordonnees", label: "Coordonnées", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="-mx-5 flex min-w-0 gap-1 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:px-0 lg:pb-0" aria-label="Administration">
      {items.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium transition",
              active ? "bg-forest-800 text-cream-50" : "text-ink-700 hover:bg-cream-200",
            )}
          >
            <it.icon size={16} /> {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
