"use client";

import { useEffect, useState } from "react";
import { NewsCardsGrid } from "@/components/NewsCardsGrid";
import { NewsList } from "@/components/NewsList";
import { articleToNewsItem, type Article } from "@/lib/articles";
import { getActualites, type ActualiteItem } from "@/lib/content";
import { supabase } from "@/lib/supabase/client";

function orderNews(items: ActualiteItem[]) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function PublicNews({ list = false, limit }: { list?: boolean; limit?: number }) {
  const [items, setItems] = useState<ActualiteItem[]>(() => orderNews(getActualites()));

  useEffect(() => {
    void supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data) return;
        setItems(orderNews((data as Article[]).map(articleToNewsItem)));
      });
  }, []);

  const displayed = typeof limit === "number" ? items.slice(0, limit) : items;
  return list ? <NewsList items={displayed} /> : <NewsCardsGrid items={displayed} />;
}
