"use client";

import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const steps = [
  { title: "Region prüfen", body: "Sie nennen PLZ und Spezialisierung. Wir melden uns innerhalb von 24 Stunden persönlich." },
  { title: "Partnergespräch", body: "Erst nach Freigabe des Gesprächs entstehen Kosten, nicht durch das Kontaktformular." },
  { title: "Onboarding", body: "Das Onboarding erfolgt in zwei gemeinsamen Sessions." },
  { title: "Anfragen erhalten", body: "Verteilt nach PLZ, Profil und freier Kapazität. Direkter Kontakt nach Freigabe." },
] as const;

export function PartnerSteps(): JSX.Element {
  return (
    <section id="ablauf" className="section-y border-t border-wertavio-border">
      <div className="container-wide">
        <StaggerReveal className="max-w-2xl">
          <StaggerItem>
            <h2 className="text-h2 text-wertavio-slate">Von der Anfrage zur Partnerschaft</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lead mt-5">Vier Schritte, bis die erste Verkäufer-Anfrage bei Ihnen ankommt.</p>
          </StaggerItem>
        </StaggerReveal>

        <StaggerReveal as="ol" className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <StaggerItem as="li" key={s.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-wertavio-gold font-display font-bold text-wertavio-slate">
                  {i + 1}
                </span>
                {i < steps.length - 1 ? <span className="hidden h-px flex-1 bg-wertavio-border lg:block" aria-hidden /> : null}
              </div>
              <h3 className="text-h3 mt-5 text-wertavio-slate">{s.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-wertavio-muted">{s.body}</p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
