import Image from "next/image";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionTitle } from "@/components/SectionTitle";
import { IMAGES } from "@/lib/assets";

const LEADERS = [
  {
    name: "Coordinateur National",
    role: "Direction exécutive",
    image: IMAGES.leadership.coordinateurNational,
    alt: "Silhouette placeholder - Coordinateur National UPR (CN)",
  },
  {
    name: "Secrétaire Général",
    role: "Secrétariat général",
    image: IMAGES.leadership.secretaireGeneral,
    alt: "Silhouette placeholder - Secrétaire Général UPR (SG)",
  },
  {
    name: "Responsable Provincial",
    role: "Coordination provinciale",
    image: IMAGES.leadership.responsableProvincial,
    alt: "Silhouette placeholder - Responsable Provincial UPR (RP)",
  },
] as const;

export function LeadershipSection() {
  return (
    <section className="section-padding bg-white dark:bg-upr-dark/50">
      <div className="container-upr">
        <SectionTitle
          eyebrow="Organisation"
          title="Direction et coordination"
          subtitle="Photos officielles à fournir — silhouettes institutionnelles en attendant."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((leader, i) => (
            <AnimatedCard key={leader.name} delay={i * 0.1} className="overflow-hidden p-0">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={leader.image}
                  alt={leader.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-upr-navy dark:text-white">{leader.name}</h3>
                <p className="text-sm text-muted-foreground">{leader.role}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
