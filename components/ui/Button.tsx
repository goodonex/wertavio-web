import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * primary: Tinte auf hellem Grund · gold: Primär-CTA auf dunklem Grund
 * secondary: Kontur · ghost: Textlink
 */
type ButtonVariant = "primary" | "gold" | "secondary" | "ghost";

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  /** @deprecated Kein Idle-Effekt mehr; Prop bleibt für Abwärtskompatibilität. */
  enableIdleGlow?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-wertavio-slate text-wertavio-cream hover:bg-wertavio-slate-soft",
  gold: "bg-wertavio-gold text-wertavio-slate hover:bg-wertavio-gold-light",
  secondary:
    "border border-wertavio-slate/25 bg-transparent text-wertavio-slate hover:border-wertavio-slate hover:bg-wertavio-slate/[0.03]",
  ghost: "px-0 text-wertavio-slate underline-offset-4 hover:underline",
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-[0.9375rem] font-semibold leading-none transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  href,
  className,
  children,
  enableIdleGlow: _enableIdleGlow = false,
  type = "button",
  ...props
}: ButtonProps): JSX.Element {
  void _enableIdleGlow;
  const merged = cn(base, variants[variant], variant === "ghost" && "min-h-11 py-2", className);

  if (href) {
    return (
      <Link href={href} className={merged}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={merged} {...props}>
      {children}
    </button>
  );
}
