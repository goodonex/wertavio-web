import { NextResponse } from "next/server";
import { z } from "zod";
import { acceptLead, sourceForKey } from "@/lib/leads/intake";
import { getLeadStore } from "@/lib/leads/store";

/**
 * Eingang für weitere Quellen (z. B. Räumung Hamburg), Server zu Server.
 *   POST /api/eingang   Authorization: Bearer <Schlüssel der Quelle aus WERTAVIO_QUELLEN>
 * Die Quelle holt die Weitergabe-Einwilligung im eigenen Formular ein und schickt Wortlaut, Version und Zeit mit.
 */
const consentSchema = z.object({
  zeit: z.iso.datetime({ offset: true }),
  text: z.string().trim().min(20).max(1000),
  version: z.string().trim().min(1).max(40),
});

const externalLeadSchema = z.object({
  extern_id: z.string().trim().min(1).max(120),
  vorname: z.string().trim().max(80).optional(),
  nachname: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  telefon: z.string().trim().max(40).optional(),
  plz: z.string().regex(/^\d{5}$/),
  angaben: z.record(z.string().max(40), z.string().max(200)).optional(),
  einwilligung: z.object({
    datenschutz: z.object({ zeit: z.iso.datetime({ offset: true }) }),
    weitergabe: consentSchema,
    werbung: consentSchema.nullable().optional(),
  }),
});

export async function POST(req: Request): Promise<NextResponse> {
  const quelle = sourceForKey(req);
  if (!quelle) return NextResponse.json({ ok: false, error: "Schlüssel fehlt oder falsch" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Kein gültiges JSON" }, { status: 400 });
  }
  const parsed = externalLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Ungültige Daten", details: z.flattenError(parsed.error) },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const angaben = Object.fromEntries(Object.entries(d.angaben ?? {}).slice(0, 20));

  try {
    const existing = await getLeadStore().findByExternalId(quelle, d.extern_id);
    if (existing) return NextResponse.json({ ok: true, id: existing.id, doppelt: true }, { status: 200 });
    const record = await acceptLead({
      quelle,
      extern_id: d.extern_id,
      art: "eigentuemer",
      vorname: d.vorname ?? null,
      nachname: d.nachname,
      email: d.email.toLowerCase(),
      telefon: d.telefon ?? null,
      plz: d.plz,
      angaben,
      einwilligung: {
        datenschutz: d.einwilligung.datenschutz,
        weitergabe: d.einwilligung.weitergabe,
        werbung: d.einwilligung.werbung ?? null,
      },
    });
    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (e) {
    console.error("Externer Lead konnte nicht gespeichert werden", quelle, e);
    return NextResponse.json({ ok: false, error: "Speichern fehlgeschlagen" }, { status: 503 });
  }
}
