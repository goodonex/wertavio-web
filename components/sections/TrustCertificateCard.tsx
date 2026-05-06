"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const rows = [
  { dt: "Büro", dd: "Muster Immobilien GmbH" },
  { dt: "Region", dd: "Hamburg & Umgebung" },
  { dt: "Geprüft", dd: "14. März 2025" },
  { dt: "Status", dd: "✓ Aktiv im Netzwerk" },
] as const;

export function TrustCertificateCard(): JSX.Element {
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.32 });
  const reduced = usePrefersReducedMotion();

  return (
    <motion.aside
      ref={rootRef}
      className="relative mx-auto w-full max-w-md rounded-xl border-[1.5px] border-wertavio-gold bg-wertavio-white p-8 shadow-[0_1px_0_rgba(26,31,46,0.04),0_8px_24px_rgba(26,31,46,0.08),0_20px_48px_rgba(26,31,46,0.04)] transition-colors duration-200 hover:border-wertavio-gold-light"
      aria-label="Beispiel Netzwerk-Zertifizierung"
      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
      animate={reduced ? { opacity: 1, scale: 1 } : inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: motionEase }}
    >
      <p className="border-b border-wertavio-border pb-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-wertavio-gold">
        Netzwerk-Zertifizierung
      </p>
      <dl className="mt-6 space-y-4 text-sm">
        {rows.map((r, i) => (
          <div
            key={r.dt}
            className={
              i < rows.length - 1
                ? "flex justify-between gap-4 border-b border-wertavio-border/80 pb-3"
                : "flex justify-between gap-4 pb-1"
            }
          >
            <dt className="text-wertavio-muted">{r.dt}</dt>
            <dd className="text-right font-medium text-wertavio-slate">{r.dd}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex justify-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-wertavio-gold font-display text-lg font-semibold text-wertavio-gold"
          aria-hidden
        >
          W
        </div>
      </div>
    </motion.aside>
  );
}
