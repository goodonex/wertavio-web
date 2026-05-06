"use client";

import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { reviewStaggerContainer } from "@/lib/utils";

const reviews = [
  {
    name: "Sabine K.",
    detail: "Hamburg-Eimsbüttel · ETW 94m²",
    quote:
      "Nach 36 Stunden kam der erste Kontakt — ein Makler, ein Ablaufplan. Ohne Portal-Postfach.",
  },
  {
    name: "Thomas M.",
    detail: "München-Schwabing · Einfamilienhaus",
    quote: "Ein Ansprechpartner ab Tag 3 — genau das suchte ich nach zwei gescheiterten Portalexperimenten.",
  },
  {
    name: "Lea R.",
    detail: "Berlin-Prenzlauer Berg · ETW 67m²",
    quote: "Rückmeldung binnen 48h, dann klare nächste Schritte auf einem Screen.",
  },
  {
    name: "Oliver P.",
    detail: "Hamburg-Altona · Doppelhaushälfte",
    quote: "Nach 10 Tagen war der Maklerwechsel entschieden — ohne neue Akquise-Runden.",
  },
] as const;

function StarRow(): JSX.Element {
  return (
    <div className="flex gap-0.5 text-wertavio-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-wertavio-gold" strokeWidth={0} />
      ))}
    </div>
  );
}

export function Reviews(): JSX.Element {
  return (
    <SectionWrapper id="bewertungen" background="white">
      <StaggerReveal className="mx-auto max-w-3xl md:mx-0">
        <StaggerItem>
          <h2 className="text-h2 text-balance text-wertavio-slate">Stimmen von Eigentümern</h2>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-3 text-base text-wertavio-muted">
            Beispielzitate — Platzhalter, noch keine verifizierte Bewertungsanbindung (z. B. ProvenExpert)
          </p>
        </StaggerItem>
      </StaggerReveal>
      <StaggerReveal variants={reviewStaggerContainer} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <StaggerItem key={r.name}>
            <figure className="card-surface-hover space-y-4">
              <StarRow />
              <blockquote className="text-sm leading-relaxed text-wertavio-slate text-pretty">
                „{r.quote}“
              </blockquote>
              <figcaption>
                <p className="text-xs font-semibold text-wertavio-muted">{r.name}</p>
                <p className="mt-1 text-[11px] text-wertavio-muted">{r.detail}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerReveal>
      <StaggerReveal className="mx-auto mt-10 flex max-w-md flex-col items-center gap-2 rounded-[10px] border border-dashed border-wertavio-border bg-wertavio-cream px-6 py-5 text-center text-xs text-wertavio-muted">
        <StaggerItem className="flex w-full flex-col items-center gap-2">
          <div
            className="flex h-12 w-40 items-center justify-center rounded border border-wertavio-border bg-wertavio-white text-[10px] font-semibold text-wertavio-slate"
            aria-hidden
          >
            ProvenExpert (Platzhalter)
          </div>
          <p>Siegel-Anbindung folgt — Platzhalter</p>
        </StaggerItem>
      </StaggerReveal>
    </SectionWrapper>
  );
}
