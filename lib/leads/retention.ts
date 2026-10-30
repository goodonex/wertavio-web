import type { LeadKind, LeadRecord } from "@/lib/leads/types";

/**
 * Löschfristen für Wertavios eigene Kopie. Danach bleiben nur Zeitpunkte, Quelle, Art, PLZ-Bereich und Empfänger
 * (für Abrechnung und Statistik), keine Namen, Kontaktdaten oder Formularangaben.
 * ENTWURF: Fristen mit dem Anwalt abstimmen; bei Änderung auch `supabase/wertavio_anfragen.sql` anpassen.
 */
export const RETENTION_DAYS = {
  /** Nach erfolgreicher Übergabe: Zeit für Rückfragen, Widerruf und Reklamation des Empfängers */
  afterHandover: 30,
  /** Eigentümer-Anfrage, die nie übergeben wurde */
  eigentuemer: 90,
  /** Makler, die ein Partnergespräch oder ihre Region anfragen (Geschäftskontakte) */
  makler: 365,
  partner: 365,
} as const satisfies Record<LeadKind | "afterHandover", number>;

export function addDays(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * 86_400_000).toISOString();
}

export function deleteAfter(kind: LeadKind, from: string): string {
  return addDays(from, RETENTION_DAYS[kind]);
}

/** Was nach Ablauf der Frist vom Datensatz übrig bleibt. */
export function anonymize(lead: LeadRecord, now: string): LeadRecord {
  const keep = (c: { zeit: string; version: string } | null) =>
    c ? { zeit: c.zeit, text: "", version: c.version } : null;
  return {
    ...lead,
    vorname: null,
    nachname: null,
    email: null,
    telefon: null,
    plz: lead.plz ? lead.plz.slice(0, 2) : null,
    angaben: {},
    einwilligung: {
      datenschutz: lead.einwilligung.datenschutz,
      weitergabe: keep(lead.einwilligung.weitergabe),
      werbung: keep(lead.einwilligung.werbung),
    },
    geloescht_am: now,
  };
}
