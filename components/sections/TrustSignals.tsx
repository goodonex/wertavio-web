"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { TrustCertificateCard } from "@/components/sections/TrustCertificateCard";

const points = [
  {
    title: "Ein Makler. Nicht zehn.",
    body: "Ihre Anfrage geht an genau einen ausgewählten Spezialisten — nicht an ein Raster von fünf Konkurrenten.",
  },
  {
    title: "Aufnahme nur nach Check",
    body: "Jedes Büro wird vor Netzwerkaufnahme geprüft — und mindestens 1× jährlich erneut bewertet.",
  },
  {
    title: "0 € für Eigentümer",
    body: "Sie zahlen kein Honorar an Wertavio — weder vorweg noch nach erfolgreichem Verkauf.",
  },
  {
    title: "Gebaut von Makler-Alltag",
    body: "Kevin Herrmann verkaufte Jahre lang selbst Immobilien — aus Sicht von Eigentümer und Makler.",
  },
] as const;

export function TrustSignals(): JSX.Element {
  return (
    <SectionWrapper id="why-wertavio" background="cream">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-3">
          <StaggerReveal className="max-w-xl md:max-w-none">
            <StaggerItem>
              <p className="text-eyebrow">Warum Wertavio</p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
                Weniger Streuung — mehr klare Zuordnung
              </h2>
            </StaggerItem>
          </StaggerReveal>
          <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {points.map((p) => (
              <StaggerItem key={p.title}>
                <article className="card-surface-hover space-y-3">
                  <h3 className="text-lg font-semibold text-wertavio-slate text-balance">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-wertavio-muted text-pretty">{p.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
        <div className="flex justify-center lg:col-span-2 lg:justify-end lg:pt-4">
          <TrustCertificateCard />
        </div>
      </div>
    </SectionWrapper>
  );
}
