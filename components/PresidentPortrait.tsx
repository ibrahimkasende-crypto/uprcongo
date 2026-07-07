import Image from "next/image";
import { cn } from "@/lib/utils";
import { PARTY } from "@/lib/constants";

interface PresidentPortraitProps {
  variant?: "section" | "hero" | "compact";
  showCaption?: boolean;
  className?: string;
  priority?: boolean;
}

export function PresidentPortrait({
  variant = "section",
  showCaption = true,
  className,
  priority = false,
}: PresidentPortraitProps) {
  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "president-portrait group relative mx-auto w-full",
        isHero && "max-w-[320px]",
        isCompact && "max-w-[260px]",
        !isHero && !isCompact && "max-w-md lg:max-w-lg",
        className
      )}
    >
      <div className="president-portrait__glow" aria-hidden="true" />

      <div className="president-portrait__frame">
        <div className="president-portrait__inner aspect-[4/5]">
          <span className="president-portrait__corner president-portrait__corner--tl" aria-hidden="true" />
          <span className="president-portrait__corner president-portrait__corner--br" aria-hidden="true" />
          <Image
            src={PARTY.president.image}
            alt={PARTY.president.imageAlt}
            width={640}
            height={720}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            priority={priority}
          />
          {showCaption && (
            <div className="president-portrait__caption">
              <p className="eyebrow mb-1 text-upr-yellow">{PARTY.president.title}</p>
              <p
                className={cn(
                  "font-bold leading-snug text-white",
                  isHero ? "text-base md:text-lg" : "text-lg md:text-xl"
                )}
              >
                {PARTY.president.name}
              </p>
              <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-upr-gold to-upr-red" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-3 left-1/2 z-0 h-5 w-[88%] -translate-x-1/2 rounded-full bg-black/25 blur-lg"
        aria-hidden="true"
      />
    </div>
  );
}
