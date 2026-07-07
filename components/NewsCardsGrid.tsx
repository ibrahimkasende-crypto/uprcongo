"use client";

import { useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { NEWS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NewsItem = (typeof NEWS)[number];

interface NewsCardsGridProps {
  items?: readonly NewsItem[];
  className?: string;
  showAuthor?: boolean;
}

export function NewsCardsGrid({ items = NEWS, className, showAuthor = false }: NewsCardsGridProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const handleToggle = (slug: string) => {
    setExpandedSlug((current) => (current === slug ? null : slug));
  };

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
            imagePosition={"imagePosition" in news ? news.imagePosition : undefined}
            imageAspect={"imageAspect" in news ? news.imageAspect : undefined}
            fullContent={"fullContent" in news ? news.fullContent : undefined}
            isExpanded={expandedSlug === news.slug}
            onToggle={
              "fullContent" in news && news.fullContent
                ? () => handleToggle(news.slug)
                : undefined
            }
            author={news.author}
            showAuthor={showAuthor}
          />
        </div>
      ))}
    </div>
  );
}
