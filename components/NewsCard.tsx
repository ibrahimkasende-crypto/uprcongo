"use client";

import Image from "next/image";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Calendar, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  imageAlt: string;
  slug: string;
  featured?: boolean;
  delay?: number;
  imagePosition?: "top" | "center";
  imageAspect?: "landscape" | "portrait";
  fullContent?: readonly string[];
  isExpanded?: boolean;
  onToggle?: () => void;
  author?: string;
  showAuthor?: boolean;
}

export function NewsCard({
  title,
  excerpt,
  date,
  category,
  image,
  imageAlt,
  slug,
  featured = false,
  delay = 0,
  imagePosition = "center",
  imageAspect = "landscape",
  fullContent,
  isExpanded = false,
  onToggle,
  author,
  showAuthor = false,
}: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const aspectClass =
    imageAspect === "portrait"
      ? "aspect-[3/4] sm:aspect-[4/5]"
      : featured
        ? "aspect-[16/10] lg:aspect-[16/9]"
        : "aspect-[16/10]";

  const objectClass = imagePosition === "top" ? "object-top" : "object-center";
  const contentId = `news-content-${slug}`;
  const isExpandable = Boolean(fullContent?.length && onToggle);

  return (
    <AnimatedCard delay={delay} className={featured ? "lg:col-span-2" : ""}>
      <article className="flex flex-col gap-4">
        <div className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/12">
          <Image
            src={image}
            alt={imageAlt}
            width={760}
            height={475}
            className={`${aspectClass} w-full object-cover ${objectClass} transition-transform duration-500 group-hover:scale-[1.02]`}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            aria-hidden="true"
          />
          <span className="absolute left-3 top-3 rounded-full bg-upr-red px-3 py-1 text-xs font-semibold text-white">
            {category}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
          <h3 className={`font-bold text-upr-navy dark:text-white ${featured ? "text-2xl" : "text-lg"}`}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

          {isExpandable ? (
            <>
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
                    <div className="mt-2 space-y-3 rounded-xl border border-black/10 border-l-4 border-l-upr-gold bg-upr-light/80 p-4 dark:border-white/10 dark:bg-white/5">
                      {fullContent!.map((paragraph) => (
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-upr-blue transition-colors hover:text-upr-red dark:text-upr-gold dark:hover:text-white"
              >
                {isExpanded ? "Voir moins" : "Voir plus"}
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </>
          ) : null}

          {showAuthor && author ? (
            <p className="text-xs text-muted-foreground">Par {author}</p>
          ) : null}
        </div>
      </article>
    </AnimatedCard>
  );
}
