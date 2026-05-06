import { cn } from "@/lib/utils";

export interface RiskNoteProps {
  children: React.ReactNode;
  className?: string;
}

/** Kurzer Risiko-Rücknahme-Hinweis nahe primären CTAs (ca. &lt;200px Abstand). */
export function RiskNote({ children, className }: RiskNoteProps): JSX.Element {
  return (
    <p
      className={cn(
        "mt-2 max-w-xl text-xs leading-relaxed text-wertavio-muted text-center sm:text-left",
        className,
      )}
    >
      {children}
    </p>
  );
}
