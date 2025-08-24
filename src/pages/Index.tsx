import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProblemSolution } from "@/components/problem-solution";
import { SocialProof } from "@/components/social-proof";
import { DetailedExplanation } from "@/components/detailed-explanation";
import { AdvancedFeatures } from "@/components/advanced-features";
import { MatchVisualization } from "@/components/match-visualization";
import { DeliveryIntegration } from "@/components/delivery-integration";
import { DeliveryCostStructure } from "@/components/delivery-cost-structure";
import { HowItWorks } from "@/components/how-it-works";
import { EnterpriseFeatures } from "@/components/enterprise-features";
import { ROICalculator } from "@/components/roi-calculator";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { LeadQualificationForm } from "@/components/lead-qualification-form";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSolution />
      <SocialProof />
      <DetailedExplanation />
      <HowItWorks />
      <EnterpriseFeatures />
      <ROICalculator />
      <AdvancedFeatures />
      <MatchVisualization />
      <DeliveryIntegration />
      <DeliveryCostStructure />
      <Pricing />
      <FAQ />
      <LeadQualificationForm />
      <Footer />
    </div>
  );
};

export default Index;
