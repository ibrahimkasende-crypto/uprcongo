import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getActualiteBySlug, getActualites } from "@/lib/content";

interface ActualitePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getActualites().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ActualitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getActualiteBySlug(slug);
  if (!article) return { title: "Article introuvable" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function ActualiteDetailPage({ params }: ActualitePageProps) {
  const { slug } = await params;
  const article = getActualiteBySlug(slug);
  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="section-padding bg-upr-navy text-white">
        <div className="container-upr max-w-4xl">
          <Link
            href="/actualites/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-upr-gold transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux actualités
          </Link>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-upr-gold">{article.category}</p>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{article.title}</h1>
          <p className="mb-4 text-lg text-white/85">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={article.date}>{formattedDate}</time>
            </span>
            <span>Par {article.author}</span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-upr max-w-4xl">
          <div className="mb-10 overflow-hidden rounded-2xl border border-black/10 dark:border-white/12">
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={1200}
              height={675}
              className="aspect-[16/10] w-full object-cover"
              priority
            />
          </div>
          <MarkdownContent
            markdown={article.body}
            className="article-body space-y-4 text-base leading-relaxed text-muted-foreground [&_blockquote]:border-l-4 [&_blockquote]:border-upr-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-upr-navy [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-upr-navy [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed dark:[&_h2]:text-white dark:[&_h3]:text-white"
          />
        </div>
      </section>
    </>
  );
}