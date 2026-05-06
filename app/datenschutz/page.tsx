import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { DatenschutzContent } from "@/components/legal/DatenschutzContent";

export const metadata: Metadata = {
  title: "Datenschutz — Wertavio",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei Wertavio.",
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage(): JSX.Element {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <DatenschutzContent />
    </LegalLayout>
  );
}
