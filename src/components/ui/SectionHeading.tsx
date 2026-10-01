import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", light ? "text-copper-400" : "text-copper-600", align === "center" && "justify-center")}>{eyebrow}</p>
      )}
      <h2 className={cn("text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]", light ? "text-cream-50" : "text-forest-900")}>{title}</h2>
      {text && <p className={cn("mt-5 text-[17px] leading-[1.65]", light ? "text-sage-200" : "text-ink-500")}>{text}</p>}
    </Reveal>
  );
}
