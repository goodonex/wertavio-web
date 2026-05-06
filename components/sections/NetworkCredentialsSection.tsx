"use client";

import { motion } from "framer-motion";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const credentials = [
  {
    key: "ihk",
    abbr: "IHK",
    brandClass: "bg-[#003366]",
    name: "IHK-Zertifiziert",
    line: "Sachkundenachweis §34c GewO",
  },
  {
    key: "ivd",
    abbr: "IVD",
    brandClass: "bg-[#E30613]",
    name: "IVD-Mitglied",
    line: "Immobilienverband Deutschland",
  },
  {
    key: "dekra",
    abbr: "DEKRA",
    brandClass: "bg-[#006400]",
    name: "DEKRA-geprüft",
    line: "Unabhängige Qualitätsprüfung",
  },
  {
    key: "tuev",
    abbr: "TÜV",
    brandClass: "bg-[#005CA9]",
    name: "TÜV-zertifiziert",
    line: "Geprüfte Fachkompetenz",
  },
  {
    key: "gif",
    abbr: "gif",
    brandClass: "bg-[#1a1a1a]",
    name: "gif-Mitglied",
    line: "Immobilienwirtschaftliche Forschung",
  },
  {
    key: "dia",
    abbr: "DIA",
    brandClass: "bg-[#003399]",
    name: "DIA-Absolvent",
    line: "Deutsche Immobilien-Akademie",
  },
] as const;

function CredentialBadge({ c }: { c: (typeof credentials)[number] }): JSX.Element {
  return (
    <div className="flex h-12 w-full max-w-[22rem] items-center gap-3 rounded-lg border border-wertavio-border bg-wertavio-white px-4 shadow-sm sm:w-auto sm:max-w-[20rem]">
      <div
        className={`flex h-9 w-14 shrink-0 items-center justify-center rounded text-[10px] font-bold uppercase leading-none text-white ${c.brandClass}`}
      >
        {c.abbr}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-medium text-wertavio-slate">{c.name}</p>
        <p className="truncate text-[11px] text-wertavio-muted">{c.line}</p>
      </div>
    </div>
  );
}

export function NetworkCredentialsSection(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      className="bg-wertavio-cream py-12 md:py-16"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: motionEase }}
    >
      <div className="container-narrow text-center">
        <p className="text-eyebrow text-wertavio-muted">GEPRÜFTE NETZWERKPARTNER</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-wertavio-slate text-pretty">
          Jeder Makler im Wertavio-Netzwerk wird vor Aufnahme persönlich geprüft.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {credentials.map((c) => (
            <CredentialBadge key={c.key} c={c} />
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-xl text-[11px] leading-relaxed text-wertavio-muted">
          * Nicht alle Partner tragen alle Zertifikate. Mindestvoraussetzung: IHK-Sachkundenachweis §34c GewO.
        </p>
      </div>
    </motion.section>
  );
}
