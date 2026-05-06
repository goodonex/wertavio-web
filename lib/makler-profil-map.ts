import { propertyTypes, type LeadFormOutput } from "@/lib/lead-schema";

export type ImmoTyp = (typeof propertyTypes)[number];

export const profilePriorities = [
  "Schnell verkaufen",
  "Bester Preis",
  "Beides",
] as const;
export type ProfilePriority = (typeof profilePriorities)[number];

export const profileTimelines = [
  "Sofort",
  "3 Monate",
  "6 Monate",
  "Flexibel",
] as const;
export type ProfileTimeline = (typeof profileTimelines)[number];

function k(t: ImmoTyp, p: ProfilePriority): string {
  return `${t}|${p}`;
}

/** Empfohlener Makler-Typ aus Immobilientyp + Priorität. */
export const empfohlenerTypMap: Record<string, string> = {
  [k("Haus", "Schnell verkaufen")]:
    "Spezialist für Einfamilienhäuser mit aktiven Suchmandaten in Ihrer Preisklasse",
  [k("Haus", "Bester Preis")]:
    "Spezialist für Einfamilienhäuser mit nachweisbaren Verkaufsergebnissen über Marktwert",
  [k("Haus", "Beides")]:
    "Spezialist für Einfamilienhäuser mit dokumentierter Preis- und Geschwindigkeits-Balance",
  [k("Wohnung", "Schnell verkaufen")]:
    "Makler mit aktivem Käufernetzwerk in Ihrer Region",
  [k("Wohnung", "Bester Preis")]:
    "Makler für Wohnungseigentum mit starker Vergleichswert-Argumentation",
  [k("Wohnung", "Beides")]:
    "Makler für Wohnungseigentum mit Käuferpool und Marktpreis-Fokus",
  [k("Grundstück", "Schnell verkaufen")]:
    "Experte für schnelle Grundstücksvermarktung und B-Plan-Kompatibilität",
  [k("Grundstück", "Bester Preis")]:
    "Experte für Baugrundstücke mit Nachweis über Marktvergleiche",
  [k("Grundstück", "Beides")]:
    "Experte für Baugrundstücke und Projektentwicklung",
  [k("Sonstiges", "Schnell verkaufen")]:
    "Spezialist für verwandte Sonderobjekte mit kurzem Vermarktungspfad",
  [k("Sonstiges", "Bester Preis")]:
    "Spezialist für Sonderobjekte mit dokumentierten Außergewöhnlich-Referenzen",
  [k("Sonstiges", "Beides")]:
    "Spezialist für Sonderobjekte mit abgestimmtem Käufer- und Preisfeld",
};

export function empfohlenerTyp(immobilientyp: ImmoTyp, prioritaet: ProfilePriority): string {
  return (
    empfohlenerTypMap[k(immobilientyp, prioritaet)] ??
    empfohlenerTypMap[k("Sonstiges", "Beides")]
  );
}

export function prioritaetToLeadStep2(
  prioritaet: string,
): Pick<LeadFormOutput, "timeline" | "experience"> {
  const p = decodeURIComponent(prioritaet).trim();
  if (p === "Schnell verkaufen") {
    return { timeline: "Sofort", experience: "Noch keinen" };
  }
  if (p === "Bester Preis") {
    return { timeline: "In 6 Monaten", experience: "Bereits Erfahrungen gemacht" };
  }
  if (p === "Beides") {
    return { timeline: "In 3 Monaten", experience: "Noch keinen" };
  }
  return { timeline: "Noch unklar", experience: "Noch keinen" };
}
