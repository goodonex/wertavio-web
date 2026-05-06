"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import { cn } from "@/lib/utils";

type Tab = "portal" | "wertavio";

function ArrowConnector({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      viewBox="0 0 48 20"
      className={cn("h-5 w-10 shrink-0 lg:w-12", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M2 10h36m-8-6l8 6-8 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      viewBox="0 0 20 32"
      className={cn("mx-auto h-8 w-5 shrink-0", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M10 2v24m-6-6l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const bubbleMobile = "mx-auto w-full max-w-[280px] justify-center lg:mx-0 lg:inline-flex lg:w-auto";

function Bubble({ children, theme }: { children: React.ReactNode; theme: "red" | "gold" }): JSX.Element {
  const cls =
    theme === "red"
      ? "border-red-200 bg-white text-wertavio-slate shadow-sm"
      : "border-wertavio-gold/40 bg-wertavio-white text-wertavio-slate shadow-sm";
  return (
    <div
      className={`inline-flex max-w-[11rem] items-center rounded-full border px-3 py-2 text-center text-xs font-medium leading-snug lg:max-w-[13rem] lg:text-sm ${bubbleMobile} ${cls}`}
    >
      {children}
    </div>
  );
}

function PortalFlow(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-red-600 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center">
      <Bubble theme="red">Eigentümer</Bubble>
      <div className="hidden lg:block">
        <ArrowConnector />
      </div>
      <div className="lg:hidden">
        <ArrowDown />
      </div>
      <Bubble theme="red">8 Makler erhalten Lead</Bubble>
      <div className="hidden lg:block">
        <ArrowConnector />
      </div>
      <div className="lg:hidden">
        <ArrowDown />
      </div>
      <Bubble theme="red">5 rufen an</Bubble>
      <div className="hidden lg:block">
        <ArrowConnector />
      </div>
      <div className="lg:hidden">
        <ArrowDown />
      </div>
      <Bubble theme="red">Eigentümer overwhelmed</Bubble>
      <div className="hidden lg:block">
        <ArrowConnector />
      </div>
      <div className="lg:hidden">
        <ArrowDown />
      </div>
      <Bubble theme="red">kein klarer nächster Schritt</Bubble>
    </div>
  );
}

function GoldFlowBubble({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div
      className={`inline-flex max-w-[12rem] items-center rounded-full border-[1.5px] border-wertavio-gold bg-[rgba(201,168,76,0.08)] px-4 py-2 text-center text-xs font-medium leading-snug text-wertavio-gold lg:max-w-[14rem] lg:text-sm ${bubbleMobile}`}
    >
      {children}
    </div>
  );
}

function WertavioFlow(): JSX.Element {
  return (
    <div className="py-4">
      <div className="flex flex-col items-center gap-2 text-wertavio-gold lg:flex-row lg:flex-wrap lg:items-center lg:justify-center">
        <GoldFlowBubble>Eigentümer</GoldFlowBubble>
        <div className="hidden lg:block">
          <ArrowConnector />
        </div>
        <div className="lg:hidden">
          <ArrowDown />
        </div>
        <GoldFlowBubble>Wertavio matcht</GoldFlowBubble>
        <div className="hidden lg:block">
          <ArrowConnector />
        </div>
        <div className="lg:hidden">
          <ArrowDown />
        </div>
        <GoldFlowBubble>1 Spezialist meldet sich</GoldFlowBubble>
      </div>
      <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-wertavio-muted">
        Ein Makler. Kein Chaos. Klarer nächster Schritt.
      </p>
    </div>
  );
}

export function PortalComparisonSection(): JSX.Element {
  const [tab, setTab] = useState<Tab>("portal");
  const prefersReducedMotion = usePrefersReducedMotion();
  const fade = { duration: prefersReducedMotion ? 0 : 0.2, ease: motionEase };

  return (
    <section className="bg-wertavio-cream py-16 md:py-20">
      <div className="container-narrow text-center md:text-left">
        <div className="mx-auto mb-8 max-w-3xl md:mx-0">
          <p className="text-eyebrow">Portal vs. Wertavio</p>
          <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
            Streuung — oder eine klare Zuordnung
          </h2>
        </div>

        <div
          className="mx-auto mb-10 flex w-full max-w-xl flex-col gap-2 rounded-lg border border-wertavio-border bg-wertavio-white p-1 lg:mx-0 lg:max-w-none lg:flex-row"
          role="tablist"
          aria-label="Ablauf vergleichen"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "portal"}
            className={`rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 lg:flex-1 ${
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
            className={`rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 lg:flex-1 ${
              tab === "wertavio" ? "bg-[#FEFBF0] text-wertavio-slate" : "text-wertavio-muted hover:text-wertavio-slate"
            }`}
            onClick={() => setTab("wertavio")}
          >
            So läuft es bei Wertavio
          </button>
        </div>

        <div className="mb-12 min-h-[12rem] w-full rounded-xl border border-wertavio-border bg-white/80 px-3 py-2 lg:min-h-[5rem] lg:px-6">
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

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-wertavio-border bg-wertavio-white font-display text-sm font-semibold text-wertavio-slate shadow-md lg:flex">
            vs
          </div>

          <motion.article
            className="w-full rounded-xl border border-red-100 bg-[#FEF2F2] p-6 md:p-8 lg:rounded-r-none lg:border-r-0"
            initial={
              prefersReducedMotion ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -28, rotate: -1 }
            }
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-red-700">
              <span aria-hidden className="text-red-600">
                ✗
              </span>{" "}
              Maklersuche über Portale
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-wertavio-slate">
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(239,68,68,0.05)]">
                ✗ Ihre Anfrage geht an jeden, der zahlt — nicht an den Besten
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(239,68,68,0.05)]">
                ✗ 5–10 Makler rufen gleichzeitig an
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(239,68,68,0.05)]">
                ✗ Kein Qualitätscheck, kein Aufnahmefilter
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(239,68,68,0.05)]">
                ✗ Sie vergleichen alleine — ohne Orientierung
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(239,68,68,0.05)]">
                ✗ Provision trotzdem fällig
              </li>
            </ul>
          </motion.article>

          <motion.article
            className="w-full rounded-xl border border-wertavio-gold/25 bg-[#FEFBF0] p-6 md:p-8 lg:rounded-l-none"
            initial={prefersReducedMotion ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 28, rotate: 1 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-wertavio-slate">
              <span aria-hidden className="text-wertavio-gold">
                ✓
              </span>{" "}
              Mit Wertavio
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-wertavio-slate">
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(201,168,76,0.05)]">
                ✓ Ein Makler — persönlich für Sie ausgewählt
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(201,168,76,0.05)]">
                ✓ Geprüft vor der Aufnahme ins Netzwerk
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(201,168,76,0.05)]">
                ✓ Passend zu Ihrer Region, Immobilie und Ziel
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(201,168,76,0.05)]">
                ✓ Klare Empfehlung statt Vergleichsmarathon
              </li>
              <li className="rounded-md px-1 py-1 transition-colors duration-150 hover:bg-[rgba(201,168,76,0.05)]">
                ✓ 0 € für Eigentümer
              </li>
            </ul>
          </motion.article>

          <p className="text-center text-sm font-display font-semibold text-wertavio-muted lg:col-span-2 lg:hidden">
            vs
          </p>
        </div>
      </div>
    </section>
  );
}
