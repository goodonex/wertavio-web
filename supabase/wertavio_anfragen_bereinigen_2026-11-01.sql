-- Wertavio, Fassung 01.11.2026: Bereinigen behält auch die neue Einwilligung `finanzierung` und löscht verkürzte
-- Einträge nach drei Jahren. Vor dem Livegang von `fix/consent-legal` als nächste freie Migration in
-- uriel/supabase/migrations übernehmen und mit `supabase db push` einspielen (nicht im SQL-Editor).

-- Löscht personenbezogene Daten nach Ablauf der Frist. Übrig bleibt ein verkürzter Eintrag: Zeitpunkte, Quelle, Art,
-- PLZ-Bereich, Empfänger und Zeitpunkt/Version jeder Einwilligung (ohne Wortlaut). Nach drei Jahren wird auch dieser
-- Eintrag gelöscht. Gleiche Regel wie lib/leads/retention.ts.
create or replace function public.wertavio_anfragen_bereinigen()
returns integer
language sql
security definer
set search_path = public
as $$
  with endgueltig as (
    delete from public.wertavio_anfragen
    where geloescht_am is not null and geloescht_am <= now() - interval '3 years'
  ),
  weg as (
    update public.wertavio_anfragen set
      vorname = null,
      nachname = null,
      email = null,
      telefon = null,
      plz = left(plz, 2),
      angaben = '{}'::jsonb,
      -- Jede Einwilligung (datenschutz, weitergabe, finanzierung, werbung …) behalten, nur den Wortlaut leeren.
      einwilligung = coalesce((
        select jsonb_object_agg(e.key, case when jsonb_typeof(e.value) = 'object' and e.value ? 'text'
          then jsonb_set(e.value, '{text}', '""') else e.value end)
        from jsonb_each(einwilligung) e
      ), '{}'::jsonb),
      geloescht_am = now()
    where geloescht_am is null and loeschen_ab <= now()
    returning 1
  )
  select count(*)::integer from weg;
$$;

revoke all on function public.wertavio_anfragen_bereinigen() from public, anon, authenticated;
grant execute on function public.wertavio_anfragen_bereinigen() to service_role;
