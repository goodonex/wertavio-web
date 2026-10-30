import { NextResponse } from "next/server";
import { partnerLeadSchema } from "@/lib/partner-lead-schema";
import { acceptLead } from "@/lib/leads/intake";

export async function POST(req: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = partnerLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Ungültige Daten" }, { status: 400 });
  }
  const d = parsed.data;
  try {
    await acceptLead({
      quelle: "wertavio",
      extern_id: null,
      art: "partner",
      vorname: null,
      nachname: d.name.trim(),
      email: null,
      telefon: d.phone.trim(),
      plz: d.plz,
      angaben: { Spezialisierung: d.spezialisierung },
      einwilligung: { datenschutz: null, weitergabe: null, werbung: null },
    });
  } catch (e) {
    console.error("Partner-Lead konnte nicht gespeichert werden", e);
    return NextResponse.json({ ok: false, error: "Speichern fehlgeschlagen" }, { status: 503 });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
