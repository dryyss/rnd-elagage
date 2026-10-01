"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { telHref } from "@/lib/utils";

export function MobileCallBar({ telephone }: { telephone: string }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-cream-50/90 p-3 backdrop-blur-xl lg:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="grid grid-cols-2 gap-3">
        <a href={telHref(telephone)} className="btn-forest !min-h-12">
          <Phone size={16} /> Appeler
        </a>
        <Link href="/contact" className="btn-primary !min-h-12">
          Devis gratuit
        </Link>
      </div>
    </div>
  );
}
