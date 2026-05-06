"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { Accordion } from "@/components/ui/Accordion";

const faqItems = [
  {
    id: "kosten",
    question: "Was kostet Wertavio für Eigentümer?",
    answer: "0 €. Sie zahlen kein Entgelt an Wertavio — weder vor noch nach der Vermittlung.",
  },
  {
    id: "ablauf",
    question: "Wie läuft die Vermittlung ab?",
    answer:
      "3 Formularschritte in unter 3 Minuten → Auswahl genau eines Maklers → Rückmeldung an Sie innerhalb von 48 Stunden.",
  },
  {
    id: "auswahl",
    question: "Wie werden Makler aufgenommen?",
    answer:
      "Jedes Büro durchläuft eine Prüfung vor Aufnahme und eine erneute Bewertung mindestens 1× pro Jahr.",
  },
  {
    id: "daten",
    question: "Was passiert mit meinen Daten?",
    answer: "Nutzung ausschließlich für das Matching — kein Verkauf an Dritte, keine Portalweitergabe.",
  },
  {
    id: "verpflichtung",
    question: "Bin ich nach der Anfrage verpflichtet?",
    answer:
      "Nein. Eine Verbindlichkeit entsteht erst, wenn Sie sich aktiv für einen Maklervertrag entscheiden.",
  },
  {
    id: "region",
    question: "Wo ist Wertavio aktiv?",
    answer:
      "Deutschlandweit — Schwerpunkt auf Ballungsräumen; ländliche PLZ werden innerhalb von 48h beantwortet oder mit Alternativvorschlag versehen.",
  },
] as const;

export function FAQ(): JSX.Element {
  return (
    <SectionWrapper id="faq" background="white">
      <StaggerReveal className="mx-auto max-w-3xl text-center">
        <StaggerItem>
          <h2 className="text-h2 text-balance text-wertavio-slate">Häufige Fragen</h2>
        </StaggerItem>
      </StaggerReveal>
      <StaggerReveal className="mx-auto mt-10 max-w-3xl">
        <StaggerItem>
          <Accordion items={[...faqItems]} />
        </StaggerItem>
      </StaggerReveal>
    </SectionWrapper>
  );
}
