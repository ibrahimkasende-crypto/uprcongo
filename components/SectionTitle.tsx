import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12 space-y-3",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-upr-navy dark:text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-3xl text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
