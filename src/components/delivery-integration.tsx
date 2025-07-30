import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Truck, Package, CheckCircle } from "lucide-react";
import fedexLogo from "@/assets/fedex-logo.png";
import dhlLogo from "@/assets/dhl-logo.png";
import uberLogo from "@/assets/uber-logo.png";

const partners = [
  { name: "FedEx", rate: "99.7", logo: fedexLogo },
  { name: "DHL", rate: "99.5", logo: dhlLogo },
  { name: "Uber", rate: "98.9", logo: uberLogo }
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
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-12 w-20 object-contain"
                />
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{partner.rate}</div>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Learn More</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Third-Party Shipping Instead of In-Person Exchanges
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Rather than having users meet face-to-face, Lostly partners with third-party couriers like FedEx, DHL, or local post offices.
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3">Process:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                      <p className="text-sm">Once a match is verified, Lostly issues an automatic digital shipping slip.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                      <p className="text-sm">The finder drops off the item at an official location (or schedules a pickup).</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                      <p className="text-sm">The item is delivered securely and tracked.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Benefits:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Safer, faster, no awkward meetings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Works across cities or countries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Shipping cost is built into the reward or reimbursed by the owner</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};