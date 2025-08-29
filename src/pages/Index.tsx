import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProblemSolution } from "@/components/problem-solution";
import { DetailedExplanation } from "@/components/detailed-explanation";
import { AdvancedFeatures } from "@/components/advanced-features";
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
      <DetailedExplanation />
      <HowItWorks />
      <EnterpriseFeatures />
      <ROICalculator />
      <AdvancedFeatures />
      <Pricing />
      <FAQ />
      <LeadQualificationForm />
      <Footer />
    </div>
  );
};

export default Index;
