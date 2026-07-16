"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  FileText,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ARTICLE_CATEGORIES, type Article } from "@/lib/articles";
import { supabase } from "@/lib/supabase/client";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Article | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) setMessage(error.message);
    else setArticles((data as Article[]) || []);
  };

  useEffect(() => {
    void load();
  }, []);

  const displayed = useMemo(
    () =>
      articles.filter((article) => {
        const statusOk = filter === "all" || article.status === filter;
        const categoryOk = category === "all" || article.category === category;
        const queryOk = article.title.toLowerCase().includes(query.toLowerCase());
        return statusOk && categoryOk && queryOk;
      }),
    [articles, filter, category, query]
  );

  const remove = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    const { error } = await supabase.from("articles").delete().eq("id", pendingDelete.id);
    setDeleting(false);
    setPendingDelete(null);
    if (error) setMessage(error.message);
    else {
      setMessage("Article supprimé avec succès.");
      void load();
    }
  };

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="mt-1 text-sm text-white/65">Publiez, modifiez ou supprimez les actualités officielles.</p>
        </div>
        <Link
          href="/admin/articles/new/"
          className="inline-flex items-center gap-2 rounded-lg bg-upr-gold px-4 py-3 font-bold text-upr-navy"
        >
          <PlusCircle className="h-5 w-5" />
          Nouvel article
        </Link>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_180px_200px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un titre…"
            className="w-full rounded-lg border border-white/15 bg-white/10 py-2.5 pl-10 pr-3 text-white outline-none"
          />
        </label>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-lg border border-white/15 bg-upr-navy px-3 py-2.5"
        >
          <option value="all">Tous les statuts</option>
          <option value="published">Publiés</option>
          <option value="draft">Brouillons</option>
        </select>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-white/15 bg-upr-navy px-3 py-2.5"
        >
          <option value="all">Toutes les catégories</option>
          {ARTICLE_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <p role="status" className="mb-4 rounded-lg bg-white/10 px-3 py-2 text-sm">
          {message}
        </p>
      )}

      <div className="space-y-3">
        {displayed.map((article) => (
          <article
            key={article.id}
            className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-full overflow-hidden rounded-lg bg-black/30 sm:h-20 sm:w-32 sm:shrink-0">
              {article.image_url ? (
                <Image src={article.image_url} alt={article.image_alt || article.title} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-white/30">
                  <FileText className="h-7 w-7" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-upr-gold">
                  {article.category}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    article.status === "published" ? "bg-green-500/20 text-green-300" : "bg-upr-gold/20 text-upr-gold"
                  }`}
                >
                  {article.status === "published" ? "Publié" : "Brouillon"}
                </span>
              </div>
              <h2 className="truncate font-bold">{article.title}</h2>
              <p className="mt-1 text-xs text-white/55">
                {new Date(article.published_at || article.created_at).toLocaleDateString("fr-FR")} ·{" "}
                {article.author_email || "UPR Congo"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {article.status === "published" && (
                <Link
                  href={`/actualites/article/?slug=${encodeURIComponent(article.slug)}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  <Eye className="h-4 w-4" />
                  Voir
                </Link>
              )}
              <Link
                href={`/admin/articles/edit/?id=${article.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-upr-gold/40 px-3 py-2 text-sm font-semibold text-upr-gold hover:bg-upr-gold/10"
              >
                <Pencil className="h-4 w-4" />
                Modifier
              </Link>
              <button
                type="button"
                onClick={() => setPendingDelete(article)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/30 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>

      {displayed.length === 0 && (
        <p className="py-10 text-center text-white/60">Aucun article trouvé.</p>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Supprimer cet article ?"
        description="Voulez-vous vraiment supprimer cet article ? Cette action est irréversible."
        loading={deleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => void remove()}
      />
    </AdminShell>
  );
}
