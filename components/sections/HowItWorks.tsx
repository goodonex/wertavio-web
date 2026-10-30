"use client";

import { MaklerProfilSection } from "@/components/sections/MaklerProfilSection";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const steps = [
  {
    title: "Anfrage stellen",
    meta: "2 Minuten",
    body: "Immobilientyp, PLZ und Ihr Ziel. Nur das, was für das Matching nötig ist.",
  },
  {
    title: "Wir wählen aus",
    meta: "Innerhalb von 48 Stunden",
    body: "Wir wählen persönlich genau einen Makler aus, der zu Ihrer Region, Ihrer Immobilie und Ihrem Ziel passt.",
  },
  {
    title: "Ihr Makler meldet sich",
    meta: "Direkter Kontakt",
    body: "Ein Ansprechpartner statt Portal-Postfach. Ob Sie einen Maklervertrag schließen, entscheiden allein Sie.",
  },
] as const;

export function HowItWorks(): JSX.Element {
  return (
    <section id="how-it-works" className="section-y">
      <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <StaggerReveal>
            <StaggerItem>
              <h2 className="text-h2 text-wertavio-slate">So kommen Sie zu Ihrem Makler</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lead mt-5 max-w-[46ch]">
                Drei Schritte, ein Ansprechpartner. Sie behalten jederzeit die Entscheidung.
              </p>
            </StaggerItem>
          </StaggerReveal>

          <StaggerReveal as="ol" className="relative mt-12">
            {steps.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="relative flex gap-5 pb-10 last:pb-0">
                {i < steps.length - 1 ? (
                  <span className="absolute left-5 top-12 h-[calc(100%-3.5rem)] w-px bg-wertavio-border" aria-hidden />
                ) : null}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-wertavio-gold bg-wertavio-cream font-display text-base font-bold text-wertavio-slate">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <p className="text-sm font-medium text-wertavio-gold-ink">{s.meta}</p>
                  <h3 className="text-h3 mt-1 text-wertavio-slate">{s.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-pretty leading-relaxed text-wertavio-muted">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        <StaggerReveal className="lg:col-span-6 lg:col-start-7 lg:pt-2 xl:col-span-5 xl:col-start-8">
          <StaggerItem>
            <p className="mb-4 max-w-[40ch] text-wertavio-muted">
              <span className="font-semibold text-wertavio-slate">Gleich hier starten:</span> Ihr persönliches
              Anforderungsprofil, bevor wir matchen.
            </p>
            <MaklerProfilSection />
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
