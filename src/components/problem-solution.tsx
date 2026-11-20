import { AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export const ProblemSolution = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const topProblems = [
    "Visitors frustrated by lost items hurt venue reputation",
    "Staff overwhelmed managing lost & found operations"
  ];

  const allProblems = [
    "Visitors frustrated by lost items hurt venue reputation",
    "Staff overwhelmed managing lost & found operations", 
    "Manual processes are inefficient and error-prone",
    "No system to track or analytics on lost items",
    "Liability concerns with current lost & found handling"
  ];

  const topSolutions = [
    "Automated digital system reduces staff workload",
    "Happy visitors become repeat customers and advocates"
  ];

  const allSolutions = [
    "Automated digital system reduces staff workload",
    "Happy visitors become repeat customers and advocates",
    "White-label integration maintains your brand identity",
    "Analytics dashboard provides operational insights",
    "Professional liability coverage and secure processes"
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="display-heading text-4xl md:text-5xl text-foreground mb-6">
            Why Venues Need Lostly
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visitor satisfaction and operational efficiency challenges solved.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              Venue Challenges
            </h3>
            
            {(isExpanded ? allProblems : topProblems).map((problem, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background border border-border rounded-xl">
                <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0" />
                <p className="text-foreground leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>
          
          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-primary" />
              Lostly's Approach
            </h3>
            
            {(isExpanded ? allSolutions : topSolutions).map((solution, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gradient-card border border-primary/20 rounded-xl shadow-soft">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-foreground leading-relaxed">{solution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* More Info Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 bg-background text-foreground border-2 border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            {isExpanded ? 'Show Less' : 'More Details'}
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {/* Key insight callout */}
        <div className="mt-16 bg-primary rounded-2xl p-8 text-center shadow-strong">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            The Venue Advantage
          </h3>
          <p className="text-primary-foreground/90 text-lg max-w-3xl mx-auto">
            "Turn lost & found from an operational burden into a competitive advantage that enhances visitor experience."
          </p>
        </div>
      </div>
    </section>
  );
};