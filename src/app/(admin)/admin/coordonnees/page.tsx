import { getSite } from "@/lib/content";
import { CoordonneesEditor } from "./CoordonneesEditor";

export default async function AdminCoordonneesPage() {
  const site = await getSite();
  return <CoordonneesEditor initial={site} />;
}
