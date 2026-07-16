import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { PublicNews } from "@/components/PublicNews";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Actualités officielles de l'UPR - Union des Patriotes pour la République. Mobilisation, déclarations et vie du parti.",
};

export default function ActualitesPage() {

  return (
    <>
      <PageHero>
        <div>
          <p className="eyebrow mb-3 text-upr-gold">Vie du parti</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Actualités de l&apos;UPR</h1>
          <p className="max-w-3xl text-lg text-white/85">
            Suivez les prises de position, mobilisations et annonces officielles de l&apos;Union des Patriotes pour la République.
          </p>
        </div>
      </PageHero>

      <section className="section-padding">
        <div className="container-upr">
          <SectionTitle eyebrow="Dernières nouvelles" title="Publications récentes" />
          <PublicNews list />
        </div>
      </section>
    </>
  );
}