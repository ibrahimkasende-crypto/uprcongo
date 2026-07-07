import fs from "fs";

function write(file, content) {
  fs.writeFileSync(file, content);
  console.log("wrote", file);
}

write("components/HeroSection.tsx", `"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PARTY } from "@/lib/constants";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] overflow-hidden hero-bg">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(215,25,32,0.2),transparent_50%)]" />
      </div>

      <motion.div style={{ y, opacity }} className="container-upr relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-20 lg:flex-row lg:gap-16">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="animate-float mx-auto lg:mx-0"
          >
            <Image
              src={PARTY.logo}
              alt={PARTY.logoAlt}
              width={140}
              height={140}
              className="mx-auto drop-shadow-2xl lg:mx-0"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="eyebrow text-upr-gold"
          >
            {PARTY.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            UPR Congo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xl font-semibold text-white/95 sm:text-2xl md:text-3xl"
          >
            {PARTY.fullName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="gradient-text text-2xl font-bold md:text-3xl"
          >
            {PARTY.motto}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-lg font-medium italic text-white/90"
          >
            {PARTY.slogan}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold text-upr-yellow"
          >
            {PARTY.rallyingCall}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="max-w-2xl text-base text-white/85 md:text-lg"
          >
            {PARTY.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/parti/">Découvrir le parti</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/adhesion/">Adhérer maintenant</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-upr-navy">
              <Link href="/projet-societe/">Lire le projet de société</Link>
            </Button>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-strong mt-12 w-full max-w-md rounded-3xl p-6 text-center lg:mt-0"
        >
          <p className="eyebrow mb-2 text-upr-gold">{PARTY.president.title}</p>
          <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">{PARTY.president.name}</h2>
          <div className="relative mx-auto overflow-hidden rounded-2xl">
            <Image
              src={PARTY.president.image}
              alt={PARTY.president.imageAlt}
              width={640}
              height={720}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
`);

write("components/ValuesSection.tsx", `import { Cross, Flag, Scale } from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionTitle } from "@/components/SectionTitle";
import { VALUES } from "@/lib/constants";

const VALUE_ICONS = [Cross, Flag, Scale] as const;

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
            return (
              <AnimatedCard
                key={value.title}
                delay={i * 0.1}
                className="border border-upr-gold/20 bg-white/95 text-center backdrop-blur-sm dark:bg-upr-dark/80"
              >
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
`);

write("components/PresidentSection.tsx", `import Link from "next/link";
import Image from "next/image";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";
import { PARTY } from "@/lib/constants";

export function PresidentSection() {
  return (
    <section className="section-padding bg-white dark:bg-upr-dark/50">
      <div className="container-upr">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedCard className="overflow-hidden p-0">
            <Image
              src={PARTY.president.image}
              alt={PARTY.president.imageAlt}
              width={640}
              height={720}
              className="h-full w-full object-cover"
            />
          </AnimatedCard>
          <div>
            <SectionTitle eyebrow="Président national" title={PARTY.president.name} />
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{PARTY.president.bio}</p>
            <Button asChild>
              <Link href="/parti/#president">Découvrir le leadership</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

write("components/ProjectAxes.tsx", `import Link from "next/link";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";
import { PROJECT_HOME_AXES } from "@/lib/constants";

interface ProjectAxesProps {
  showLink?: boolean;
}

export function ProjectAxes({ showLink = true }: ProjectAxesProps) {
  return (
    <section className="section-padding">
      <div className="container-upr">
        <SectionTitle
          eyebrow="Projet de société"
          title="Un projet de société pour la résurrection du Congo"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_HOME_AXES.map((axis, i) => (
            <AnimatedCard key={axis.title} delay={i * 0.08} className="h-full">
              <h3 className="mb-3 text-lg font-bold text-upr-navy dark:text-white">{axis.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{axis.description}</p>
            </AnimatedCard>
          ))}
        </div>
        {showLink && (
          <Button asChild variant="secondary" className="mt-8">
            <Link href="/projet-societe/">Lire le projet de société</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
`);