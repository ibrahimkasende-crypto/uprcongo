import actualitesJson from "@/data/actualites.json";
import communiquesJson from "@/data/communiques.json";
import evenementsJson from "@/data/evenements.json";
import { NEWS_IMAGE_BY_CATEGORY } from "@/lib/assets";

export type ActualiteItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  excerpt: string;
  author: string;
  body: string;
  imagePosition?: "top" | "center";
  imageAspect?: "landscape" | "portrait";
};

export type CommuniqueItem = {
  slug: string;
  title: string;
  date: string;
  reference?: string;
  excerpt: string;
  fichierPdf?: string;
  body: string;
};

export type EvenementItem = {
  slug: string;
  title: string;
  date: string;
  lieu?: string;
  province?: string;
  image?: string;
  excerpt: string;
  body: string;
};

type RawActualite = {
  slug: string;
  titre: string;
  date: string;
  categorie: string;
  featured?: boolean;
  image?: string;
  image_alt?: string;
  description_courte?: string;
  description?: string;
  auteur?: string;
  markdown?: string;
  image_position?: string;
  image_aspect?: string;
};

type RawCommunique = {
  slug: string;
  titre: string;
  date: string;
  reference?: string;
  description?: string;
  fichier_pdf?: string;
  markdown?: string;
};

type RawEvenement = {
  slug: string;
  titre: string;
  date: string;
  lieu?: string;
  province?: string;
  image?: string;
  description?: string;
  markdown?: string;
};

function normalizeImagePath(value?: string, fallback?: string): string {
  const raw = String(value || fallback || "").trim();
  if (!raw) return NEWS_IMAGE_BY_CATEGORY["Vie du parti"] || "/uploads/actualite-mobilisation.svg";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return raw;
  if (raw.startsWith("public/")) return `/${raw.slice("public/".length)}`;
  if (raw.startsWith("assets/uploads/")) return `/${raw.slice("assets/".length)}`;
  return `/${raw.replace(/^\/+/, "")}`;
}

function toDateOnly(value: string): string {
  if (!value) return "";
  return value.slice(0, 10);
}

function mapActualite(item: RawActualite): ActualiteItem {
  return {
    slug: item.slug,
    title: item.titre,
    date: toDateOnly(item.date),
    category: item.categorie || "Vie du parti",
    featured: Boolean(item.featured),
    image: normalizeImagePath(item.image, NEWS_IMAGE_BY_CATEGORY[item.categorie]),
    imageAlt: item.image_alt || item.titre,
    excerpt: item.description_courte || item.description || "",
    author: item.auteur || "Secrétariat National de l'Information et Presse / UPR",
    body: item.markdown || "",
    imagePosition: item.image_position === "top" ? "top" : item.image_position === "center" ? "center" : undefined,
    imageAspect: item.image_aspect === "portrait" ? "portrait" : item.image_aspect === "landscape" ? "landscape" : undefined,
  };
}

function mapCommunique(item: RawCommunique): CommuniqueItem {
  return {
    slug: item.slug,
    title: item.titre,
    date: toDateOnly(item.date),
    reference: item.reference,
    excerpt: item.description || "",
    fichierPdf: item.fichier_pdf,
    body: item.markdown || "",
  };
}

function mapEvenement(item: RawEvenement): EvenementItem {
  return {
    slug: item.slug,
    title: item.titre,
    date: toDateOnly(item.date),
    lieu: item.lieu,
    province: item.province,
    image: item.image ? normalizeImagePath(item.image) : undefined,
    excerpt: item.description || "",
    body: item.markdown || "",
  };
}

export function getActualites(): ActualiteItem[] {
  return (actualitesJson as RawActualite[]).map(mapActualite);
}

export function getActualiteBySlug(slug: string): ActualiteItem | undefined {
  return getActualites().find((item) => item.slug === slug);
}

export function getCommuniques(): CommuniqueItem[] {
  return (communiquesJson as RawCommunique[]).map(mapCommunique);
}

export function getEvenements(): EvenementItem[] {
  return (evenementsJson as RawEvenement[]).map(mapEvenement);
}

export const NEWS_CATEGORIES = [
  "Tous",
  "Communiqué",
  "Déclaration",
  "Mobilisation",
  "Activité",
  "Meeting",
  "Vie du parti",
  "Projet de société",
] as const;