"use client";

import Image from "next/image";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { cn } from "@/lib/utils";

type ProblemItem = {
  title: string;
  body: string;
  image: { src: string; alt: string };
};

const items: readonly ProblemItem[] = [
  {
    title: "Makler vom Portal",
    body: "Ihre Daten landen bei jedem, der zahlt, und nicht automatisch beim stärksten Marktkenner in Ihrer PLZ.",
    image: { src: "/images/problem-portal.jpg", alt: "Illustration: Eine Person wird von Nachrichten und Anrufen überhäuft" },
  },
  {
    title: "Kein Überblick, keine Kontrolle",
    body: "Ohne Vergleichspfad bleibt offen: Wer deckt Ihre Immobilie in den nächsten 90 Tagen am sachlichsten ab?",
    image: { src: "/images/problem-overview.jpg", alt: "Illustration: Eine Person steht ratlos vor vielen Türen" },
  },
  {
    title: "Druck statt klarem Zeitplan",
    body: "Verkauf in unter 60 Tagen wird oft priorisiert, ohne dass Ihr Zielpreis oder Ihre Ruhephase festgelegt wurden.",
    image: { src: "/images/problem-druck.jpg", alt: "Illustration: Eine Person stemmt sich gegen eine große Uhr" },
  },
];

export function ProblemSection(): JSX.Element {
  return (
    <section id="problem" className="section-y border-t border-wertavio-border">
      <div className="container-wide">
        <StaggerReveal className="max-w-2xl">
          <StaggerItem>
            <h2 className="text-h2 text-wertavio-slate">Warum die Maklersuche so oft schiefgeht</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lead mt-5">
              Wer heute über Portale einen Makler sucht, bekommt viele Kontakte und wenig Orientierung. Drei Muster
              sehen wir immer wieder.
            </p>
          </StaggerItem>
        </StaggerReveal>

        <StaggerReveal className="mt-12 grid gap-x-8 gap-y-12 md:mt-16 lg:grid-cols-12 lg:gap-y-10">
          {items.map((item, i) => (
            <StaggerItem
              key={item.title}
              className={cn(
                i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5",
                i > 0 && "lg:grid lg:grid-cols-[11rem_1fr] lg:items-start lg:gap-6",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-wertavio-border bg-[#F9F7EB]",
                  i === 0 ? "aspect-[16/10] lg:aspect-[4/3]" : "aspect-[16/10] lg:aspect-square",
                )}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-contain"
                  sizes={i === 0 ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 1024px) 176px, 100vw"}
                />
              </div>
              <div className={cn(i === 0 ? "mt-6" : "mt-5 lg:mt-1")}>
                <h3 className={`text-h3 text-wertavio-slate ${i === 0 ? "md:text-2xl" : ""}`}>{item.title}</h3>
                <p className="mt-2 max-w-[52ch] text-pretty leading-relaxed text-wertavio-muted">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
