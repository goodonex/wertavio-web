"use client";

import Image from "next/image";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA_LABEL, PRIMARY_CTA_RISK } from "@/lib/cta";

export function OwnerCTA(): JSX.Element {
  return (
    <section id="cta-eigentuemer" className="pb-20 md:pb-28">
      <div className="container-wide">
        <div className="on-dark grid overflow-hidden rounded-2xl bg-wertavio-slate lg:grid-cols-12">
          <StaggerReveal className="px-6 py-16 sm:px-12 md:py-20 lg:col-span-7">
            <StaggerItem>
              <h2 className="text-h2 text-wertavio-cream">Bereit für eine klare Maklerzuordnung?</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-[48ch] text-pretty text-lg leading-relaxed text-wertavio-nebel">
                Sie beschreiben Immobilie und Ziel, wir wählen den passenden Spezialisten aus. Keine Pflicht zur
                Maklerbeauftragung.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button href="/anfrage" variant="gold" className="w-full sm:w-auto">
                {PRIMARY_CTA_LABEL}
              </Button>
              <p className="text-center text-sm text-wertavio-nebel sm:text-left">{PRIMARY_CTA_RISK}</p>
            </StaggerItem>
          </StaggerReveal>
          <div className="relative min-h-[240px] lg:col-span-5">
            <Image
              src="/images/marke/ortsansicht.jpg"
              alt="Ortsansicht von oben: Dorf zwischen Feldern und Waldstücken"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 450px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
