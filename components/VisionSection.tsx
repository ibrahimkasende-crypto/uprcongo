import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionTitle } from "@/components/SectionTitle";
import { VISION_CARDS } from "@/lib/constants";

export function VisionSection() {
  return (
    <section className="section-padding bg-white dark:bg-upr-dark/50">
      <div className="container-upr">
        <SectionTitle eyebrow="Vision républicaine" title="Notre vision pour le Congo" align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VISION_CARDS.map((card, i) => (
            <AnimatedCard key={card.title} delay={i * 0.08} className="h-full">
              <h3 className="mb-3 text-lg font-bold text-upr-blue dark:text-upr-gold">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
