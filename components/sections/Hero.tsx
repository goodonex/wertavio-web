"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CtaMiniTimeline } from "@/components/ui/CtaMiniTimeline";
import { HeroMatchCard } from "@/components/sections/HeroMatchCard";
import { motionEase, staggerContainer, fadeUp } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

const trustChips = [
  "Kostenlos für Eigentümer",
  "Persönliche Auswahl statt Portal-Streuung",
  "Ein Spezialist — kein Vergleichsmarathon",
] as const;

export function Hero(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const bgParallaxY = useTransform(scrollY, (y) => y * 0.4);
  const scrollFadeOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scrollFadeY = useTransform(scrollY, [0, 200], [0, -30]);

  return (
    <section className="relative isolate min-h-[100dvh] w-full overflow-hidden pb-10 pt-8 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="relative h-full min-h-[100dvh] w-full"
          style={prefersReducedMotion ? undefined : { y: bgParallaxY }}
        >
          <Image
            src="/images/hero-bg.jpg"
            alt="Hamburger Altbau-Straße im goldenen Abendlicht"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-wertavio-slate/75" aria-hidden />
      <div className="relative z-10 min-h-[calc(100dvh-5.5rem)] md:min-h-[calc(100dvh-5rem)]">
        <div className="container-narrow">
          <div className="flex min-h-[inherit] flex-col justify-center gap-5 pt-36 lg:flex-row lg:items-center lg:gap-10 lg:pt-44 xl:gap-14">
            <div className="flex max-w-2xl flex-1 flex-col justify-center gap-5 text-center md:gap-8 lg:max-w-none lg:min-w-0 lg:text-left">
              {prefersReducedMotion ? (
                <>
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/80">Makler-Matching ohne Portal-Chaos</p>
                  <h1 className="text-h1 max-w-3xl text-balance text-wertavio-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                    Der{" "}
                    <span className="italic text-wertavio-white">
                      <span className="link-underline-gold decoration-wertavio-gold">richtige</span>
                    </span>{" "}
                    Makler.
                    <br />
                    Für Ihre Immobilie.
                  </h1>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/90">
                    Sie erhalten einen passenden Spezialisten aus geprüftem Netzwerk — abgestimmt auf Immobilie,
                    Region und Ziel. Ohne Portal. Ohne Streuung an zehn Büros gleichzeitig.
                  </p>
                </>
              ) : (
                <motion.div
                  className="flex flex-col gap-5 md:gap-8"
                  style={{ opacity: scrollFadeOpacity, y: scrollFadeY }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/80">Makler-Matching ohne Portal-Chaos</p>
                  <h1 className="text-h1 max-w-3xl text-balance text-wertavio-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                    Der{" "}
                    <span className="italic text-wertavio-white">
                      <span className="link-underline-gold decoration-wertavio-gold">richtige</span>
                    </span>{" "}
                    Makler.
                    <br />
                    Für Ihre Immobilie.
                  </h1>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/90">
                    Sie erhalten einen passenden Spezialisten aus geprüftem Netzwerk — abgestimmt auf Immobilie,
                    Region und Ziel. Ohne Portal. Ohne Streuung an zehn Büros gleichzeitig.
                  </p>
                </motion.div>
              )}

              <motion.div
                className="flex max-w-xl flex-col gap-2"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: motionEase, delay: 0.18 }}
              >
                <div className="flex w-full flex-col items-center md:items-start">
                  <Button href="/anfrage" className="w-full justify-center sm:w-auto">
                    {PRIMARY_CTA_LABEL}
                  </Button>
                  <CtaMiniTimeline className="max-w-lg sm:max-w-md" />
                </div>
              </motion.div>

              <motion.ul
                className="flex flex-col items-center gap-2 text-xs sm:flex-row sm:flex-wrap sm:items-start sm:justify-center md:justify-start sm:gap-x-3 sm:gap-y-2 sm:text-sm"
                variants={prefersReducedMotion ? undefined : staggerContainer}
                initial={prefersReducedMotion ? false : "hidden"}
                animate={prefersReducedMotion ? undefined : "show"}
              >
                {trustChips.map((label) => (
                  <motion.li key={label} variants={prefersReducedMotion ? undefined : fadeUp}>
                    <span className="inline-flex rounded-full bg-white/[0.07] px-3 py-1 text-white/80 transition-transform duration-150 ease-out motion-safe:hover:scale-105">
                      {label}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div className="hidden shrink-0 justify-end lg:flex lg:w-[40%] lg:max-w-[26rem]">
              <HeroMatchCard prefersReducedMotion={prefersReducedMotion} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
