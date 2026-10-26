import { Button } from "@/components/ui/Button";
import { empfohlenerTyp, type ImmoTyp, type ProfilePriority } from "@/lib/makler-profil-map";
import { marktFokusAusPlz } from "@/lib/plz-region";
import { PRIMARY_CTA_RISK } from "@/lib/cta";

export interface MaklerProfilResultProps {
  propertyType: ImmoTyp;
  plz: string;
  priority: ProfilePriority;
}

export function MaklerProfilResult({ propertyType, plz, priority }: MaklerProfilResultProps): JSX.Element {
  const rows = [
    { dt: "Immobilientyp", dd: propertyType },
    { dt: "Ihre Priorität", dd: priority },
    { dt: "Empfohlener Typ", dd: empfohlenerTyp(propertyType, priority) },
    { dt: "Marktfokus", dd: marktFokusAusPlz(plz) },
  ];
  const href = `/anfrage?type=${encodeURIComponent(propertyType)}&plz=${encodeURIComponent(plz)}&prioritaet=${encodeURIComponent(priority)}`;

  return (
    <div>
      <p className="text-h3 text-wertavio-slate">Ihr Makler-Profil für {plz}</p>
      <dl className="mt-5 divide-y divide-wertavio-border text-sm">
        {rows.map((r) => (
          <div key={r.dt} className="flex justify-between gap-6 py-3">
            <dt className="shrink-0 text-wertavio-muted">{r.dt}</dt>
            <dd className="text-right font-medium text-wertavio-slate">{r.dd}</dd>
          </div>
        ))}
      </dl>
      <Button href={href} className="mt-6 w-full">
        Spezialisten für dieses Profil finden
      </Button>
      <p className="mt-3 text-center text-xs text-wertavio-muted">{PRIMARY_CTA_RISK}</p>
      <p className="mt-1 text-center text-xs text-wertavio-muted">Ihre Angaben werden direkt übernommen.</p>
    </div>
  );
}
