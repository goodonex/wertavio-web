/** Marktfokus aus erster PLZ-Ziffer (Deutschland, vereinfacht). */
export function marktFokusAusPlz(plz: string): string {
  const d = plz.replace(/\D/g, "").charAt(0);
  const map: Record<string, string> = {
    "0": "Sachsen, Sachsen-Anhalt & Thüringen",
    "1": "Berlin & Brandenburg",
    "2": "Hamburg & Norddeutschland",
    "3": "Niedersachsen & Bremen",
    "4": "NRW & Rhein-Ruhr",
    "5": "Köln & Rheinland",
    "6": "Frankfurt & Hessen",
    "7": "Stuttgart & Baden-Württemberg",
    "8": "München & Südost-Bayern",
    "9": "Franken & Nordbayern",
  };
  return map[d] ?? "Ihre Region in Deutschland";
}
