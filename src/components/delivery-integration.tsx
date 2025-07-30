import { Button } from "@/components/ui/button";
import { Truck, Package } from "lucide-react";
import dhlLogo from "@/assets/dhl-logo.png";
import uberLogo from "@/assets/uber-logo.png";

const partners = [
  { name: "FedEx", rate: "99.7%", type: "Platform covered", icon: <Package className="w-8 h-8 text-primary" /> },
  { name: "DHL", rate: "99.5%", type: "Reward points", logo: dhlLogo },
  { name: "Uber", rate: "98.9%", type: "User pays", logo: uberLogo }
];

const steps = [
  { num: "1", title: "Match", desc: "AI confirms ownership" },
  { num: "2", title: "Choose", desc: "Pick delivery option" },
  { num: "3", title: "Ship", desc: "Auto labels generated" },
  { num: "4", title: "Deliver", desc: "Track & confirm" }
];

export const DeliveryIntegration = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-3">Delivery Partners</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {partners.map((partner, i) => (
            <div key={i} className="bg-card border rounded-xl p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-16">
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="h-12 object-contain"
                  />
                ) : (
                  partner.icon
                )}
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{partner.rate}</div>
                <div className="text-sm text-muted-foreground">{partner.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="text-center space-y-3">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-sm font-medium">
                {step.num}
              </div>
              <div className="font-medium">{step.title}</div>
              <div className="text-sm text-muted-foreground">{step.desc}</div>
            </div>
          ))}
        </div>

        <div className="text-center space-x-4">
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            Start Smart Delivery
          </Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
};