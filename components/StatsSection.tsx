"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { PARTY_STATS } from "@/lib/constants";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="hero-bg section-padding">
      <div className="container-upr">
        <div className="mb-10 text-center">
          <p className="eyebrow text-upr-gold">Chiffres clés</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">L&apos;UPR en quelques repères</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PARTY_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-6 text-center"
            >
              <p className="mb-2 text-3xl font-extrabold text-upr-gold md:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm font-medium text-white/85">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
