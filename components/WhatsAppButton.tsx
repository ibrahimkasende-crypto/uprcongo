"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <Link
      href={CONTACT.whatsappChannel}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Rejoindre le canal WhatsApp officiel de l'UPR"
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}
