import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FactItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface FactListProps {
  items: readonly FactItem[];
  className?: string;
}

/** Kernfakten als ruhige Zeile unter einem Hero: Icon, Aussage, ein erklärender Satz. */
export function FactList({ items, className }: FactListProps): JSX.Element {
  return (
    <ul className={cn("grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map(({ icon: Icon, title, body }) => (
        <li key={title} className="flex gap-3.5 border-t border-wertavio-border pt-5">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-wertavio-gold-ink" strokeWidth={1.75} aria-hidden />
          <div>
            <p className="font-semibold text-wertavio-slate">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-wertavio-muted">{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
