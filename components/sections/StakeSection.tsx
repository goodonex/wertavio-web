"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const cards = [
  {
    label: "Verkauf unter Wert",
    body: "Setzt der Makler den falschen Preis an, verkaufen Sie unter Marktwert oder müssen später nachverhandeln.",
  },
  {
    label: "Verlorene Zeit",
    body: "Ohne passende Käufer im Bestand zieht sich der Verkauf. Jeder zusätzliche Monat kostet Finanzierung, Nebenkosten und Nerven.",
  },
  {
    label: "Ärger im Nachhinein",
    body: "Viele Verkäufer merken erst nach dem Notartermin, dass ein anderer Makler mehr erreicht hätte.",
  },
];

export function StakeSection(): JSX.Element {
  return (
    <SectionWrapper id="geistige-brandstiftung" background="slate">
      <div>
        <StaggerReveal className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <StaggerItem>
            <p className="text-eyebrow text-wertavio-cream/70">WAS AUF DEM SPIEL STEHT</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-h2 mt-3 text-balance text-wertavio-white">
              Ein falscher Makler kostet Sie mehr als seine Provision.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-base leading-relaxed text-wertavio-cream/85 text-pretty">
              Der häufigste Fehler beim Immobilienverkauf ist nicht der Makler, der zu viel nimmt — sondern der, der zu
              wenig erreicht.
            </p>
          </StaggerItem>
        </StaggerReveal>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.label}>
              <article className="flex h-full w-full flex-col gap-4 rounded-[10px] bg-wertavio-slate-soft p-6 shadow-sm">
                <h3 className="font-display text-2xl leading-tight text-wertavio-gold">{c.label}</h3>
                <p className="text-sm leading-relaxed text-wertavio-cream/75 text-pretty">{c.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-3 text-center md:mx-0 md:items-start md:text-left">
          <Button href="/anfrage">Jetzt den richtigen Makler finden →</Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
