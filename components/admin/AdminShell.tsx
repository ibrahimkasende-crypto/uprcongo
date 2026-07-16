"use client";

import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { loading, session, logout } = useAdminAuth();

  if (loading) {
    return <div className="min-h-[60vh] bg-upr-dark p-12 text-center text-white">Vérification de l’accès…</div>;
  }

  if (!session) return null;

  return (
    <section className="min-h-[70vh] bg-upr-dark py-8 text-white">
      <div className="container-upr">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-upr-gold">Administration UPR Congo</p>
            <p className="text-xs text-white/60">{session.user.email}</p>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold">
            <Link className="rounded-md px-3 py-2 hover:bg-white/10" href="/admin/dashboard/">
              Dashboard
            </Link>
            <Link className="rounded-md px-3 py-2 hover:bg-white/10" href="/admin/articles/">
              Articles
            </Link>
            <Link
              className="rounded-md bg-upr-gold px-3 py-2 text-upr-navy hover:bg-upr-yellow"
              href="/admin/articles/new/"
            >
              Nouvel article
            </Link>
            <Link className="rounded-md px-3 py-2 hover:bg-white/10" href="/">
              Voir le site
            </Link>
            <button className="rounded-md px-3 py-2 hover:bg-white/10" onClick={() => void logout()}>
              Déconnexion
            </button>
          </nav>
        </header>
        {children}
      </div>
    </section>
  );
}
