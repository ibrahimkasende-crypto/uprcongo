"use client";

import Image from "next/image";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Calendar, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FounderDocumentCardProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  fullContent: readonly string[];
  isExpanded?: boolean;
  onToggle?: () => void;
  delay?: number;
}

export function FounderDocumentCard({
  id,
  title,
  date,
  excerpt,
  image,
  imageAlt,
  fullContent,
  isExpanded = false,
  onToggle,
  delay = 0,
}: FounderDocumentCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const contentId = `founder-content-${id}`;

  return (
    <AnimatedCard delay={delay} className="overflow-hidden p-0">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[3/4] w-full shrink-0">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
          <h3 className="mb-2 text-xl font-bold text-upr-navy dark:text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

          <AnimatePresence initial={false}>
            {isExpanded ? (
              <motion.div
                id={contentId}
                key="content"
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3 rounded-xl border border-black/10 border-l-4 border-l-upr-gold bg-upr-light/80 p-4 dark:border-white/10 dark:bg-white/5">
                  {fullContent.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={contentId}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-upr-blue transition-colors hover:text-upr-red dark:text-upr-gold dark:hover:text-white"
          >
            {isExpanded ? "Voir moins" : "Lire l'extrait"}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-180")}
              aria-hidden="true"
            />
          </button>
        </div>
      </article>
    </AnimatedCard>
  );
}