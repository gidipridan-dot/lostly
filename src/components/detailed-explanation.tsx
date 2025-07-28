import { Button } from "@/components/ui/button";
import { Shield, Brain, MapPin, Users, Zap, Lock, Award, TrendingUp } from "lucide-react";

export const DetailedExplanation = () => {
  const features = [
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
            We're not just digitizing lost & found—we're completely rethinking how people connect, 
            interact, and build trust in anonymous environments.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-background rounded-xl p-6 shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {features.map((feature, index) => (
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
              
              <div className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-foreground text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Safety Deep Dive */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center shadow-strong mb-20">
          <Lock className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-primary-foreground mb-6">
            Safety Isn't an Afterthought—It's Our Foundation
          </h3>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-3xl mx-auto">
            Every feature is designed with safety-first principles. We understand that trust is the biggest barrier 
            to connecting strangers, so we've built multiple layers of protection.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {safetyMeasures.map((measure, index) => (
              <div key={index} className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
                <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground">{measure}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Model Insight */}
        <div className="bg-background border border-border rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <TrendingUp className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Sustainable Economics
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Unlike most startups that struggle with user acquisition, we embed directly into existing 
                ecosystems. This means immediate user access and proven value from day one.
              </p>
              
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