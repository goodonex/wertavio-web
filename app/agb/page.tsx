import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { AgbContent } from "@/components/legal/AgbContent";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen — Wertavio",
  description: "Allgemeine Nutzungsbedingungen für die Website von Wertavio.",
  alternates: { canonical: "/agb" },
};

export default function AgbPage(): JSX.Element {
  return (
    <LegalLayout title="Allgemeine Nutzungsbedingungen">
      <AgbContent />
    </LegalLayout>
  );
}
