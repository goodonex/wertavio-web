"use client";

import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { propertyTypes, valueRanges, type LeadFormInput } from "@/lib/lead-schema";
import { ChoiceGroup, Fieldset, inputClass } from "@/components/anfrage/FormPrimitives";

export function StepImmobilie({
  register,
  control,
  errors,
}: {
  register: UseFormRegister<LeadFormInput>;
  control: Control<LeadFormInput>;
  errors: FieldErrors<LeadFormInput>;
}): JSX.Element {
  return (
    <section aria-labelledby="step1-title" className="space-y-6">
      <h2 id="step1-title" className="text-lg font-semibold text-wertavio-slate">
        Schritt 1 — Ihre Immobilie
      </h2>
      <Fieldset legend="Immobilienart" error={errors.propertyType?.message} id="propertyType">
        <Controller
          control={control}
          name="propertyType"
          render={({ field }) => (
            <ChoiceGroup options={[...propertyTypes]} v={field.value} onChange={field.onChange} />
          )}
        />
      </Fieldset>
      <div>
        <label htmlFor="plz" className="mb-2 block text-sm font-medium text-wertavio-slate">
          Postleitzahl
        </label>
        <input
          id="plz"
          inputMode="numeric"
          autoComplete="postal-code"
          className={inputClass}
          aria-invalid={!!errors.plz}
          aria-describedby={errors.plz ? "plz-err" : undefined}
          {...register("plz")}
        />
        {errors.plz ? (
          <p id="plz-err" className="mt-2 text-sm text-red-700" role="alert">
            {errors.plz.message}
          </p>
        ) : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-wertavio-slate">
          Geschätzter Wert (optional)
        </label>
        <select
          className={inputClass}
          {...register("valueRange", {
            setValueAs: (v) => (v === "" ? undefined : v),
          })}
        >
          <option value="">Bitte wählen …</option>
          {[...valueRanges].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
