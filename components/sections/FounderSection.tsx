"use client";

import Image from "next/image";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const facts = [
  "Selbst aktiver Immobilienmakler gewesen",
  "Persönlich erreichbar für jeden Eigentümer",
  "Kein Portal und kein Algorithmus ohne Aufsicht",
] as const;

export function FounderSection(): JSX.Element {
  return (
    <section id="gruender" className="section-y border-t border-wertavio-border">
      <div className="container-wide grid items-center gap-12 md:grid-cols-12 lg:gap-16">
        <StaggerReveal className="md:col-span-5">
          <StaggerItem>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-wertavio-stone">
              <Image
                src="/images/kevin.jpg"
                alt="Kevin Herrmann, Gründer von Wertavio"
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          </StaggerItem>
        </StaggerReveal>

        <StaggerReveal className="md:col-span-7">
          <StaggerItem>
            <h2 className="text-h2 text-wertavio-slate">Ich kenne beide Seiten.</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-[54ch] text-pretty text-lg leading-relaxed text-wertavio-slate">
              Ich war selbst Immobilienmakler. Ich weiß, wie Portale funktionieren und warum sie für Eigentümer oft
              das falsche Werkzeug sind.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-[54ch] text-pretty text-lg leading-relaxed text-wertavio-muted">
              Wertavio ist meine Antwort darauf: eine Vermittlung, die dem Eigentümer nützt. Nicht dem Portal und
              nicht dem schnellsten Makler.
            </p>
          </StaggerItem>
          <StaggerItem>
            <ul className="mt-8 flex flex-wrap gap-2">
              {facts.map((f) => (
                <li key={f} className="rounded-full border border-wertavio-border px-4 py-2 text-sm text-wertavio-slate">
                  {f}
                </li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-8 text-wertavio-slate">
              <span className="font-semibold">Kevin Herrmann</span>
              <span className="text-wertavio-muted">, Gründer. Ich lese jede Anfrage persönlich.</span>
            </p>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
