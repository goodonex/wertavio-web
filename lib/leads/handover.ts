import { CONSENT_VERSION } from "@/lib/consent";
import { addDays, RETENTION_DAYS } from "@/lib/leads/retention";
import type { LeadStore } from "@/lib/leads/store";
import type { LeadKind, LeadRecord } from "@/lib/leads/types";

/**
 * Übergabe-Weiche: Wohin geht eine Anfrage mit Weitergabe-Einwilligung?
 * Ziele kommen aus `WERTAVIO_ZIELE` (JSON-Liste). Die erste aktive, passende Zeile gewinnt.
 *
 *   [{ "id": "signday-staffel", "typ": "signday", "name": "Staffel Immobilien",
 *      "url": "https://…/m/staffel/api/eingang", "schluessel": "mbe_…", "plz": ["2"] },
 *    { "id": "kollege", "typ": "kollege", "name": "Kollege Makler + Finanzierung", "plz": ["*"], "aktiv": false }]
 *
 * plz: Präfixe der fünfstelligen PLZ, "*" passt auf alle.
 */
export interface HandoverTarget {
  id: string;
  typ: "signday" | "kollege";
  name: string;
  url?: string;
  schluessel?: string;
  plz: string[];
  arten?: LeadKind[];
  aktiv?: boolean;
}

export type HandoverResult = { ok: true; ziel: string } | { ok: false; ziel: string | null; fehler: string };

export function loadTargets(raw = process.env.WERTAVIO_ZIELE): HandoverTarget[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HandoverTarget[]) : [];
  } catch {
    console.error("WERTAVIO_ZIELE ist kein gültiges JSON");
    return [];
  }
}

export function pickTarget(lead: LeadRecord, targets: HandoverTarget[]): HandoverTarget | null {
  const plz = lead.plz ?? "";
  return (
    targets.find(
      (t) =>
        t.aktiv !== false &&
        (t.arten ?? ["eigentuemer"]).includes(lead.art) &&
        t.plz.some((p) => p === "*" || plz.startsWith(p)),
    ) ?? null
  );
}

/** Nutzlast für den Lead-Eingang eines Signday-Büros (`makler-buero/server/eingang.mjs`). */
export function signdayPayload(lead: LeadRecord): Record<string, unknown> {
  const { weitergabe, werbung } = lead.einwilligung;
  const texte = [weitergabe && `Weitergabe: ${weitergabe.text}`, werbung && `Werbung: ${werbung.text}`].filter(Boolean);
  return {
    quelle: "Wertavio",
    art: "eigentuemer",
    extern_id: lead.id,
    vorname: lead.vorname,
    nachname: lead.nachname,
    email: lead.email,
    telefon: lead.telefon,
    kampagne: lead.quelle === "wertavio" ? null : lead.quelle,
    nachricht: ["Eigentümer-Anfrage über Wertavio", lead.angaben["Immobilie"], lead.plz].filter(Boolean).join(" · "),
    details: { PLZ: lead.plz ?? "", ...lead.angaben, Quelle: lead.quelle },
    einwilligung: {
      datenschutz: lead.einwilligung.datenschutz !== null,
      weitergabe: weitergabe !== null,
      werbung: werbung !== null,
      zeit: werbung?.zeit ?? weitergabe?.zeit,
      text: texte.join(" | "),
      text_version: weitergabe?.version ?? CONSENT_VERSION,
    },
  };
}

async function sendToSignday(target: HandoverTarget, lead: LeadRecord): Promise<void> {
  if (!target.url || !target.schluessel) throw new Error("Ziel ohne url oder schluessel");
  const res = await fetch(target.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${target.schluessel}` },
    body: JSON.stringify(signdayPayload(lead)),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Signday ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

/**
 * Übergibt eine gespeicherte Anfrage. Ohne Weitergabe-Einwilligung oder bei gelöschten Daten passiert nichts.
 * Nach Erfolg läuft die kurze Löschfrist für Wertavios Kopie.
 */
export async function handOver(store: LeadStore, lead: LeadRecord, targetId?: string): Promise<HandoverResult> {
  if (lead.geloescht_am) return { ok: false, ziel: null, fehler: "Daten bereits gelöscht" };
  if (!lead.einwilligung.weitergabe) return { ok: false, ziel: null, fehler: "Keine Einwilligung zur Weitergabe" };
  if (lead.status === "uebergeben") return { ok: false, ziel: lead.uebergeben_an, fehler: "Bereits übergeben" };

  const targets = loadTargets();
  const target = targetId ? (targets.find((t) => t.id === targetId) ?? null) : pickTarget(lead, targets);
  if (!target) return { ok: false, ziel: null, fehler: "Kein passendes Ziel für diese Anfrage" };

  try {
    if (target.typ === "signday") {
      await sendToSignday(target, lead);
    } else {
      // Kollege (Makler + Finanzierung) ist noch nicht angebunden; hier kommt sein Eingang hin.
      throw new Error("Ziel 'kollege' ist noch nicht angebunden");
    }
  } catch (e) {
    const fehler = e instanceof Error ? e.message : String(e);
    await store.update(lead.id, { status: "fehlgeschlagen", uebergabe_fehler: fehler });
    return { ok: false, ziel: target.id, fehler };
  }

  const now = new Date().toISOString();
  await store.update(lead.id, {
    status: "uebergeben",
    uebergeben_an: target.id,
    uebergeben_am: now,
    uebergabe_fehler: null,
    loeschen_ab: addDays(now, RETENTION_DAYS.afterHandover),
  });
  return { ok: true, ziel: target.id };
}
