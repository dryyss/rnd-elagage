import { getRealisations } from "@/lib/content";
import { RealisationsEditor } from "./RealisationsEditor";

export default async function AdminRealisationsPage() {
  const realisations = await getRealisations();
  return <RealisationsEditor initial={realisations} />;
}
