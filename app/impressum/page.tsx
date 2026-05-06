import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { ImpressumContent } from "@/components/legal/ImpressumContent";

export const metadata: Metadata = {
  title: "Impressum — Wertavio",
  description: "Impressum und gesetzliche Anbieterkennzeichnung von Wertavio.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage(): JSX.Element {
  return (
    <LegalLayout title="Impressum">
      <ImpressumContent />
    </LegalLayout>
  );
}
