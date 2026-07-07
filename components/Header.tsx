"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION, PARTY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/10">
        <nav
          className="container-upr flex h-18 items-center justify-between py-3"
          aria-label="Navigation principale"
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="UPR Congo - Accueil">
            <Image
              src={PARTY.logo}
              alt={PARTY.logoAlt}
              width={52}
              height={52}
              className="transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="hidden sm:block">
              <strong className="block text-lg font-bold text-upr-blue dark:text-white">{PARTY.name}</strong>
              <small className="block max-w-[200px] text-xs leading-tight text-muted-foreground">
                {PARTY.fullName}
              </small>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-upr-blue/10 hover:text-upr-blue dark:hover:bg-white/10 dark:hover:text-upr-gold",
                  isActive(item.href) && "bg-upr-blue/10 text-upr-blue dark:bg-white/10 dark:text-upr-gold"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
              <Link href="/adhesion/">Adhérer</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-strong overflow-hidden border-b lg:hidden"
          >
            <div className="container-upr flex flex-col gap-1 py-4">
              {NAVIGATION.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-upr-blue/10",
                      isActive(item.href) && "bg-upr-blue/10 text-upr-blue dark:text-upr-gold"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Button asChild variant="gold" className="mt-2 w-full">
                <Link href="/adhesion/">Adhérer à l&apos;UPR</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
