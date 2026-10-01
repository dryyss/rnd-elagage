import { getSite } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { localBusinessJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream-50"
      >
        Aller au contenu
      </a>
      <Header site={site} />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <Footer site={site} />
      <MobileCallBar telephone={site.telephone} />
      <CookieConsent />
      <RevealObserver />
      <JsonLd data={localBusinessJsonLd(site)} />
    </>
  );
}
