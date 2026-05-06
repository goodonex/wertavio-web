"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  /** @deprecated CTA-Puls erfolgt per CSS (`animate-cta-ring-pulse`) bei Primary-Buttons. */
  enableIdleGlow?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-wertavio-gold text-wertavio-slate hover:bg-wertavio-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wertavio-gold",
  secondary:
    "border border-wertavio-slate text-wertavio-slate bg-transparent hover:border-wertavio-gold hover:text-wertavio-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wertavio-gold",
  ghost: "text-wertavio-muted hover:text-wertavio-gold underline-offset-4 hover:underline",
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50";

const primaryIdlePulse =
  "motion-safe:animate-cta-ring-pulse motion-safe:hover:[animation:none]";

function PrimaryGlowOverlay({ x, y }: { x: number; y: number }): JSX.Element {
  return (
    <span
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100"
      style={{
        background: `radial-gradient(circle 140px at ${x}px ${y}px, rgba(201, 168, 76, 0.25), transparent 55%)`,
      }}
      aria-hidden
    />
  );
}

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
  const [glow, setGlow] = useState({ x: 0, y: 0 });
  const onPrimaryMove = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const merged = cn(base, variants[variant], variant === "primary" ? primaryIdlePulse : "", className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(merged, variant === "primary" && "overflow-hidden")}
        onMouseMove={variant === "primary" ? onPrimaryMove : undefined}
      >
        {variant === "primary" ? <PrimaryGlowOverlay x={glow.x} y={glow.y} /> : null}
        <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cn(merged, variant === "primary" && "overflow-hidden")}
      onMouseMove={variant === "primary" ? onPrimaryMove : undefined}
      {...props}
    >
      {variant === "primary" ? <PrimaryGlowOverlay x={glow.x} y={glow.y} /> : null}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}
