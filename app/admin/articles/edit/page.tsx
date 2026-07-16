"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleForm } from "@/components/admin/ArticleForm";
import type { Article } from "@/lib/articles";
import { supabase } from "@/lib/supabase/client";

function EditArticleContent() {
  const id = useSearchParams().get("id");
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Article introuvable.");
      return;
    }
    void supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: requestError }) => {
        if (requestError) setError("Article introuvable ou accès refusé.");
        else setArticle(data as Article);
      });
  }, [id]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Modifier l’article</h1>
      </div>
      {error && <p role="alert" className="rounded-lg bg-upr-red/20 p-3 text-red-100">{error}</p>}
      {!article && !error && <p className="text-white/70">Chargement de l’article…</p>}
      {article && <ArticleForm article={article} />}
    </>
  );
}

export default function EditArticlePage() {
  return (
    <AdminShell>
      <Suspense fallback={<p className="text-white/70">Chargement de l’article…</p>}>
        <EditArticleContent />
      </Suspense>
    </AdminShell>
  );
}
