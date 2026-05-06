"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { inputClass } from "@/components/anfrage/FormPrimitives";
import { cn } from "@/lib/utils";
import {
  partnerLeadSchema,
  partnerLeadSpezialisierungen,
  type PartnerLeadInput,
  type PartnerLeadOutput,
} from "@/lib/partner-lead-schema";

const resolver: Resolver<PartnerLeadInput, object, PartnerLeadOutput> = zodResolver(partnerLeadSchema);

export function PartnerRegionForm(): JSX.Element {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PartnerLeadInput, object, PartnerLeadOutput>({
    resolver,
    defaultValues: { spezialisierung: "Alles", plz: "", name: "", phone: "" },
    mode: "onBlur",
  });

  const spez = watch("spezialisierung");

  const onSubmit = async (data: PartnerLeadOutput): Promise<void> => {
    const res = await fetch("/api/partner-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return;
    setDone(true);
  };

  if (done) {
    return (
      <p className="text-center text-sm leading-relaxed text-wertavio-slate md:text-base">
        Ihre Region wird geprüft. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-6">
      <div>
        <label htmlFor="pr-plz" className="mb-2 block text-sm font-medium text-wertavio-slate">
          Postleitzahl
        </label>
        <input
          id="pr-plz"
          inputMode="numeric"
          autoComplete="postal-code"
          className={inputClass}
          {...register("plz")}
        />
        {errors.plz ? <p className="mt-2 text-sm text-red-700">{errors.plz.message}</p> : null}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-wertavio-slate">Spezialisierung</legend>
        <div className="flex flex-wrap gap-2">
          {partnerLeadSpezialisierungen.map((opt) => (
            <button
              key={opt}
              type="button"
              className={cn(
                "rounded border px-3 py-2 text-sm font-medium transition-colors",
                spez === opt
                  ? "border-wertavio-gold bg-wertavio-gold/15 text-wertavio-slate"
                  : "border-wertavio-border bg-wertavio-white text-wertavio-slate hover:border-wertavio-gold/50",
              )}
              onClick={() => setValue("spezialisierung", opt, { shouldValidate: true })}
            >
              {opt}
            </button>
          ))}
        </div>
        {errors.spezialisierung ? (
          <p className="text-sm text-red-700">{errors.spezialisierung.message}</p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor="pr-name" className="mb-2 block text-sm font-medium text-wertavio-slate">
          Name
        </label>
        <input id="pr-name" autoComplete="name" className={inputClass} {...register("name")} />
        {errors.name ? <p className="mt-2 text-sm text-red-700">{errors.name.message}</p> : null}
      </div>

      <div>
        <label htmlFor="pr-phone" className="mb-2 block text-sm font-medium text-wertavio-slate">
          Telefon
        </label>
        <input id="pr-phone" type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
        {errors.phone ? <p className="mt-2 text-sm text-red-700">{errors.phone.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Button type="submit" className="w-full justify-center">
          Verfügbarkeit prüfen →
        </Button>
        <p className="text-center text-xs text-wertavio-muted">Wir melden uns innerhalb von 24h.</p>
      </div>
    </form>
  );
}
