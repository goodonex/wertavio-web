import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { anonymize, deleteAfter } from "@/lib/leads/retention";
import type { LeadRecord, NewLead } from "@/lib/leads/types";

/**
 * Speicher für Anfragen.
 * - Supabase (Produktion): SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, Tabelle aus `supabase/wertavio_anfragen.sql`.
 * - Datei (nur lokal): `.data/wertavio-anfragen.json`, wenn Supabase nicht eingerichtet ist.
 * In Produktion ohne Supabase wird nichts angenommen, damit keine Anfrage still verloren geht.
 */
export interface LeadStore {
  insert(lead: NewLead): Promise<LeadRecord>;
  get(id: string): Promise<LeadRecord | null>;
  findByExternalId(quelle: string, externId: string): Promise<LeadRecord | null>;
  update(id: string, patch: Partial<LeadRecord>): Promise<void>;
  /** Löscht personenbezogene Daten aller Anfragen mit abgelaufener Frist. Gibt die Anzahl zurück. */
  purgeExpired(): Promise<number>;
}

const TABLE = "wertavio_anfragen";

function newRecord(lead: NewLead): LeadRecord {
  const eingang = new Date().toISOString();
  return {
    ...lead,
    id: randomUUID(),
    eingang,
    status: "neu",
    uebergeben_an: null,
    uebergeben_am: null,
    uebergabe_fehler: null,
    loeschen_ab: deleteAfter(lead.art, eingang),
    geloescht_am: null,
  };
}

class SupabaseStore implements LeadStore {
  constructor(
    private readonly url: string,
    private readonly key: string,
  ) {}

  private async req(pathAndQuery: string, init: RequestInit = {}): Promise<Response> {
    const res = await fetch(`${this.url}/rest/v1/${pathAndQuery}`, {
      ...init,
      headers: {
        apikey: this.key,
        Authorization: `Bearer ${this.key}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return res;
  }

  async insert(lead: NewLead): Promise<LeadRecord> {
    const record = newRecord(lead);
    await this.req(TABLE, { method: "POST", body: JSON.stringify(record), headers: { Prefer: "return=minimal" } });
    return record;
  }

  async get(id: string): Promise<LeadRecord | null> {
    const res = await this.req(`${TABLE}?id=eq.${encodeURIComponent(id)}&limit=1`);
    const rows = (await res.json()) as LeadRecord[];
    return rows[0] ?? null;
  }

  async findByExternalId(quelle: string, externId: string): Promise<LeadRecord | null> {
    const q = `quelle=eq.${encodeURIComponent(quelle)}&extern_id=eq.${encodeURIComponent(externId)}&limit=1`;
    const rows = (await (await this.req(`${TABLE}?${q}`)).json()) as LeadRecord[];
    return rows[0] ?? null;
  }

  async update(id: string, patch: Partial<LeadRecord>): Promise<void> {
    await this.req(`${TABLE}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
      headers: { Prefer: "return=minimal" },
    });
  }

  async purgeExpired(): Promise<number> {
    const res = await this.req("rpc/wertavio_anfragen_bereinigen", { method: "POST", body: "{}" });
    return Number(await res.json()) || 0;
  }
}

class FileStore implements LeadStore {
  private readonly file = path.join(process.cwd(), ".data", "wertavio-anfragen.json");
  private queue: Promise<unknown> = Promise.resolve();

  private async read(): Promise<LeadRecord[]> {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8")) as LeadRecord[];
    } catch {
      return [];
    }
  }

  private async write(rows: LeadRecord[]): Promise<void> {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    await fs.writeFile(this.file, JSON.stringify(rows, null, 2));
  }

  /** Schreibzugriffe nacheinander, damit sich parallele Anfragen nicht überschreiben. */
  private serial<T>(fn: () => Promise<T>): Promise<T> {
    const next = this.queue.then(fn, fn);
    this.queue = next.catch(() => undefined);
    return next;
  }

  insert(lead: NewLead): Promise<LeadRecord> {
    return this.serial(async () => {
      const record = newRecord(lead);
      await this.write([...(await this.read()), record]);
      return record;
    });
  }

  async get(id: string): Promise<LeadRecord | null> {
    return (await this.read()).find((r) => r.id === id) ?? null;
  }

  async findByExternalId(quelle: string, externId: string): Promise<LeadRecord | null> {
    return (await this.read()).find((r) => r.quelle === quelle && r.extern_id === externId) ?? null;
  }

  update(id: string, patch: Partial<LeadRecord>): Promise<void> {
    return this.serial(async () => {
      await this.write((await this.read()).map((r) => (r.id === id ? { ...r, ...patch } : r)));
    });
  }

  purgeExpired(): Promise<number> {
    return this.serial(async () => {
      const now = new Date().toISOString();
      let count = 0;
      const rows = (await this.read()).map((r) => {
        if (r.geloescht_am || r.loeschen_ab > now) return r;
        count += 1;
        return anonymize(r, now);
      });
      if (count) await this.write(rows);
      return count;
    });
  }
}

let store: LeadStore | null = null;

export function getLeadStore(): LeadStore {
  if (store) return store;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    store = new SupabaseStore(url.replace(/\/$/, ""), key);
  } else if (process.env.NODE_ENV !== "production" || process.env.WERTAVIO_DATEISPEICHER === "ja") {
    store = new FileStore();
  } else {
    throw new Error("Lead-Speicher nicht eingerichtet: SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY fehlen.");
  }
  return store;
}
