import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Shield, Clock, MapPin, CheckCircle } from "lucide-react";

const deliveryPartners = [
  {
    name: "FedEx",
    logo: "📦",
    features: ["Overnight delivery", "Package tracking", "Signature required", "Insurance included"],
    cost: "Platform covered",
    reliability: "99.7%"
  },
  {
    name: "DHL",
    logo: "🚚",
    features: ["International shipping", "Express delivery", "Real-time tracking", "Secure handling"],
    cost: "Reward points",
    reliability: "99.5%"
  },
  {
    name: "Uber",
    logo: "🚗",
    features: ["Same-day delivery", "Live GPS tracking", "Direct handoff", "Photo confirmation"],
    cost: "User pays",
    reliability: "98.9%"
  }
];

const deliveryFeatures = [
  {
    icon: Package,
    title: "Automatic Digital Labels",
    description: "AI generates shipping labels with verified addresses and secure packaging instructions"
  },
  {
    icon: MapPin,
    title: "Smart Drop-off Points",
    description: "Suggests optimal pickup/drop-off locations based on both parties' convenience"
  },
  {
    icon: Shield,
    title: "Secure Verification",
    description: "Multi-step verification before shipping and delivery confirmation with photos"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Live updates for both parties with estimated delivery times and location tracking"
  }
];

export const DeliveryIntegration = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Smart Delivery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Skip meetups. Choose your delivery partner.
          </p>
        </div>

        {/* Delivery Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {deliveryFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-card/50 hover:bg-card transition-all duration-300">
              <feature.icon className="h-8 w-8 mx-auto text-primary mb-3" />
              <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Shipping Partners */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Delivery Partners</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {deliveryPartners.map((partner, index) => (
              <div key={index} className="bg-card rounded-lg p-6 text-center hover:shadow-elegant transition-all duration-300">
                <div className="text-3xl mb-3">{partner.logo}</div>
                <h4 className="font-semibold mb-2">{partner.name}</h4>
                <div className="flex justify-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{partner.reliability}</Badge>
                  <Badge variant="outline" className="text-xs">{partner.cost}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {partner.features.slice(0, 2).join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Process */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-semibold text-sm">1</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Match</h4>
            <p className="text-xs text-muted-foreground">AI confirms ownership</p>
          </div>
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-semibold text-sm">2</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Choose</h4>
            <p className="text-xs text-muted-foreground">Pick delivery option</p>
          </div>
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-semibold text-sm">3</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Ship</h4>
            <p className="text-xs text-muted-foreground">Auto labels generated</p>
          </div>
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-semibold text-sm">4</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Deliver</h4>
            <p className="text-xs text-muted-foreground">Track & confirm</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="mr-4">
            <Truck className="mr-2 h-5 w-5" />
            Start Smart Delivery
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};