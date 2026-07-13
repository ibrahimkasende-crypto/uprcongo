"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Calendar, ArrowRight } from "lucide-react";

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

  return (
    <AnimatedCard delay={delay} className={featured ? "lg:col-span-2" : ""}>
      <article className="flex flex-col gap-4">
        <Link href={`/actualites/${slug}/`} className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/12">
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
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
          <h3 className={`font-bold text-upr-navy dark:text-white ${featured ? "text-2xl" : "text-lg"}`}>
            <Link href={`/actualites/${slug}/`} className="transition-colors hover:text-upr-blue dark:hover:text-upr-gold">
              {title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

          <Link
            href={`/actualites/${slug}/`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-upr-blue transition-colors hover:text-upr-red dark:text-upr-gold dark:hover:text-white"
          >
            Lire l&apos;article
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {showAuthor && author ? (
            <p className="text-xs text-muted-foreground">Par {author}</p>
          ) : null}
        </div>
      </article>
    </AnimatedCard>
  );
}