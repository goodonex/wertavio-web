"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, type LeadFormInput, type LeadFormOutput } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { FormProgress } from "@/components/anfrage/FormProgress";
import { LeadFormSuccess } from "@/components/anfrage/LeadFormSuccess";
import { LeadFormStepFields } from "@/components/anfrage/LeadFormStepFields";

export interface LeadFormProps {
  flowType: "eigentuemer" | "makler";
  prefill?: Partial<Pick<LeadFormInput, "propertyType" | "plz" | "timeline" | "experience">>;
}

const resolver: Resolver<LeadFormInput, object, LeadFormOutput> = zodResolver(leadFormSchema);

export function LeadForm({ flowType, prefill }: LeadFormProps): JSX.Element {
  const hasAutoJumped = useRef(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const mergedDefaults = useMemo<LeadFormInput>(
    () => ({
      flowType,
      propertyType: prefill?.propertyType ?? "Haus",
      plz: prefill?.plz ?? "",
      valueRange: undefined,
      timeline: prefill?.timeline ?? "Sofort",
      experience: prefill?.experience ?? "Noch keinen",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      privacyAccepted: false,
    }),
    [flowType, prefill?.propertyType, prefill?.plz, prefill?.timeline, prefill?.experience],
  );

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<LeadFormInput, object, LeadFormOutput>({
    resolver,
    defaultValues: mergedDefaults,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    reset(mergedDefaults);
  }, [mergedDefaults, reset]);

  useEffect(() => {
    if (hasAutoJumped.current) return;
    if (flowType !== "eigentuemer") return;
    const p = prefill;
    if (!p?.propertyType || !p.plz || !p.timeline || !p.experience) return;
    if (!/^\d{5}$/.test(p.plz)) return;
    hasAutoJumped.current = true;
    setStep(2);
  }, [flowType, prefill]);

  const firstName = watch("firstName");
  const progress = ((step + 1) / 3) * 100;

  const next = async (): Promise<void> => {
    if (step === 0) {
      const ok = await trigger(["propertyType", "plz", "valueRange"]);
      if (ok) setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await trigger(["timeline", "experience"]);
      if (ok) setStep(2);
    }
  };

  const prev = (): void => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: LeadFormOutput): Promise<void> => {
    const parsed = leadFormSchema.safeParse(data);
    if (!parsed.success) return;
    const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? "/api/leads";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!res.ok) return;
    setDone(true);
  };

  if (done) {
    return <LeadFormSuccess firstName={firstName} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl overflow-hidden rounded-[10px] border border-wertavio-border bg-wertavio-white shadow-sm"
      noValidate
    >
      <div className="sticky top-16 z-30 border-b border-wertavio-border bg-wertavio-white px-6 py-4 md:top-20">
        <FormProgress progress={progress} />
      </div>
      <div className="space-y-8 p-6">
        <input type="hidden" {...register("flowType")} />
        {flowType === "makler" ? (
          <p className="text-sm text-wertavio-muted">
            Nach dem Absenden erhalten Sie innerhalb von 48 Stunden einen Terminvorschlag fürs Partnergespräch — per E-Mail.
          </p>
        ) : null}
        <LeadFormStepFields step={step} register={register} control={control} errors={errors} />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={prev} className="order-2 sm:order-1">
              Zurück
            </Button>
          ) : (
            <span className="order-2 sm:order-1" />
          )}
          {step < 2 ? (
            <Button type="button" onClick={next} className="order-1 w-full sm:order-2 sm:w-auto">
              Weiter
            </Button>
          ) : (
            <Button type="submit" className="order-1 w-full sm:order-2 sm:w-auto">
              {flowType === "makler" ? "Partnergespräch anfragen" : "Anfrage senden"}
            </Button>
          )}
        </div>
        {step === 2 ? (
          <p className="pt-1 text-center text-xs leading-relaxed text-wertavio-muted">
            Kein Spam. Keine Kosten. Jederzeit abbestellbar.
          </p>
        ) : null}
      </div>
    </form>
  );
}
