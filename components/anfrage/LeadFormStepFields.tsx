"use client";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { LeadFormInput } from "@/lib/lead-schema";
import { StepImmobilie } from "@/components/anfrage/steps/StepImmobilie";
import { StepKontakt } from "@/components/anfrage/steps/StepKontakt";
import { StepZiel } from "@/components/anfrage/steps/StepZiel";

export interface LeadFormStepFieldsProps {
  step: number;
  register: UseFormRegister<LeadFormInput>;
  control: Control<LeadFormInput>;
  errors: FieldErrors<LeadFormInput>;
}

export function LeadFormStepFields({
  step,
  register,
  control,
  errors,
}: LeadFormStepFieldsProps): JSX.Element {
  return (
    <>
      {step === 0 ? (
        <StepImmobilie register={register} control={control} errors={errors} />
      ) : null}
      {step === 1 ? <StepZiel control={control} errors={errors} /> : null}
      {step === 2 ? <StepKontakt register={register} errors={errors} /> : null}
    </>
  );
}
