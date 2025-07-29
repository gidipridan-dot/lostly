import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, CheckCircle, Smartphone, Wallet } from "lucide-react";

export const MatchVisualization = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("match-visualization");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="match-visualization" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Watch Magic Happen
          </h2>
          <p className="text-lg text-muted-foreground">
            See how Lostly connects lost items with their owners
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Match Process Visualization */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full" />
            
            {/* Lost Item Side */}
            <div className="flex justify-between items-center">
              <div className="bg-card border rounded-xl p-6 shadow-elegant hover:shadow-strong transition-all duration-500 w-80">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Lost Wallet</h3>
                    <p className="text-sm text-muted-foreground">Brown leather, contains cards</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Central Park, NYC</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>2 hours ago</span>
                  </div>
                </div>

                <Badge className={`mt-4 transition-all duration-500 ${
                  currentStep >= 2 ? 'bg-green-500/10 text-green-600 border-green-200' : 'bg-amber-500/10 text-amber-600 border-amber-200'
                }`}>
                  {currentStep >= 2 ? 'Matched!' : 'Searching...'}
                </Badge>
              </div>

              {/* Matching Animation */}
              <div className="flex-1 flex justify-center">
                <div className={`relative transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                  <div className={`w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center transition-all duration-500 ${
                    currentStep >= 1 ? 'bg-primary/10 border-primary scale-110' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full transition-all duration-500 ${
                      currentStep >= 1 ? 'bg-primary animate-pulse' : 'bg-muted-foreground/20'
                    }`} />
                  </div>
                  
                  {/* Animated matching lines */}
                  <div className={`absolute inset-0 transition-all duration-1000 ${currentStep >= 1 ? 'animate-pulse' : ''}`}>
                    <div className="absolute top-1/2 left-full w-20 h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-y-1/2" />
                    <div className="absolute top-1/2 right-full w-20 h-0.5 bg-gradient-to-l from-primary to-transparent transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Found Item Side */}
              <div className="bg-card border rounded-xl p-6 shadow-elegant hover:shadow-strong transition-all duration-500 w-80">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Found Item</h3>
                    <p className="text-sm text-muted-foreground">Wallet matching description</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Near Central Park Bench</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span>Verified finder</span>
                  </div>
                </div>

                <Badge className={`mt-4 transition-all duration-500 ${
                  currentStep >= 3 ? 'bg-blue-500/10 text-blue-600 border-blue-200' : 'bg-muted-foreground/10 text-muted-foreground border-muted'
                }`}>
                  {currentStep >= 3 ? 'Ready to ship' : 'Awaiting match'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-4">
              {['Reported', 'AI Match', 'Verified', 'Delivered'].map((step, index) => (
                <div key={index} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                  currentStep >= index ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'
                }`}>
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    currentStep >= index ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`} />
                  <span className="text-sm font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};