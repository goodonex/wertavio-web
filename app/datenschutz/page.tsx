import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function DatenschutzPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="section-y bg-wertavio-cream pt-24">
        <div className="container-narrow max-w-2xl space-y-4">
          <h1 className="text-h2 text-wertavio-slate">Datenschutz</h1>
          <p className="text-sm leading-relaxed text-wertavio-muted">
            Platzhalter-Seite: Informationen zur Verarbeitung personenbezogener Daten, Rechtsgrundlagen,
            Speicherdauer und Betroffenenrechte werden hier eingestellt, sobald die endgültige
            Datenschutzerklärung vorliegt.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
