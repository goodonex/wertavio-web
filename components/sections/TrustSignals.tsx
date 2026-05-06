import { SectionWrapper } from "@/components/ui/SectionWrapper";

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

function TrustCertificateVisual(): JSX.Element {
  return (
    <aside
      className="relative mx-auto w-full max-w-md rounded-xl border-[1.5px] border-wertavio-gold bg-wertavio-white p-8 shadow-[0_1px_0_rgba(26,31,46,0.04),0_8px_24px_rgba(26,31,46,0.08),0_20px_48px_rgba(26,31,46,0.04)]"
      aria-label="Beispiel Netzwerk-Zertifizierung"
    >
      <p className="border-b border-wertavio-border pb-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-wertavio-gold">
        Netzwerk-Zertifizierung
      </p>
      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4 border-b border-wertavio-border/80 pb-3">
          <dt className="text-wertavio-muted">Büro</dt>
          <dd className="text-right font-medium text-wertavio-slate">Muster Immobilien GmbH</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-wertavio-border/80 pb-3">
          <dt className="text-wertavio-muted">Region</dt>
          <dd className="text-right font-medium text-wertavio-slate">Hamburg &amp; Umgebung</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-wertavio-border/80 pb-3">
          <dt className="text-wertavio-muted">Geprüft</dt>
          <dd className="text-right font-medium text-wertavio-slate">14. März 2025</dd>
        </div>
        <div className="flex justify-between gap-4 pb-1">
          <dt className="text-wertavio-muted">Status</dt>
          <dd className="text-right font-medium text-wertavio-slate">✓ Aktiv im Netzwerk</dd>
        </div>
      </dl>
      <div className="mt-8 flex justify-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-wertavio-gold font-display text-lg font-semibold text-wertavio-gold"
          aria-hidden
        >
          W
        </div>
      </div>
    </aside>
  );
}

export function TrustSignals(): JSX.Element {
  return (
    <SectionWrapper id="warum" background="cream">
      <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-3">
          <div className="max-w-xl">
            <p className="text-eyebrow">Warum Wertavio</p>
            <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
              Weniger Streuung — mehr klare Zuordnung
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {points.map((p) => (
              <article key={p.title} className="card-surface-hover space-y-3">
                <h3 className="text-lg font-semibold text-wertavio-slate text-balance">{p.title}</h3>
                <p className="text-sm leading-relaxed text-wertavio-muted text-pretty">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="flex justify-center lg:col-span-2 lg:justify-end lg:pt-4">
          <TrustCertificateVisual />
        </div>
      </div>
    </SectionWrapper>
  );
}
