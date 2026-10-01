import { getPlanning } from "@/lib/content";
import { PlanningEditor } from "./PlanningEditor";

export default async function AdminPlanningPage() {
  const planning = await getPlanning();
  return <PlanningEditor initial={planning} />;
}
