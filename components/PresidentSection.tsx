import Link from "next/link";
import { AnimatedCard } from "@/components/AnimatedCard";
import { PresidentPortrait } from "@/components/PresidentPortrait";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";
import { PARTY } from "@/lib/constants";

export function PresidentSection() {
  return (
    <section className="relative section-padding overflow-hidden bg-white dark:bg-upr-dark/50">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,59,142,0.08),transparent_55%),radial-gradient(circle_at_80%_50%,rgba(212,175,55,0.1),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="container-upr relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <div className="president-panel w-full max-w-lg rounded-3xl p-5 sm:p-6">
              <PresidentPortrait priority />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionTitle eyebrow="Président national" title={PARTY.president.name} />
            <AnimatedCard className="mb-6 border-l-4 border-upr-gold bg-upr-light/80 dark:bg-white/5">
              <p className="text-lg leading-relaxed text-[#4a5568] dark:text-[#a0aec0]">
                Leadership patriotique, vision républicaine, engagement pour la justice, la souveraineté nationale et la reconstruction du Congo.
              </p>
            </AnimatedCard>
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-upr-blue dark:text-upr-gold">
              {PARTY.motto}
            </p>
            <Button asChild variant="gold">
              <Link href="/parti/#president">Découvrir le leadership</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
