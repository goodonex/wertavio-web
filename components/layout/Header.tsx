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
  "rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(15,20,35,0.65)] py-2 pl-3 pr-3 shadow-[0_8px_32px_rgba(0,0,0,0.24)] [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)] lg:rounded-full lg:py-[10px] lg:pl-6 lg:pr-4";

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
        "fixed top-4 z-50 flex flex-col gap-2",
        "left-4 right-4 w-auto max-w-none translate-x-0",
        "lg:left-1/2 lg:right-auto lg:min-w-[680px] lg:max-w-[calc(100vw-48px)] lg:w-max lg:-translate-x-1/2",
      )}
    >
      <div className={cn("flex w-full items-center gap-2 lg:gap-6", pillClass)}>
        <Link
          href="/"
          className="group/logo min-w-0 shrink font-display text-base font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] transition-colors sm:text-lg lg:text-xl"
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

        <nav className="hidden flex-1 justify-center gap-5 lg:flex lg:gap-6" aria-label="Hauptnavigation">
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

        <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:gap-2">
          <Button
            href="/anfrage"
            className="!rounded-full !px-3 !py-1.5 text-[13px] leading-tight lg:!px-4 lg:!py-2 lg:text-sm"
            enableIdleGlow
          >
            <span className="lg:hidden">Anfrage starten</span>
            <span className="hidden lg:inline">{PRIMARY_CTA_LABEL}</span>
          </Button>

          <button
            type="button"
            className="inline-flex rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
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
            "flex flex-col rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(15,20,35,0.92)] px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.24)] [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)] lg:hidden",
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
