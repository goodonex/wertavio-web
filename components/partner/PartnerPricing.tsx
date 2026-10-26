"use client";

import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const included = [
  "Exklusive Zuweisung pro Lead",
  "Kein Portalgebotsmodell",
  "Direkter Kontakt zum Eigentümer nach Freigabe",
  "Onboarding in 2 Sessions",
] as const;

const excluded = [
  "Keine umsatzabhängige Provision an Wertavio",
  "Keine zweite monatliche Abschlussrechnung außerhalb der 750 €",
] as const;

export function PartnerPricing(): JSX.Element {
  return (
    <section id="preise" className="on-dark section-y bg-wertavio-slate text-wertavio-cream">
      <div className="container-wide grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
        <StaggerReveal className="lg:col-span-6">
          <StaggerItem>
            <h2 className="text-h2 text-white">Ein fester Monatsbetrag. Keine Provision.</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-wertavio-cream/75">
              Sie wissen vorher, was ein Monat kostet. Laut aktueller Preisliste gibt es keine versteckte
              Erfolgsprovision.
            </p>
          </StaggerItem>
          <StaggerItem className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-white">Im Monatspaket</p>
              <ul className="mt-4 space-y-3">
                {included.map((t) => (
                  <li key={t} className="flex gap-3 text-wertavio-cream/80">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-wertavio-gold" strokeWidth={2.25} aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Nicht im Paket</p>
              <ul className="mt-4 space-y-3">
                {excluded.map((t) => (
                  <li key={t} className="flex gap-3 text-wertavio-cream/80">
                    <Minus className="mt-1 h-4 w-4 shrink-0 text-wertavio-cream/50" strokeWidth={2.25} aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerReveal>

        <StaggerReveal className="lg:col-span-5 lg:col-start-8">
          <StaggerItem className="on-light rounded-2xl bg-wertavio-cream p-8 text-wertavio-slate sm:p-10">
            <p className="text-sm font-medium text-wertavio-muted">Laufend</p>
            <p className="mt-2 font-display text-5xl font-bold tracking-[-0.03em]">
              750 €<span className="ml-2 text-lg font-semibold text-wertavio-muted">/ 30 Tage</span>
            </p>
            <p className="mt-6 border-t border-wertavio-border pt-6 text-wertavio-slate">
              <span className="font-semibold">Setup</span>
              <span className="text-wertavio-muted"> einmalig 500–1.000 €</span>
            </p>
            <Button href="/anfrage?type=makler" className="mt-8 w-full">
              Partnergespräch anfragen
            </Button>
            <p className="mt-4 text-sm leading-relaxed text-wertavio-muted">
              Erst nach Freigabe des Gesprächs entstehen die genannten Kosten, nicht durch das reine Kontaktformular.
            </p>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
