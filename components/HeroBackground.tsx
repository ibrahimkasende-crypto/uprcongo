"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SITE_BACKGROUND } from "@/lib/constants";

interface HeroBackgroundProps {
  variant?: "hero" | "page";
  className?: string;
  children: React.ReactNode;
}

export function HeroBackground({
  variant = "hero",
  className,
  children,
}: HeroBackgroundProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const isHero = variant === "hero";

  return (
    <section
      ref={ref}
      className={cn(
        "hero-background relative overflow-hidden",
        isHero ? "min-h-screen" : "min-h-[42vh]",
        className
      )}
    >
      <motion.div
        style={{
          backgroundImage: `url(${SITE_BACKGROUND})`,
          ...(isHero ? { y: bgY } : {}),
        }}
        className={cn(
          "hero-background__image absolute inset-0 bg-cover bg-center bg-no-repeat",
          isHero && "-top-[8%] h-[116%]"
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "hero-background__overlay absolute inset-0",
          isHero ? "hero-background__overlay--hero" : "hero-background__overlay--page"
        )}
        aria-hidden="true"
      />

      <motion.div
        style={isHero ? { opacity: contentOpacity } : undefined}
        className="relative z-10 h-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
