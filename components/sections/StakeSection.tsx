"use client";

import { Button } from "@/components/ui/Button";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

const stakes = [
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
] as const;

export function StakeSection(): JSX.Element {
  return (
    <section id="was-auf-dem-spiel-steht" className="on-dark section-y bg-wertavio-slate text-wertavio-cream">
      <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-12">
        <StaggerReveal className="lg:col-span-5">
          <StaggerItem>
            <h2 className="text-h2 text-white">Ein falscher Makler kostet Sie mehr als seine Provision.</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-[42ch] text-pretty text-lg leading-relaxed text-wertavio-cream/75">
              Der häufigste Fehler beim Immobilienverkauf ist nicht der Makler, der zu viel nimmt, sondern der, der zu
              wenig erreicht.
            </p>
          </StaggerItem>
          <StaggerItem className="mt-9">
            <Button href="/anfrage" variant="gold">
              {PRIMARY_CTA_LABEL}
            </Button>
          </StaggerItem>
        </StaggerReveal>

        <div className="lg:col-span-7">
          <StaggerReveal as="ul">
            {stakes.map((s) => (
              <StaggerItem
                as="li"
                key={s.label}
                className="grid gap-2 border-t border-white/15 py-7 last:border-b sm:grid-cols-[15rem_1fr] sm:gap-8"
              >
                <p className="font-display text-2xl font-bold tracking-[-0.02em] text-wertavio-gold">{s.label}</p>
                <p className="text-pretty leading-relaxed text-wertavio-cream/70">{s.body}</p>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
