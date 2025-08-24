import { Building, MapPin, Shield, Users } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Building,
      title: "White-Label Integration",
      description: "Seamlessly embed into your existing platform or app. Custom branding, no additional downloads for visitors."
    },
    {
      icon: MapPin,
      title: "Smart Venue Matching",
      description: "AI-powered matching connects lost and found items within your venue boundaries with location-specific protocols."
    },
    {
      icon: Shield,
      title: "Admin Dashboard & Controls",
      description: "Full venue management interface with analytics, moderation tools, and compliance reporting for your staff."
    },
    {
      icon: Users,
      title: "Enhanced Visitor Experience",
      description: "Automated notifications, secure meetup coordination, and optional delivery integrations—all under your brand."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">{/* Added id for navigation */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Lostly Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A behavioral shift embedded where people already are
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary to-transparent z-0" />
              )}
              
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 relative z-10">
                <div className="bg-gradient-primary rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};