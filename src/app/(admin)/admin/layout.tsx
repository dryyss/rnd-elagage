import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { adminConfigured, isAuthenticated } from "@/lib/admin-auth";
import { Logo } from "@/components/ui/Logo";
import { logoutAction } from "./actions";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!adminConfigured()) {
    return (
      <div className="container-x py-24">
        <div className="card mx-auto max-w-lg p-8">
          <h1 className="text-2xl text-forest-900">Administration non configurée</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
            Définissez la variable d&apos;environnement <code className="rounded bg-cream-200 px-1.5 py-0.5">ADMIN_PASSWORD</code> (et idéalement <code className="rounded bg-cream-200 px-1.5 py-0.5">ADMIN_SECRET</code>) dans <code className="rounded bg-cream-200 px-1.5 py-0.5">.env.local</code>, puis redémarrez le serveur.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="border-b border-ink-900/8 bg-cream-50">
        <div className="container-x flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Logo height={36} />
            </Link>
            <span className="hidden rounded-full bg-sage-100 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-forest-800 sm:inline">Administration</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="btn-ghost !min-h-10 !px-4 !text-sm">
              Voir le site <ExternalLink size={14} />
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="btn-ghost !min-h-10 !px-4 !text-sm">
                <LogOut size={14} /> Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="container-x grid min-w-0 gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <AdminNav />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
