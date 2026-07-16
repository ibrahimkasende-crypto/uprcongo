"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { MarkdownContent } from "@/components/MarkdownContent";
import { articleToNewsItem, type Article } from "@/lib/articles";
import { getActualiteBySlug, type ActualiteItem } from "@/lib/content";
import { supabase } from "@/lib/supabase/client";

function PublicArticleContent() {
  const slug = useSearchParams().get("slug");
  const [article, setArticle] = useState<ActualiteItem | null>(() =>
    slug ? getActualiteBySlug(slug) || null : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    void supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data }) => {
        if (data) setArticle(articleToNewsItem(data as Article));
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-upr">Chargement de l’article…</div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="section-padding">
        <div className="container-upr">
          <h1 className="text-3xl font-bold">Article introuvable</h1>
          <Link className="mt-5 inline-block text-upr-gold" href="/actualites/">
            Retour aux actualités
          </Link>
        </div>
      </section>
    );
  }

  const date = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      await navigator.share({ title: article.title, text: article.excerpt, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  };

  return (
    <>
      <section className="section-padding bg-upr-navy text-white">
        <div className="container-upr max-w-4xl">
          <Link
            href="/actualites/"
            className="mb-6 inline-flex items-center gap-2 font-semibold text-upr-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
          <p className="mb-3 text-sm font-semibold uppercase text-upr-gold">{article.category}</p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">{article.title}</h1>
          <p className="mb-4 text-lg text-white/85">{article.excerpt}</p>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
            <span>Par {article.author}</span>
            <button
              type="button"
              onClick={() => void share()}
              className="inline-flex items-center gap-2 text-upr-gold hover:text-white"
            >
              <Share2 className="h-4 w-4" />
              Partager
            </button>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-upr max-w-4xl">
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={1200}
            height={675}
            className="mb-10 w-full rounded-2xl object-cover"
          />
          <MarkdownContent
            markdown={article.body}
            className="article-body space-y-4 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold"
          />
        </div>
      </section>
    </>
  );
}

export default function PublicArticlePage() {
  return (
    <Suspense
      fallback={
        <section className="section-padding">
          <div className="container-upr">Chargement de l’article…</div>
        </section>
      }
    >
      <PublicArticleContent />
    </Suspense>
  );
}
