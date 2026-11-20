import { Building, MapPin, Shield, Users, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export const HowItWorks = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const steps = [
    {
      icon: Building,
      title: "White-Label Integration",
      description: "Seamlessly embed into your existing platform or app. Custom branding, no additional downloads for visitors.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: MapPin,
      title: "Smart Venue Matching", 
      description: "AI-powered matching connects lost and found items within your venue boundaries with location-specific protocols.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Admin Dashboard & Controls",
      description: "Full venue management interface with analytics, moderation tools, and compliance reporting for your staff.",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Users,
      title: "Enhanced Visitor Experience",
      description: "Automated notifications, secure meetup coordination, and optional delivery integrations—all under your brand.",
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className="py-24 bg-gradient-subtle relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="display-heading text-heading text-foreground mb-6">
            How Lostly Transforms Your Venue
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-normal text-balance">
            A behavioral shift embedded where people already are—your existing digital ecosystem
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="glass rounded-2xl p-8 shadow-soft hover:shadow-premium transition-all duration-500 relative z-10 hover-lift micro-glow group">
                <div className={`bg-gradient-to-br ${step.color} rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 heading-premium">
                    {step.title}
                  </h3>
                  <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-accent/50 transition-colors duration-300 ml-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-balance">
                  {step.description}
                </p>

                <div className="flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};