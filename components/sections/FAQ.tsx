"use client";

import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { Accordion } from "@/components/ui/Accordion";
import { siteLegal } from "@/lib/site-legal";

const faqItems = [
  {
    id: "kosten",
    question: "Was kostet Wertavio für Eigentümer?",
    answer: "0 €. Sie zahlen kein Entgelt an Wertavio, weder vor noch nach der Vermittlung.",
  },
  {
    id: "ablauf",
    question: "Wie läuft die Vermittlung ab?",
    answer:
      "Sie füllen drei kurze Formularschritte aus, in unter 3 Minuten. Wir wählen genau einen Makler aus, und Sie erhalten innerhalb von 48 Stunden eine Rückmeldung.",
  },
  {
    id: "auswahl",
    question: "Wie werden Makler aufgenommen?",
    answer: "Jedes Büro durchläuft eine Prüfung vor Aufnahme und eine erneute Bewertung mindestens einmal pro Jahr.",
  },
  {
    id: "daten",
    question: "Was passiert mit meinen Daten?",
    answer: "Nutzung ausschließlich für das Matching. Kein Verkauf an Dritte, keine Portalweitergabe.",
  },
  {
    id: "verpflichtung",
    question: "Bin ich nach der Anfrage verpflichtet?",
    answer: "Nein. Eine Verbindlichkeit entsteht erst, wenn Sie sich aktiv für einen Maklervertrag entscheiden.",
  },
  {
    id: "region",
    question: "Wo ist Wertavio aktiv?",
    answer:
      "Deutschlandweit mit Schwerpunkt auf Ballungsräumen. Anfragen aus ländlichen PLZ werden innerhalb von 48 Stunden beantwortet oder mit einem Alternativvorschlag versehen.",
  },
];

export function FAQ(): JSX.Element {
  return (
    <section id="faq" className="section-y border-t border-wertavio-border">
      <div className="container-wide grid gap-10 lg:grid-cols-12 lg:gap-12">
        <StaggerReveal className="lg:col-span-4">
          <StaggerItem>
            <h2 className="text-h2 text-wertavio-slate">Häufige Fragen</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-[34ch] leading-relaxed text-wertavio-muted">
              Ihre Frage ist nicht dabei? Schreiben Sie uns an{" "}
              <a href={`mailto:${siteLegal.email}`} className="font-medium text-wertavio-slate underline underline-offset-4">
                {siteLegal.email}
              </a>
              .
            </p>
          </StaggerItem>
        </StaggerReveal>
        <StaggerReveal className="lg:col-span-8">
          <StaggerItem>
            <Accordion items={faqItems} />
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
