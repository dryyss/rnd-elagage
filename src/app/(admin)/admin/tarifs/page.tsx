import { getTarifs } from "@/lib/content";
import { TarifsEditor } from "./TarifsEditor";

export default async function AdminTarifsPage() {
  const tarifs = await getTarifs();
  return <TarifsEditor initial={tarifs} />;
}
