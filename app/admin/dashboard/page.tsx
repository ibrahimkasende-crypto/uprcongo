"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  LogOut,
  Pencil,
  PlusCircle,
  Star,
} from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { Article } from "@/lib/articles";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    void supabase
      .from("articles")
      .select("*")
      .order("updated_at", { ascending: false })
      .then(({ data }) => setArticles((data as Article[] | null) || []));
  }, []);

  const published = articles.filter((article) => article.status === "published");
  const drafts = articles.filter((article) => article.status === "draft");
  const featured = articles.filter((article) => article.featured);
  const latest = [...published].sort((a, b) =>
    (b.published_at || "").localeCompare(a.published_at || "")
  )[0];
  const recent = articles.slice(0, 5);

  const stats = [
    { label: "Total articles", value: articles.length, icon: FileText },
    { label: "Articles publiés", value: published.length, icon: CheckCircle2 },
    { label: "Brouillons", value: drafts.length, icon: Clock3 },
    { label: "À la une", value: featured.length, icon: Star },
  ];

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="mt-2 text-white/70">Gérez les publications officielles de l’UPR Congo.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <Icon className="mb-4 h-6 w-6 text-upr-gold" />
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-white/65">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="inline-flex items-center gap-2 text-sm text-white/60">
          <Calendar className="h-4 w-4 text-upr-gold" />
          Dernière publication
        </p>
        <p className="mt-1 font-semibold">{latest?.title || "Aucun article publié"}</p>
        {latest?.published_at && (
          <p className="mt-1 text-xs text-white/50">
            {new Date(latest.published_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/articles/new/"
            className="inline-flex items-center gap-2 rounded-lg bg-upr-gold px-4 py-3 font-bold text-upr-navy"
          >
            <PlusCircle className="h-5 w-5" />
            Nouvel article
          </Link>
          <Link
            href="/admin/articles/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 font-bold"
          >
            <FileText className="h-5 w-5" />
            Gérer les articles
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 font-bold"
          >
            <ExternalLink className="h-5 w-5" />
            Voir le site public
          </Link>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/admin/login/");
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 font-bold"
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold">Derniers articles</h2>
        <div className="overflow-hidden rounded-xl border border-white/10">
          {recent.length === 0 && (
            <p className="p-5 text-sm text-white/60">Aucun article pour le moment.</p>
          )}
          {recent.map((article) => (
            <div
              key={article.id}
              className="flex flex-col gap-3 border-t border-white/10 p-4 first:border-t-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{article.title}</p>
                <p className="mt-1 text-xs text-white/55">
                  {article.status === "published" ? "Publié" : "Brouillon"} ·{" "}
                  {new Date(article.published_at || article.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <Link
                href={`/admin/articles/edit/?id=${article.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-upr-gold hover:underline"
              >
                <Pencil className="h-4 w-4" />
                Modifier
              </Link>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
