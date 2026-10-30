-- Wertavio: gespeicherte Anfragen mit Einwilligungs-Nachweis und Löschfrist.
-- Ziel: Supabase-Projekt "Brand OS" (eu-west-1), das Uriel nutzt. Beim Livegang als nächste Migration in
-- uriel/supabase/migrations übernehmen und mit `supabase db push` einspielen (nicht im SQL-Editor).
-- Zugriff nur über den Service-Schlüssel des Wertavio-Servers: RLS an, keine Policies.

create table if not exists public.wertavio_anfragen (
  id uuid primary key,
  eingang timestamptz not null default now(),
  quelle text not null default 'wertavio',
  extern_id text,
  art text not null check (art in ('eigentuemer', 'makler', 'partner')),
  vorname text,
  nachname text,
  email text,
  telefon text,
  plz text,
  angaben jsonb not null default '{}'::jsonb,
  -- { datenschutz: {zeit}, weitergabe: {zeit, text, version} | null, werbung: {zeit, text, version} | null }
  einwilligung jsonb not null,
  status text not null default 'neu' check (status in ('neu', 'uebergeben', 'fehlgeschlagen')),
  uebergeben_an text,
  uebergeben_am timestamptz,
  uebergabe_fehler text,
  loeschen_ab timestamptz not null,
  geloescht_am timestamptz,
  unique (quelle, extern_id)
);

create index if not exists wertavio_anfragen_loeschen_idx
  on public.wertavio_anfragen (loeschen_ab) where geloescht_am is null;

alter table public.wertavio_anfragen enable row level security;
revoke all on public.wertavio_anfragen from anon, authenticated;

-- Löscht personenbezogene Daten nach Ablauf der Frist. Übrig bleiben Zeitpunkte, Quelle, Art, PLZ-Bereich,
-- Empfänger und die Version der Einwilligung (ohne Wortlaut). Gleiche Regel wie lib/leads/retention.ts.
create or replace function public.wertavio_anfragen_bereinigen()
returns integer
language sql
security definer
set search_path = public
as $$
  with weg as (
    update public.wertavio_anfragen set
      vorname = null,
      nachname = null,
      email = null,
      telefon = null,
      plz = left(plz, 2),
      angaben = '{}'::jsonb,
      einwilligung = jsonb_build_object(
        'datenschutz', einwilligung->'datenschutz',
        'weitergabe', case when jsonb_typeof(einwilligung->'weitergabe') = 'object'
          then jsonb_set(einwilligung->'weitergabe', '{text}', '""') else 'null'::jsonb end,
        'werbung', case when jsonb_typeof(einwilligung->'werbung') = 'object'
          then jsonb_set(einwilligung->'werbung', '{text}', '""') else 'null'::jsonb end
      ),
      geloescht_am = now()
    where geloescht_am is null and loeschen_ab <= now()
    returning 1
  )
  select count(*)::integer from weg;
$$;

revoke all on function public.wertavio_anfragen_bereinigen() from public, anon, authenticated;
grant execute on function public.wertavio_anfragen_bereinigen() to service_role;

-- Täglich zusätzlich aufräumen, auch wenn keine neue Anfrage kommt (pg_cron ist bei Supabase enthalten).
create extension if not exists pg_cron;
select cron.schedule('wertavio-anfragen-bereinigen', '15 3 * * *', 'select public.wertavio_anfragen_bereinigen()');
