"use client";

import { NewsCard } from "@/components/NewsCard";
import type { ActualiteItem } from "@/lib/content";
import { cn } from "@/lib/utils";

interface NewsCardsGridProps {
  items: ActualiteItem[];
  className?: string;
  showAuthor?: boolean;
}

export function NewsCardsGrid({ items, className, showAuthor = false }: NewsCardsGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-2", className)}>
      {items.map((news, i) => (
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
            imagePosition={news.imagePosition}
            imageAspect={news.imageAspect}
            author={news.author}
            showAuthor={showAuthor}
          />
        </div>
      ))}
    </div>
  );
}