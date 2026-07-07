"use client";

import { Cross, Flag, Scale } from "lucide-react";
import Image from "next/image";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionTitle } from "@/components/SectionTitle";
import { IMAGES } from "@/lib/assets";
import { VALUES } from "@/lib/constants";

const VALUE_ICONS = [Cross, Flag, Scale] as const;

const VALUE_IMAGES = [
  { src: IMAGES.values.dieu, alt: "Symbole de la référence morale - Dieu" },
  { src: IMAGES.values.patrie, alt: "Paysage africain symbolisant la Patrie congolaise" },
  { src: IMAGES.values.justice, alt: "Balance de la justice et de l'État de droit" },
] as const;

export function ValuesSection() {
  return (
    <section className="relative overflow-hidden bg-upr-navy py-16 md:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),transparent_45%,rgba(215,25,32,0.08))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-upr-gold/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-upr-gold/60 to-transparent" />

      <div className="container-upr relative">
        <SectionTitle
          eyebrow="Identité institutionnelle"
          title="Dieu - Patrie - Justice"
          subtitle="La devise républicaine qui guide l'action et la parole de l'UPR."
          align="center"
          className="mb-12 [&_h2]:text-white [&_p]:text-white/75 [&_.eyebrow]:text-upr-gold"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value, i) => {
            const Icon = VALUE_ICONS[i];
            const bgImage = VALUE_IMAGES[i];
            return (
              <AnimatedCard
                key={value.title}
                delay={i * 0.1}
                className="relative overflow-hidden border border-upr-gold/20 bg-white/95 text-center backdrop-blur-sm dark:bg-upr-dark/80"
              >
                <div className="relative -mx-6 -mt-6 mb-4 h-32 overflow-hidden">
                  <Image
                    src={bgImage.src}
                    alt={bgImage.alt}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-upr-dark dark:via-upr-dark/60" />
                </div>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-upr-blue/10 dark:bg-upr-gold/15">
                  <Icon className="h-7 w-7 text-upr-blue dark:text-upr-gold" aria-hidden />
                </div>
                <h3 className="mb-3 text-xl font-bold text-upr-navy dark:text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
