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
import { useEffect, useRef } from "react";

const Index = () => {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = root.current?.querySelectorAll(':scope > section:not(.editorial-opening)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('section-arrived');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.02 });
    sections?.forEach((section) => { section.classList.add('editorial-section'); observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className="editorial-home min-h-screen bg-background text-foreground">
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
