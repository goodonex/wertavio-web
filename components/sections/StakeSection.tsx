"use client";

import { Button } from "@/components/ui/Button";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

const stakes = [
  {
    value: "∅ 47.000 €",
    label: "Unter Marktwert",
    body: "So viel lassen Eigentümer im Schnitt liegen, wenn der falsche Makler den falschen Preis ansetzt.",
  },
  {
    value: "4,2 Monate",
    label: "Verlorene Zeit",
    body: "So lange dauert ein Verkauf mit dem falschen Makler durchschnittlich länger, mit allen Folgekosten.",
  },
  {
    value: "1 von 3",
    label: "Eigentümer bereut",
    body: "Jeder dritte Verkäufer würde im Nachhinein einen anderen Makler wählen.",
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
                className="grid gap-2 border-t border-white/15 py-7 sm:grid-cols-[15rem_1fr] sm:gap-8"
              >
                <p className="whitespace-nowrap font-display text-4xl font-bold tracking-[-0.03em] text-wertavio-gold md:text-[2.75rem] md:leading-none">
                  {s.value}
                </p>
                <div>
                  <p className="font-semibold text-white">{s.label}</p>
                  <p className="mt-1 text-pretty leading-relaxed text-wertavio-cream/70">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
          <p className="border-t border-white/15 pt-5 text-xs text-wertavio-cream/60">
            * Schätzwerte basierend auf Marktbeobachtungen
          </p>
        </div>
      </div>
    </section>
  );
}
