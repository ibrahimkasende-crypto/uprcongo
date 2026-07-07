import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { RdcTerritoryStrip } from "@/components/RdcTerritoryStrip";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  DOCUMENTS,
  PROJECT_DOMAINS,
  PROJECT_PRINCIPLES,
  PROJECT_QUOTES,
} from "@/lib/constants";
import { IMAGES } from "@/lib/assets";
import { Download } from "lucide-react";

const FoundingDocumentsSection = dynamic(
  () =>
    import("@/components/FoundingDocumentsSection").then((mod) => mod.FoundingDocumentsSection),
  {
    loading: () => (
      <section className="section-padding section-defer">
        <div className="container-upr">
          <div className="mx-auto h-80 max-w-4xl animate-pulse rounded-2xl bg-muted/40" aria-hidden="true" />
        </div>
      </section>
    ),
  }
);

export const metadata: Metadata = {
  title: "Projet de société",
  description:
    "Projet de société de l'UPR pour la résurrection du Congo, la démocratie, la justice, la relance économique, la bonne gouvernance et la souveraineté nationale.",
};

const DOC_COVERS: Record<string, string> = {
  "projet-de-societe-upr": IMAGES.documents.projetSociete,
};

export default function ProjetSocietePage() {
  return (
    <>
      <PageHero>
        <p className="eyebrow mb-3 text-upr-gold">Programme politique</p>
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Projet de société de l&apos;UPR</h1>
        <p className="max-w-3xl text-lg text-white/85">
          Pour la résurrection du Congo, la démocratie, la justice et le développement durable.
        </p>
      </PageHero>

      <RdcTerritoryStrip />

      <section className="section-padding section-defer">
        <div className="container-upr">
          <div className="upr-card max-w-4xl">
            <h2 className="mb-4 text-2xl font-bold text-upr-navy dark:text-white">La résurrection du Congo</h2>
            <p className="leading-relaxed text-muted-foreground">
              L&apos;objectif prioritaire de l&apos;UPR est d&apos;instaurer une démocratie réelle, de conduire le pays au
              développement et d&apos;apporter des solutions politiques, sociales, administratives, économiques et
              culturelles aux défis nationaux.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-defer bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <SectionTitle eyebrow="Cinq grands principes" title="Relancer, reconstruire, renaître" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PROJECT_PRINCIPLES.map((principle) => (
              <div key={principle.title} className="upr-card">
                <h3 className="mb-2 font-bold text-upr-blue dark:text-upr-gold">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-defer">
        <div className="container-upr">
          <SectionTitle eyebrow="Domaines prioritaires" title="Les chantiers de la reconstruction" />
          <div className="flex flex-wrap gap-3">
            {PROJECT_DOMAINS.map((domain) => (
              <span
                key={domain}
                className="rounded-full border border-black/10 bg-white/90 px-5 py-3 text-sm font-semibold text-upr-navy dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-defer bg-white dark:bg-upr-dark/50">
        <div className="container-upr grid gap-8 md:grid-cols-3">
          {PROJECT_QUOTES.map((quote) => (
            <div key={quote} className="upr-card text-center">
              <blockquote className="text-lg font-medium italic text-upr-navy dark:text-white">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      <FoundingDocumentsSection />

      <section className="section-padding section-defer bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <SectionTitle eyebrow="Document à télécharger" title="Projet de société officiel" />
          <div className="mx-auto max-w-2xl">
            {DOCUMENTS.map((doc) => (
              <div key={doc.slug} className="upr-card overflow-hidden p-0">
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-5 p-0 md:flex-row md:items-stretch md:gap-0"
                >
                  <div className="relative h-48 w-full shrink-0 md:h-auto md:w-48">
                    <Image
                      src={DOC_COVERS[doc.slug] ?? IMAGES.documents.projetSociete}
                      alt={`Couverture - ${doc.title}`}
                      fill
                      className="object-cover"
                      sizes="192px"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-8">
                    <p className="eyebrow mb-2">{doc.type}</p>
                    <h3 className="mb-2 text-2xl font-bold text-upr-navy group-hover:text-upr-blue dark:text-white dark:group-hover:text-upr-gold">
                      {doc.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground">{doc.description}</p>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-upr-red px-5 py-2.5 text-sm font-semibold text-white transition-transform group-hover:scale-[1.02]">
                      <Download className="h-4 w-4" /> Télécharger le PDF
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="gold">
              <Link href="/adhesion/">Adhérer</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact/">Contacter l&apos;UPR</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}