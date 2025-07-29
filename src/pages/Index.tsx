import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProblemSolution } from "@/components/problem-solution";
import { SocialProof } from "@/components/social-proof";
import { DetailedExplanation } from "@/components/detailed-explanation";
import { AdvancedFeatures } from "@/components/advanced-features";
import { DeliveryIntegration } from "@/components/delivery-integration";
import { DeliveryCostStructure } from "@/components/delivery-cost-structure";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { PartnershipCTA } from "@/components/partnership-cta";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSolution />
      <SocialProof />
      <DetailedExplanation />
      <AdvancedFeatures />
      <DeliveryIntegration />
      <DeliveryCostStructure />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <PartnershipCTA />
      <Footer />
    </div>
  );
};

export default Index;
