import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { AnimatedCard } from "@/components/AnimatedCard";
import { LeadershipSection } from "@/components/LeadershipSection";
import { PresidentPortrait } from "@/components/PresidentPortrait";
import { SectionTitle } from "@/components/SectionTitle";
import { ValuesSection } from "@/components/ValuesSection";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/assets";
import { PARTY, PARTY_PRINCIPLES, VISION_CARDS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Le Parti",
  description:
    "Découvrez l'UPR, Union des Patriotes pour la République, parti politique républicain congolais fondé sur le patriotisme, la justice, la démocratie et le service.",
};

export default function PartiPage() {
  return (
    <>
      <PageHero>
          <p className="eyebrow mb-3 text-upr-gold">{PARTY.fullName}</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Le Parti</h1>
          <p className="max-w-3xl text-lg text-white/85">
            L&apos;UPR est un parti politique républicain congolais fondé sur les valeurs de patriotisme,
            de souveraineté nationale, de démocratie, de justice sociale, de bonne gouvernance et de
            service désintéressé de la nation.
          </p>
      </PageHero>

      <section className="section-padding">
        <div className="container-upr">
          <AnimatedCard className="max-w-4xl">
            <h2 className="mb-4 text-2xl font-bold text-upr-navy dark:text-white">Historique</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">{PARTY.history}</p>
            <p className="leading-relaxed text-muted-foreground">
              Le Président national est le {PARTY.president.name}.
            </p>
          </AnimatedCard>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <SectionTitle
            eyebrow="Identité politique"
            title="Un parti républicain au service de l'intérêt général"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VISION_CARDS.map((card, i) => (
              <AnimatedCard key={card.title} delay={i * 0.1}>
                <h3 className="mb-2 text-lg font-bold text-upr-blue dark:text-upr-gold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <ValuesSection />

      <section className="section-padding">
        <div className="container-upr">
          <SectionTitle eyebrow="Valeurs" title="Les principes de l'UPR" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTY_PRINCIPLES.map((principle, i) => (
              <AnimatedCard key={principle.title} delay={i * 0.08}>
                <h3 className="mb-2 text-lg font-bold text-upr-navy dark:text-white">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Symbole et devise" title={PARTY.motto} />
            <p className="mb-2 text-muted-foreground">Devise : {PARTY.motto}</p>
            <p className="mb-2 text-muted-foreground">Slogan : {PARTY.slogan}</p>
            <p className="mb-2 text-muted-foreground">Message officiel : {PARTY.officialMessage}</p>
            <p className="text-muted-foreground">Cri de ralliement : {PARTY.rallyingCall}</p>
          </div>
          <AnimatedCard className="flex justify-center p-8">
            <Image src={PARTY.logo} alt={PARTY.logoAlt} width={320} height={320} />
          </AnimatedCard>
        </div>
      </section>

      <section id="president" className="section-padding">
        <div className="container-upr grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="president-panel mx-auto w-full max-w-lg rounded-3xl p-5 sm:p-6">
            <PresidentPortrait />
          </div>
          <div>
            <SectionTitle eyebrow="Président national" title={PARTY.president.name} />
            <AnimatedCard className="border-l-4 border-upr-red bg-upr-light/80 dark:bg-white/5">
              <p className="text-lg leading-relaxed text-[#4a5568] dark:text-[#a0aec0]">{PARTY.president.extendedBio}</p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <LeadershipSection />

      <section className="hero-bg section-padding">
        <div className="container-upr text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Agir avec l&apos;UPR</h2>
          <p className="mb-8 text-white/85">Un engagement républicain pour prendre le Congo en mains.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/projet-societe/">Lire le projet de société</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-upr-navy">
              <Link href="/adhesion/">Adhérer à l&apos;UPR</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
