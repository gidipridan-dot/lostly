import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const FAQ = () => {
  const faqData = [
    {
      question: "How does Lostly integrate with our existing platform?",
      answer: "Lostly is designed as a white-label solution that embeds directly into your current app or website. Our team handles the technical integration, typically completed within 2-4 weeks. No separate app downloads required for your users."
    },
    {
      question: "What safety measures protect user privacy?",
      answer: "All communications are anonymous and encrypted end-to-end. Personal information is never shared between users. We use verified pickup locations only, real-time AI moderation, and background verification for repeat finders. Users can report and block others instantly."
    },
    {
      question: "How does the reward system work?",
      answer: "Finders can receive recognition badges, community reputation points, and optional tips from grateful owners. The system is designed to encourage good behavior while maintaining ethical standards. No payment is required to return items."
    },
    {
      question: "What's the cost for partners?",
      answer: "We offer flexible pricing based on your organization size and needs. Municipal partners typically pay $2,000-10,000/month. Universities range from $1,000-5,000/month. Revenue sharing options available for high-volume partners."
    },
    {
      question: "How long does implementation take?",
      answer: "Most integrations are complete within 2-4 weeks. This includes technical setup, custom branding, staff training, and launch support. We provide full project management and 24/7 support during rollout."
    },
    {
      question: "What happens if someone tries to claim an item that isn't theirs?",
      answer: "Our AI analyzes item descriptions, photos, and location data to verify matches. We require detailed proof of ownership and use verified pickup locations with ID checks. Fraudulent attempts are tracked and blocked automatically."
    },
    {
      question: "Can we customize the interface to match our brand?",
      answer: "Absolutely. The entire interface can be customized with your colors, fonts, logos, and messaging. Users will see it as a seamless part of your existing platform, not a third-party service."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide 24/7 technical support, dedicated account management, regular performance reports, and ongoing optimization. Our team monitors all transactions and handles any issues that arise."
    },
    {
      question: "How do you handle different types of lost items?",
      answer: "Our system categorizes items automatically and applies appropriate safety protocols. High-value items require additional verification steps. Sensitive items like IDs or medical devices get priority matching with enhanced security measures."
    },
    {
      question: "How does the match + validation process work?",
      answer: "When someone reports a lost item (like a brown bag), our AI analyzes the description and automatically matches it with found items in the system. The finder and owner don't communicate directly at first - instead, we validate the match through detailed verification questions and photo comparisons before facilitating secure contact and pickup."
    },
    {
      question: "What makes this different from existing lost & found solutions?",
      answer: "Unlike traditional lost & found, we focus on behavioral incentives and embedding within existing user bases. Our anonymous safety features, smart matching algorithms, and community reward system create a sustainable ecosystem that actually gets items returned."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about implementing Lostly for your organization
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gradient-card border border-border rounded-xl px-6 shadow-soft hover:shadow-strong transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center bg-gradient-primary rounded-2xl p-8 shadow-strong">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Still Have Questions?
          </h3>
          <p className="text-primary-foreground/90 mb-6">
            Our team is ready to discuss your specific use case and answer any technical questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground font-semibold rounded-lg hover:bg-background/90 transition-colors shadow-soft"
            >
              Schedule a Demo
            </a>
            <a 
              href="mailto:hello@lostly.io" 
              className="inline-flex items-center justify-center px-8 py-3 border border-background text-background font-semibold rounded-lg hover:bg-background/10 transition-colors"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};