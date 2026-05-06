import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { RiskNote } from "@/components/ui/RiskNote";
import { PartnerRegionForm } from "@/components/partner/PartnerRegionForm";

const benefits = [
  {
    title: "1 Lead = 1 Makler",
    body: "Sie sind alleiniger Empfänger je Anfrage — keine Parallelvergabe an fünf Schaufenster in derselben Woche.",
  },
  {
    title: "Vorqualifiziert",
    body: "Kontakte entstehen nur, wenn der Eigentümer Verkaufsabsicht und Region in den ersten zwei Schritten bestätigt hat.",
  },
  {
    title: "Budget fix",
    body: "750 € pro Monat plus einmalig 500–1.000 € Setup — keine versteckte Erfolgsprovision laut aktueller Preisliste.",
  },
] as const;

export default function PartnerPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="bg-wertavio-slate py-16 text-wertavio-cream md:py-24">
          <div className="container-narrow space-y-6">
            <p className="text-eyebrow text-wertavio-cream/70">Für Makler</p>
            <h1 className="text-h1 max-w-3xl text-balance text-wertavio-white">
              Verkäufer-Anfragen in 48h — ein Makler pro Lead
            </h1>
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-wertavio-cream/85 md:text-base">
              Sie bekommen Anfragen aus geprüftem Eigentümer-Kanal — nach PLZ, Profil und freier Kapazität
              verteilt. Monatlich 750 €, Setup einmalig 500–1.000 €.
            </p>
          </div>
        </section>

        <section className="section-y bg-wertavio-cream">
          <div className="container-narrow space-y-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-h2 text-wertavio-slate">Ist Ihre Region noch verfügbar?</h2>
              <p className="mt-3 text-sm leading-relaxed text-wertavio-muted md:text-base">
                Wertavio arbeitet pro PLZ-Gebiet nur mit einem Partner. Prüfen Sie jetzt ob Ihre Zielregion
                noch frei ist.
              </p>
            </div>
            <div className="card-surface-hover mx-auto max-w-xl border border-wertavio-border px-6 py-8 md:px-10">
              <PartnerRegionForm />
            </div>
          </div>
        </section>

        <section className="section-y bg-wertavio-cream">
          <div className="container-narrow">
            <article className="card-surface-hover mx-auto max-w-lg border-2 border-wertavio-gold text-center">
              <h2 className="text-h2 text-wertavio-slate">Preise in Zahlen</h2>
              <div className="mt-8 space-y-2 text-wertavio-slate">
                <p className="text-sm">
                  <span className="font-semibold">Setup</span> · 500–1.000 € einmalig
                </p>
                <p className="text-lg font-semibold">Laufend · 750 € / 30 Tage</p>
              </div>
              <div className="mt-8 space-y-4 text-left text-sm text-wertavio-muted">
                <p className="font-semibold text-wertavio-slate">Im Monatspaket</p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Exklusive Zuweisung pro Lead</li>
                  <li>Kein Portalgebotsmodell</li>
                  <li>Direkter Kontakt zum Eigentümer nach Freigabe</li>
                  <li>Onboarding in 2 Sessions</li>
                </ul>
                <p className="font-semibold text-wertavio-slate">Nicht im Paket</p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Keine umsatzabhängige Provision an Wertavio</li>
                  <li>Keine zweite monatliche Abschlussrechnung außerhalb der 750 €</li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col items-center">
                <Button href="/anfrage?type=makler" enableIdleGlow>
                  Partnergespräch anfragen
                </Button>
                <RiskNote className="text-wertavio-muted">
                  Erst nach Freigabe des Gesprächs entstehen die genannten Kosten — nicht durch das reine
                  Kontaktformular.
                </RiskNote>
              </div>
            </article>
          </div>
        </section>

        <section className="section-y bg-wertavio-white">
          <div className="container-narrow grid gap-8 md:grid-cols-3">
            {benefits.map((b) => (
              <article key={b.title} className="card-surface-hover space-y-3">
                <h3 className="text-lg font-semibold text-wertavio-slate">{b.title}</h3>
                <p className="text-sm leading-relaxed text-wertavio-muted text-pretty">{b.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-y border-t border-wertavio-border bg-wertavio-cream">
          <div className="container-narrow flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-wertavio-muted">
              Zum Eigentümer-Angebot{" "}
              <Link href="/" className="font-semibold text-wertavio-slate hover:text-wertavio-gold">
                zur Startseite
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
