import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded border border-wertavio-border bg-wertavio-white px-3 py-3 text-sm text-wertavio-slate outline-none ring-wertavio-gold/40 focus:ring-2";

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
            "rounded border px-3 py-2 text-sm font-medium transition-colors",
            v === opt
              ? "border-wertavio-gold bg-wertavio-gold/10 text-wertavio-slate"
              : "border-wertavio-border bg-wertavio-white text-wertavio-slate hover:border-wertavio-gold/50",
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

export function TextField({
  id,
  label,
  error,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { label: string; error?: string }): JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-wertavio-slate">
        {label}
      </label>
      <input
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
}
