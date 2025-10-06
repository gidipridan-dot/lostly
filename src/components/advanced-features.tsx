import { Button } from "@/components/ui/button";
import { Coins, Star, Shield, Gift, TrendingUp, CheckCircle, Award, Users, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export const AdvancedFeatures = () => {
  const [expandedCredits, setExpandedCredits] = useState(false);
  const [expandedPartners, setExpandedPartners] = useState(false);
  const creditFeatures = [
    {
      icon: Award,
      title: "Earn Credits",
      description: "Return items, verify matches, or help moderate",
      examples: ["5 credits per successful return", "2 credits per verified match", "1 credit per helpful review"]
    },
    {
      icon: Gift,
      title: "Redeem Benefits",
      description: "Use credits for premium features or help others",
      examples: ["Boost post visibility", "Real-time match alerts", "Donate to community causes"]
    },
    {
      icon: TrendingUp,
      title: "Gamified Goodwill",
      description: "Build reputation and community standing",
      examples: ["Leaderboards for top helpers", "Achievement badges", "Community recognition"]
    }
  ];

  const partnerFeatures = [
    {
      icon: Shield,
      title: "Verified Only",
      description: "Rigorous screening process ensures quality and safety",
      details: "Background checks, insurance verification, customer history"
    },
    {
      icon: Star,
      title: "Transparent Ratings",
      description: "Real user feedback and performance metrics",
      details: "Response time, success rate, customer satisfaction scores"
    },
    {
      icon: CheckCircle,
      title: "Certified Bundles",
      description: "Pre-packaged recovery solutions for common scenarios",
      details: "Lost passport kit, phone recovery service, key replacement bundle"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Advanced Ecosystem Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Rewards good behavior and connects people with trusted services.
          </p>
        </div>

        {/* Credit System */}
        <div className="mb-20">
          <div className="bg-primary rounded-2xl p-8 md:p-12 mb-12 text-center shadow-strong">
            <Coins className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Lostly Credit System
            </h3>
            <p className="text-primary-foreground/90 text-lg max-w-3xl mx-auto">
              Community-driven economy that rewards good deeds.
            </p>
          </div>

          <Collapsible open={expandedCredits} onOpenChange={setExpandedCredits}>
            <div className="text-center mb-8">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="bg-background text-foreground hover:bg-foreground hover:text-background border-2 border-foreground/20">
                  {expandedCredits ? 'Hide Credit Details' : 'Learn Credit System'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedCredits ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {creditFeatures.map((feature, index) => (
                  <div key={index} className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300">
                    <div className="bg-primary rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h4 className="text-2xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      {feature.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                          <span className="text-foreground text-sm">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Credit System Benefits */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-foreground mb-6 text-center">
                  Why Credits Work
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h5 className="font-semibold text-foreground mb-2">Accessibility</h5>
                    <p className="text-muted-foreground text-sm">Premium features available to helpful community members regardless of income</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h5 className="font-semibold text-foreground mb-2">Engagement</h5>
                    <p className="text-muted-foreground text-sm">Gamification drives participation and creates positive feedback loops</p>
                  </div>
                  <div className="text-center">
                    <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h5 className="font-semibold text-foreground mb-2">Community</h5>
                    <p className="text-muted-foreground text-sm">Donation system allows users to support each other and build connections</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Partner Marketplace */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Verified Partner Marketplace
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with trusted businesses for recovery solutions
            </p>
          </div>

          <Collapsible open={expandedPartners} onOpenChange={setExpandedPartners}>
            <div className="text-center mb-8">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-background text-foreground border-2 border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background">
                  {expandedPartners ? 'Hide Partner Details' : 'Explore Marketplace'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedPartners ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {partnerFeatures.map((feature, index) => (
                  <div key={index} className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300">
                    <div className="bg-primary rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h4 className="text-xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <p className="text-foreground text-sm bg-secondary/50 rounded-lg p-3">
                      {feature.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* Service Examples */}
              <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft">
                <h4 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Certified Recovery Bundles
                </h4>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <h5 className="font-semibold text-foreground mb-3">Lost Passport Kit</h5>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>• Emergency photo service</div>
                      <div>• Document notarization</div>
                      <div>• Express delivery to embassy</div>
                      <div>• Travel insurance consultation</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-primary font-semibold">From €89</span>
                      <span className="text-xs text-muted-foreground">4.9★ (127 reviews)</span>
                    </div>
                  </div>

                  <div className="bg-background rounded-xl p-6 border border-border">
                    <h5 className="font-semibold text-foreground mb-3">Phone Recovery Pro</h5>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>• Remote wipe protection</div>
                      <div>• SIM replacement service</div>
                      <div>• Data backup recovery</div>
                      <div>• Insurance claim assistance</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-primary font-semibold">From €45</span>
                      <span className="text-xs text-muted-foreground">4.8★ (203 reviews)</span>
                    </div>
                  </div>

                  <div className="bg-background rounded-xl p-6 border border-border">
                    <h5 className="font-semibold text-foreground mb-3">Key Master Bundle</h5>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>• 24/7 locksmith network</div>
                      <div>• Key cutting & duplication</div>
                      <div>• Security consultation</div>
                      <div>• Emergency lock changes</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-primary font-semibold">From €65</span>
                      <span className="text-xs text-muted-foreground">4.7★ (156 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Economic Impact */}
        <div className="mt-16 bg-primary rounded-2xl p-8 text-center shadow-strong">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Sustainable Revenue Ecosystem
          </h3>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-foreground mb-2">15%</div>
              <div className="text-primary-foreground text-sm">Platform fee on services</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-foreground mb-2">€2-5</div>
              <div className="text-primary-foreground text-sm">Premium feature pricing</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-foreground mb-2">€500+</div>
              <div className="text-primary-foreground text-sm">Average partner revenue</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-foreground mb-2">3x</div>
              <div className="text-primary-foreground text-sm">Partner business growth</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="hero" 
            size="lg" 
            className="mr-4"
            onClick={() => {
              const element = document.getElementById('partnership-cta');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Partnership Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};