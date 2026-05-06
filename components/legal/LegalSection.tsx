import type { ReactNode } from "react";

export interface LegalSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

export function LegalSection({ id, title, children }: LegalSectionProps): JSX.Element {
  const headingId = id ?? title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  return (
    <section className="space-y-3" aria-labelledby={headingId}>
      <h2 id={headingId} className="text-lg font-semibold text-wertavio-slate">
        {title}
      </h2>
      <div className="space-y-3 text-wertavio-muted [&_a]:break-all [&_a]:font-medium [&_a]:text-wertavio-slate [&_a]:underline [&_strong]:text-wertavio-slate">
        {children}
      </div>
    </section>
  );
}
