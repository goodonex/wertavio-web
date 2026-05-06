"use client";

import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { timelines, experiences, type LeadFormInput } from "@/lib/lead-schema";
import { ChoiceGroup, Fieldset } from "@/components/anfrage/FormPrimitives";

export function StepZiel({
  control,
  errors,
}: {
  control: Control<LeadFormInput>;
  errors: FieldErrors<LeadFormInput>;
}): JSX.Element {
  return (
    <section aria-labelledby="step2-title" className="space-y-6">
      <h2 id="step2-title" className="text-lg font-semibold text-wertavio-slate">
        Schritt 2 — Ihr Ziel
      </h2>
      <Fieldset legend="Zeitrahmen" error={errors.timeline?.message} id="timeline">
        <Controller
          control={control}
          name="timeline"
          render={({ field }) => (
            <ChoiceGroup options={[...timelines]} v={field.value} onChange={field.onChange} />
          )}
        />
      </Fieldset>
      <Fieldset
        legend="Erfahrung mit Maklern"
        error={errors.experience?.message}
        id="experience"
      >
        <Controller
          control={control}
          name="experience"
          render={({ field }) => (
            <ChoiceGroup options={[...experiences]} v={field.value} onChange={field.onChange} />
          )}
        />
      </Fieldset>
    </section>
  );
}
