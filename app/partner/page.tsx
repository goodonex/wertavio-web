import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PartnerHero } from "@/components/partner/PartnerHero";
import { PartnerSteps } from "@/components/partner/PartnerSteps";
import { PartnerPricing } from "@/components/partner/PartnerPricing";
import { PartnerRegionForm } from "@/components/partner/PartnerRegionForm";

export const metadata: Metadata = {
  title: "Für Makler | Wertavio",
  description:
    "Verkäufer-Anfragen exklusiv für Ihr Büro: ein Partner pro PLZ-Gebiet, 750 € pro 30 Tage, keine umsatzabhängige Provision.",
  alternates: { canonical: "https://wertavio.de/partner" },
};

export default function PartnerPage(): JSX.Element {
  return (
    <>
      <Header audience="partner" />
      <main>
        <PartnerHero />
        <PartnerSteps />
        <PartnerPricing />

        <section id="region" className="section-y">
          <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-h2 text-wertavio-slate">Ist Ihre Region noch verfügbar?</h2>
              <p className="text-lead mt-5 max-w-[40ch]">
                Wertavio arbeitet pro PLZ-Gebiet nur mit einem Partner. Prüfen Sie jetzt, ob Ihre Zielregion noch frei
                ist.
              </p>
            </div>
            <div className="rounded-2xl border border-wertavio-border bg-wertavio-white p-6 shadow-soft sm:p-10 lg:col-span-6 lg:col-start-7">
              <PartnerRegionForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
