import type { ActualiteItem } from "@/lib/content";

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  image_alt: string | null;
  featured: boolean;
  status: "draft" | "published";
  author_email: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export const ARTICLE_CATEGORIES = [
  "Communiqué",
  "Déclaration",
  "Mobilisation",
  "Activité",
  "Meeting",
  "Vie du parti",
  "Projet de société",
] as const;

export function articleToNewsItem(article: Article): ActualiteItem {
  return {
    slug: article.slug,
    title: article.title,
    date: article.published_at || article.created_at,
    category: article.category,
    featured: article.featured,
    image: article.image_url || "/uploads/actualite-mobilisation.svg",
    imageAlt: article.image_alt || article.title,
    excerpt: article.excerpt,
    author: article.author_email || "UPR Congo",
    body: article.content,
  };
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
