"use client";

import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const checks = [
  {
    title: "Prüfung vor der Aufnahme",
    body: "Jedes Büro wird persönlich geprüft, bevor es eine einzige Anfrage erhält.",
  },
  {
    title: "Neubewertung jedes Jahr",
    body: "Mindestens einmal pro Jahr wird jedes Büro erneut bewertet.",
  },
  {
    title: "Klare Mindestvoraussetzung",
    body: "Ohne IHK-Sachkundenachweis nach §34c GewO kommt niemand ins Netzwerk.",
  },
] as const;

const credentials = [
  { name: "IHK-Zertifiziert", line: "Sachkundenachweis §34c GewO" },
  { name: "IVD-Mitglied", line: "Immobilienverband Deutschland" },
  { name: "DEKRA-geprüft", line: "Unabhängige Qualitätsprüfung" },
  { name: "TÜV-zertifiziert", line: "Geprüfte Fachkompetenz" },
  { name: "gif-Mitglied", line: "Immobilienwirtschaftliche Forschung" },
  { name: "DIA-Absolvent", line: "Deutsche Immobilien-Akademie" },
] as const;

export function TrustSignals(): JSX.Element {
  return (
    <section id="why-wertavio" className="section-y">
      <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <StaggerReveal>
            <StaggerItem>
              <h2 className="text-h2 text-wertavio-slate">Ins Netzwerk kommt nur, wer geprüft ist</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lead mt-5 max-w-[46ch]">
                Jeder Makler im Wertavio-Netzwerk wird vor Aufnahme persönlich geprüft. Für jedes Büro gilt dasselbe
                Verfahren.
              </p>
            </StaggerItem>
          </StaggerReveal>
          <StaggerReveal as="ul" className="mt-10 space-y-7">
            {checks.map((c) => (
              <StaggerItem as="li" key={c.title} className="border-l-2 border-wertavio-gold pl-5">
                <h3 className="text-h3 text-wertavio-slate">{c.title}</h3>
                <p className="mt-1.5 max-w-[46ch] leading-relaxed text-wertavio-muted">{c.body}</p>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        <StaggerReveal className="lg:col-span-6 lg:col-start-7">
          <StaggerItem className="rounded-2xl bg-wertavio-stone p-6 sm:p-8">
            <p className="text-h3 text-wertavio-slate">Qualifikationen im Netzwerk</p>
            <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
              {credentials.map((c) => (
                <li key={c.name} className="border-t border-wertavio-slate/10 py-4">
                  <p className="font-semibold text-wertavio-slate">{c.name}</p>
                  <p className="mt-0.5 text-sm text-wertavio-muted">{c.line}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-wertavio-muted">
              Nicht alle Partner tragen alle Zertifikate. Mindestvoraussetzung ist der IHK-Sachkundenachweis §34c GewO.
            </p>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
