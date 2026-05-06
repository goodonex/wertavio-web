"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, motionEase, cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: "cream" | "slate" | "white";
  /** Hintergrund unter voller Section-Breite (vor `container-narrow`), z. B. Bild + Overlay. */
  fullBleedBackdrop?: ReactNode;
}

export function SectionWrapper({
  id,
  children,
  className,
  background = "cream",
  fullBleedBackdrop,
}: SectionWrapperProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();

  const bg =
    background === "slate"
      ? "bg-wertavio-slate text-wertavio-cream"
      : background === "white"
        ? "bg-wertavio-white"
        : "bg-wertavio-cream";

  const sectionClass = cn("section-y", bg, fullBleedBackdrop && "relative overflow-hidden", className);
  const content = (
    <>
      {fullBleedBackdrop}
      <div className={cn("container-narrow", fullBleedBackdrop && "relative z-10")}>{children}</div>
    </>
  );

  if (prefersReducedMotion) {
    return (
      <section id={id} className={sectionClass}>
        {content}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={sectionClass}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ ease: motionEase, duration: 0.55 }}
    >
      {content}
    </motion.section>
  );
}
