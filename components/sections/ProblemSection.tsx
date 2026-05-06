"use client";

import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

type ProblemItem = {
  title: string;
  body: string;
  image: { src: string; alt: string };
};

const items: readonly ProblemItem[] = [
  {
    title: "Makler vom Portal",
    body: "Ihre Daten landen bei jedem, der zahlt — nicht automatisch beim stärksten Marktkenner in Ihrer PLZ.",
    image: { src: "/images/problem-portal.jpg", alt: "Viele Makler erhalten dieselbe Anfrage" },
  },
  {
    title: "Kein Überblick, keine Kontrolle",
    body: "Ohne Vergleichspfad bleibt offen: Wer deckt Ihre Immobilie in den nächsten 90 Tagen am sachlichsten ab?",
    image: { src: "/images/problem-overview.jpg", alt: "Kein Überblick über Maklerqualität" },
  },
  {
    title: "Druck statt klarem Zeitplan",
    body: "Verkauf in unter 60 Tagen wird oft priorisiert — ohne dass Ihr Zielpreis oder Ihre Ruhephase festgelegt wurden.",
    image: { src: "/images/problem-druck.jpg", alt: "Verkaufsdruck statt persönlicher Beratung" },
  },
];

export function ProblemSection(): JSX.Element {
  return (
    <SectionWrapper id="problem" background="cream">
      <StaggerReveal className="mx-auto max-w-3xl md:mx-0">
        <StaggerItem>
          <p className="text-eyebrow">Das Problem</p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
            Welchem Makler sollen Sie Ihre Immobilie anvertrauen?
          </h2>
        </StaggerItem>
      </StaggerReveal>
      <StaggerReveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <StaggerItem key={item.title}>
            <article className="card-surface-hover flex h-full w-full flex-col gap-4">
              <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-wertavio-border bg-wertavio-white px-4 pt-6">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={320}
                  height={240}
                  className="h-auto w-full max-w-[320px] object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-wertavio-slate text-balance">{item.title}</h3>
              <p className="text-sm leading-relaxed text-wertavio-muted text-pretty">{item.body}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </SectionWrapper>
  );
}
