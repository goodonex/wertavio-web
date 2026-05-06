import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const reviews = [
  {
    name: "Sabine K.",
    quote:
      "Nach 36 Stunden kam der erste Kontakt — ein Makler, ein Ablaufplan. Ohne Portal-Postfach.",
  },
  {
    name: "Thomas M.",
    quote: "Ein Ansprechpartner ab Tag 3 — genau das suchte ich nach zwei gescheiterten Portalexperimenten.",
  },
  {
    name: "Lea R.",
    quote: "Rückmeldung binnen 48h, dann klare nächste Schritte auf einem Screen.",
  },
  {
    name: "Oliver P.",
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
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-h2 text-balance text-wertavio-slate">Stimmen von Eigentümern</h2>
        <p className="mt-3 text-xs text-wertavio-muted">
          Beispielzitate — Platzhalter, noch keine verifizierte Bewertungsanbindung (z. B. ProvenExpert)
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <figure key={r.name} className="card-surface-hover space-y-4">
            <StarRow />
            <blockquote className="text-sm leading-relaxed text-wertavio-slate text-pretty">
              „{r.quote}“
            </blockquote>
            <figcaption className="text-xs font-semibold text-wertavio-muted">{r.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-2 rounded-[10px] border border-dashed border-wertavio-border bg-wertavio-cream px-6 py-5 text-center text-xs text-wertavio-muted">
        <div
          className="flex h-12 w-40 items-center justify-center rounded border border-wertavio-border bg-wertavio-white text-[10px] font-semibold text-wertavio-slate"
          aria-hidden
        >
          ProvenExpert (Platzhalter)
        </div>
        <p>Siegel-Anbindung folgt — Platzhalter</p>
      </div>
    </SectionWrapper>
  );
}
