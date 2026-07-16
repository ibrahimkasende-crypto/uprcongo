"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/login/");
  }, [router]);
  return <div className="min-h-[40vh] bg-upr-dark p-10 text-center text-white">Redirection…</div>;
}
