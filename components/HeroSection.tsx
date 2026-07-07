"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/HeroBackground";
import { PARTY } from "@/lib/constants";

export function HeroSection() {
  return (
    <HeroBackground variant="hero">
      <div className="container-upr flex min-h-screen flex-col items-center justify-center gap-12 py-24 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="eyebrow text-upr-gold"
          >
            {PARTY.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
          >
            UPR Congo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="text-xl font-semibold text-white/95 sm:text-2xl md:text-3xl"
          >
            {PARTY.fullName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6 }}
            className="gradient-text text-2xl font-bold md:text-4xl"
          >
            {PARTY.motto}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.6 }}
            className="text-lg font-medium italic text-white/90 md:text-xl"
          >
            {PARTY.slogan}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl font-extrabold leading-snug text-white md:text-2xl"
          >
            {PARTY.officialMessage}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-lg font-semibold text-upr-yellow md:text-xl"
          >
            {PARTY.rallyingCall}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 md:text-lg lg:mx-0"
          >
            {PARTY.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 pt-2 lg:justify-start"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/parti/">Découvrir le parti</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/adhesion/">Adhérer maintenant</Link>
            </Button>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.88, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.85, ease: "easeOut" }}
          className="flex w-full max-w-sm flex-col items-center gap-6 lg:max-w-md"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-full bg-upr-gold/20 blur-2xl" aria-hidden="true" />
            <Image
              src={PARTY.logoTransparent}
              alt={PARTY.logoAlt}
              width={180}
              height={180}
              className="relative drop-shadow-2xl"
              priority
            />
          </motion.div>

          <div className="president-panel w-full rounded-3xl p-6 text-center">
            <p className="eyebrow mb-3 text-upr-gold">Devise officielle</p>
            <p className="gradient-text mb-3 text-2xl font-bold">{PARTY.motto}</p>
            <p className="mb-2 text-sm font-medium italic text-white/90">{PARTY.slogan}</p>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-upr-gold/60 to-transparent" />
            <p className="text-sm font-semibold leading-relaxed text-white/85">{PARTY.officialMessage}</p>
            <p className="mt-3 text-sm font-bold text-upr-yellow">{PARTY.rallyingCall}</p>
          </div>
        </motion.aside>
      </div>
    </HeroBackground>
  );
}

