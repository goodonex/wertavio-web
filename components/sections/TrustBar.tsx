"use client";

import { motion } from "framer-motion";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const labels = [
  "IVD-Mitglied",
  "Zertifizierter Gutachter",
  "DEKRA-geprüft",
  "15+ Jahre Markterfahrung im Team",
  "Regionale Tiefenkenntnis",
  "Erstaufnahme nur mit Prüfnachweis",
] as const;

function PlaceholderLogo({ label }: { label: string }): JSX.Element {
  return (
    <div className="flex h-12 min-w-[11rem] cursor-default items-center justify-center rounded-[10px] border border-wertavio-border bg-wertavio-white px-4 text-xs font-semibold text-wertavio-slate shadow-sm transition-transform duration-200 motion-safe:hover:-translate-y-1">
      {label}
    </div>
  );
}

export function TrustBar(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      className="border-y border-wertavio-border bg-wertavio-cream py-12"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: motionEase }}
    >
      <div className="container-narrow space-y-6">
        <p className="text-eyebrow text-center">
          Partner werden in Deutschland geprüft — vor der Aufnahme
        </p>
        <div className="relative overflow-hidden">
          <div className="flex w-max gap-4 motion-safe:animate-marquee hover:[animation-play-state:paused]">
            {labels.map((label, i) => (
              <motion.div
                key={label}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: motionEase, delay: prefersReducedMotion ? 0 : i * 0.08 }}
              >
                <PlaceholderLogo label={label} />
              </motion.div>
            ))}
            {labels.map((label, i) => (
              <motion.div
                key={`${label}-dup`}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  ease: motionEase,
                  delay: prefersReducedMotion ? 0 : (i + labels.length) * 0.08,
                }}
              >
                <PlaceholderLogo label={label} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
