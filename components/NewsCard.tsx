import Image from "next/image";
import Link from "next/link";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Calendar } from "lucide-react";

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
}: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatedCard delay={delay} className={featured ? "lg:col-span-2" : ""}>
      <article className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={imageAlt}
            width={760}
            height={500}
            className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${featured ? "h-64" : "h-48"}`}
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
          <Link
            href={`/actualites/#${slug}`}
            className="inline-flex text-sm font-semibold text-upr-blue transition-colors hover:text-upr-red dark:text-upr-gold"
          >
            Lire plus →
          </Link>
        </div>
      </article>
    </AnimatedCard>
  );
}
