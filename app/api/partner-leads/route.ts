import { NextResponse } from "next/server";
import { partnerLeadSchema } from "@/lib/partner-lead-schema";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: unknown = await req.json();
    const parsed = partnerLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Ungültige Daten" }, { status: 400 });
    }
    console.log("Partner-Lead", JSON.stringify(parsed.data, null, 2));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
