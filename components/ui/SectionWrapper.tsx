import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: "cream" | "slate" | "white";
  /** Hintergrund unter voller Section-Breite (vor `container-narrow`), z. B. Bild + Overlay. */
  fullBleedBackdrop?: ReactNode;
}

export function SectionWrapper({
  id,
  children,
  className,
  background = "cream",
  fullBleedBackdrop,
}: SectionWrapperProps): JSX.Element {
  const bg =
    background === "slate"
      ? "bg-wertavio-slate text-wertavio-cream"
      : background === "white"
        ? "bg-wertavio-white"
        : "bg-wertavio-cream";

  const sectionClass = cn("section-y", bg, fullBleedBackdrop && "relative overflow-hidden", className);

  return (
    <section id={id} className={sectionClass}>
      {fullBleedBackdrop}
      <div className={cn("container-narrow", fullBleedBackdrop && "relative z-10")}>{children}</div>
    </section>
  );
}
