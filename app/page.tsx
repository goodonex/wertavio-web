import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MaklerProfilSection } from "@/components/sections/MaklerProfilSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { NetworkCredentialsSection } from "@/components/sections/NetworkCredentialsSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StakeSection } from "@/components/sections/StakeSection";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { PortalComparisonSection } from "@/components/sections/PortalComparisonSection";
import { Reviews } from "@/components/sections/Reviews";
import { FounderSection } from "@/components/sections/FounderSection";
import { OwnerCTA } from "@/components/sections/OwnerCTA";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MaklerProfilSection />
        <TrustBar />
        <NetworkCredentialsSection />
        <div className="h-px w-full bg-wertavio-border" aria-hidden />
        <ProblemSection />
        <HowItWorks />
        <StakeSection />
        <TrustSignals />
        <PortalComparisonSection />
        <Reviews />
        <FounderSection />
        <OwnerCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
