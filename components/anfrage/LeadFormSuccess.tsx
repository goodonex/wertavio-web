import Link from "next/link";
import { CheckCircle, Clock3, User } from "lucide-react";
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
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-wertavio-slate">Was passiert jetzt?</p>
        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3 md:text-center">
          <article className="space-y-1 border border-wertavio-border p-3 md:border-r md:border-t-0 md:border-l-0 md:border-b-0 md:p-0 md:pr-3">
            <Clock3 className="h-4 w-4 text-wertavio-muted md:mx-auto" aria-hidden />
            <p className="text-[11px] font-medium text-wertavio-slate">Schritt 1: Wir prüfen Ihre Angaben</p>
            <p className="text-[11px] text-wertavio-muted">Innerhalb weniger Stunden</p>
          </article>
          <article className="space-y-1 border border-wertavio-border p-3 md:border-r md:border-t-0 md:border-l-0 md:border-b-0 md:p-0 md:pr-3">
            <User className="h-4 w-4 text-wertavio-muted md:mx-auto" aria-hidden />
            <p className="text-[11px] font-medium text-wertavio-slate">Schritt 2: Wir wählen Ihren Spezialisten</p>
            <p className="text-[11px] text-wertavio-muted">Persönlich kuratiert</p>
          </article>
          <article className="space-y-1 border border-wertavio-border p-3 md:border-0 md:p-0">
            <CheckCircle className="h-4 w-4 text-wertavio-muted md:mx-auto" aria-hidden />
            <p className="text-[11px] font-medium text-wertavio-slate">Schritt 3: Ihr Makler meldet sich</p>
            <p className="text-[11px] text-wertavio-muted">Innerhalb von 48 Stunden</p>
          </article>
        </div>
      </div>
      <Link href="/" className="text-sm font-medium text-wertavio-muted hover:text-wertavio-gold">
        Zurück zur Startseite
      </Link>
    </div>
  );
}
