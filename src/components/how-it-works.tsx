import { Building, MapPin, Shield, Users } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Building,
      title: "Partner Integration",
      description: "We embed Lostly into existing municipal apps, university systems, or event platforms—no new downloads needed."
    },
    {
      icon: MapPin,
      title: "Smart Location Matching",
      description: "When someone reports a lost item, our system instantly alerts nearby users who've found similar items."
    },
    {
      icon: Shield,
      title: "Safe, Anonymous Connection",
      description: "No personal information shared. All interactions are moderated with secure pickup points for safe returns."
    },
    {
      icon: Users,
      title: "Rewarded Community",
      description: "Finders earn recognition, rewards, or tips for their good deeds, creating positive incentives for participation."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Lostly Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just another app—we're a behavioral shift embedded where people already are
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