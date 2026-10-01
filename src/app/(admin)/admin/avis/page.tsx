import { getTemoignages } from "@/lib/content";
import { AvisEditor } from "./AvisEditor";

export default async function AdminAvisPage() {
  const temoignages = await getTemoignages();
  return <AvisEditor initial={temoignages} />;
}
