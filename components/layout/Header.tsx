"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

export interface HeaderProps {
  /** Eigentümer-Seiten (Standard) oder Makler-Partnerseite. */
  audience?: "owner" | "partner";
}

const navByAudience = {
  owner: [
    { href: "/#how-it-works", label: "Wie es funktioniert" },
    { href: "/#why-wertavio", label: "Warum Wertavio" },
    { href: "/#faq", label: "FAQ" },
    { href: "/partner", label: "Für Makler" },
  ],
  partner: [
    { href: "/partner#ablauf", label: "Ablauf" },
    { href: "/partner#preise", label: "Preise" },
    { href: "/", label: "Für Eigentümer" },
  ],
} as const;

const ctaByAudience = {
  owner: { href: "/anfrage", label: PRIMARY_CTA_LABEL, short: "Makler finden" },
  partner: { href: "/partner#region", label: "Region prüfen", short: "Region prüfen" },
} as const;

export function Header({ audience = "owner" }: HeaderProps): JSX.Element {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const nav = navByAudience[audience];
  const cta = ctaByAudience[audience];

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute inset-x-0 top-0 h-2" aria-hidden />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled || mobileOpen
            ? "border-wertavio-border bg-wertavio-cream/90 [-webkit-backdrop-filter:blur(14px)] [backdrop-filter:blur(14px)]"
            : "border-transparent bg-wertavio-cream",
        )}
      >
        <div className="container-wide flex h-[72px] items-center gap-6">
          <Link href="/" className="font-display text-[1.375rem] font-bold tracking-[-0.03em] text-wertavio-slate">
            Wertavio
          </Link>

          <nav className="ml-6 hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[0.9375rem] font-medium text-wertavio-slate/75 transition-colors hover:text-wertavio-slate"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button href={cta.href} className="px-4 py-2.5 text-sm lg:px-5">
              <span className="sm:hidden">{cta.short}</span>
              <span className="hidden sm:inline">{cta.label}</span>
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-wertavio-slate hover:bg-wertavio-slate/5 lg:hidden"
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
          <nav id="mobile-nav" className="container-wide pb-5 lg:hidden" aria-label="Mobile Navigation">
            <ul className="flex flex-col border-t border-wertavio-border pt-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-wertavio-slate"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  );
}
