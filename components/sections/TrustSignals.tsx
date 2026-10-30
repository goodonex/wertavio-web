"use client";

import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const checks = [
  {
    title: "Prüfung vor der Aufnahme",
    body: "Jedes Büro wird persönlich geprüft, bevor es eine einzige Anfrage erhält.",
  },
  {
    title: "Nachfrage nach jeder Vermittlung",
    body: "Wir fragen Sie, wie die Zusammenarbeit lief. Wer Eigentümer schlecht betreut, bekommt keine Anfragen mehr.",
  },
  {
    title: "Klare Mindestvoraussetzung",
    body: "Ohne Erlaubnis nach § 34c GewO bekommt niemand eine Anfrage von uns.",
  },
] as const;

const credentials = [
  { name: "Erlaubnis nach § 34c GewO", line: "Wir lassen sie uns vorlegen" },
  { name: "Persönliches Gespräch", line: "Bevor die erste Anfrage weitergeht" },
  { name: "Verkäufe in Ihrer Region", line: "Belegt, nicht nur behauptet" },
  { name: "Ein fester Ansprechpartner", line: "Kein Callcenter, keine Weitergabe" },
] as const;

export function TrustSignals(): JSX.Element {
  return (
    <section id="why-wertavio" className="section-y">
      <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <StaggerReveal>
            <StaggerItem>
              <h2 className="text-h2 text-wertavio-slate">Wir vermitteln nur Makler, die wir kennen</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lead mt-5 max-w-[46ch]">
                Bevor ein Makler eine Anfrage von uns bekommt, sprechen wir persönlich mit ihm und prüfen seine
                Erlaubnis. Für jedes Büro gilt dasselbe Verfahren.
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
            <p className="text-h3 text-wertavio-slate">Was wir vor der ersten Anfrage prüfen</p>
            <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
              {credentials.map((c) => (
                <li key={c.name} className="border-t border-wertavio-slate/10 py-4">
                  <p className="font-semibold text-wertavio-slate">{c.name}</p>
                  <p className="mt-0.5 text-sm text-wertavio-muted">{c.line}</p>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
