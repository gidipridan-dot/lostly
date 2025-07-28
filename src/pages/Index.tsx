import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProblemSolution } from "@/components/problem-solution";
import { HowItWorks } from "@/components/how-it-works";
import { PartnershipCTA } from "@/components/partnership-cta";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSolution />
      <HowItWorks />
      <PartnershipCTA />
    </div>
  );
};

export default Index;
