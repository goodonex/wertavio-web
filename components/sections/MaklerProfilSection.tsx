"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup, Fieldset, inputClass } from "@/components/anfrage/FormPrimitives";
import { MaklerProfilResult } from "@/components/sections/MaklerProfilResult";
import { propertyTypes } from "@/lib/lead-schema";
import { profilePriorities, profileTimelines, type ImmoTyp, type ProfilePriority } from "@/lib/makler-profil-map";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const step1Schema = z.object({
  propertyType: z.enum(propertyTypes),
  plz: z.string().regex(/^\d{5}$/, "Bitte eine fünfstellige PLZ eingeben"),
});
const step2Schema = z.object({
  profileTimeline: z.enum(["Sofort", "3 Monate", "6 Monate", "Flexibel"]),
  priority: z.enum(["Schnell verkaufen", "Bester Preis", "Beides"]),
});
const step3Schema = z.object({ email: z.string().email("Bitte eine gültige E-Mail eingeben") });

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;

const stepTitles = ["Ihre Immobilie", "Zeit und Ziel", "Wohin mit dem Profil?"] as const;

function ErrorText({ id, msg }: { id: string; msg?: string }): JSX.Element | null {
  return msg ? (
    <p id={id} className="mt-2 text-sm text-red-700" role="alert">
      {msg}
    </p>
  ) : null;
}

/** Kurzes Anforderungsprofil (Lead-Magnet) direkt auf der Startseite; Ergebnis leitet vorbefüllt zur Anfrage. */
export function MaklerProfilSection(): JSX.Element {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data1, setData1] = useState<Step1 | null>(null);
  const [data2, setData2] = useState<Step2 | null>(null);

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema), mode: "onBlur", defaultValues: { propertyType: "Haus", plz: "" } });
  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    mode: "onBlur",
    defaultValues: { profileTimeline: "Sofort", priority: "Beides" },
  });
  const form3 = useForm<Step3>({ resolver: zodResolver(step3Schema), mode: "onBlur", defaultValues: { email: "" } });

  const onStep1 = form1.handleSubmit((d) => {
    setData1(d);
    setStep(1);
  });
  const onStep2 = form2.handleSubmit((d) => {
    setData2(d);
    setStep(2);
  });
  const onStep3 = form3.handleSubmit((d) => {
    if (!data1 || !data2) return;
    console.log("Makler-Profil (Lead-Magnet)", { ...data1, ...data2, ...d });
    setDone(true);
  });

  const fade = reduced
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.3, ease: motionEase } };

  return (
    <div className="rounded-2xl border border-wertavio-border bg-wertavio-white p-6 shadow-soft sm:p-8">
      {!done ? (
        <div className="mb-6">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-h3 text-wertavio-slate">{stepTitles[step]}</p>
            <p className="shrink-0 text-sm text-wertavio-muted">{step + 1} von 3</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-wertavio-gold" : "bg-wertavio-border"}`} />
            ))}
          </div>
        </div>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={done ? "result" : step} {...fade}>
          {done && data1 && data2 ? (
            <MaklerProfilResult propertyType={data1.propertyType as ImmoTyp} plz={data1.plz} priority={data2.priority} />
          ) : step === 0 ? (
            <form onSubmit={onStep1} className="space-y-6" noValidate>
              <Fieldset id="mp-property" legend="Immobilientyp" error={form1.formState.errors.propertyType?.message}>
                <ChoiceGroup options={[...propertyTypes]} v={form1.watch("propertyType")} onChange={(v) => form1.setValue("propertyType", v as ImmoTyp)} />
              </Fieldset>
              <div>
                <label htmlFor="mp-plz" className="mb-2 block text-sm font-medium text-wertavio-slate">
                  Postleitzahl der Immobilie
                </label>
                <input id="mp-plz" inputMode="numeric" autoComplete="postal-code" maxLength={5} className={inputClass} aria-invalid={!!form1.formState.errors.plz} aria-describedby={form1.formState.errors.plz ? "mp-plz-err" : undefined} {...form1.register("plz")} />
                <ErrorText id="mp-plz-err" msg={form1.formState.errors.plz?.message} />
              </div>
              <Button type="submit" className="w-full">Weiter</Button>
            </form>
          ) : step === 1 ? (
            <form onSubmit={onStep2} className="space-y-6" noValidate>
              <Fieldset id="mp-zeit" legend="Zeitrahmen" error={form2.formState.errors.profileTimeline?.message}>
                <ChoiceGroup
                  options={[...profileTimelines]}
                  v={form2.watch("profileTimeline")}
                  onChange={(v) => form2.setValue("profileTimeline", v as (typeof profileTimelines)[number])}
                />
              </Fieldset>
              <Fieldset id="mp-prio" legend="Priorität" error={form2.formState.errors.priority?.message}>
                <ChoiceGroup options={[...profilePriorities]} v={form2.watch("priority")} onChange={(v) => form2.setValue("priority", v as ProfilePriority)} />
              </Fieldset>
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setStep(0)}>Zurück</Button>
                <Button type="submit" className="flex-1">Weiter</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={onStep3} className="space-y-6" noValidate>
              <div>
                <label htmlFor="mp-email" className="mb-2 block text-sm font-medium text-wertavio-slate">
                  E-Mail für Ihr Profil
                </label>
                <input id="mp-email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!form3.formState.errors.email} aria-describedby={form3.formState.errors.email ? "mp-email-err" : undefined} {...form3.register("email")} />
                <ErrorText id="mp-email-err" msg={form3.formState.errors.email?.message} />
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>Zurück</Button>
                <Button type="submit" className="flex-1">Profil erstellen</Button>
              </div>
              <p className="text-center text-xs text-wertavio-muted">Kein Spam, keine Weitergabe, jederzeit abbestellbar.</p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
