# Anfragen: Speicherung, Einwilligung, Übergabe

Stand 30.10.2026, nur lokal gebaut und getestet, noch nicht live.

## Ablauf

1. Formular (`/anfrage`) → `POST /api/leads`. Eigentümer müssen der Weitergabe zustimmen (Pflicht-Häkchen),
   Werbung ist ein eigenes, freiwilliges Häkchen. Wortlaut und Version: `lib/consent.ts`.
2. Die Anfrage wird mit Zeitstempel, Wortlaut und Version jeder Einwilligung gespeichert (`lib/leads/store.ts`).
3. Übergabe über die Weiche (`lib/leads/handover.ts`): Signday-Büro über dessen Lead-Eingang
   (`makler-buero/server/eingang.mjs`, Quelle „Wertavio“) oder später Kevins Kollegen (Ziel `kollege`, noch nicht
   angebunden). Automatisch mit `WERTAVIO_AUTO_UEBERGABE=ja`, sonst von Hand:

   ```
   curl -X POST https://wertavio.de/api/leads/uebergabe \
     -H "Authorization: Bearer $WERTAVIO_ADMIN_SCHLUESSEL" -H "Content-Type: application/json" \
     -d '{"id":"<Anfrage-ID>","ziel":"<optional>"}'
   ```

   Das Signday-Büro nimmt Wertavio-Leads nur an, wenn dort `WERTAVIO_FREIGEGEBEN=ja` gesetzt ist.
4. Löschfristen (`lib/leads/retention.ts`): 30 Tage nach Übergabe, 90 Tage ohne Übergabe, Makler-Anfragen
   365 Tage. Danach bleiben nur Datum, Art, Quelle, PLZ-Bereich, Empfänger und Einwilligungs-Version. Aufgeräumt
   wird bei jeder neuen Anfrage und täglich um 3:15 Uhr in der Datenbank.

## Weitere Quellen (z. B. Räumung Hamburg)

`POST /api/eingang` mit `Authorization: Bearer <Schlüssel der Quelle aus WERTAVIO_QUELLEN>`:

```json
{
  "extern_id": "rh-123",
  "vorname": "…", "nachname": "…", "email": "…", "telefon": "…", "plz": "22111",
  "angaben": { "Leistung": "Haushaltsauflösung", "Verkauf danach": "ja" },
  "einwilligung": {
    "datenschutz": { "zeit": "2026-10-30T10:00:00+01:00" },
    "weitergabe": { "zeit": "…", "text": "Wortlaut im Formular der Quelle", "version": "rh-2026-10-30" },
    "werbung": null
  }
}
```

Nur senden, wenn der Eigentümer verkaufen will und der Weitergabe zugestimmt hat. Doppelte `extern_id` wird erkannt.

## Livegang (erst nach Kevins Ja)

1. `supabase/wertavio_anfragen.sql` als nächste Migration nach `uriel/supabase/migrations/` kopieren und mit
   `supabase db push` einspielen.
2. In Netlify (Site wertavio) die Variablen aus `.env.example` setzen, `SUPABASE_SERVICE_ROLE_KEY` aus dem
   Projekt „Brand OS“.
3. Datenschutzerklärung (Abschnitte 3 und 5, Entwurf) und Einwilligungstexte anwaltlich prüfen lassen.
4. Zweig zusammenführen und veröffentlichen, danach eine Testanfrage schicken und wieder löschen.
