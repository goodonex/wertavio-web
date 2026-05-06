import { z } from "zod";

export const partnerLeadSpezialisierungen = [
  "Einfamilienhäuser",
  "Eigentumswohnungen",
  "Grundstücke",
  "Gewerbe",
  "Alles",
] as const;

export const partnerLeadSchema = z.object({
  plz: z.string().regex(/^\d{5}$/, "Fünfstellige PLZ"),
  spezialisierung: z.enum(partnerLeadSpezialisierungen),
  name: z.string().min(1, "Name erforderlich"),
  phone: z.string().min(6, "Telefon erforderlich"),
});

export type PartnerLeadInput = z.input<typeof partnerLeadSchema>;
export type PartnerLeadOutput = z.output<typeof partnerLeadSchema>;
