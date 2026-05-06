"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "children"> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
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
  "inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  href,
  className,
  children,
  enableIdleGlow = false,
  type = "button",
  ...props
}: ButtonProps): JSX.Element {
  const [idleOn, setIdleOn] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enableIdleGlow || variant !== "primary") return;

    timerRef.current = setTimeout(() => setIdleOn(true), 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enableIdleGlow, variant]);

  const glowClass =
    idleOn && enableIdleGlow && variant === "primary"
      ? "motion-safe:animate-cta-idle-glow"
      : "";

  const merged = cn(base, variants[variant], glowClass, className);

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
