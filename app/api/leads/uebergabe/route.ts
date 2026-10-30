import { NextResponse } from "next/server";
import { handOver } from "@/lib/leads/handover";
import { bearerMatches } from "@/lib/leads/intake";
import { getLeadStore } from "@/lib/leads/store";

/**
 * Übergibt eine Anfrage von Hand (solange WERTAVIO_AUTO_UEBERGABE nicht an ist) oder wiederholt eine fehlgeschlagene.
 *   POST /api/leads/uebergabe   Authorization: Bearer <WERTAVIO_ADMIN_SCHLUESSEL>
 *   { "id": "<Anfrage-ID>", "ziel": "<optional: Ziel-ID aus WERTAVIO_ZIELE>" }
 */
export async function POST(req: Request): Promise<NextResponse> {
  if (!bearerMatches(req, process.env.WERTAVIO_ADMIN_SCHLUESSEL)) {
    return NextResponse.json({ ok: false, error: "Nicht berechtigt" }, { status: 401 });
  }
  let body: { id?: unknown; ziel?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Kein gültiges JSON" }, { status: 400 });
  }
  if (typeof body.id !== "string") return NextResponse.json({ ok: false, error: "id fehlt" }, { status: 400 });

  const store = getLeadStore();
  const lead = await store.get(body.id);
  if (!lead) return NextResponse.json({ ok: false, error: "Anfrage nicht gefunden" }, { status: 404 });
  const result = await handOver(store, lead, typeof body.ziel === "string" ? body.ziel : undefined);
  return NextResponse.json(result, { status: result.ok ? 200 : 409 });
}
