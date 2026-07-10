import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { AdhesionForm } from "@/components/AdhesionForm";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { ADHESION_BLOCK, ADHESION_ENGAGEMENTS, ADHESION_REASONS, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Adhésion UPR",
  description:
    "Rejoindre l'UPR, Union des Patriotes pour la République. Formulaire d'adhésion et engagements du membre.",
};

export default function AdhesionPage() {
  return (
    <>
      <PageHero>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-3 text-upr-gold">Engagement patriotique</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Adhérer à l&apos;UPR</h1>
          <p className="mb-8 text-lg text-white/85">
            Rejoignez l&apos;Union des Patriotes pour la République et prenez part à une action politique fondée sur la devise Dieu - Patrie - Justice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="#formulaire-adhesion">Remplir le formulaire</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-upr-navy">
              <a href={CONTACT.whatsappChannel} target="_blank" rel="noopener noreferrer">
                Canal WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </PageHero>

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <SectionTitle eyebrow="Pourquoi adhérer ?" title="Servir sans se servir" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADHESION_REASONS.map((reason, i) => (
              <AnimatedCard key={reason.title} delay={i * 0.1} className="text-center">
                <h3 className="mb-2 font-bold text-upr-blue dark:text-upr-gold">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section id="formulaire-adhesion" className="section-padding">
        <div className="container-upr grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Formulaire d'adhésion" title={ADHESION_BLOCK.title} />
            <div className="group relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 dark:border-white/12">
              <Image
                src={ADHESION_BLOCK.image}
                alt={ADHESION_BLOCK.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mb-6 text-muted-foreground">{ADHESION_BLOCK.excerpt}</p>
            <p className="mb-6 text-muted-foreground">
              Remplissez le formulaire ci-contre. Votre demande sera transmise au coordinateur national via WhatsApp pour traitement selon les procédures internes du parti.
            </p>
            <AnimatedCard>
              <h3 className="mb-3 font-semibold text-upr-navy dark:text-white">Engagement du membre</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {ADHESION_ENGAGEMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-upr-gold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          </div>
          <AdhesionForm />
        </div>
      </section>
    </>
  );
}