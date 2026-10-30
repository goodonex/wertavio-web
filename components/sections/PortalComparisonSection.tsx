"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import { MatchingVisual, type MatchingMode } from "@/components/sections/MatchingVisual";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const lists: Record<MatchingMode, { title: string; items: readonly string[] }> = {
  portal: {
    title: "Maklersuche über Portale",
    items: [
      "Ihre Anfrage geht an jeden, der zahlt, nicht an den Besten",
      "5–10 Makler rufen gleichzeitig an",
      "Kein Qualitätscheck, kein Aufnahmefilter",
      "Sie vergleichen alleine, ohne Orientierung",
      "Provision trotzdem fällig",
    ],
  },
  wertavio: {
    title: "Mit Wertavio",
    items: [
      "Ein Makler, persönlich für Sie ausgewählt",
      "Persönlich geprüft, mit Erlaubnis nach § 34c GewO",
      "Passend zu Ihrer Region, Immobilie und Ziel",
      "Klare Empfehlung statt Vergleichsmarathon",
      "0 € für Eigentümer",
    ],
  },
};

const tabs: { id: MatchingMode; label: string }[] = [
  { id: "portal", label: "Über ein Portal" },
  { id: "wertavio", label: "Über Wertavio" },
];

export function PortalComparisonSection(): JSX.Element {
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<MatchingMode>("portal");
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  /** Zeigt den Zustandswechsel einmal von selbst, solange niemand selbst umgeschaltet hat. */
  useEffect(() => {
    if (!inView || touched || reduced) return;
    const t = window.setTimeout(() => setMode("wertavio"), 2600);
    return () => window.clearTimeout(t);
  }, [inView, touched, reduced]);

  const select = (m: MatchingMode): void => {
    setTouched(true);
    setMode(m);
  };
  const list = lists[mode];
  const ListIcon = mode === "portal" ? X : Check;

  return (
    <section id="vergleich" className="section-y bg-wertavio-white">
      <div className="container-wide">
        <StaggerReveal className="max-w-2xl">
          <StaggerItem>
            <h2 className="text-h2 text-wertavio-slate">Ein Makler statt zehn Anrufe</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lead mt-5">
              Ein Portal verkauft Ihre Anfrage an mehrere Büros. Wertavio gibt sie an genau einen geprüften
              Spezialisten weiter.
            </p>
          </StaggerItem>
        </StaggerReveal>

        <div
          className="mt-10 inline-flex rounded-full border border-wertavio-border bg-wertavio-cream p-1"
          role="group"
          aria-label="Ablauf vergleichen"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={mode === t.id}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm font-semibold transition-colors duration-300 sm:px-5",
                mode === t.id ? "bg-wertavio-slate text-wertavio-cream" : "text-wertavio-muted hover:text-wertavio-slate",
              )}
              onClick={() => select(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          id="vergleich-panel"
          className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
        >
          <MatchingVisual mode={mode} reduced={reduced} />
          <div>
            <p className="text-h3 text-wertavio-slate">{list.title}</p>
            <ul className="mt-6 divide-y divide-wertavio-border">
              {list.items.map((item) => (
                <li key={item} className="flex gap-3 py-3.5 text-wertavio-slate">
                  <ListIcon
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0",
                      mode === "portal" ? "text-[#B4412F]" : "text-wertavio-gold-ink",
                    )}
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
