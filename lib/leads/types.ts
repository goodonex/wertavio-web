/** Gespeicherte Anfrage (Tabelle `wertavio_anfragen`). Feldnamen wie in der Datenbank. */

/** Woher die Anfrage kommt. Neue Quellen in `WERTAVIO_QUELLEN` mit eigenem Schlüssel eintragen. */
export type LeadSource = "wertavio" | (string & {});

/** eigentuemer: Verkäufer sucht Makler · makler: Makler fragt Partnergespräch an · partner: Regions-Check der Partnerseite */
export type LeadKind = "eigentuemer" | "makler" | "partner";

export type LeadStatus = "neu" | "uebergeben" | "fehlgeschlagen";

export interface ConsentRecord {
  /** ISO-Zeitpunkt der Erteilung, gesetzt vom Server bzw. von der Quelle */
  zeit: string;
  text: string;
  version: string;
}

export interface LeadConsent {
  datenschutz: { zeit: string } | null;
  weitergabe: ConsentRecord | null;
  werbung: ConsentRecord | null;
}

export interface LeadRecord {
  id: string;
  eingang: string;
  quelle: LeadSource;
  extern_id: string | null;
  art: LeadKind;
  vorname: string | null;
  nachname: string | null;
  email: string | null;
  telefon: string | null;
  plz: string | null;
  /** Restliche Formularangaben (Immobilie, Zeitrahmen …) als flache Liste */
  angaben: Record<string, string>;
  einwilligung: LeadConsent;
  status: LeadStatus;
  uebergeben_an: string | null;
  uebergeben_am: string | null;
  uebergabe_fehler: string | null;
  /** Ab diesem Zeitpunkt werden die personenbezogenen Daten gelöscht */
  loeschen_ab: string;
  geloescht_am: string | null;
}

export type NewLead = Omit<
  LeadRecord,
  "id" | "eingang" | "status" | "uebergeben_an" | "uebergeben_am" | "uebergabe_fehler" | "loeschen_ab" | "geloescht_am"
>;
