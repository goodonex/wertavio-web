"use client";

import type { ReactNode } from "react";
import { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Anteil des Elements im Viewport bis zum Trigger (0–1). */
  amount?: number | "some";
  variants?: Variants;
}

export const StaggerReveal = forwardRef<HTMLDivElement, StaggerRevealProps>(function StaggerReveal(
  { children, className, amount = "some", variants = staggerContainer },
  ref,
) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
});

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps): JSX.Element {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
