"use client";

import { useMemo, useState } from "react";
import { NewsCardsGrid } from "@/components/NewsCardsGrid";
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
      <NewsCardsGrid items={filteredNews} className="gap-8" showAuthor />
      {filteredNews.length === 0 && (
        <p className="text-center text-muted-foreground">Aucune actualité dans cette catégorie pour le moment.</p>
      )}
    </>
  );
}
