import { siteLegal } from "@/lib/site-legal";
import { LegalSection } from "@/components/legal/LegalSection";

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
    </>
  );
}
