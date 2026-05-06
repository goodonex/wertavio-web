/**
 * Zentrale Pflege rechtlicher Pflichtangaben (TMG / DSGVO).
 * Vor dem Livegang: vollständige ladungsfähige Anschrift, E-Mail erreichbar, Rechtsform prüfen.
 */
export const siteLegal = {
  brandName: "Wertavio",
  siteUrl: "https://wertavio.de",
  /** Anbieter i. S. d. TMG — ggf. Firmenwortlaut des Handelsregisters eintragen. */
  operatorDisplayName: "Kevin Herrmann",
  /** z. B. „Einzelunternehmen“, „UG (haftungsbeschränkt)“ — an die tatsächliche Rechtsform anpassen. */
  legalFormShort: "Einzelunternehmen",
  address: {
    streetLine: "[Straße und Hausnummer — bitte in site-legal.ts eintragen]",
    postalCodeCity: "[PLZ und Ort — bitte in site-legal.ts eintragen]",
    country: "Deutschland",
  },
  /** Öffentlich einsehbare Erreichbarkeit (z. B. kontakt@…). */
  email: "kontakt@wertavio.de",
  /** Optional: z. B. „+49 …“ — Zeile im Impressum wird ausgeblendet, wenn leer. */
  phone: "" as string | undefined,
  /** Optional: z. B. „DE123456789“ */
  vatId: "" as string | undefined,
} as const;
