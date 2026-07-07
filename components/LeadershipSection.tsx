"use client";

import Image from "next/image";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionTitle } from "@/components/SectionTitle";
import { COORDINATION_NATIONALE } from "@/lib/constants";

export function LeadershipSection() {
  return (
    <section className="section-padding bg-white dark:bg-upr-dark/50">
      <div className="container-upr">
        <SectionTitle
          eyebrow="Organisation"
          title="Direction et coordination"
          subtitle="La coordination nationale accompagne l'organisation et la mobilisation du parti."
        />

        <AnimatedCard className="overflow-hidden p-0">
          <div className="grid items-stretch lg:grid-cols-2">
            <div className="group relative aspect-[3/4] max-h-[560px] w-full overflow-hidden sm:aspect-[4/5] lg:max-h-none lg:min-h-[520px]">
              <Image
                src={COORDINATION_NATIONALE.image}
                alt={COORDINATION_NATIONALE.imageAlt}
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className="eyebrow mb-2 text-upr-gold">{COORDINATION_NATIONALE.category}</p>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-upr-blue dark:text-upr-gold">
                {COORDINATION_NATIONALE.role}
              </p>
              <h3 className="mb-2 text-2xl font-bold text-upr-navy dark:text-white">{COORDINATION_NATIONALE.name}</h3>
              <p className="mb-3 text-base font-medium text-upr-navy/80 dark:text-white/85">{COORDINATION_NATIONALE.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{COORDINATION_NATIONALE.excerpt}</p>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
