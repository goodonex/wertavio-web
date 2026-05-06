"use client";

import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { Button } from "@/components/ui/Button";
import { CtaMiniTimeline } from "@/components/ui/CtaMiniTimeline";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

export function OwnerCTA(): JSX.Element {
  return (
    <SectionWrapper
      id="cta-eigentuemer"
      background="slate"
      className="!bg-transparent !text-wertavio-cream"
      fullBleedBackdrop={
        <>
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <Image
                src="/images/cta-bg.jpg"
                alt="Wohnviertel von oben"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-wertavio-slate/75" aria-hidden />
        </>
      }
    >
      <StaggerReveal className="mx-auto max-w-3xl md:mx-0">
        <StaggerItem>
          <h2 className="text-h2 text-balance text-wertavio-white">
            Bereit für eine klare Maklerzuordnung?
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-wertavio-cream/85 md:mx-0">
            Sie beschreiben Immobilie und Ziel — wir kuratieren den passenden Spezialisten. Keine Kosten
            für Sie bei Wertavio. Keine Pflicht zur Maklerbeauftragung.
          </p>
        </StaggerItem>
        <StaggerItem className="mt-8 flex flex-col items-center md:items-start">
          <Button href="/anfrage">{PRIMARY_CTA_LABEL}</Button>
          <CtaMiniTimeline className="mt-5 max-w-lg sm:max-w-md" />
        </StaggerItem>
      </StaggerReveal>
    </SectionWrapper>
  );
}
