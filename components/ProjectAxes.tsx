import Link from "next/link";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";
import { PROJECT_HOME_AXES } from "@/lib/constants";

interface ProjectAxesProps {
  showLink?: boolean;
}

export function ProjectAxes({ showLink = true }: ProjectAxesProps) {
  return (
    <section className="section-padding">
      <div className="container-upr">
        <SectionTitle
          eyebrow="Projet de société"
          title="Un projet de société pour la résurrection du Congo"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_HOME_AXES.map((axis, i) => (
            <AnimatedCard key={axis.title} delay={i * 0.08} className="h-full">
              <h3 className="mb-3 text-lg font-bold text-upr-navy dark:text-white">{axis.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{axis.description}</p>
            </AnimatedCard>
          ))}
        </div>
        {showLink && (
          <Button asChild variant="secondary" className="mt-8">
            <Link href="/projet-societe/">Lire le projet de société</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
