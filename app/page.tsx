import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PortalComparisonSection } from "@/components/sections/PortalComparisonSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StakeSection } from "@/components/sections/StakeSection";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FounderSection } from "@/components/sections/FounderSection";
import { FAQ } from "@/components/sections/FAQ";
import { OwnerCTA } from "@/components/sections/OwnerCTA";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <PortalComparisonSection />
        <HowItWorks />
        <StakeSection />
        <TrustSignals />
        <FounderSection />
        <FAQ />
        <OwnerCTA />
      </main>
      <Footer />
    </>
  );
}
