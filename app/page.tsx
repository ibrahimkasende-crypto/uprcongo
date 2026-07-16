import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { ValuesSection } from "@/components/ValuesSection";
import { PresidentSection } from "@/components/PresidentSection";
import { VisionSection } from "@/components/VisionSection";
import { StatsSection } from "@/components/StatsSection";
import { ProjectAxes } from "@/components/ProjectAxes";
import { PublicNews } from "@/components/PublicNews";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { ADHESION_BLOCK } from "@/lib/constants";

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
          <PublicNews limit={3} />
        </div>
      </section>

      <section className="section-padding bg-upr-navy dark:bg-upr-dark">
        <div className="container-upr grid items-center gap-10 lg:grid-cols-2">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/12">
            <Image
              src={ADHESION_BLOCK.image}
              alt={ADHESION_BLOCK.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{ADHESION_BLOCK.title}</h2>
            <p className="mb-8 text-lg text-white/85">{ADHESION_BLOCK.excerpt}</p>
            <Button asChild variant="gold" size="lg">
              <Link href="/adhesion/">Devenir membre</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
