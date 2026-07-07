import { HeroBackground } from "@/components/HeroBackground";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function PageHero({ children, className, centered = false }: PageHeroProps) {
  return (
    <HeroBackground variant="page" className={className}>
      <div className={cn("section-padding", centered && "flex min-h-[42vh] items-center")}>
        <div className="container-upr">{children}</div>
      </div>
    </HeroBackground>
  );
}
