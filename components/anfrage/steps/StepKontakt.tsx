"use client";

import Link from "next/link";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LeadFormInput } from "@/lib/lead-schema";
import { TextField } from "@/components/anfrage/FormPrimitives";

export function StepKontakt({
  register,
  errors,
}: {
  register: UseFormRegister<LeadFormInput>;
  errors: FieldErrors<LeadFormInput>;
}): JSX.Element {
  return (
    <section aria-labelledby="step3-title" className="space-y-6">
      <h2 id="step3-title" className="text-lg font-semibold text-wertavio-slate">
        Schritt 3 — Ihre Kontaktdaten
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="firstName"
          label="Vorname"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <TextField
          id="lastName"
          label="Nachname"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>
      <TextField
        id="phone"
        label="Telefon"
        type="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <TextField
        id="email"
        label="E-Mail"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <div>
        <label className="flex items-start gap-3 text-sm text-wertavio-slate">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-wertavio-border"
            {...register("privacyAccepted", {
              setValueAs: (v: unknown) => v === true || v === "on" || v === "true",
            })}
          />
          <span>
            Ich stimme der{" "}
            <Link href="/datenschutz" className="font-medium underline decoration-wertavio-gold">
              Datenschutzerklärung
            </Link>{" "}
            zu. <span className="text-wertavio-muted">(erforderlich)</span>
          </span>
        </label>
        {errors.privacyAccepted ? (
          <p className="mt-2 text-sm text-red-700" role="alert">
            {errors.privacyAccepted.message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
