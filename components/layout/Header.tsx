"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

export function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-colors duration-300",
        scrolled
          ? "border-wertavio-border/60 bg-wertavio-cream/80 backdrop-blur-md"
          : "bg-wertavio-cream",
      )}
    >
      <div className="container-narrow flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="font-display text-xl font-semibold text-wertavio-slate transition-colors hover:text-wertavio-gold md:text-2xl"
        >
          Wertavio
        </Link>

        <Button href="/anfrage" className="!px-4 !py-2 text-sm" enableIdleGlow>
          {PRIMARY_CTA_LABEL}
        </Button>
      </div>
    </header>
  );
}
