import { timingSafeEqual } from "node:crypto";
import { handOver } from "@/lib/leads/handover";
import { getLeadStore } from "@/lib/leads/store";
import type { LeadRecord, NewLead } from "@/lib/leads/types";

/** Speichert eine Anfrage, räumt abgelaufene Daten auf und übergibt sie, wenn die automatische Übergabe an ist. */
export async function acceptLead(lead: NewLead): Promise<LeadRecord> {
  const store = getLeadStore();
  const record = await store.insert(lead);
  await store.purgeExpired().catch((e) => console.error("Bereinigen fehlgeschlagen", e));
  if (process.env.WERTAVIO_AUTO_UEBERGABE === "ja" && record.einwilligung.weitergabe) {
    const r = await handOver(store, record);
    if (!r.ok) console.error("Übergabe fehlgeschlagen", record.id, r.fehler);
  }
  return record;
}

/** Vergleicht einen Bearer-Schlüssel zeitkonstant. */
export function bearerMatches(req: Request, expected: string | undefined): boolean {
  if (!expected) return false;
  const got = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Schlüssel je externer Quelle aus `WERTAVIO_QUELLEN`, z. B. {"raeumung-hamburg":"wq_…"}. */
export function sourceForKey(req: Request): string | null {
  let sources: Record<string, string> = {};
  try {
    sources = JSON.parse(process.env.WERTAVIO_QUELLEN ?? "{}") as Record<string, string>;
  } catch {
    console.error("WERTAVIO_QUELLEN ist kein gültiges JSON");
  }
  return Object.entries(sources).find(([, key]) => bearerMatches(req, key))?.[0] ?? null;
}
