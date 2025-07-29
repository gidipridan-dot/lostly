import { Gift, CreditCard, Star, Shield } from "lucide-react";

const pricing = [
  {
    icon: Gift,
    title: "Reward Points Coverage",
    desc: "Platform covers shipping costs using accumulated reward points from successful returns",
    badge: "Most Popular",
    examples: [
      { item: "Wallet/Purse", cost: "50 points" },
      { item: "Electronics", cost: "100 points" }
    ]
  },
  {
    icon: Shield,
    title: "Platform Reimbursement", 
    desc: "We cover shipping costs for high-value items or verified good samaritans",
    badge: "Security Priority",
    examples: [
      { item: "ID Documents", cost: "$0" },
      { item: "Medical Devices", cost: "$0" }
    ]
  },
  {
    icon: CreditCard,
    title: "User Payment",
    desc: "Owner pays shipping directly for non-urgent items or when reward balance is low", 
    badge: "Flexible",
    examples: [
      { item: "Clothing Items", cost: "$5-12" },
      { item: "Books/Accessories", cost: "$3-8" }
    ]
  }
];

const rewards = [
  { action: "Report found item", points: 25 },
  { action: "Successful return", points: 50 },
  { action: "Owner verification help", points: 15 }
];

export const DeliveryCostStructure = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-3">Flexible Pricing</h2>
          <p className="text-muted-foreground">Multiple payment options. Earn points for good deeds.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricing.map((item, i) => (
            <div key={i} className="relative">
              {item.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {item.badge}
                </div>
              )}
              <div className="border rounded-lg p-6 space-y-4 h-full">
                <div className="text-center space-y-3">
                  <item.icon className="w-8 h-8 mx-auto text-primary" />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="space-y-2">
                  {item.examples.map((ex, j) => (
                    <div key={j} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                      <span>{ex.item}</span>
                      <span className="font-medium">{ex.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Earn Points</h3>
          </div>
          <p className="text-muted-foreground mb-8">Help others, earn free shipping</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {rewards.map((reward, i) => (
              <div key={i} className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-xl font-bold text-primary mb-1">+{reward.points}</div>
                <div className="text-sm">{reward.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};