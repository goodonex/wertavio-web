"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { useCountUp } from "@/lib/useCountUp";

function formatDeInteger(n: number): string {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function StatBlock({
  active,
  variant,
}: {
  active: boolean;
  variant: "euro" | "months" | "thirds";
}): JSX.Element {
  const euro = useCountUp(47_000, active && variant === "euro", 800);
  const months = useCountUp(4.2, active && variant === "months", 800);
  const oneOfThree = useCountUp(1, active && variant === "thirds", 800);

  if (variant === "euro") {
    return (
      <span className="block font-display text-[3rem] leading-none text-wertavio-gold">
        ∅ {formatDeInteger(euro)} €
      </span>
    );
  }
  if (variant === "months") {
    const formatted = months.toFixed(1).replace(".", ",");
    return (
      <span className="block font-display text-[3rem] leading-none text-wertavio-gold">{formatted} Monate</span>
    );
  }
  return (
    <span className="block font-display text-[3rem] leading-none text-wertavio-gold">
      {Math.round(oneOfThree)} von 3
    </span>
  );
}

const cards = [
  {
    variant: "euro" as const,
    label: "Unter Marktwert",
    body: "So viel lassen Eigentümer im Schnitt liegen, wenn der falsche Makler den falschen Preis ansetzt.",
  },
  {
    variant: "months" as const,
    label: "Verlorene Zeit",
    body: "So lange dauert ein Verkauf mit dem falschen Makler durchschnittlich länger — mit allen Folgekosten.",
  },
  {
    variant: "thirds" as const,
    label: "Eigentümer bereut",
    body: "Jeder dritte Verkäufer würde im Nachhinein einen anderen Makler wählen.",
  },
];

export function StakeSection(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <SectionWrapper id="geistige-brandstiftung" background="slate">
      <div ref={ref}>
        <StaggerReveal className="mx-auto max-w-3xl text-center">
          <StaggerItem>
            <p className="text-eyebrow text-wertavio-cream/70">WAS AUF DEM SPIEL STEHT</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-h2 mt-3 text-balance text-wertavio-white">
              Ein falscher Makler kostet Sie mehr als seine Provision.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-sm leading-relaxed text-wertavio-cream/85 md:text-base text-pretty">
              Der häufigste Fehler beim Immobilienverkauf ist nicht der Makler, der zu viel nimmt — sondern der, der zu
              wenig erreicht.
            </p>
          </StaggerItem>
        </StaggerReveal>

        <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.label}>
              <article className="flex h-full flex-col gap-4 rounded-[10px] bg-wertavio-slate-soft p-6 shadow-sm">
                <StatBlock active={inView} variant={c.variant} />
                <h3 className="text-base font-semibold text-wertavio-white">{c.label}</h3>
                <p className="text-sm leading-relaxed text-wertavio-cream/75 text-pretty">{c.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-3 text-center">
          <Button href="/anfrage">Jetzt den richtigen Makler finden →</Button>
          <p className="text-[11px] text-wertavio-cream/55">* Schätzwerte basierend auf Marktbeobachtungen</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
