import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ImpressumPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="section-y bg-wertavio-cream">
        <div className="container-narrow max-w-2xl space-y-4">
          <h1 className="text-h2 text-wertavio-slate">Impressum</h1>
          <p className="text-sm leading-relaxed text-wertavio-muted">
            Platzhalter-Seite: Angaben gemäß TMG folgen. Bitte ergänzen Sie Firmenname,
            Anschrift, Vertretungsberechtigte, Kontakt und Registereintrag sobald verfügbar.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
