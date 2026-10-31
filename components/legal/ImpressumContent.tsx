import { siteLegal } from "@/lib/site-legal";
import { LegalSection } from "@/components/legal/LegalSection";

/** Bilder von Wikimedia Commons. CC BY und CC BY-SA verlangen Urheber, Quelle und Lizenz. */
const imageCredits = [
  {
    what: "Klinker-Doppelhaus in Hamburg",
    author: "KaiBorgeest",
    source: "https://commons.wikimedia.org/wiki/File:Hamburg_Hafenbezirk_20_22.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.de",
    changed: true,
  },
  {
    what: "Einfamilienhaus in München-Pasing",
    author: "High Contrast",
    source: "https://commons.wikimedia.org/wiki/File:Einfamilienhaus_in_Pasing,_M%C3%BCnchen.jpg",
    license: "CC BY 3.0 DE",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/de/deed.de",
    changed: true,
  },
  {
    what: "Doppelhaus in München-Pasing",
    author: "High Contrast",
    source: "https://commons.wikimedia.org/wiki/File:Doppelhaus_in_Pasing,_M%C3%BCnchen.jpg",
    license: "CC BY 3.0 DE",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/de/deed.de",
    changed: true,
  },
  {
    what: "Wohnhaus in Rheinberg",
    author: "Steffen Schmitz",
    source: "https://commons.wikimedia.org/wiki/File:Rheinberg,_Ossenberg,_Graf-Luitpold-Stra%C3%9Fe_6-8,_2018-04_CN-01.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.de",
    changed: true,
  },
  {
    what: "Ortsansicht Hausdülmen",
    author: "Dietmar Rabich",
    source: "https://commons.wikimedia.org/wiki/File:D%C3%BClmen,_Hausd%C3%BClmen,_Ortsansicht_--_2024_--_0023.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.de",
    changed: true,
  },
  {
    what: "Haustür in Lüneburg",
    author: "Friedrich Haag",
    source: "https://commons.wikimedia.org/wiki/File:056_2015_07_12_Auf_dem_Kauf_9.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.de",
    changed: true,
  },
] as const;

export function ImpressumContent(): JSX.Element {
  const mail = `mailto:${siteLegal.email}`;

  return (
    <>
      <LegalSection id="impressum-tmg" title="Angaben gemäß § 5 TMG">
        <p>
          <strong>{siteLegal.operatorDisplayName}</strong>
          <br />
          {siteLegal.legalFormShort} · Angebot unter der Marke {siteLegal.brandName}
          <br />
          {siteLegal.address.streetLine}
          <br />
          {siteLegal.address.postalCodeCity}
          <br />
          {siteLegal.address.country}
        </p>
        {siteLegal.vatId ? (
          <p>
            <strong>Umsatzsteuer-ID:</strong> {siteLegal.vatId}
          </p>
        ) : null}
      </LegalSection>

      <LegalSection id="impressum-kontakt" title="Kontakt">
        <p>
          <strong>E-Mail:</strong>{" "}
          <a href={mail} className="font-medium text-wertavio-slate underline">
            {siteLegal.email}
          </a>
        </p>
        {siteLegal.phone ? (
          <p>
            <strong>Telefon:</strong> {siteLegal.phone}
          </p>
        ) : null}
      </LegalSection>

      <LegalSection id="impressum-streit" title="EU-Streitbeilegung / Verbraucherstreitbeilegung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          .<br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p>
          Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection id="impressum-haftung-inhalt" title="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
          bleiben hiervon unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten
          Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte
          umgehend.
        </p>
      </LegalSection>

      <LegalSection id="impressum-haftung-links" title="Haftung für Links">
        <p>
          Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
          Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
          stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>
      </LegalSection>

      <LegalSection id="impressum-urheber" title="Urheberrecht">
        <p>
          Die von uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </LegalSection>

      <LegalSection id="impressum-bilder" title="Bildnachweise">
        <ul className="space-y-2">
          {imageCredits.map((c) => (
            <li key={c.what}>
              {c.what}: {c.author},{" "}
              <a href={c.source} target="_blank" rel="noopener noreferrer">
                Wikimedia Commons
              </a>
              ,{" "}
              <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                {c.license}
              </a>
              {c.changed ? ", zugeschnitten" : ""}
            </li>
          ))}
        </ul>
      </LegalSection>
    </>
  );
}
