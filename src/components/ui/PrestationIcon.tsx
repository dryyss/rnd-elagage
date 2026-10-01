import type { PrestationIcon as IconName } from "@/data/prestations";
import { Scissors, Leaf, TreeDeciduous, Sprout, Shovel, Truck, type LucideProps } from "lucide-react";

const icons: Record<IconName, React.ComponentType<LucideProps>> = {
  hedge: Scissors,
  garden: Leaf,
  tree: TreeDeciduous,
  lawn: Sprout,
  earth: Shovel,
  trailer: Truck,
};

export function PrestationIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon strokeWidth={1.5} {...props} />;
}
