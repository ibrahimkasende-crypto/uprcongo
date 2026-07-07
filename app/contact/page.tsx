import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionTitle } from "@/components/SectionTitle";
import { IMAGES } from "@/lib/assets";
import { CONTACT, CONTACT_FIELDS, CONTACT_VALUES, PARTY } from "@/lib/constants";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact UPR",
  description:
    "Contacter l'UPR, Union des Patriotes pour la République. Coordonnées officielles, formulaire de contact et réseaux sociaux du parti.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 text-upr-gold">À propos et contact</p>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">À propos de l&apos;UPR</h1>
            <p className="text-lg text-white/85">
              L&apos;Union des Patriotes pour la République est un parti politique congolais engagé pour la souveraineté
              nationale, l&apos;État de droit, la justice sociale, la bonne gouvernance et la responsabilité citoyenne.
            </p>
          </div>
          <AnimatedCard className="flex flex-col items-center gap-4 text-center">
            <Image src={PARTY.logoTransparent} alt={PARTY.logoAlt} width={160} height={160} />
            <p className="gradient-text text-xl font-bold">{PARTY.motto}</p>
            <p className="text-lg font-bold text-white">{PARTY.officialMessage}</p>
            <strong className="text-upr-yellow">{PARTY.rallyingCall}</strong>
          </AnimatedCard>
        </div>
      </PageHero>

      <section
        className="section-padding relative overflow-hidden"
        style={{ backgroundImage: `url(${IMAGES.backgrounds.sectionSoft})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-white/92 dark:bg-upr-dark/92" aria-hidden="true" />
        <div className="container-upr relative">
          <SectionTitle eyebrow="Ligne politique" title="Nos champs d'action" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_FIELDS.map((field, i) => (
              <AnimatedCard key={field.title} delay={i * 0.08}>
                <h3 className="mb-2 font-bold text-upr-navy dark:text-white">{field.title}</h3>
                <p className="text-sm text-muted-foreground">{field.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <SectionTitle eyebrow="Valeurs" title="Une action politique responsable" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_VALUES.map((value, i) => (
              <AnimatedCard key={value.title} delay={i * 0.1}>
                <h3 className="mb-2 font-bold text-upr-blue dark:text-upr-gold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-upr grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Coordonnées" title="Nous contacter" />
            <div className="space-y-6">
              {CONTACT.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="glass-strong flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-upr-blue/5"
                >
                  <Mail className="h-6 w-6 text-upr-blue dark:text-upr-gold" />
                  <span className="font-medium">{email}</span>
                </a>
              ))}
              <div className="glass-strong flex items-center gap-4 rounded-xl p-4">
                <MapPin className="h-6 w-6 text-upr-red" />
                <span className="font-medium">{CONTACT.location}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-upr-blue hover:underline dark:text-upr-gold"
                >
                  Facebook →
                </a>
                <a
                  href={CONTACT.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-upr-blue hover:underline dark:text-upr-gold"
                >
                  {CONTACT.whatsappLabel} →
                </a>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
