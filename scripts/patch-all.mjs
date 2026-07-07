import fs from "fs";
import path from "path";

const files = {
  "components/VisionSection.tsx": `import { AnimatedCard } from "@/components/AnimatedCard";
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
`,

  "components/StatsSection.tsx": `"use client";

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
`,

  "components/NewsList.tsx": `"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { NEWS, NEWS_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function NewsList() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const filteredNews = useMemo(() => {
    if (activeCategory === "Tous") return NEWS;
    return NEWS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {NEWS_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              activeCategory === category
                ? "bg-upr-blue text-white dark:bg-upr-gold dark:text-upr-navy"
                : "bg-upr-blue/10 text-upr-navy hover:bg-upr-blue/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {filteredNews.map((news, i) => (
          <div key={news.slug} id={news.slug}>
            <NewsCard
              title={news.title}
              excerpt={news.excerpt}
              date={news.date}
              category={news.category}
              image={news.image}
              imageAlt={news.imageAlt}
              slug={news.slug}
              featured={news.featured}
              delay={i * 0.1}
            />
            <p className="mt-4 text-xs text-muted-foreground">Par {news.author}</p>
          </div>
        ))}
      </div>
      {filteredNews.length === 0 && (
        <p className="text-center text-muted-foreground">Aucune actualité dans cette catégorie pour le moment.</p>
      )}
    </>
  );
}
`,
};

for (const [file, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log("wrote", file);
}