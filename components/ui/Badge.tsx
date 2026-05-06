import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-wertavio-border bg-wertavio-white px-3 py-1 text-xs font-medium text-wertavio-slate",
        className,
      )}
    >
      {children}
    </span>
  );
}
