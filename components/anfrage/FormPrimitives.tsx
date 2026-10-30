import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-xl border border-wertavio-border bg-wertavio-white px-4 py-3 text-base text-wertavio-slate outline-none transition-colors focus:border-wertavio-slate focus-visible:outline-none focus:ring-2 focus:ring-wertavio-gold/40";

export function Fieldset({
  legend,
  error,
  id,
  children,
}: {
  legend: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <fieldset className="space-y-3" aria-invalid={error ? true : undefined}>
      <legend className="mb-2 text-sm font-medium text-wertavio-slate">{legend}</legend>
      {children}
      {error ? (
        <p className="text-sm text-red-700" id={`${id}-err`} role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function ChoiceGroup({
  options,
  v,
  onChange,
}: {
  options: string[];
  v: string;
  onChange: (val: string) => void;
}): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={cn(
            "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            v === opt
              ? "border-wertavio-slate bg-wertavio-slate text-wertavio-cream"
              : "border-wertavio-border bg-wertavio-white text-wertavio-slate hover:border-wertavio-slate/40",
          )}
          aria-pressed={v === opt}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/** forwardRef, damit `register()` von react-hook-form den Wert des Feldes lesen kann. */
export const TextField = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & { label: string; error?: string }
>(function TextField({ id, label, error, ...props }, ref): JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-wertavio-slate">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={inputClass}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
