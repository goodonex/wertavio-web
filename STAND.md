# Wertavio – Stand 01.11.2026 (abends)

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
- Werbe-Häkchen später wieder einblenden: erst Double-opt-in bauen (Bestätigungs-Link per Mail), Wortlaut steht
  schon in `lib/consent.ts` (`marketing`); `werbung` geht erst nach Bestätigung an den Makler.
- Lokal, nicht live (Zweige):
  - `fix/consent-legal` (01.11., wartet auf Kevins Ja): Umsetzung der Rechtsprüfung
    (`side-session-notes/…/rechtsblick-wertavio-datenschutz-2026-11-01.md`). Weitergabe-Häkchen nennt den einen
    Partner-Makler und „Telefon oder E-Mail“, neues freiwilliges Häkchen `financing` (nur damit geht eine Anfrage an
    Ziel `kollege`), Werbe-Häkchen ausgeblendet bis Double-opt-in, „Datenschutzerklärung gelesen“ ist nur noch
    Hinweis, Datenschutz Abschnitte 3/5/6/7 neu, verkürzter Eintrag nach 3 Jahren gelöscht, Impressum § 5 DDG,
    `CONSENT_VERSION` 2026-11-01. Dazu: Schritt 3 des Formulars zeigte beim Ankommen sofort rote Fehler (Knopf schickte
    ab), behoben. Livegang: erst `supabase/wertavio_anfragen_bereinigen_2026-11-01.sql` als nächste Migration in
    `uriel/supabase/migrations/` einspielen (sonst verliert das nächtliche Bereinigen den Nachweis `finanzierung`),
    dann Zweig in `main` mergen und pushen.
  - `feat/lead-notify` (auf `fix/consent-legal` aufgesetzt): Mail an kontakt@ bei jeder Anfrage (Resend), nur
    Anfrage-Nummer, Art, PLZ-Bereich (keine Kontaktdaten), Resend in der Datenschutzerklärung, Nachholen bei Fehler,
    lokale Tests nicht in die echte Tabelle. Braucht: Postfach, Resend-Schlüssel, DB-Spalten (`supabase/wertavio_anfragen_meldung.sql`
    als nächste freie Migration in `uriel/supabase/migrations/`, Stand 0112).
  - `feat/visitor-counter` (auf `fix/consent-legal` aufgesetzt): Jophiel-Besucherzähler im `<head>` + Datenschutz-Absatz, Skript
    `scripts/report-leads.mjs` (meldet Anfragen-Anzahl der letzten 7 Tage an Jophiel; einmal am 01.11. gelaufen).
    Braucht: Kevins Ja, freigeschaltete Adresse zaehler.frameworkos.de und eine Änderung im Jophiel-Zählskript:
    Geräteart am Server aus dem User-Agent bestimmen, nicht im Skript (so steht es jetzt im Datenschutztext).
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
- Ziel `kollege` bleibt in der Weiche, inaktiv, bis sein Übergabeweg geklärt ist. Ab `fix/consent-legal` bekommt er
  nur Anfragen mit dem freiwilligen Finanzierungs-Häkchen; laut Wortlaut „zusätzlich“ zum Makler, das gleichzeitige
  Übergeben an beide ist beim Anbinden noch zu bauen (heute gewinnt das erste passende Ziel). Er ist externer Partner/Kunde,
  kein Mitinhaber. Weiche muss auch ohne ihn funktionieren (ohne Ziel bleibt die Anfrage gespeichert).
- Ohne Partner im Gebiet wird nichts weitergegeben.
- Keine HERRMANN-Absender/-Farben auf Wertavio; Offenlegung wortgleich aus `marke.json`.

## Offen bei Kevin
- Postfach/Weiterleitung für kontakt@wertavio.de einrichten (es gibt keinen Mail-Eingang für die Domain).
- wertavio.de einmal in Safari auf dem iPhone ansehen.
- Ja zum Livegang von `fix/consent-legal` (Rechtsprüfung 01.11. umgesetzt, lokal geprüft).
- Supabase-Auftragsverarbeitungsvertrag unterschreiben (Supabase → Organisation → Legal Documents); bis dahin
  stimmt der Satz „Mit allen genannten Anbietern bestehen Verträge …“ für Supabase nicht.
- kontakt@wertavio.de über einen Mailanbieter mit Auftragsverarbeitungsvertrag einrichten, nicht als Weiterleitung
  ins private Gmail (Rechtsprüfung Punkt 6).
- Partnervertrag Makler: Daten nur für diese Anfrage, Datenschutz-Info beim Erstkontakt (Art. 14), Nachweis
  5 Jahre (§ 7a UWG), ohne Auftrag löschen.
- Räumlotse-Formular braucht das Häkchen „Verkauf danach, Anfrage an Wertavio“ (Räumlotse = Quelle
  `raeumung-hamburg`), bevor von dort Anfragen kommen.
- Resend-Konto (kostenlos) für die Anfrage-Mail, danach `feat/lead-notify` live.
- Ja zum Besucherzähler (`feat/visitor-counter`).

## Offene Entscheidungen
- Meldungen bei neuer Anfrage: an kontakt@ (braucht Postfach). Die Mail enthält keine Kontaktdaten mehr, darf also
  auch vorerst an Kevins Gmail gehen; das Postfach kontakt@ selbst gehört laut Rechtsprüfung zu einem Anbieter mit AVV.

## Nächste Schritte
0. Nach Kevins Ja: Migration `wertavio_anfragen_bereinigen_2026-11-01.sql` einspielen, `fix/consent-legal` mergen,
   pushen, Formular auf wertavio.de einmal durchklicken (ohne Absenden).
1. Nach Postfach + Resend: Migration einspielen, `feat/lead-notify` mergen, Testanfrage, live.
2. Nach Kevins Ja: `feat/visitor-counter` mergen; Anfragen-Meldung täglich einplanen (Mini oder Laptop).
3. Kollegen anbinden, sobald er einen Eingang hat (Zieltyp `kollege` in `lib/leads/handover.ts`).
