"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, PencilLine, Send } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { Article } from "@/lib/articles";
import { supabase } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    void supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setArticles((data as Article[] | null) || []));
  }, []);

  const published = articles.filter((article) => article.status === "published");
  const drafts = articles.length - published.length;
  const latest = [...published].sort((a, b) =>
    (b.published_at || "").localeCompare(a.published_at || "")
  )[0];

  const stats = [
    { label: "Total articles", value: articles.length, icon: FileText },
    { label: "Articles publiés", value: published.length, icon: Send },
    { label: "Brouillons", value: drafts, icon: PencilLine },
  ];

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="mt-2 text-white/70">Gérez les publications officielles de l’UPR Congo.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <Icon className="mb-4 h-6 w-6 text-upr-gold" />
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-white/65">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-white/60">Dernier article publié</p>
        <p className="mt-1 font-semibold">{latest?.title || "Aucun article publié"}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/articles/new/" className="rounded-lg bg-upr-gold px-4 py-3 font-bold text-upr-navy">
          Nouvel article
        </Link>
        <Link href="/admin/articles/" className="rounded-lg border border-white/20 px-4 py-3 font-bold">
          Gérer les articles
        </Link>
        <Link href="/" className="rounded-lg border border-white/20 px-4 py-3 font-bold">
          Voir le site
        </Link>
      </div>
    </AdminShell>
  );
}
