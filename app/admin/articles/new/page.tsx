"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return <AdminShell>
    <div className="mb-6"><h1 className="text-3xl font-bold">Nouvel article</h1><p className="mt-1 text-white/65">Créez une publication officielle.</p></div>
    <ArticleForm />
  </AdminShell>;
}
