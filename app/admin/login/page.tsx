"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { isAuthorizedAdminEmail } from "@/lib/admin";
import { supabase } from "@/lib/supabase/client";
import { PARTY } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (!session || !isAuthorizedAdminEmail(session.user.email)) return;
      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("id")
        .eq("id", session.user.id)
        .maybeSingle();
      if (profile) router.replace("/admin/dashboard/");
    });
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session || !isAuthorizedAdminEmail(data.user.email)) {
      await supabase.auth.signOut();
      setMessage("Accès non autorisé.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!profile) {
      await supabase.auth.signOut();
      setMessage("Accès non autorisé.");
      setLoading(false);
      return;
    }

    router.replace("/admin/dashboard/");
  }

  return (
    <section className="min-h-[70vh] bg-upr-dark py-16 text-white">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-2xl border border-white/10 bg-upr-navy p-7 shadow-2xl sm:p-10">
          <div className="mb-8 flex items-center gap-4">
            <Image src={PARTY.logo} alt={PARTY.logoAlt} width={58} height={58} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-upr-gold">Espace sécurisé</p>
              <h1 className="text-2xl font-bold">Administration UPR Congo</h1>
            </div>
          </div>
          <p className="mb-7 text-sm leading-relaxed text-white/75">
            Connectez-vous pour gérer les publications officielles.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-white outline-none ring-upr-gold focus:ring-2"
              />
            </label>
            <label className="block text-sm font-medium">
              Mot de passe
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-white outline-none ring-upr-gold focus:ring-2"
              />
            </label>
            {message && (
              <p role="alert" className="rounded-lg bg-upr-red/20 px-3 py-2 text-sm text-red-100">
                {message}
              </p>
            )}
            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-upr-gold px-4 py-3 font-bold text-upr-navy transition hover:bg-upr-yellow disabled:opacity-60"
            >
              <LockKeyhole className="h-4 w-4" />
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
