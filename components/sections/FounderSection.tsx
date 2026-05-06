"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const bullets = [
  "Selbst aktiver Immobilienmakler gewesen",
  "Persönlich erreichbar für jeden Eigentümer",
  "Kein Portal — kein Algorithmus ohne Aufsicht",
] as const;

export function FounderSection(): JSX.Element {
  return (
    <SectionWrapper background="cream">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <StaggerReveal className="lg:col-span-5">
          <StaggerItem className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative w-full max-w-[20rem] overflow-hidden rounded-2xl">
              <Image
                src="/images/kevin.jpg"
                alt="Kevin Herrmann, Gründer von Wertavio"
                width={800}
                height={1067}
                className="aspect-[3/4] w-full object-cover object-top"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
            <p className="mt-3 text-xs text-wertavio-muted">Kevin Herrmann · Gründer</p>
          </StaggerItem>
        </StaggerReveal>

        <div className="lg:col-span-7">
          <StaggerReveal className="max-w-xl lg:max-w-none">
            <StaggerItem>
              <p className="text-eyebrow">GEGRÜNDET VON EINEM MAKLER</p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">Ich kenne beide Seiten.</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 text-sm leading-relaxed text-wertavio-slate text-pretty md:text-base">
                Ich war selbst Immobilienmakler. Ich weiß wie Portale funktionieren — und warum sie für Eigentümer oft
                das falsche Werkzeug sind.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 text-sm leading-relaxed text-wertavio-slate text-pretty md:text-base">
                Wertavio ist meine Antwort darauf: Eine Vermittlung, die dem Eigentümer nützt. Nicht dem Portal. Nicht
                dem schnellsten Makler.
              </p>
            </StaggerItem>
            <StaggerItem>
              <ul className="mt-6 space-y-2.5">
                {bullets.map((line) => (
                  <li key={line} className="flex gap-2 text-sm text-wertavio-slate">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-wertavio-gold" strokeWidth={2} aria-hidden />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
            <StaggerItem className="mt-8 flex flex-col gap-2">
              <Button href="/anfrage" variant="secondary">
                Jetzt persönlich Anfrage stellen →
              </Button>
              <p className="text-[13px] italic text-wertavio-muted">Ich lese jede Anfrage persönlich. — Kevin</p>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
