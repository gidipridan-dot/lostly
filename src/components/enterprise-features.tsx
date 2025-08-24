import { Shield, Database, Zap, Users, BarChart3, Globe, Clock, HeadphonesIcon } from "lucide-react";

export const EnterpriseFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC2 Type II compliance, GDPR ready, end-to-end encryption, and enterprise SSO integration.",
      details: ["SOC2 Type II certified", "GDPR & CCPA compliant", "Enterprise SSO (SAML/OIDC)", "End-to-end encryption"]
    },
    {
      icon: Database,
      title: "API & Integration Suite",
      description: "RESTful APIs, webhooks, and pre-built connectors for seamless integration with your existing systems.",
      details: ["RESTful API access", "Real-time webhooks", "CRM integrations", "Custom data exports"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting, predictive insights, and custom dashboards for data-driven decision making.",
      details: ["Real-time dashboards", "Predictive analytics", "Custom reports", "ROI tracking"]
    },
    {
      icon: Globe,
      title: "Multi-Location Support",
      description: "Centralized management across multiple venues, locations, or events with unified reporting.",
      details: ["Multi-venue dashboard", "Location-specific rules", "Unified reporting", "Role-based access"]
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Round-the-clock system monitoring with 99.9% uptime SLA and proactive issue resolution.",
      details: ["99.9% uptime SLA", "Proactive monitoring", "Automated alerts", "Performance optimization"]
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support",
      description: "Dedicated account manager, priority support, and custom training for your team.",
      details: ["Dedicated account manager", "Priority support queue", "Custom onboarding", "Team training sessions"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Enterprise-Grade Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for scale, security, and seamless integration with your existing infrastructure
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="bg-gradient-primary rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>

              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integration showcase */}
        <div className="mt-16 bg-gradient-card border border-border rounded-2xl p-8 shadow-soft">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Seamless Integration Ecosystem
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with your existing tools and platforms through our comprehensive integration suite
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Salesforce CRM", category: "Customer Management" },
              { name: "Microsoft Teams", category: "Communication" },
              { name: "ServiceNow", category: "Service Management" },
              { name: "Slack", category: "Team Collaboration" },
              { name: "Zendesk", category: "Support Platform" },
              { name: "HubSpot", category: "Marketing Automation" },
              { name: "Jira", category: "Project Management" },
              { name: "Power BI", category: "Business Intelligence" }
            ].map((integration, index) => (
              <div key={index} className="text-center p-4 bg-secondary/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div className="font-medium text-foreground text-sm">{integration.name}</div>
                <div className="text-muted-foreground text-xs">{integration.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};