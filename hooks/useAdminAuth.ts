"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { isAuthorizedAdminEmail } from "@/lib/admin";
import { supabase } from "@/lib/supabase/client";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login/");
  }, [router]);

  useEffect(() => {
    let active = true;

    const validate = async () => {
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session;
      const email = currentSession?.user.email;

      if (!currentSession || !isAuthorizedAdminEmail(email)) {
        await supabase.auth.signOut();
        if (pathname !== "/admin/login") router.replace("/admin/login/");
        if (active) {
          setSession(null);
          setLoading(false);
        }
        return;
      }

      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("id")
        .eq("id", currentSession.user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.auth.signOut();
        router.replace("/admin/login/");
        if (active) {
          setSession(null);
          setLoading(false);
        }
        return;
      }

      if (active) {
        setSession(currentSession);
        setLoading(false);
      }
    };

    void validate();
    const { data: listener } = supabase.auth.onAuthStateChange(() => void validate());
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  return { session, loading, logout };
}
