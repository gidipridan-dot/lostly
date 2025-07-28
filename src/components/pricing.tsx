import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Building, GraduationCap, Plane } from "lucide-react";

export const Pricing = () => {
  const pricingTiers = [
    {
      name: "Municipal",
      icon: Building,
      price: "$2,000 - $10,000",
      period: "per month",
      description: "For cities, counties, and government organizations",
      features: [
        "White-label integration into municipal apps",
        "Custom branding and domain",
        "24/7 support and monitoring",
        "Advanced analytics dashboard",
        "Multi-language support",
        "Compliance reporting",
        "Priority feature requests",
        "Dedicated account manager"
      ],
      popular: false,
      cta: "Request Municipal Demo"
    },
    {
      name: "University", 
      icon: GraduationCap,
      price: "$1,000 - $5,000",
      period: "per month",
      description: "For universities, colleges, and educational institutions",
      features: [
        "Campus app integration",
        "Student ID verification system", 
        "Academic calendar integration",
        "Campus-specific pickup locations",
        "Semester-based reporting",
        "Student privacy protections",
        "Emergency item protocols",
        "Parent notification options"
      ],
      popular: true,
      cta: "Schedule Campus Demo"
    },
    {
      name: "Enterprise",
      icon: Plane,
      price: "Custom",
      period: "pricing",
      description: "For airports, large events, and major organizations",
      features: [
        "Custom integration architecture",
        "Multi-location support",
        "Advanced fraud detection",
        "Real-time item tracking",
        "Insurance integration",
        "Custom workflow design",
        "Dedicated development team",
        "SLA guarantees"
      ],
      popular: false,
      cta: "Discuss Custom Solution"
    }
  ];

  const revenueshare = {
    title: "Revenue Share Option",
    description: "Perfect for high-volume partners who want to participate in the economic upside",
    features: [
      "No upfront monthly fees",
      "15% of premium feature revenue",
      "20% of partner marketplace transactions", 
      "Minimum revenue guarantees after 6 months",
      "Full platform access and customization",
      "Quarterly performance bonuses"
    ]
  };

  const addOns = [
    { name: "Advanced Analytics Package", price: "$500/month" },
    { name: "Custom Mobile App", price: "$2,000 setup + $300/month" },
    { name: "API Access & Webhooks", price: "$200/month" },
    { name: "Multi-language Support", price: "$150/month per language" },
    { name: "Priority Support (1-hour response)", price: "$400/month" }
  ];

  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transparent, Value-Based Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible pricing designed to fit your organization's size and needs. No hidden fees, 
            full customization included.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-gradient-card border rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 relative ${
                tier.popular ? 'border-primary shadow-strong scale-105' : 'border-border'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary px-6 py-2 rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary-foreground" />
                    <span className="text-primary-foreground font-semibold text-sm">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="bg-gradient-primary rounded-xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <tier.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-muted-foreground mb-4">{tier.description}</p>
                <div className="text-4xl font-bold text-primary mb-1">{tier.price}</div>
                <div className="text-muted-foreground">{tier.period}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.popular ? "hero" : "outline"} 
                className="w-full"
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Revenue Share Option */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 mb-16 shadow-strong">
          <div className="text-center mb-8">
            <Zap className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              {revenueshare.title}
            </h3>
            <p className="text-primary-foreground/90 text-lg max-w-3xl mx-auto">
              {revenueshare.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-4">
                {revenueshare.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-primary-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-foreground/10 rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-accent mb-2">$0</div>
                <div className="text-primary-foreground">Monthly fees</div>
              </div>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-primary-foreground"
              >
                Explore Revenue Share
              </Button>
            </div>
          </div>
        </div>

        {/* Add-Ons */}
        <div className="bg-background rounded-2xl border border-border p-8 shadow-soft">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Optional Add-Ons
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <span className="text-foreground font-medium">{addon.name}</span>
                <span className="text-primary font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-16 text-center bg-gradient-card border border-border rounded-xl p-8 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            🛡️ Risk-Free Implementation Guarantee
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not satisfied after 60 days? We'll remove the integration at no cost and refund your setup fees. 
            That's how confident we are in Lostly's value.
          </p>
        </div>
      </div>
    </section>
  );
};