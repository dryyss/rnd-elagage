import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Apparition au scroll. Composant serveur : il ne pose qu'une classe et un
 * attribut `data-reveal`. Un seul observateur global (`RevealObserver`, monté
 * dans le layout) anime tous les éléments, au lieu d'un composant client par
 * bloc. Sans JavaScript, le CSS affiche tout directement.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Tag data-reveal className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
