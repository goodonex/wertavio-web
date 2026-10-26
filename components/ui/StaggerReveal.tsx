"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Anteil des Elements im Viewport bis zum Trigger (0–1). */
  amount?: number | "some";
  variants?: Variants;
  as?: "div" | "ol" | "ul";
}

/** Scroll-Reveal: Inhalte erscheinen einmal in Lesereihenfolge, danach bleibt alles ruhig. */
export function StaggerReveal({
  children,
  className,
  amount = "some",
  variants = staggerContainer,
  as = "div",
}: StaggerRevealProps): JSX.Element {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const M = motion[as];
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={variants}>
      {children}
    </M>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps): JSX.Element {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const M = motion[as];
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  );
}
