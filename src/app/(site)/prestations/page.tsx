import { redirect } from "next/navigation";

/** /prestations renvoie vers la prestation principale. */
export default function PrestationsIndex() {
  redirect("/prestations/taille-de-haies");
}
