"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { consentTexts } from "@/lib/consent";
import type { LeadFormInput } from "@/lib/lead-schema";
import { TextField } from "@/components/anfrage/FormPrimitives";

type ConsentField = "privacyAccepted" | "consentForwarding" | "consentMarketing";

function ConsentCheckbox({
  name,
  register,
  error,
  children,
}: {
  name: ConsentField;
  register: UseFormRegister<LeadFormInput>;
  error?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm text-wertavio-slate">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-wertavio-border"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-err` : undefined}
          {...register(name, {
            setValueAs: (v: unknown) => v === true || v === "on" || v === "true",
          })}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p id={`${name}-err`} className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function StepKontakt({
  flowType,
  register,
  errors,
}: {
  flowType: LeadFormInput["flowType"];
  register: UseFormRegister<LeadFormInput>;
  errors: FieldErrors<LeadFormInput>;
}): JSX.Element {
  return (
    <section aria-labelledby="step3-title" className="space-y-6">
      <h2 id="step3-title" className="text-lg font-semibold text-wertavio-slate">
        Schritt 3: Ihre Kontaktdaten
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="firstName" label="Vorname" error={errors.firstName?.message} {...register("firstName")} />
        <TextField id="lastName" label="Nachname" error={errors.lastName?.message} {...register("lastName")} />
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
      <ConsentCheckbox name="privacyAccepted" register={register} error={errors.privacyAccepted?.message}>
        Ich habe die{" "}
        <Link href="/datenschutz" className="font-medium underline decoration-wertavio-gold">
          Datenschutzerklärung
        </Link>{" "}
        gelesen. <span className="text-wertavio-muted">(erforderlich)</span>
      </ConsentCheckbox>
      {flowType === "eigentuemer" ? (
        <>
          <ConsentCheckbox name="consentForwarding" register={register} error={errors.consentForwarding?.message}>
            {consentTexts.forwarding} <span className="text-wertavio-muted">(erforderlich)</span>
          </ConsentCheckbox>
          <ConsentCheckbox name="consentMarketing" register={register}>
            {consentTexts.marketing} <span className="text-wertavio-muted">(freiwillig)</span>
          </ConsentCheckbox>
        </>
      ) : null}
    </section>
  );
}
