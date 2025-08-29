import { Button } from "@/components/ui/button";
import { Shield, Brain, MapPin, Users, Zap, Lock, Award, TrendingUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export const DetailedExplanation = () => {
  const [expandedFeatures, setExpandedFeatures] = useState(false);
  const [expandedSafety, setExpandedSafety] = useState(false);
  const [expandedBusiness, setExpandedBusiness] = useState(false);

  const coreFeatures = [
    {
      icon: Brain,
      title: "Smart Matching Algorithm",
      description: "AI analyzes items and locations to connect lost items with found ones.",
      details: undefined
    },
    {
      icon: Shield,
      title: "Safety-First Design", 
      description: "Anonymous interactions with moderated communications.",
      details: undefined
    }
  ];

  const allFeatures = [
    {
      icon: Brain,
      title: "Smart Matching Algorithm",
      description: "Our AI analyzes item descriptions, locations, and timing to instantly connect lost items with found ones. Machine learning improves accuracy over time.",
      details: ["Real-time location proximity matching", "Image recognition for visual confirmation", "Behavioral pattern analysis for fraud prevention"]
    },
    {
      icon: Shield,
      title: "Safety-First Design",
      description: "Every interaction is designed with safety in mind. No personal information is ever shared, and all communications are moderated.",
      details: ["Anonymous messaging system", "Verified pickup locations only", "24/7 moderation and instant reporting", "Identity verification for finders"]
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Advanced geofencing and location analytics help predict where items might be found and optimize search areas.",
      details: ["Precision location mapping", "Historical loss pattern analysis", "Smart notification radius", "Transit route tracking"]
    },
    {
      icon: Award,
      title: "Incentive System",
      description: "We've reimagined the reward system to make finding items genuinely rewarding while maintaining ethical standards.",
      details: ["Transparent reward system", "Civic recognition badges", "Community reputation scoring", "Optional tip integration"]
    }
  ];

  const safetyMeasures = [
    "End-to-end encrypted communications",
    "No personal contact information shared",
    "Verified pickup locations only",
    "Real-time moderation AI",
    "Instant reporting and blocking",
    "Background verification for repeat finders"
  ];

  const stats = [
    { number: "90%", label: "Reduction in lost item processing time" },
    { number: "3x", label: "Higher reunion success rate" },
    { number: "100%", label: "Anonymous interactions" },
    { number: "24/7", label: "AI-powered safety monitoring" }
  ];

  return (
    <section id="learn-more" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Technology Behind Lostly
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Smart matching and safety-first design for anonymous environments.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-background rounded-xl p-3 md:p-6 shadow-soft">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {(expandedFeatures ? allFeatures : coreFeatures).map((feature, index) => (
            <div key={index} className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-primary rounded-xl p-3 flex-shrink-0">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {expandedFeatures && feature.details && (
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-foreground text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More Features Button */}
        <div className="text-center mb-20">
          <Button 
            variant="outline" 
            onClick={() => setExpandedFeatures(!expandedFeatures)}
            className="flex items-center gap-2"
          >
            {expandedFeatures ? 'Show Core Features' : 'See All Features'}
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedFeatures ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Safety Deep Dive */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center shadow-strong mb-12">
          <Lock className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-primary-foreground mb-6">
            Safety-First Foundation
          </h3>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-3xl mx-auto">
            Trust through multiple layers of protection.
          </p>
          
          <Collapsible open={expandedSafety} onOpenChange={setExpandedSafety}>
            <CollapsibleTrigger asChild>
              <Button variant="secondary" className="mb-6 flex items-center gap-2">
                {expandedSafety ? 'Hide Details' : 'Safety Details'}
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSafety ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {safetyMeasures.map((measure, index) => (
                  <div key={index} className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
                    <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-primary-foreground">{measure}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Business Model Insight */}
        <div className="bg-background border border-border rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Sustainable Economics
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Direct embedding in existing ecosystems means immediate user access.
            </p>
          </div>

          <Collapsible open={expandedBusiness} onOpenChange={setExpandedBusiness}>
            <div className="text-center mb-6">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {expandedBusiness ? 'Hide Business Details' : 'Learn Business Model'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedBusiness ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">B2G Partnerships</div>
                      <div className="text-muted-foreground text-sm">Licensing to municipalities and institutions</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Premium Features</div>
                      <div className="text-muted-foreground text-sm">Enhanced visibility and matching for urgent cases</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Service Marketplace</div>
                      <div className="text-muted-foreground text-sm">Connected repair services and emergency solutions</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-xl p-8">
                  <h4 className="text-xl font-semibold text-foreground mb-4">
                    Why This Model Works
                  </h4>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm leading-relaxed">
                      <strong className="text-foreground">No cold start problem:</strong> We launch with existing user bases through partnerships.
                    </p>
                    <p className="text-sm leading-relaxed">
                      <strong className="text-foreground">Multiple revenue streams:</strong> Not dependent on advertising or subscriptions alone.
                    </p>
                    <p className="text-sm leading-relaxed">
                      <strong className="text-foreground">Network effects:</strong> More users = better matching = higher success rates.
                    </p>
                    <p className="text-sm leading-relaxed">
                      <strong className="text-foreground">Real value creation:</strong> We solve genuine problems for real people.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="mr-4">
            Become a Launch Partner
          </Button>
          <Button variant="outline" size="lg">
            Technical Documentation
          </Button>
        </div>
      </div>
    </section>
  );
};