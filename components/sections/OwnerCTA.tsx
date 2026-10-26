"use client";

import Image from "next/image";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA_LABEL, PRIMARY_CTA_RISK } from "@/lib/cta";

export function OwnerCTA(): JSX.Element {
  return (
    <section id="cta-eigentuemer" className="pb-20 md:pb-28">
      <div className="container-wide">
        <div className="on-dark relative isolate overflow-hidden rounded-2xl bg-wertavio-slate px-6 py-16 sm:px-12 md:py-24">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="-z-20 object-cover"
            sizes="(min-width: 1152px) 1088px, 100vw"
          />
          {/* Scrim: hält Text auf dem Foto lesbar, links dichter als rechts. */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-wertavio-slate/95 via-wertavio-slate/85 to-wertavio-slate/60"
            aria-hidden
          />
          <StaggerReveal className="max-w-2xl">
            <StaggerItem>
              <h2 className="text-h2 text-white">Bereit für eine klare Maklerzuordnung?</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-[48ch] text-pretty text-lg leading-relaxed text-wertavio-cream/80">
                Sie beschreiben Immobilie und Ziel, wir wählen den passenden Spezialisten aus. Keine Pflicht zur
                Maklerbeauftragung.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button href="/anfrage" variant="gold" className="w-full sm:w-auto">
                {PRIMARY_CTA_LABEL}
              </Button>
              <p className="text-center text-sm text-wertavio-cream/70 sm:text-left">{PRIMARY_CTA_RISK}</p>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
