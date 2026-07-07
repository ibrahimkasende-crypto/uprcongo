import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { AnimatedCard } from "@/components/AnimatedCard";
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

export const metadata: Metadata = {
  title: "Projet de société",
  description:
    "Projet de société de l'UPR pour la résurrection du Congo, la démocratie, la justice, la relance économique, la bonne gouvernance et la souveraineté nationale.",
};

const DOC_COVERS: Record<string, string> = {
  "projet-de-societe-upr": IMAGES.documents.projetSociete,
};

const KINSHASA_STRIP = [
  { src: IMAGES.kinshasa.echangeurLimete, alt: "Échangeur de Limete, Kinshasa - photo client UPR" },
  { src: IMAGES.kinshasa.skyline, alt: "Skyline de Kinshasa au crépuscule" },
  { src: IMAGES.kinshasa.fleuve, alt: "Fleuve Congo - symbole de souveraineté nationale" },
  { src: IMAGES.kinshasa.avenue, alt: "Avenue urbaine à Kinshasa" },
];

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

      <section className="section-padding overflow-hidden">
        <div className="container-upr mb-8">
          <SectionTitle eyebrow="Kinshasa" title="La capitale au cœur du projet" align="center" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {KINSHASA_STRIP.map((img) => (
            <div key={img.src} className="relative h-48 w-72 shrink-0 snap-start overflow-hidden rounded-2xl md:h-56 md:w-96">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="384px" />
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-upr">
          <AnimatedCard className="max-w-4xl">
            <h2 className="mb-4 text-2xl font-bold text-upr-navy dark:text-white">La résurrection du Congo</h2>
            <p className="leading-relaxed text-muted-foreground">
              L&apos;objectif prioritaire de l&apos;UPR est d&apos;instaurer une démocratie réelle, de conduire le pays au
              développement et d&apos;apporter des solutions politiques, sociales, administratives, économiques et
              culturelles aux défis nationaux.
            </p>
          </AnimatedCard>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <SectionTitle eyebrow="Cinq grands principes" title="Relancer, reconstruire, renaître" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PROJECT_PRINCIPLES.map((principle, i) => (
              <AnimatedCard key={principle.title} delay={i * 0.1}>
                <h3 className="mb-2 font-bold text-upr-blue dark:text-upr-gold">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-upr">
          <SectionTitle eyebrow="Domaines prioritaires" title="Les chantiers de la reconstruction" />
          <div className="flex flex-wrap gap-3">
            {PROJECT_DOMAINS.map((domain, i) => (
              <AnimatedCard key={domain} delay={i * 0.03} className="inline-flex px-5 py-3">
                <span className="text-sm font-semibold text-upr-navy dark:text-white">{domain}</span>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr grid gap-8 md:grid-cols-3">
          {PROJECT_QUOTES.map((quote, i) => (
            <AnimatedCard key={quote} delay={i * 0.15} className="text-center">
              <blockquote className="text-lg font-medium italic text-upr-navy dark:text-white">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-upr">
          <SectionTitle eyebrow="Documents institutionnels" title="Projet de société et textes fondateurs" />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <AnimatedCard className="overflow-hidden p-0">
              <div className="relative aspect-[3/4] w-full">
                <Image src={IMAGES.documents.acteFondateur} alt="Couverture - Acte fondateur UPR 2014" fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold">Acte fondateur</p>
              </div>
            </AnimatedCard>
            <AnimatedCard className="overflow-hidden p-0">
              <div className="relative aspect-[3/4] w-full">
                <Image src={IMAGES.documents.protocoleAccord} alt="Couverture - Protocole d'accord UPR" fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold">Protocole d&apos;accord</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <SectionTitle eyebrow="Document à télécharger" title="Projet de société officiel" />
          <div className="mx-auto max-w-2xl">
            {DOCUMENTS.map((doc, i) => (
              <AnimatedCard key={doc.slug} delay={i * 0.1} className="overflow-hidden p-0">
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
              </AnimatedCard>
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
