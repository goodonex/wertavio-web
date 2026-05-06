"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RiskNote } from "@/components/ui/RiskNote";
import { HeroMatchCard } from "@/components/sections/HeroMatchCard";
import { motionEase, staggerContainer, fadeUp } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { PRIMARY_CTA_LABEL, PRIMARY_CTA_RISK } from "@/lib/cta";

const trustChips = [
  "Kostenlos für Eigentümer",
  "Persönliche Auswahl statt Portal-Streuung",
  "Ein Spezialist — kein Vergleichsmarathon",
] as const;

export function Hero(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pb-10 pt-8 md:min-h-[100dvh] md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Wohnstraße mit Einfamilienhäusern im Abendlicht"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-wertavio-slate/60" aria-hidden />
      <div className="relative z-10 container-narrow min-h-[calc(100dvh-5.5rem)] md:min-h-[calc(100dvh-5rem)]">
        <div className="flex min-h-[inherit] flex-col justify-center gap-5 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
          <div className="flex max-w-2xl flex-1 flex-col justify-center gap-5 md:gap-8 lg:max-w-none lg:min-w-0">
            <motion.p
              className="text-eyebrow text-wertavio-cream/70"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: motionEase }}
            >
              Makler-Matching ohne Portal-Chaos
            </motion.p>

            <motion.h1
              className="text-h1 max-w-3xl text-balance text-wertavio-white"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: motionEase, delay: 0.05 }}
            >
              Der{" "}
              <span className="italic text-wertavio-white">
                <span className="link-underline-gold decoration-wertavio-gold">richtige</span>
              </span>{" "}
              Makler.
              <br />
              Für Ihre Immobilie.
            </motion.h1>

            <motion.p
              className="max-w-2xl text-pretty text-sm leading-relaxed text-wertavio-cream/85 md:text-base"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: motionEase, delay: 0.12 }}
            >
              Sie erhalten einen passenden Spezialisten aus geprüftem Netzwerk — abgestimmt auf
              Immobilie, Region und Ziel. Ohne Portal. Ohne Streuung an zehn Büros gleichzeitig.
            </motion.p>

            <motion.div
              className="flex max-w-xl flex-col gap-2"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: motionEase, delay: 0.18 }}
            >
              <div className="flex w-full flex-col items-center sm:items-start">
                <Button href="/anfrage" className="w-full justify-center sm:w-auto" enableIdleGlow>
                  {PRIMARY_CTA_LABEL}
                </Button>
                <RiskNote className="text-wertavio-cream/80">{PRIMARY_CTA_RISK}</RiskNote>
              </div>
            </motion.div>

            <motion.ul
              className="flex flex-col gap-1.5 text-xs text-wertavio-cream/80 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-1 sm:text-sm"
              variants={prefersReducedMotion ? undefined : staggerContainer}
              initial={prefersReducedMotion ? false : "hidden"}
              animate={prefersReducedMotion ? undefined : "show"}
            >
              {trustChips.map((label) => (
                <motion.li key={label} variants={prefersReducedMotion ? undefined : fadeUp}>
                  <span aria-hidden>· </span>
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="hidden shrink-0 justify-end lg:flex lg:w-[40%] lg:max-w-[26rem]">
            <HeroMatchCard prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
