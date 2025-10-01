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
            <div key={i} className="group bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-8 text-center space-y-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-20 bg-background/80 rounded-xl p-4 mx-auto w-fit shadow-sm">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className={`${partner.name === 'FedEx' ? 'h-20 w-32' : 'h-12 w-20'} object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                />
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
              <Button variant="outline" className="bg-background text-foreground border-2 border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background">Learn More</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader className="pb-6 border-b border-border/10">
                <DialogTitle className="text-2xl font-semibold flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  Third-Party Shipping Instead of In-Person Exchanges
                </DialogTitle>
              </DialogHeader>
              
              <div className="py-6 space-y-8">
                <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                  <p className="text-foreground/80 leading-relaxed text-base">
                    Rather than having users meet face-to-face, Lostly partners with third-party couriers 
                    like FedEx, DHL, or local post offices to facilitate secure, tracked exchanges.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-5 text-foreground flex items-center gap-2">
                      <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      Process Overview
                    </h4>
                    <div className="grid gap-4">
                      <div className="flex items-start gap-4 bg-card/50 rounded-lg p-4 border border-border/30">
                        <div className="w-8 h-8 bg-primary/15 text-primary rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Automatic Shipping Label</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">Once a match is verified, Lostly issues an automatic digital shipping slip with all necessary details.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 bg-card/50 rounded-lg p-4 border border-border/30">
                        <div className="w-8 h-8 bg-primary/15 text-primary rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Drop-off or Pickup</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">The finder drops off the item at an official location or schedules a convenient pickup service.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 bg-card/50 rounded-lg p-4 border border-border/30">
                        <div className="w-8 h-8 bg-primary/15 text-primary rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Secure Delivery</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">The item is delivered securely with full tracking capabilities and delivery confirmation.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-5 text-foreground flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500/10 rounded flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      Key Benefits
                    </h4>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 bg-green-50/50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200/30 dark:border-green-800/30">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Enhanced Safety & Convenience</span>
                      </div>
                      <div className="flex items-center gap-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200/30 dark:border-blue-800/30">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Global Reach Across Cities & Countries</span>
                      </div>
                      <div className="flex items-center gap-3 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg p-3 border border-purple-200/30 dark:border-purple-800/30">
                        <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Integrated Cost Management</span>
                      </div>
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