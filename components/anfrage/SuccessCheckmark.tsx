"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function SuccessCheckmark(): JSX.Element {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 48 48"
      className="text-wertavio-gold"
      aria-hidden
    >
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-wertavio-border"
      />
      <motion.path
        d="M12 24 L20 32 L36 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </svg>
  );
}
