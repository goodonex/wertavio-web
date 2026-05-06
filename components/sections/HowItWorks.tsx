"use client";

import { Fragment } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Phone, Search } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

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

function StepColumn({
  index,
  step,
}: {
  index: number;
  step: (typeof steps)[number];
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const Icon = step.icon;
  const label = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      className="relative flex min-w-0 flex-1 flex-col gap-4"
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={reduced ? { opacity: 1, y: 0 } : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: motionEase, delay: reduced ? 0 : index * 0.2 }}
    >
      <div className="font-display text-[5rem] font-semibold leading-[0.85] text-wertavio-gold">{label}</div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-wertavio-gold/35 text-wertavio-slate">
          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </span>
        <span className="rounded-full border border-wertavio-border bg-wertavio-cream px-2.5 py-1 text-xs font-medium text-wertavio-slate">
          {step.badge}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-wertavio-slate">{step.title}</h3>
      <p className="text-sm leading-relaxed text-wertavio-muted text-pretty">{step.body}</p>
    </motion.div>
  );
}

function DashedH(): JSX.Element {
  return (
    <div
      className="mx-2 hidden min-h-[1px] min-w-[1.5rem] flex-1 self-center border-t-2 border-dashed border-wertavio-border md:block"
      aria-hidden
    />
  );
}

function DashedV(): JSX.Element {
  return (
    <div
      className="mx-auto h-10 w-px border-l-2 border-dashed border-wertavio-border md:hidden"
      aria-hidden
    />
  );
}

export function HowItWorks(): JSX.Element {
  return (
    <SectionWrapper id="ablauf" background="white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-eyebrow">Ablauf in 3 Schritten</p>
        <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
          In drei Schritten zum passenden Makler
        </h2>
      </div>

      <div className="mx-auto mt-14 flex max-w-5xl flex-col md:flex-row md:items-start md:justify-between">
        {steps.map((step, i) => (
          <Fragment key={step.title}>
            {i > 0 ? (
              <>
                <DashedV />
                <DashedH />
              </>
            ) : null}
            <StepColumn index={i} step={step} />
          </Fragment>
        ))}
      </div>
    </SectionWrapper>
  );
}
