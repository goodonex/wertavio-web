"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup, Fieldset, inputClass } from "@/components/anfrage/FormPrimitives";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { propertyTypes } from "@/lib/lead-schema";
import {
  empfohlenerTyp,
  profilePriorities,
  profileTimelines,
  type ImmoTyp,
  type ProfilePriority,
} from "@/lib/makler-profil-map";
import { marktFokusAusPlz } from "@/lib/plz-region";
import { PRIMARY_CTA_RISK } from "@/lib/cta";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const step1Schema = z.object({
  propertyType: z.enum(propertyTypes),
  plz: z.string().regex(/^\d{5}$/, "Fünfstellige PLZ"),
});

const step2Schema = z.object({
  profileTimeline: z.enum(["Sofort", "3 Monate", "6 Monate", "Flexibel"]),
  priority: z.enum(["Schnell verkaufen", "Bester Preis", "Beides"]),
});

const step3Schema = z.object({
  email: z.string().email("Gültige E-Mail eingeben"),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;

function priorityLabel(p: ProfilePriority): string {
  return p;
}

function ProfilFormTrustRow(): JSX.Element {
  return (
    <p className="text-center text-xs text-wertavio-muted">
      🔒 Keine Weitergabe · Kostenlos · Ergebnis sofort sichtbar
    </p>
  );
}

function StepProgress({ step }: { step: number }): JSX.Element {
  const widthClass = step === 0 ? "w-1/3" : step === 1 ? "w-2/3" : "w-full";
  return (
    <div className="space-y-6">
      <div className="h-[3px] w-full bg-wertavio-border">
        <div className={`h-full bg-wertavio-gold transition-all duration-300 ease-out ${widthClass}`} />
      </div>
      <p className="mb-6 text-xs uppercase tracking-[0.08em] text-wertavio-muted">Schritt {step + 1} von 3</p>
    </div>
  );
}

export function MaklerProfilSection(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data1, setData1] = useState<Step1 | null>(null);
  const [data2, setData2] = useState<Step2 | null>(null);

  const form1 = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    defaultValues: { propertyType: "Haus", plz: "" },
  });
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

  const anfrageHref =
    data1 && data2
      ? `/anfrage?type=${encodeURIComponent(data1.propertyType)}&plz=${encodeURIComponent(data1.plz)}&prioritaet=${encodeURIComponent(data2.priority)}`
      : "/anfrage";

  const transition = { duration: prefersReducedMotion ? 0 : 0.3, ease: motionEase };

  return (
    <section className="bg-wertavio-cream py-16 md:py-20">
      <div className="container-narrow">
        <StaggerReveal className="mx-auto mb-10 max-w-2xl text-center md:mx-0 md:text-left">
          <StaggerItem>
            <p className="text-eyebrow">Kostenlos &amp; in 2 Minuten</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-h2 mt-3 text-balance text-wertavio-slate">
              Was braucht Ihre Immobilie wirklich?
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-3 text-base leading-relaxed text-wertavio-muted">
              Nicht jeder Makler passt zu jeder Immobilie. Wir erstellen Ihr persönliches Anforderungsprofil —
              bevor wir matchen.
            </p>
          </StaggerItem>
        </StaggerReveal>

        <StaggerReveal className="mx-auto max-w-2xl md:mx-0">
          <StaggerItem>
            <div className="w-full rounded-lg border border-wertavio-border border-l-4 border-l-wertavio-gold bg-wertavio-white px-6 py-8 shadow-sm md:px-10 md:py-10">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div
                    key="form"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                    transition={transition}
                  >
                    {step === 0 ? (
                      <form onSubmit={onStep1} className="space-y-6">
                        <ProfilFormTrustRow />
                        <StepProgress step={0} />
                        <Fieldset
                          id="mp-property"
                          legend="Immobilientyp"
                          error={form1.formState.errors.propertyType?.message}
                        >
                          <ChoiceGroup
                            options={[...propertyTypes]}
                            v={form1.watch("propertyType") ?? "Haus"}
                            onChange={(v) => form1.setValue("propertyType", v as ImmoTyp)}
                          />
                        </Fieldset>
                        <div>
                          <label htmlFor="mp-plz" className="mb-2 block text-sm font-medium text-wertavio-slate">
                            Postleitzahl
                          </label>
                          <input
                            id="mp-plz"
                            inputMode="numeric"
                            autoComplete="postal-code"
                            className={inputClass}
                            {...form1.register("plz")}
                          />
                          {form1.formState.errors.plz ? (
                            <p className="mt-2 text-sm text-red-700">{form1.formState.errors.plz.message}</p>
                          ) : null}
                        </div>
                        <Button type="submit" className="w-full justify-center">
                          Weiter →
                        </Button>
                      </form>
                    ) : null}

                    {step === 1 ? (
                      <form onSubmit={onStep2} className="space-y-6">
                        <ProfilFormTrustRow />
                        <StepProgress step={1} />
                        <Fieldset
                          id="mp-zeit"
                          legend="Zeitrahmen"
                          error={form2.formState.errors.profileTimeline?.message}
                        >
                          <ChoiceGroup
                            options={[...profileTimelines]}
                            v={form2.watch("profileTimeline") ?? "Sofort"}
                            onChange={(v) => form2.setValue("profileTimeline", v as (typeof profileTimelines)[number])}
                          />
                        </Fieldset>
                        <Fieldset id="mp-prio" legend="Priorität" error={form2.formState.errors.priority?.message}>
                          <ChoiceGroup
                            options={[...profilePriorities]}
                            v={form2.watch("priority") ?? "Beides"}
                            onChange={(v) => form2.setValue("priority", v as ProfilePriority)}
                          />
                        </Fieldset>
                        <div className="flex gap-3">
                          <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(0)}>
                            Zurück
                          </Button>
                          <Button type="submit" className="flex-1 justify-center">
                            Weiter →
                          </Button>
                        </div>
                      </form>
                    ) : null}

                    {step === 2 ? (
                      <form onSubmit={onStep3} className="space-y-6">
                        <ProfilFormTrustRow />
                        <StepProgress step={2} />
                        <div>
                          <label htmlFor="mp-email" className="mb-2 block text-sm font-medium text-wertavio-slate">
                            E-Mail
                          </label>
                          <input
                            id="mp-email"
                            type="email"
                            autoComplete="email"
                            className={inputClass}
                            {...form3.register("email")}
                          />
                          {form3.formState.errors.email ? (
                            <p className="mt-2 text-sm text-red-700">{form3.formState.errors.email.message}</p>
                          ) : null}
                        </div>
                        <div className="flex gap-3">
                          <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                            Zurück
                          </Button>
                          <Button type="submit" className="flex-1 justify-center">
                            Mein Makler-Profil erstellen →
                          </Button>
                        </div>
                        <p className="text-center text-xs text-wertavio-muted">
                          Kein Spam. Keine Weitergabe. Jederzeit abbestellbar.
                        </p>
                      </form>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={transition}
                    className="space-y-6"
                  >
                    {data1 && data2 ? (
                      <>
                        <div className="flex flex-wrap items-center gap-2 border-b border-wertavio-border pb-4">
                          <h3 className="font-display text-xl font-semibold text-wertavio-slate">
                            Ihr Makler-Profil
                          </h3>
                          <span className="text-sm text-wertavio-muted">{data1.plz}</span>
                          <Check className="h-5 w-5 text-wertavio-gold" strokeWidth={2.5} aria-hidden />
                        </div>
                        <dl className="space-y-3 text-sm">
                          <div className="flex justify-between gap-4 border-b border-wertavio-border/70 py-2">
                            <dt className="text-wertavio-muted">Immobilientyp</dt>
                            <dd className="text-right font-medium text-wertavio-slate">{data1.propertyType}</dd>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-wertavio-border/70 py-2">
                            <dt className="text-wertavio-muted">Ihre Priorität</dt>
                            <dd className="text-right font-medium text-wertavio-slate">
                              {priorityLabel(data2.priority)}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-wertavio-border/70 py-2">
                            <dt className="text-wertavio-muted">Empfohlener Typ</dt>
                            <dd className="max-w-[60%] text-right text-wertavio-slate">
                              {empfohlenerTyp(data1.propertyType, data2.priority)}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4 py-2">
                            <dt className="text-wertavio-muted">Marktfokus</dt>
                            <dd className="text-right font-medium text-wertavio-slate">
                              {marktFokusAusPlz(data1.plz)}
                            </dd>
                          </div>
                        </dl>
                        <div className="pt-2">
                          <Button href={anfrageHref} className="w-full justify-center text-center leading-snug">
                            Ja, passenden Spezialisten für dieses Profil finden →
                          </Button>
                          <p className="mt-3 text-center text-xs text-wertavio-muted">{PRIMARY_CTA_RISK}</p>
                          <p className="mt-2 text-center text-xs text-wertavio-muted">
                            Ihre Angaben werden direkt übernommen — kein nochmaliges Eingeben.
                          </p>
                        </div>
                      </>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
