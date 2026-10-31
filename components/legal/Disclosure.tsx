import { cn } from "@/lib/utils";

/**
 * Pflicht-Kasten „Wer steht dahinter?“ auf jeder Seite mit Formular.
 * Wortlaut wortgleich aus marken/wertavio/marke.json (`offenlegung`), nicht kürzen. Endfassung mit dem Anwalt.
 */
export const DISCLOSURE_TEXT =
  "„Wenn ein Haus frei wird“, Wertavio und Räumlotse gehören zum selben Inhaber. Wenn Sie über uns eine Bewertung, einen Makler oder eine Räumung anfragen, verdienen wir daran. Alle Inhalte stehen ohne Anfrage vollständig zur Verfügung.";

export function Disclosure({ className }: { className?: string }): JSX.Element {
  return (
    <aside aria-labelledby="wer-steht-dahinter" className={cn("border-l-2 border-wertavio-gold pl-5", className)}>
      <h2 id="wer-steht-dahinter" className="font-semibold text-wertavio-slate">
        Wer steht dahinter?
      </h2>
      <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-wertavio-muted">{DISCLOSURE_TEXT}</p>
    </aside>
  );
}
