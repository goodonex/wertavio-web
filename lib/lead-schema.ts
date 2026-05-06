import { z } from "zod";

export const propertyTypes = ["Haus", "Wohnung", "Grundstück", "Sonstiges"] as const;

export function isPropertyType(v: string): v is (typeof propertyTypes)[number] {
  return (propertyTypes as readonly string[]).includes(v);
}
export const valueRanges = [
  "< 200.000 €",
  "200.000 – 400.000 €",
  "400.000 – 700.000 €",
  "700.000 – 1.000.000 €",
  "> 1.000.000 €",
] as const;
export const timelines = ["Sofort", "In 3 Monaten", "In 6 Monaten", "Noch unklar"] as const;
export const experiences = [
  "Noch keinen",
  "Bereits Erfahrungen gemacht",
  "War unzufrieden",
] as const;

const plzRegex = /^\d{5}$/;

export const leadFormSchema = z.object({
  flowType: z.enum(["eigentuemer", "makler"], {
    message: "Ungültiger Anfragetyp.",
  }),
  propertyType: z.enum(propertyTypes, {
    message: "Bitte wählen Sie eine Immobilienart.",
  }),
  plz: z
    .string()
    .regex(plzRegex, "Bitte geben Sie eine gültige deutsche PLZ mit fünf Ziffern ein."),
  valueRange: z.enum(valueRanges).optional(),
  timeline: z.enum(timelines, {
    message: "Bitte wählen Sie einen Zeitrahmen.",
  }),
  experience: z.enum(experiences, {
    message: "Bitte geben Sie Ihre bisherige Erfahrung an.",
  }),
  firstName: z.string().trim().min(2, "Bitte Vornamen eingeben"),
  lastName: z.string().trim().min(2, "Bitte Nachnamen eingeben"),
  phone: z.string().min(6, "Bitte Telefonnummer eingeben"),
  email: z.string().trim().email("Bitte gültige E-Mail eingeben"),
  privacyAccepted: z.boolean().refine((v) => v === true, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  }),
});

/** Validierte Payload (API / nach Submit). */
export type LeadFormOutput = z.output<typeof leadFormSchema>;
/** Werte im Formularstate (RHF defaultValues / register). */
export type LeadFormInput = z.input<typeof leadFormSchema>;

/** @deprecated Verwenden Sie `LeadFormOutput` für neue Codepfade. */
export type LeadFormValues = LeadFormOutput;
