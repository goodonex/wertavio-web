import { RETENTION_DAYS } from "@/lib/leads/retention";
import { siteLegal } from "@/lib/site-legal";
import { LegalSection } from "@/components/legal/LegalSection";

/* ENTWURF (30.10.2026): Abschnitte 3 und 5 neu für die Speicherung und Weitergabe von Anfragen. Vor dem Livegang
   anwaltlich prüfen lassen; Einwilligungstexte stehen in lib/consent.ts, Fristen in lib/leads/retention.ts. */
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
          Mit beiden Anbietern bestehen Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO. Soweit Daten in die USA
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
          <strong>Weitergabe an einen Makler oder Finanzierungsberater.</strong> Mit Ihrer Einwilligung (Art. 6 Abs. 1
          lit. a DSGVO) geben wir Ihre Anfrage an einen geprüften Immobilienmakler oder Finanzierungsberater in Ihrer
          Region weiter, damit er Sie kontaktiert. Ab der Übergabe ist der Empfänger für die weitere Verarbeitung selbst
          verantwortlich; wir nennen Ihnen auf Anfrage, an wen Ihre Daten gegangen sind. Ohne diese Einwilligung können
          wir Ihnen keinen Makler vermitteln.
        </p>
        <p>
          <strong>Informationen per E-Mail (freiwillig).</strong> Nur wenn Sie zusätzlich zustimmen, darf der
          vermittelte Makler Ihnen auch nach dem ersten Gespräch Informationen zum Immobilienverkauf per E-Mail schicken
          (Art. 6 Abs. 1 lit. a DSGVO). Sie können sich jederzeit abmelden.
        </p>
        <p>
          <strong>Anfragen über Partnerseiten.</strong> Anfragen können auch über Seiten unserer Partner zu uns kommen
          (z. B. ein Räumungsdienst, wenn Sie angeben, die Immobilie danach verkaufen zu wollen). Die Einwilligung zur
          Weitergabe holt dann die Partnerseite ein; für die Speicherung und Weitergabe bei uns gilt dasselbe wie oben.
        </p>
        <p>
          <strong>Makler-Anfragen.</strong> Wenn Sie als Makler ein Partnergespräch anfragen oder Ihre Region prüfen
          lassen, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <p>
          <strong>Speicherdauer.</strong> Nach der Übergabe an einen Makler oder Finanzierungsberater löschen wir unsere
          Kopie Ihrer Daten nach {RETENTION_DAYS.afterHandover} Tagen. Eigentümer-Anfragen, die nicht übergeben werden,
          löschen wir nach {RETENTION_DAYS.eigentuemer} Tagen, Makler-Anfragen nach {RETENTION_DAYS.makler} Tagen.
          Danach behalten wir nur Angaben ohne Personenbezug (Datum, Art der Anfrage, PLZ-Bereich, Empfänger) für
          Abrechnung und Statistik.
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
