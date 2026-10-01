import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo RND Élagage (renard + sapin + wordmark). Le fichier source est vert forêt :
 * la variante `light` l'inverse en crème pour les fonds sombres.
 * `priority` uniquement pour l'occurrence visible au chargement (en-tête).
 */
export function Logo({
  variant = "dark",
  className,
  height = 48,
  priority = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  const width = Math.round(height * (800 / 612));
  return (
    <Image
      src="/logo-rnd.png"
      alt="RND Élagage"
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn(variant === "light" && "brightness-0 invert-[0.96] sepia-[0.15]", className)}
      style={{ height, width: "auto" }}
    />
  );
}
