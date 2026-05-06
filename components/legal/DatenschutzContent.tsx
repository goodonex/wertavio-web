import { siteLegal } from "@/lib/site-legal";
import { LegalSection } from "@/components/legal/LegalSection";

const leadsEndpointNote =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_LEADS_ENDPOINT
    ? " Zusätzlich können Anfragen über eine konfigurierte Schnittstelle (NEXT_PUBLIC_LEADS_ENDPOINT) an einen von uns beauftragten Dienst übermittelt werden; dort gilt dann die jeweilige Auftragsverarbeitung durch uns."
    : "";

export function DatenschutzContent(): JSX.Element {
  const mail = `mailto:${siteLegal.email}`;

  return (
    <>
      <LegalSection id="ds-verantwortlicher" title="1. Verantwortlicher">
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          <strong>{siteLegal.operatorDisplayName}</strong>
          <br />
          {siteLegal.address.streetLine}
          <br />
          {siteLegal.address.postalCodeCity}, {siteLegal.address.country}
          <br />
          E-Mail:{" "}
          <a href={mail} className="font-medium text-wertavio-slate underline">
            {siteLegal.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection id="ds-allgemein" title="2. Allgemeines zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie
          unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung
          oder soweit eine gesetzliche Erlaubnis besteht.
        </p>
      </LegalSection>

      <LegalSection id="ds-hosting" title="3. Hosting">
        <p>
          Unser Hoster stellt die Infrastruktur zur Verfügung, auf der diese Website betrieben wird (Hosting). Hierbei
          können Zugriffsdaten verarbeitet werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an einer sicheren und schnellen Bereitstellung unseres Online-Angebots). Mit unserem Hoster werden
          — soweit erforderlich — Verträge zur Auftragsverarbeitung gem. Art. 28 DSGVO geschlossen.
        </p>
        <p>
          <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA. Informationen zu Datenschutz und
          Auftragsverarbeitung:{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            vercel.com/legal/privacy-policy
          </a>
          . Eine Übermittlung von Daten in die USA kann erfolgen; dies wird — soweit erforderlich — auf geeignete Garantien
          gestützt (insb. EU-Standardvertragsklauseln).
        </p>
      </LegalSection>

      <LegalSection id="ds-logs" title="4. Server-Logfiles / Aufruf der Website">
        <p>
          Beim Aufruf dieser Website verarbeitet der Server automatisch Informationen (z. B. Browsertyp, Datum und
          Uhrzeit, IP-Adresse). Zweck ist die technische Auslieferung der Seite, Stabilität und Sicherheit. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. f DSGVO. Logfiles werden in der Regel nach einer technisch notwendigen Dauer gelöscht
          oder anonymisiert, soweit kein gesetzlicher Aufbewahrungsgrund entgegensteht.
        </p>
      </LegalSection>

      <LegalSection id="ds-formulare" title="5. Kontakt und Formulare (Anfragen)">
        <p>
          Wenn Sie Formulare nutzen (z. B. Eigentümer-Anfrage, Partner-Anfrage, ggf. Profil-Assistent), verarbeiten wir
          die von Ihnen eingegebenen Daten (z. B. Name, Kontaktdaten, Angaben zur Immobilie/Region), um Ihre Anfrage zu
          bearbeiten und ggf. eine Vermittlung anzubahnen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Maßnahmen auf Ihre Anfrage) bzw. Art. 6 Abs. 1 lit. a DSGVO bei zusätzlichen Einwilligungen.
          {leadsEndpointNote}
        </p>
        <p>
          Wenn Anfragen technisch über serverseitige Endpunkte verarbeitet werden, können Daten vorübergehend in
          Server-Umgebungen protokolliert werden (z. B. zu Schutz vor Missbrauch/Technik). Eine darüber hinausgehende
          dauerhafte Speicherung erfolgt nur, soweit dies für die Bearbeitung erforderlich oder rechtlich nötig ist.
        </p>
      </LegalSection>

      <LegalSection id="ds-rechte" title="6. Ihre Rechte">
        <p>
          Sie haben — unter den jeweiligen gesetzlichen Voraussetzungen — das Recht auf Auskunft (Art. 15 DSGVO),
          Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
          Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Sofern eine
          Verarbeitung auf Einwilligung beruht, können Sie diese mit Wirkung für die Zukunft widerrufen.
        </p>
      </LegalSection>

      <LegalSection id="ds-beschwerde" title="7. Beschwerderecht bei einer Aufsichtsbehörde">
        <p>
          Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem
          Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen
          Verstoßes.
        </p>
        <p>
          Eine Liste der Behörden finden Sie u. a. unter:{" "}
          <a href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html" target="_blank" rel="noopener noreferrer">
            bfdi.bund.de
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="ds-cookies" title="8. Cookies / Tracking">
        <p>
          Derzeit setzen wir keine Tracking-Cookies zu Marketingzwecken ein. Soweit technisch zwingend erforderliche
          Cookies (z. B. für Sicherheits- oder Sitzungsfunktionen) genutzt werden, erfolgt dies auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO bzw. Art. 6 Abs. 1 lit. b DSGVO.
        </p>
      </LegalSection>

      <LegalSection id="ds-aenderungen" title="9. Stand">
        <p>
          Diese Hinweise können angepasst werden, wenn sich das Angebot oder die Rechtslage ändert. Bitte informieren Sie
          sich regelmäßig über den aktuellen Stand auf dieser Seite.
        </p>
      </LegalSection>
    </>
  );
}
