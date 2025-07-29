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
            Smarter Delivery Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Skip the awkward meetups. Our shipping partnerships make returning lost items seamless, 
            secure, and completely contactless with multiple delivery options.
          </p>
        </div>

        {/* Delivery Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {deliveryFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <feature.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipping Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Our Shipping Partners</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {deliveryPartners.map((partner, index) => (
              <Card key={index} className="hover:shadow-strong transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{partner.logo}</div>
                  <CardTitle className="text-xl">{partner.name}</CardTitle>
                  <div className="flex justify-center items-center gap-2">
                    <Badge variant="secondary">{partner.reliability} reliable</Badge>
                    <Badge variant="outline">{partner.cost}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {partner.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How Delivery Works</CardTitle>
            <CardDescription>Simple, secure, and contactless item returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Match Confirmed</h4>
                <p className="text-sm text-muted-foreground">Item verified and ownership confirmed through our AI system</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Delivery Option</h4>
                <p className="text-sm text-muted-foreground">Choose shipping partner based on urgency and item value</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Auto Labels</h4>
                <p className="text-sm text-muted-foreground">Digital labels generated with secure packaging instructions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <h4 className="font-semibold mb-2">Delivered Safely</h4>
                <p className="text-sm text-muted-foreground">Real-time tracking with photo confirmation and delivery receipt</p>
              </div>
            </div>
          </CardContent>
        </Card>

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