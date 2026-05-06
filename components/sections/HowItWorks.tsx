"use client";

import { motion } from "framer-motion";
import { FileText, Phone, Search } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const steps = [
  {
    icon: FileText,
    badge: "2 Minuten",
    title: "Anfrage stellen",
    body: "Immobilientyp, PLZ und Ihr Ziel. Nur das, was für das Matching nötig ist.",
  },
  {
    icon: Search,
    badge: "innerhalb 48h",
    title: "Wir matchen",
    body: "Algorithmus und persönliches Kuratieren — ein Spezialist wird ausgewählt.",
  },
  {
    icon: Phone,
    badge: "direkter Kontakt",
    title: "Makler meldet sich",
    body: "Ein Ansprechpartner. Kein Portal-Postfach. Keine Spam-Schleife.",
  },
] as const;

const connectorVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { duration: 0 } },
} as const;

function StepCard({ index, step }: { index: number; step: (typeof steps)[number] }): JSX.Element {
  const Icon = step.icon;

  return (
    <article className="group/step flex h-full w-full flex-col gap-3 rounded-[12px] border border-wertavio-border bg-wertavio-white p-6 shadow-sm">
      <div className="font-display text-[3rem] font-semibold leading-none text-wertavio-gold transition-transform duration-150 ease-out motion-safe:group-hover/step:scale-[1.08]">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-wertavio-gold/35 text-wertavio-slate">
          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </span>
        <span className="rounded-full border border-wertavio-border bg-wertavio-cream px-2.5 py-1 text-xs font-medium text-wertavio-slate">
          {step.badge}
        </span>
      </div>
      <h3 className="text-[1.1rem] font-semibold text-wertavio-slate">{step.title}</h3>
      <p className="text-[0.9rem] leading-[1.6] text-wertavio-muted text-pretty">{step.body}</p>
    </article>
  );
}

function GoldDashedConnector(): JSX.Element {
  return (
    <motion.div
      variants={connectorVariants}
      className="hidden min-h-[1px] min-w-[2rem] flex-[0.45] flex-col pt-12 lg:flex"
      aria-hidden
    >
      <div className="h-px w-full border-t border-dashed border-wertavio-gold" />
    </motion.div>
  );
}

export function HowItWorks(): JSX.Element {
  return (
    <SectionWrapper id="how-it-works" background="white">
      <StaggerReveal className="mx-auto max-w-3xl md:mx-0">
        <StaggerItem>
          <p className="text-eyebrow">Ablauf in 3 Schritten</p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
            In drei Schritten zum passenden Makler
          </h2>
        </StaggerItem>
      </StaggerReveal>

      <StaggerReveal className="mx-auto mt-14 flex max-w-5xl flex-col gap-6 text-center md:mx-0 md:text-left lg:flex-row lg:items-stretch lg:gap-0">
        {steps.flatMap((step, i) => [
          ...(i > 0 ? [<GoldDashedConnector key={`${step.title}-conn`} />] : []),
          <StaggerItem key={step.title} className="min-w-0 flex-1">
            <StepCard index={i} step={step} />
          </StaggerItem>,
        ])}
      </StaggerReveal>
    </SectionWrapper>
  );
}
