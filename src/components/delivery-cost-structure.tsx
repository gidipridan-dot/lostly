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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Smart Cost Management</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Multiple payment options ensure cost is never a barrier to returning lost items. 
            Earn points for good deeds and enjoy free shipping on priority items.
          </p>
        </div>

        {/* Cost Models */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {costModels.map((model, index) => (
            <Card key={index} className="relative hover:shadow-elegant transition-all duration-300">
              {model.badge && (
                <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                  {model.badge}
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <model.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-xl">{model.title}</CardTitle>
                <CardDescription>{model.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {model.scenarios.map((scenario, scenarioIndex) => (
                    <div key={scenarioIndex} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{scenario.item}</div>
                        <div className="text-xs text-muted-foreground">{scenario.coverage}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {scenario.cost}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reward System */}
        <Card className="bg-gradient-subtle">
          <CardHeader className="text-center">
            <Star className="h-12 w-12 mx-auto text-primary mb-4" />
            <CardTitle className="text-2xl">Earn Shipping Credits</CardTitle>
            <CardDescription>
              Build up points for free shipping by helping others recover their lost items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewardSystem.map((reward, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">+{reward.points}</div>
                  <div className="font-semibold text-sm mb-1">{reward.action}</div>
                  <div className="text-xs text-muted-foreground">{reward.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm">
                <strong>Pro Tip:</strong> Accumulate 200+ points to unlock free premium shipping on all future returns!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};