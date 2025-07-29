import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Gift, CreditCard, Star } from "lucide-react";

const costModels = [
  {
    icon: Gift,
    title: "Reward Points Coverage",
    description: "Platform covers shipping costs using accumulated reward points from successful returns",
    scenarios: [
      { item: "Wallet/Purse", cost: "50 points", coverage: "Full coverage" },
      { item: "Electronics", cost: "100 points", coverage: "Full coverage" },
      { item: "Jewelry", cost: "75 points", coverage: "Full coverage" }
    ],
    badge: "Most Popular"
  },
  {
    icon: Coins,
    title: "Platform Reimbursement",
    description: "We cover shipping costs for high-value items or verified good samaritans",
    scenarios: [
      { item: "ID Documents", cost: "$0", coverage: "100% covered" },
      { item: "Medical Devices", cost: "$0", coverage: "100% covered" },
      { item: "Keys with address", cost: "$0", coverage: "100% covered" }
    ],
    badge: "Security Priority"
  },
  {
    icon: CreditCard,
    title: "User Payment",
    description: "Owner pays shipping directly for non-urgent items or when reward balance is low",
    scenarios: [
      { item: "Clothing items", cost: "$5-12", coverage: "User pays" },
      { item: "Books/Accessories", cost: "$3-8", coverage: "User pays" },
      { item: "Sports equipment", cost: "$8-15", coverage: "User pays" }
    ],
    badge: "Flexible"
  }
];

const rewardSystem = [
  { action: "Report found item", points: 25, description: "Initial good deed recognition" },
  { action: "Successful return", points: 50, description: "Verified item delivery" },
  { action: "High-value return", points: 100, description: "Items worth $500+" },
  { action: "Quick response", points: 15, description: "Response within 2 hours" }
];

export const DeliveryCostStructure = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Flexible Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multiple payment options. Earn points for good deeds.
          </p>
        </div>

        {/* Cost Models */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {costModels.map((model, index) => (
            <div key={index} className="relative bg-card rounded-lg p-6 hover:shadow-elegant transition-all duration-300">
              {model.badge && (
                <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground text-xs">
                  {model.badge}
                </Badge>
              )}
              <div className="text-center mb-4">
                <model.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-2">{model.title}</h3>
                <p className="text-sm text-muted-foreground">{model.description}</p>
              </div>
              <div className="space-y-2">
                {model.scenarios.slice(0, 2).map((scenario, scenarioIndex) => (
                  <div key={scenarioIndex} className="flex justify-between items-center text-sm">
                    <span>{scenario.item}</span>
                    <Badge variant="outline" className="text-xs">{scenario.cost}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reward System */}
        <div className="bg-gradient-subtle rounded-lg p-8 text-center">
          <Star className="h-8 w-8 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
          <p className="text-sm text-muted-foreground mb-6">Help others, earn free shipping</p>
          
          <div className="grid md:grid-cols-4 gap-4">
            {rewardSystem.map((reward, index) => (
              <div key={index} className="bg-card/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary mb-1">+{reward.points}</div>
                <div className="text-xs font-medium">{reward.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};