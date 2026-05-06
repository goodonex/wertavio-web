"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Tab = "portal" | "wertavio";

function ArrowConnector({ stroke }: { stroke: string }): JSX.Element {
  return (
    <svg viewBox="0 0 48 20" className="h-5 w-10 shrink-0 md:w-12" fill="none" aria-hidden>
      <path
        d="M2 10h36m-8-6l8 6-8 6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown({ stroke }: { stroke: string }): JSX.Element {
  return (
    <svg viewBox="0 0 20 32" className="mx-auto h-8 w-5 shrink-0" fill="none" aria-hidden>
      <path
        d="M10 2v24m-6-6l6 6 6-6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bubble({ children, theme }: { children: React.ReactNode; theme: "red" | "gold" }): JSX.Element {
  const cls =
    theme === "red"
      ? "border-red-200 bg-white text-wertavio-slate shadow-sm"
      : "border-wertavio-gold/40 bg-wertavio-white text-wertavio-slate shadow-sm";
  return (
    <div
      className={`inline-flex max-w-[11rem] items-center justify-center rounded-full border px-3 py-2 text-center text-xs font-medium leading-snug md:max-w-[13rem] md:text-sm ${cls}`}
    >
      {children}
    </div>
  );
}

function PortalFlow(): JSX.Element {
  const s = "#DC2626";
  return (
    <div className="flex flex-col items-stretch gap-2 py-4 md:flex-row md:flex-wrap md:items-center md:justify-center">
      <Bubble theme="red">Eigentümer</Bubble>
      <div className="hidden md:block">
        <ArrowConnector stroke={s} />
      </div>
      <div className="md:hidden">
        <ArrowDown stroke={s} />
      </div>
      <Bubble theme="red">8 Makler erhalten Lead</Bubble>
      <div className="hidden md:block">
        <ArrowConnector stroke={s} />
      </div>
      <div className="md:hidden">
        <ArrowDown stroke={s} />
      </div>
      <Bubble theme="red">5 rufen an</Bubble>
      <div className="hidden md:block">
        <ArrowConnector stroke={s} />
      </div>
      <div className="md:hidden">
        <ArrowDown stroke={s} />
      </div>
      <Bubble theme="red">Eigentümer overwhelmed</Bubble>
      <div className="hidden md:block">
        <ArrowConnector stroke={s} />
      </div>
      <div className="md:hidden">
        <ArrowDown stroke={s} />
      </div>
      <Bubble theme="red">kein klarer nächster Schritt</Bubble>
    </div>
  );
}

function WertavioFlow(): JSX.Element {
  const s = "#B8902A";
  return (
    <div className="flex flex-col items-stretch gap-2 py-4 md:flex-row md:flex-wrap md:items-center md:justify-center">
      <Bubble theme="gold">Eigentümer</Bubble>
      <div className="hidden md:block">
        <ArrowConnector stroke={s} />
      </div>
      <div className="md:hidden">
        <ArrowDown stroke={s} />
      </div>
      <Bubble theme="gold">Wertavio analysiert &amp; matcht</Bubble>
      <div className="hidden md:block">
        <ArrowConnector stroke={s} />
      </div>
      <div className="md:hidden">
        <ArrowDown stroke={s} />
      </div>
      <Bubble theme="gold">1 Spezialist meldet sich</Bubble>
      <div className="hidden md:block">
        <ArrowConnector stroke={s} />
      </div>
      <div className="md:hidden">
        <ArrowDown stroke={s} />
      </div>
      <Bubble theme="gold">klarer Ablaufplan</Bubble>
    </div>
  );
}

export function PortalComparisonSection(): JSX.Element {
  const [tab, setTab] = useState<Tab>("portal");
  const prefersReducedMotion = usePrefersReducedMotion();
  const fade = { duration: prefersReducedMotion ? 0 : 0.2, ease: motionEase };

  return (
    <section className="bg-wertavio-cream py-16 md:py-20">
      <div className="container-narrow">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-eyebrow">Portal vs. Wertavio</p>
          <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
            Streuung — oder eine klare Zuordnung
          </h2>
        </div>

        <div
          className="mx-auto mb-10 flex max-w-xl flex-col gap-2 rounded-lg border border-wertavio-border bg-wertavio-white p-1 sm:mx-0 sm:max-w-none sm:flex-row"
          role="tablist"
          aria-label="Ablauf vergleichen"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "portal"}
            className={`rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 sm:flex-1 ${
              tab === "portal" ? "bg-[#FEF2F2] text-red-800" : "text-wertavio-muted hover:text-wertavio-slate"
            }`}
            onClick={() => setTab("portal")}
          >
            So läuft es bei Portalen
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "wertavio"}
            className={`rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 sm:flex-1 ${
              tab === "wertavio" ? "bg-[#FEFBF0] text-wertavio-slate" : "text-wertavio-muted hover:text-wertavio-slate"
            }`}
            onClick={() => setTab("wertavio")}
          >
            So läuft es bei Wertavio
          </button>
        </div>

        <div className="mb-12 min-h-[12rem] rounded-xl border border-wertavio-border bg-white/80 px-3 py-2 md:min-h-[5rem] md:px-6">
          <AnimatePresence mode="wait">
            {tab === "portal" ? (
              <motion.div
                key="portal-flow"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={fade}
              >
                <PortalFlow />
              </motion.div>
            ) : (
              <motion.div
                key="wertavio-flow"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={fade}
              >
                <WertavioFlow />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-wertavio-border bg-wertavio-white font-display text-sm font-semibold text-wertavio-slate shadow-md lg:flex">
            vs
          </div>

          <article className="rounded-xl border border-red-100 bg-[#FEF2F2] p-6 md:p-8 lg:rounded-r-none lg:border-r-0">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-red-700">
              <span aria-hidden className="text-red-600">
                ✗
              </span>{" "}
              Maklersuche über Portale
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-wertavio-slate">
              <li>✗ Ihre Anfrage geht an jeden, der zahlt — nicht an den Besten</li>
              <li>✗ 5–10 Makler rufen gleichzeitig an</li>
              <li>✗ Kein Qualitätscheck, kein Aufnahmefilter</li>
              <li>✗ Sie vergleichen alleine — ohne Orientierung</li>
              <li>✗ Provision trotzdem fällig</li>
            </ul>
          </article>

          <article className="rounded-xl border border-wertavio-gold/25 bg-[#FEFBF0] p-6 md:p-8 lg:rounded-l-none">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-wertavio-slate">
              <span aria-hidden className="text-wertavio-gold">
                ✓
              </span>{" "}
              Mit Wertavio
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-wertavio-slate">
              <li>✓ Ein Makler — persönlich für Sie ausgewählt</li>
              <li>✓ Geprüft vor der Aufnahme ins Netzwerk</li>
              <li>✓ Passend zu Ihrer Region, Immobilie und Ziel</li>
              <li>✓ Klare Empfehlung statt Vergleichsmarathon</li>
              <li>✓ 0 € für Eigentümer</li>
            </ul>
          </article>

          <p className="text-center text-sm font-display font-semibold text-wertavio-muted lg:col-span-2 lg:hidden">
            vs
          </p>
        </div>
      </div>
    </section>
  );
}
