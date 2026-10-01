import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export function Faq({ items, eyebrow = "Questions fréquentes", title = "Ce qu'on nous demande souvent.", withJsonLd = true }: { items: { q: string; r: string }[]; eyebrow?: string; title?: string; withJsonLd?: boolean }) {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Reveal delay={100} className="divide-y divide-ink-900/8 border-y border-ink-900/8">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-[17px] font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-900/15 transition group-open:rotate-45 group-open:bg-forest-800 group-open:text-cream-50">
                  <Plus size={14} />
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-ink-700">{f.r}</p>
            </details>
          ))}
        </Reveal>
      </div>
      {withJsonLd && <JsonLd data={faqJsonLd(items)} />}
    </section>
  );
}
