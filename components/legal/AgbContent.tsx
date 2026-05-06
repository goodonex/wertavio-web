import { LegalSection } from "@/components/legal/LegalSection";
import { siteLegal } from "@/lib/site-legal";

export function AgbContent(): JSX.Element {
  return (
    <>
      <LegalSection id="agb-geltung" title="1. Geltungsbereich">
        <p>
          Diese Nutzungsbedingungen gelten für die Nutzung der Website unter {siteLegal.siteUrl} (nachfolgend
          „Website“) des Anbieters {siteLegal.operatorDisplayName} (nachfolgend „Anbieter“) im Rahmen eines rein
          informatorischen Online-Angebots sowie für die Nutzung bereitgestellter Kontakt- und Anfragefunktionen.
        </p>
      </LegalSection>

      <LegalSection id="agb-leistung" title="2. Leistungsbeschreibung">
        <p>
          Die Website dient der Information über das Angebot von {siteLegal.brandName} sowie der Aufnahme von
          Anfragen. Ein Anspruch auf erfolgreiche Vermittlung, auf eine bestimmte Bearbeitungsgeschwindigkeit oder auf
          die Zustellung an bestimmte Dritte besteht nicht. Verträge über Maklerleistungen kommen — soweit
          vorliegend — ausschließlich zwischen Ihnen und dem jeweiligen Makler bzw. Ansprechpartner zustande, nicht
          mit dem Anbieter dieser Website allein durch die Nutzung der Website oder das Absenden einer Anfrage.
        </p>
      </LegalSection>

      <LegalSection id="agb-pflichten" title="3. Pflichten der Nutzer">
        <p>
          Sie verpflichten sich, bei der Nutzung der Website geltendes Recht zu beachten, insbesondere keine
          Daten Dritter ohne Berechtigung anzugeben und keine Inhalte einzustellen, die rechtswidrig oder
          missbräuchlich sind.
        </p>
      </LegalSection>

      <LegalSection id="agb-haftung" title="4. Haftung">
        <p>
          Die Inhalte dieser Website werden mit angemessener Sorgfalt erstellt. Dennoch kann keine Gewähr für
          Vollständigkeit, Aktualität und Richtigkeit übernommen werden. Haftungsansprüche gegen den Anbieter, die sich
          auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen
          Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind
          ausgeschlossen, soweit nicht nachweislich Vorsatz oder grobe Fahrlässigkeit vorliegt.
        </p>
      </LegalSection>

      <LegalSection id="agb-links" title="5. Links">
        <p>
          Für externe Links zu Websites Dritter wird — wie im Impressum beschrieben — keine Verantwortung für deren
          Inhalte übernommen.
        </p>
      </LegalSection>

      <LegalSection id="agb-schluss" title="6. Schlussbestimmungen">
        <p>
          Sollten einzelne Regelungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen
          unberührt. Es gilt das Recht der Bundesrepublik Deutschland. Verbraucher mit gewöhnlichem Aufenthalt in einem
          anderen EU-Staat behalten zwingende Verbraucherschutzvorschriften dieses Staates vor.
        </p>
      </LegalSection>
    </>
  );
}
