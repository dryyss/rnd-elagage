import { getSite } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { NotFoundPanel } from "@/components/sections/NotFoundPanel";

/**
 * 404 globale : toute URL qui ne correspond à aucune route. Elle est rendue dans le
 * layout racine (sans header/footer), on recompose donc l'habillage du site ici.
 */
export default async function NotFound() {
  const site = await getSite();
  return (
    <>
      <Header site={site} />
      <main id="contenu" className="flex-1">
        <NotFoundPanel site={site} />
      </main>
      <Footer site={site} />
      <MobileCallBar telephone={site.telephone} />
    </>
  );
}
