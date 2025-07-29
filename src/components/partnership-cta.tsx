import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, GraduationCap, Plane, Users } from "lucide-react";

export const PartnershipCTA = () => {
  const partnerTypes = [
    {
      icon: Building2,
      title: "Municipalities",
      description: "City apps & digital services"
    },
    {
      icon: GraduationCap,
      title: "Universities",
      description: "Campus safety & student apps"
    },
    {
      icon: Plane,
      title: "Airports",
      description: "Traveler services & operations"
    },
    {
      icon: Users,
      title: "Event Organizers", 
      description: "Festivals"
    }
  ];

  return (
    <section id="partners" className="py-24 bg-background">{/* Added id for navigation */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Partner?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're seeking forward-thinking organizations to launch Lostly as a white-label service. 
            No risk, immediate value, proven concept.
          </p>
        </div>
        
        {/* Partner types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnerTypes.map((partner, index) => (
            <div key={index} className="bg-gradient-card border border-border rounded-xl p-6 text-center shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="bg-gradient-primary rounded-xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <partner.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {partner.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA Form */}
        <div id="contact" className="max-w-2xl mx-auto bg-gradient-card border border-border rounded-2xl p-8 shadow-strong">{/* Added contact id */}
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Get Early Partner Access
          </h3>
          
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input 
                placeholder="Organization Name" 
                className="bg-background border-border"
              />
              <Input 
                placeholder="Your Role/Title"
                className="bg-background border-border"
              />
            </div>
            
            <Input 
              type="email" 
              placeholder="Email Address"
              className="bg-background border-border"
            />
            
            <Input 
              placeholder="Tell us about your use case"
              className="bg-background border-border"
            />
            
            <Button variant="hero" size="lg" className="w-full">
              Request Partnership Information
            </Button>
          </form>
          
          <p className="text-muted-foreground text-sm text-center mt-4">
            We'll reach out within 24 hours to discuss integration possibilities.
          </p>
        </div>
        
        {/* Value props for partners */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">No Development Cost</h4>
            <p className="text-muted-foreground">White-label integration into your existing platform</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Immediate Value</h4>
            <p className="text-muted-foreground">Start helping your community find lost items today</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Revenue Share</h4>
            <p className="text-muted-foreground">Participate in the economic upside of success</p>
          </div>
        </div>
      </div>
    </section>
  );
};