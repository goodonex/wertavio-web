import Link from "next/link";
import { SuccessCheckmark } from "@/components/anfrage/SuccessCheckmark";

export interface LeadFormSuccessProps {
  firstName: string;
}

export function LeadFormSuccess({ firstName }: LeadFormSuccessProps): JSX.Element {
  const namePart = firstName.trim() ? `, ${firstName.trim()}` : "";
  return (
    <div
      className="card-surface mx-auto max-w-lg space-y-6 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex justify-center">
        <SuccessCheckmark />
      </div>
      <p className="text-lg font-semibold text-wertavio-slate">
        Vielen Dank{namePart}. Die erste Rückmeldung erreicht Sie innerhalb von 48 Stunden — per E-Mail
        oder Telefon, mit einem konkret benannten Makler.
      </p>
      <Link href="/" className="text-sm font-medium text-wertavio-muted hover:text-wertavio-gold">
        Zurück zur Startseite
      </Link>
    </div>
  );
}
