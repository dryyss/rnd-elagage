import { getSite } from "@/lib/content";
import { NotFoundPanel } from "@/components/sections/NotFoundPanel";

/** 404 déclenchée par `notFound()` dans une route du site (prestation, zone, etc.). Le layout fournit déjà header et footer. */
export default async function NotFound() {
  const site = await getSite();
  return <NotFoundPanel site={site} />;
}
