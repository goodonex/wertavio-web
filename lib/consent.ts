/**
 * Einwilligungstexte im Formular. Der Wortlaut wird mit Version und Zeitstempel am Lead gespeichert.
 * Fassung nach Rechtsprüfung vom 01.11.2026. Jede Textänderung braucht eine neue Version.
 */
export const CONSENT_VERSION = "2026-11-01";

export const consentTexts = {
  /** Pflicht bei Eigentümer-Anfragen: Weitergabe an den einen Partner-Makler und ausdrückliche Zustimmung zum Anruf. */
  forwarding:
    "Ich möchte, dass Wertavio meine Anfrage (Kontaktdaten, Angaben zur Immobilie, PLZ) an den Partner-Makler weitergibt, der für meine Postleitzahl zuständig ist, und dass dieser mich dazu per Telefon oder E-Mail kontaktiert. Ich kann das jederzeit per E-Mail an kontakt@wertavio.de beenden.",
  /** Freiwillig; nur damit darf eine Anfrage an das Ziel `kollege` gehen. */
  financing:
    "Freiwillig: Meine Anfrage darf zusätzlich an einen Finanzierungsberater gehen, der mich per Telefon oder E-Mail zu Finanzierung oder Verkauf berät. Widerruf jederzeit an kontakt@wertavio.de.",
  /**
   * Noch NICHT im Formular: erst einblenden, wenn die Bestätigung per Link (Double-opt-in) gebaut ist.
   * `werbung` geht erst nach dieser Bestätigung an den Makler.
   */
  marketing:
    "Freiwillig: Der Makler, an den meine Anfrage geht, darf mir auch nach dem ersten Gespräch per E-Mail Informationen zum Immobilienverkauf und zum Markt in meiner Region schicken. Ich bestätige das über einen Link in einer E-Mail. Abmeldung jederzeit über den Link in jeder E-Mail oder an kontakt@wertavio.de.",
} as const;
