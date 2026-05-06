"use client";

import { motion } from "framer-motion";
import { motionEase } from "@/lib/utils";

export interface HeroMatchCardProps {
  prefersReducedMotion: boolean;
}

/** Fade-up nach Headline: Headline endet bei ~delay 0,05 + duration 0,6; +400 ms → ~1,05 s. */
const MATCH_CARD_DELAY_S = 1.05;

export function HeroMatchCard({ prefersReducedMotion }: HeroMatchCardProps): JSX.Element {
  return (
    <motion.aside
      className="w-full max-w-md rounded-xl border border-white/25 bg-wertavio-slate/80 p-6 shadow-lg shadow-black/20 md:p-7"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: motionEase,
        delay: prefersReducedMotion ? 0 : MATCH_CARD_DELAY_S,
      }}
      aria-label="Beispiel: Ihr Makler-Match"
    >
      <p className="border-b border-white/15 pb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
        Ihr Makler-Match
      </p>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-3 border-b border-white/10 pb-3">
          <dt className="text-white/60">Region</dt>
          <dd className="text-right font-medium text-white">Hamburg-Mitte</dd>
        </div>
        <div className="flex justify-between gap-3 border-b border-white/10 pb-3">
          <dt className="text-white/60">Typ</dt>
          <dd className="text-right font-medium text-white">Eigentumswohng.</dd>
        </div>
        <div className="flex justify-between gap-3 border-b border-white/10 pb-3">
          <dt className="text-white/60">Spezialist</dt>
          <dd className="text-right font-medium text-white">✓ Gefunden</dd>
        </div>
        <div className="flex justify-between gap-3 pb-1">
          <dt className="text-white/60">Rückmeldung</dt>
          <dd className="text-right font-medium text-white">In 48h</dd>
        </div>
      </dl>
      <div className="mt-4 border-t border-white/15 pt-4 text-sm leading-snug text-wertavio-cream/90">
        <p>
          <span className="text-wertavio-gold-light" aria-hidden>
            ●{" "}
          </span>
          Markus B., Immobilien
        </p>
        <p className="mt-0.5 pl-4 text-xs text-wertavio-cream/75">Hamburg seit 2009</p>
      </div>
    </motion.aside>
  );
}
