import { NextResponse } from "next/server";
import { CONSENT_VERSION, consentTexts } from "@/lib/consent";
import { leadFormSchema } from "@/lib/lead-schema";
import { acceptLead } from "@/lib/leads/intake";

export async function POST(req: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Ungültige Daten" }, { status: 400 });
  }
  const d = parsed.data;
  const now = new Date().toISOString();
  const consent = (given: boolean | undefined, text: string) =>
    given ? { zeit: now, text, version: CONSENT_VERSION } : null;

  try {
    await acceptLead({
      quelle: "wertavio",
      extern_id: null,
      art: d.flowType,
      vorname: d.firstName,
      nachname: d.lastName,
      email: d.email.toLowerCase(),
      telefon: d.phone.trim(),
      plz: d.plz,
      angaben: {
        Immobilie: d.propertyType,
        ...(d.valueRange ? { Wert: d.valueRange } : {}),
        Zeitrahmen: d.timeline,
        "Erfahrung mit Maklern": d.experience,
      },
      einwilligung: {
        datenschutz: { zeit: now },
        weitergabe: d.flowType === "eigentuemer" ? consent(d.consentForwarding, consentTexts.forwarding) : null,
        werbung: d.flowType === "eigentuemer" ? consent(d.consentMarketing, consentTexts.marketing) : null,
      },
    });
  } catch (e) {
    console.error("Lead konnte nicht gespeichert werden", e);
    return NextResponse.json({ ok: false, error: "Speichern fehlgeschlagen" }, { status: 503 });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
