"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

const navItems = [
  { href: "#how-it-works", label: "Wie es funktioniert" },
  { href: "#why-wertavio", label: "Warum Wertavio" },
  { href: "#faq", label: "FAQ" },
] as const;

const pillClass =
  "rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(15,20,35,0.65)] py-[10px] pl-6 pr-4 shadow-[0_8px_32px_rgba(0,0,0,0.24)] [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)]";

export function Header(): JSX.Element {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 flex -translate-x-1/2 flex-col gap-2",
        "w-[calc(100vw-32px)] max-w-[calc(100vw-48px)] md:min-w-[680px] md:w-max",
      )}
    >
      <div className={cn("flex w-full items-center gap-3 md:gap-6", pillClass)}>
        <Link
          href="/"
          className="group/logo shrink-0 font-display text-lg font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] transition-colors md:text-xl"
        >
          <span
            className={cn(
              "inline-block bg-[length:200%_auto] bg-clip-text transition-[color,background-image] duration-300",
              "motion-safe:group-hover/logo:animate-logo-shimmer",
              "group-hover/logo:bg-gradient-to-r group-hover/logo:from-wertavio-cream group-hover/logo:via-wertavio-gold group-hover/logo:to-wertavio-cream group-hover/logo:text-transparent",
            )}
          >
            Wertavio
          </span>
        </Link>

        <nav className="hidden flex-1 justify-center gap-5 md:flex md:gap-6" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={isHome ? item.href : `/${item.href}`}
              className="whitespace-nowrap text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button href="/anfrage" className="!rounded-full !px-4 !py-2 text-sm" enableIdleGlow>
            {PRIMARY_CTA_LABEL}
          </Button>

          <button
            type="button"
            className="inline-flex rounded-full p-2 text-white hover:bg-white/10 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">Menü</span>
            {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className={cn(
            "flex flex-col rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(15,20,35,0.92)] px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.24)] [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)] md:hidden",
          )}
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={isHome ? item.href : `/${item.href}`}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-white/95 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
