"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { Article } from "@/lib/articles";
import { supabase } from "@/lib/supabase/client";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

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
      articles.filter(
        (article) =>
          (filter === "all" || article.status === filter) &&
          article.title.toLowerCase().includes(query.toLowerCase())
      ),
    [articles, filter, query]
  );

  const remove = async (article: Article) => {
    if (!confirm(`Supprimer définitivement « ${article.title} » ?`)) return;
    const { error } = await supabase.from("articles").delete().eq("id", article.id);
    if (error) setMessage(error.message);
    else {
      setMessage("Article supprimé.");
      void load();
    }
  };

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="mt-1 text-sm text-white/65">Publiez, modifiez ou supprimez les actualités.</p>
        </div>
        <Link href="/admin/articles/new/" className="rounded-lg bg-upr-gold px-4 py-3 font-bold text-upr-navy">
          Nouvel article
        </Link>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un titre…"
          className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white outline-none sm:flex-1"
        />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-lg border border-white/15 bg-upr-navy px-3 py-2"
        >
          <option value="all">Tous les statuts</option>
          <option value="published">Publié</option>
          <option value="draft">Brouillon</option>
        </select>
      </div>

      {message && (
        <p role="status" className="mb-4 rounded-lg bg-white/10 px-3 py-2 text-sm">
          {message}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-white/10 text-white/70">
            <tr>
              <th className="p-4">Titre</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Auteur</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((article) => (
              <tr key={article.id} className="border-t border-white/10">
                <td className="p-4 font-semibold">{article.title}</td>
                <td>{article.category}</td>
                <td>
                  <span className={article.status === "published" ? "text-green-300" : "text-upr-gold"}>
                    {article.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td>{new Date(article.published_at || article.created_at).toLocaleDateString("fr-FR")}</td>
                <td>{article.author_email || "—"}</td>
                <td className="p-4">
                  <Link
                    className="mr-3 text-upr-gold hover:underline"
                    href={`/admin/articles/edit/?id=${article.id}`}
                  >
                    Modifier
                  </Link>
                  <button className="text-red-300 hover:underline" onClick={() => void remove(article)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayed.length === 0 && <p className="py-8 text-center text-white/60">Aucun article trouvé.</p>}
    </AdminShell>
  );
}
