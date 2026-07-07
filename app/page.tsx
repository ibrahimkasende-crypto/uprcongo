import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ValuesSection } from "@/components/ValuesSection";
import { PresidentSection } from "@/components/PresidentSection";
import { VisionSection } from "@/components/VisionSection";
import { StatsSection } from "@/components/StatsSection";
import { ProjectAxes } from "@/components/ProjectAxes";
import { NewsCard } from "@/components/NewsCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { NEWS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <PresidentSection />
      <VisionSection />
      <StatsSection />
      <ProjectAxes />

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionTitle eyebrow="Vie du parti" title="Actualités de l'UPR" className="mb-0" />
            <Link
              href="/actualites/"
              className="text-sm font-semibold text-upr-blue transition-colors hover:text-upr-red dark:text-upr-gold"
            >
              Toutes les actualités →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {NEWS.map((news, i) => (
              <NewsCard
                key={news.slug}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                category={news.category}
                image={news.image}
                imageAlt={news.imageAlt}
                slug={news.slug}
                featured={news.featured}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="hero-bg section-padding">
        <div className="container-upr text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Rejoindre l&apos;UPR</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85">
            Rejoignez un mouvement patriotique et républicain engagé pour servir le Congo sans se servir.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/adhesion/">Devenir membre</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
