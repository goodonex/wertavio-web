/**
 * Einwilligungstexte im Formular. Der Wortlaut wird mit Version und Zeitstempel am Lead gespeichert.
 * ENTWURF: vor dem Livegang anwaltlich prüfen lassen. Jede Textänderung braucht eine neue Version.
 */
export const CONSENT_VERSION = "2026-10-30";

export const consentTexts = {
  forwarding:
    "Ich willige ein, dass Wertavio meine Angaben (Kontaktdaten und Angaben zur Immobilie) an einen geprüften Immobilienmakler oder Finanzierungsberater in meiner Region weitergibt, damit dieser mich zu meinem Anliegen kontaktiert. Widerruf jederzeit per E-Mail an kontakt@wertavio.de.",
  marketing:
    "Der vermittelte Makler darf mir auch nach dem ersten Gespräch Informationen zum Immobilienverkauf und zum Markt in meiner Region per E-Mail schicken. Abmeldung jederzeit möglich.",
} as const;
