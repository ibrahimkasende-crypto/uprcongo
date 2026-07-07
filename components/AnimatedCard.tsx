"use client";

import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "glass-strong rounded-2xl p-6 transition-shadow duration-300 hover:shadow-xl",
        "animate-fade-in-up motion-reduce:animate-none",
        className
      )}
      style={delay > 0 ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}