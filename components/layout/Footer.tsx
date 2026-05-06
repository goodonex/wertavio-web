"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const footerLinkClass =
  "text-wertavio-muted transition-colors duration-200 hover:text-wertavio-gold-light";

const maklerFooterLinkClass =
  "text-xs text-wertavio-muted transition-colors duration-200 hover:text-wertavio-gold";

export function Footer(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();

  const inner = (
    <>
      <div className="container-narrow flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="font-display text-2xl font-semibold text-white">Wertavio</p>
          <p className="text-sm leading-relaxed text-white/90">
            Der richtige Makler. Für Ihre Immobilie.
          </p>
        </div>
        <nav aria-label="Fußzeilen-Navigation" className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
          <Link href="/impressum" className={footerLinkClass}>
            Impressum
          </Link>
          <Link href="/datenschutz" className={footerLinkClass}>
            Datenschutz
          </Link>
          <Link href="/agb" className={footerLinkClass}>
            Nutzungsbedingungen
          </Link>
        </nav>
      </div>
      <div className="container-narrow mt-12 border-t border-white/10 pt-8">
        <p className="text-xs text-white/90">© 2026 Wertavio. Alle Rechte vorbehalten.</p>
        <p className="mt-3 border-t border-white/10 pt-3 text-xs text-white/90">
          <span className="text-white/45" aria-hidden>
            ·{" "}
          </span>
          <Link href="/partner" className={maklerFooterLinkClass}>
            Für Makler
          </Link>
        </p>
      </div>
    </>
  );

  if (prefersReducedMotion) {
    return <footer className="bg-wertavio-slate py-16">{inner}</footer>;
  }

  return (
    <motion.footer
      className="bg-wertavio-slate py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: motionEase }}
    >
      {inner}
    </motion.footer>
  );
}
