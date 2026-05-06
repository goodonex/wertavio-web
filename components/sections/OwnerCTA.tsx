import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { RiskNote } from "@/components/ui/RiskNote";
import { PRIMARY_CTA_LABEL, PRIMARY_CTA_RISK } from "@/lib/cta";

export function OwnerCTA(): JSX.Element {
  return (
    <SectionWrapper
      id="cta-eigentuemer"
      background="slate"
      className="!bg-transparent !text-wertavio-cream"
      fullBleedBackdrop={
        <>
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/cta-bg.jpg"
              alt="Wohnviertel von oben"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-wertavio-slate/75" aria-hidden />
        </>
      }
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-h2 text-balance text-wertavio-white">
          Bereit für eine klare Maklerzuordnung?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-wertavio-cream/85 md:text-base">
          Sie beschreiben Immobilie und Ziel — wir kuratieren den passenden Spezialisten. Keine Kosten für
          Sie bei Wertavio. Keine Pflicht zur Maklerbeauftragung.
        </p>
        <div className="mt-8 flex flex-col items-center">
          <Button href="/anfrage" enableIdleGlow>
            {PRIMARY_CTA_LABEL}
          </Button>
          <RiskNote className="text-wertavio-cream/80">{PRIMARY_CTA_RISK}</RiskNote>
        </div>
      </div>
    </SectionWrapper>
  );
}
