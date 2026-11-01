import { PROOF_YEARS, RETENTION_DAYS } from "@/lib/leads/retention";
import { siteLegal } from "@/lib/site-legal";
import { LegalSection } from "@/components/legal/LegalSection";

/* Fassung nach Rechtsprüfung vom 01.11.2026. Einwilligungstexte stehen in lib/consent.ts, Fristen in
   lib/leads/retention.ts. */
export function DatenschutzContent(): JSX.Element {
  const mail = `mailto:${siteLegal.email}`;

  return (
    <>
      <LegalSection id="ds-verantwortlicher" title="1. Verantwortlicher">
        <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
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
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website
          sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach
          Einwilligung oder soweit eine gesetzliche Erlaubnis besteht.
        </p>
      </LegalSection>

      <LegalSection id="ds-hosting" title="3. Hosting und Speicherung">
        <p>
          Diese Website wird bei <strong>Netlify, Inc.</strong> (USA) betrieben. Dabei werden Zugriffsdaten verarbeitet.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und schnellen
          Bereitstellung). Informationen:{" "}
          <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">
            netlify.com/privacy
          </a>
          .
        </p>
        <p>
          Anfragen aus unseren Formularen speichern wir in einer Datenbank von <strong>Supabase, Inc.</strong> (USA) auf
          Servern in Irland (EU). Informationen:{" "}
          <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
            supabase.com/privacy
          </a>
          .
        </p>
        <p>
          Mit allen genannten Anbietern bestehen Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO. Soweit Daten in die USA
          übermittelt werden können, stützt sich dies auf den Angemessenheitsbeschluss der EU-Kommission (EU-US Data
          Privacy Framework) bzw. auf EU-Standardvertragsklauseln.
        </p>
      </LegalSection>

      <LegalSection id="ds-logs" title="4. Server-Logfiles / Aufruf der Website">
        <p>
          Beim Aufruf dieser Website verarbeitet der Server automatisch Informationen (z. B. Browsertyp, Datum und
          Uhrzeit, IP-Adresse). Zweck ist die technische Auslieferung der Seite, Stabilität und Sicherheit.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Logfiles werden in der Regel nach einer technisch notwendigen
          Dauer gelöscht oder anonymisiert, soweit kein gesetzlicher Aufbewahrungsgrund entgegensteht.
        </p>
      </LegalSection>

      <LegalSection id="ds-formulare" title="5. Anfragen über unsere Formulare">
        <p>
          <strong>Eigentümer-Anfrage.</strong> Wenn Sie einen Makler über Wertavio suchen, speichern wir Ihre Angaben
          (Name, Telefon, E-Mail, PLZ, Angaben zur Immobilie und zum Zeitrahmen). Zusammen mit Ihrer Anfrage speichern
          wir als Nachweis, wann Sie welche Einwilligung mit welchem Wortlaut erteilt haben.
        </p>
        <p>
          <strong>Weitergabe an den Partner-Makler.</strong> Wir geben Ihre Anfrage an den Partner-Makler weiter, der für
          Ihre Postleitzahl zuständig ist. Das ist die Leistung, die Sie bei uns anfordern (Art. 6 Abs. 1 lit. b DSGVO).
          Dass er Sie anruft oder anschreibt, beruht auf Ihrer ausdrücklichen Zustimmung im Formular. Gibt es in Ihrer
          Region keinen Partner, geben wir nichts weiter. Der Makler bezahlt uns für die Vermittlung und ist ab der
          Übergabe für die weitere Verarbeitung selbst verantwortlich. Mit der Anfrage übermitteln wir auch, über welche
          Seite oder Anzeige Sie zu uns gekommen sind. Auf Anfrage nennen wir Ihnen den Empfänger. Sie können Ihre
          Anfrage jederzeit per E-Mail an{" "}
          <a href={mail} className="font-medium text-wertavio-slate underline">
            {siteLegal.email}
          </a>{" "}
          zurückziehen; einen bereits benachrichtigten Makler informieren wir dann. Ohne Weitergabe können wir Sie nicht
          vermitteln.
        </p>
        <p>
          <strong>Finanzierungsberater (freiwillig).</strong> Nur wenn Sie das gesondert ankreuzen, geben wir Ihre
          Anfrage zusätzlich an einen Finanzierungsberater weiter (Art. 6 Abs. 1 lit. a DSGVO). Widerruf jederzeit mit
          Wirkung für die Zukunft.
        </p>
        <p>
          <strong>Anfragen über Räumlotse.</strong> Anfragen können auch über Räumlotse kommen, einen Räumungsdienst
          desselben Inhabers (Kevin Herrmann). Dort fragen wir ausdrücklich, ob Sie die Immobilie danach verkaufen
          möchten und Ihre Anfrage dafür an Wertavio gehen darf (Art. 6 Abs. 1 lit. a DSGVO). Danach gilt dasselbe wie
          oben.
        </p>
        <p>
          <strong>Makler-Anfragen.</strong> Wenn Sie als Makler ein Partnergespräch anfragen oder Ihre Region prüfen
          lassen, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <p>
          <strong>Speicherdauer.</strong> Nach der Übergabe an einen Makler oder Finanzierungsberater löschen wir unsere
          Kopie Ihrer Daten nach {RETENTION_DAYS.afterHandover} Tagen. Eigentümer-Anfragen, die nicht übergeben werden,
          löschen wir nach {RETENTION_DAYS.eigentuemer} Tagen, Makler-Anfragen nach {RETENTION_DAYS.makler} Tagen.
          Danach bewahren wir nur einen verkürzten Eintrag auf (Anfrage-Nummer, Datum, Art der Anfrage, erste zwei
          Ziffern der PLZ, Empfänger, Zeitpunkt und Fassung Ihrer Zustimmung). Er dient dem Nachweis Ihrer Zustimmung und
          der Abrechnung mit dem Makler (Art. 6 Abs. 1 lit. c und f DSGVO) und wird nach{" "}
          {PROOF_YEARS === 3 ? "drei" : PROOF_YEARS} Jahren gelöscht.
        </p>
        <p>
          <strong>Widerruf.</strong> Sie können erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft
          widerrufen, z. B. per E-Mail an{" "}
          <a href={mail} className="font-medium text-wertavio-slate underline">
            {siteLegal.email}
          </a>
          . Wurde Ihre Anfrage bereits übergeben, leiten wir den Widerruf an den Empfänger weiter.
        </p>
      </LegalSection>

      <LegalSection id="ds-rechte" title="6. Ihre Rechte">
        <p>
          Sie haben, unter den jeweiligen gesetzlichen Voraussetzungen, das Recht auf Auskunft (Art. 15 DSGVO),
          Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
          Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Sofern eine
          Verarbeitung auf Einwilligung beruht, können Sie diese mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          <strong>Widerspruchsrecht.</strong> Soweit wir Daten auf Grundlage berechtigter Interessen verarbeiten (Art. 6
          Abs. 1 lit. f DSGVO, z. B. Hosting, Server-Protokolle, Besucherzählung), können Sie aus Gründen, die sich aus
          Ihrer besonderen Situation ergeben, jederzeit widersprechen (Art. 21 DSGVO). Eine formlose E-Mail an{" "}
          <a href={mail} className="font-medium text-wertavio-slate underline">
            {siteLegal.email}
          </a>{" "}
          genügt.
        </p>
      </LegalSection>

      <LegalSection id="ds-beschwerde" title="7. Beschwerderecht bei einer Aufsichtsbehörde">
        <p>
          Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem
          Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen
          Verstoßes.
        </p>
        <p>
          Zuständig für uns ist der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit,
          Ludwig-Erhard-Str. 22, 20459 Hamburg.
        </p>
        <p>
          Eine Liste der Behörden finden Sie u. a. unter:{" "}
          <a
            href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html"
            target="_blank"
            rel="noopener noreferrer"
          >
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
          Diese Hinweise können angepasst werden, wenn sich das Angebot oder die Rechtslage ändert. Bitte informieren
          Sie sich regelmäßig über den aktuellen Stand auf dieser Seite.
        </p>
      </LegalSection>
    </>
  );
}
