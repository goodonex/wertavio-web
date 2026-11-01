# Wertavio – Stand 01.11.2026

## Projekt
wertavio.de vermittelt Eigentümern kostenlos genau einen passenden Makler aus ihrer Region. Geld kommt von den
Empfängern: Partner-Makler im Abo (750 € je 30 Tage, ein Partner je PLZ-Gebiet) und Kevins Kollege (Finanzierung,
gelegentlich Verkauf, externer Partner).

## Seit 28.10. gebaut und entschieden (alles live)
- Redesign live (28.10.), Impressum mit Anschrift Brauhausstieg 48, 22041 Hamburg.
- Drei Zahlen ohne Quelle gestrichen, Netzwerk-/Verbandsangaben (IVD, DEKRA, TÜV, „deutschlandweit“) ersetzt.
- Formular-Fehler behoben: Name/Telefon/E-Mail blockierten seit Mai jedes Absenden.
- Anfragen werden gespeichert (Supabase „Brand OS“, Tabelle `wertavio_anfragen`) mit Einwilligungs-Nachweis
  (Pflicht: Weitergabe; freiwillig: Werbung), Löschfristen (30 Tage nach Übergabe, 90 ohne, 365 Makler-Anfragen),
  Herkunft (`?einstieg=`, `utm_*`), Eingang für weitere Quellen (`/api/eingang`, Räumung Hamburg hat Schlüssel).
- Markenpaket B live (31.10.): Petrol trägt, Orange nur Knöpfe/Markierungen, Newsreader + IBM Plex Sans,
  Wortmarke, Offenlegungs-Kasten „Wer steht dahinter?“ auf Anfrage- und Makler-Seite.
- Bilder: echte Wohnhäuser von Wikimedia Commons (Kevin lehnte Karte/Maßband/Grundbuch/Grenzstein ab), Nachweise
  im Impressum. Keine KI-Bilder.
- Supabase auf Pro hochgestuft (01.11., war wegen Datenvolumen gesperrt), keine Anfrage verloren.

## Stand heute
- Live: `main` = wertavio.de (Netlify, Site `wertavio`, Deploy bei Push auf `main`).
- Lokal, nicht live (Zweige):
  - `feat/lead-notify`: Mail an kontakt@ bei jeder Anfrage (Resend), Nachholen bei Fehler, lokale Tests nicht in
    die echte Tabelle. Braucht: Postfach, Resend-Schlüssel, DB-Spalten (`supabase/wertavio_anfragen_meldung.sql`
    als nächste freie Migration in `uriel/supabase/migrations/`, Stand 0112).
  - `feat/visitor-counter`: Jophiel-Besucherzähler im `<head>` + Datenschutz-Absatz, Skript
    `scripts/report-leads.mjs` (meldet Anfragen-Anzahl der letzten 7 Tage an Jophiel; einmal am 01.11. gelaufen).
    Braucht: Kevins Ja und freigeschaltete Adresse zaehler.frameworkos.de.
  - `fix/remove-colleague`: verworfen (zurückgenommen), nicht verwenden.

## Pfade und Befehle
- Leads: `lib/leads/` (store, handover, intake, retention, notify auf Zweig), Doku `LEADS.md`.
- Einwilligungstexte: `lib/consent.ts` (bei Textänderung `CONSENT_VERSION` erhöhen).
- Markenpaket: `~/Kevin OS/02 Projekte/marken/wertavio/` (Bildsprache dort noch Karten, Marken-Leitung informiert).
- Schlüssel lokal: `.env.local` (nie einchecken). Netlify-Variablen: `netlify env:list` im Projektordner.
- Lokaler Test ohne echte DB: `SUPABASE_URL= SUPABASE_SERVICE_ROLE_KEY= WERTAVIO_DATEISPEICHER=ja npx next start`.
- Übergabe von Hand: `POST /api/leads/uebergabe` mit `WERTAVIO_ADMIN_SCHLUESSEL` (siehe LEADS.md).

## Kevins Regeln und Entscheidungen
- Live nur nach Kevins Ja in diesem Chat.
- Ziel `kollege` bleibt in der Weiche, inaktiv, bis sein Übergabeweg geklärt ist. Er ist externer Partner/Kunde,
  kein Mitinhaber. Weiche muss auch ohne ihn funktionieren (ohne Ziel bleibt die Anfrage gespeichert).
- Ohne Partner im Gebiet wird nichts weitergegeben.
- Keine HERRMANN-Absender/-Farben auf Wertavio; Offenlegung wortgleich aus `marke.json`.

## Offen bei Kevin
- Postfach/Weiterleitung für kontakt@wertavio.de einrichten (es gibt keinen Mail-Eingang für die Domain).
- wertavio.de einmal in Safari auf dem iPhone ansehen.
- Datenschutz- und Einwilligungstexte prüfen lassen (laufen live als Entwurf).
- Resend-Konto (kostenlos) für die Anfrage-Mail, danach `feat/lead-notify` live.
- Ja zum Besucherzähler (`feat/visitor-counter`).

## Offene Entscheidungen
- Meldungen bei neuer Anfrage: an kontakt@ (braucht Postfach) oder vorerst an Kevins Gmail. Empfehlung: Weiterleitung
  kontakt@ → Gmail einrichten, dann bleibt die Adresse überall gleich.

## Nächste Schritte
1. Nach Postfach + Resend: Migration einspielen, `feat/lead-notify` mergen, Testanfrage, live.
2. Nach Kevins Ja: `feat/visitor-counter` mergen; Anfragen-Meldung täglich einplanen (Mini oder Laptop).
3. Kollegen anbinden, sobald er einen Eingang hat (Zieltyp `kollege` in `lib/leads/handover.ts`).
