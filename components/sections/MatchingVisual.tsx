"use client";

import { motion } from "framer-motion";
import { Check, Phone, UserRound } from "lucide-react";
import { cn, motionEase } from "@/lib/utils";

export type MatchingMode = "portal" | "wertavio";

export interface MatchingVisualProps {
  mode: MatchingMode;
  reduced: boolean;
}

/** 12 Büros in der Region. Portal: 8 erhalten die Daten, 5 davon rufen an. Wertavio: genau eines. */
const TOTAL = 12;
const PORTAL_RECEIVES = new Set([0, 2, 3, 5, 6, 8, 9, 11]);
const PORTAL_CALLS = new Set([0, 3, 6, 9, 11]);
const WERTAVIO_MATCH = 5;

const captions: Record<MatchingMode, { lead: string; rest: string }> = {
  portal: { lead: "8 Makler erhalten Ihre Daten.", rest: "5 rufen an, ein klarer nächster Schritt fehlt." },
  wertavio: { lead: "1 geprüfter Spezialist meldet sich.", rest: "Ausgewählt nach Region, Immobilie und Ziel." },
};

function tokenState(mode: MatchingMode, i: number): "idle" | "active" | "calling" | "match" {
  if (mode === "wertavio") return i === WERTAVIO_MATCH ? "match" : "idle";
  if (PORTAL_CALLS.has(i)) return "calling";
  return PORTAL_RECEIVES.has(i) ? "active" : "idle";
}

export function MatchingVisual({ mode, reduced }: MatchingVisualProps): JSX.Element {
  const caption = captions[mode];

  return (
    <figure className="rounded-2xl bg-wertavio-stone p-6 sm:p-8">
      <p className="text-sm font-medium text-wertavio-muted">Maklerbüros in Ihrer Region</p>
      <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4" aria-hidden>
        {Array.from({ length: TOTAL }).map((_, i) => {
          const state = tokenState(mode, i);
          const Icon = state === "match" ? Check : state === "calling" ? Phone : UserRound;
          return (
            <motion.div
              key={i}
              className={cn(
                "flex aspect-square items-center justify-center rounded-2xl border transition-colors duration-500",
                state === "match" && "border-wertavio-gold bg-wertavio-gold text-wertavio-slate",
                (state === "active" || state === "calling") &&
                  "border-wertavio-slate bg-wertavio-slate text-wertavio-cream",
                state === "idle" && "border-wertavio-border bg-wertavio-white text-wertavio-slate/25",
              )}
              animate={reduced ? undefined : { scale: state === "match" ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: motionEase, delay: reduced ? 0 : i * 0.03 }}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
            </motion.div>
          );
        })}
      </div>
      <figcaption className="mt-6 min-h-[3.5rem]" aria-live="polite">
        <p className="font-display text-lg font-semibold text-wertavio-slate">{caption.lead}</p>
        <p className="mt-0.5 text-sm text-wertavio-muted">{caption.rest}</p>
      </figcaption>
    </figure>
  );
}
