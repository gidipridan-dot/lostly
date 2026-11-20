import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Shield, Users, Zap, Tent, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import campImage from "@/assets/desert-camp.asset.json";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Premium background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Sophisticated animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-glow-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-glow-pulse delay-500" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Main content */}
          <div className={`text-center lg:text-left order-2 lg:order-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 bg-card/90 backdrop-blur-lg border border-border rounded-full px-6 py-3 mb-8 hover-lift micro-glow shadow-soft">
              <Sparkles className="w-4 h-4 text-accent animate-shimmer" />
              <span className="text-foreground font-medium tracking-tight">
                White-Label Solution for Premium Venues
              </span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            </div>
            
            {/* Premium headline */}
            <h1 className="text-display font-bold text-foreground mb-6 leading-none tracking-tighter text-balance">
              Transform Your{" "}
              <span className="text-foreground bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent font-extrabold">
                Venue's
              </span>
              <br />
              <span className="text-foreground">Lost & Found</span>
            </h1>
            
            {/* Enhanced subheadline */}
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium text-balance">
              Provide exceptional lost & found service with our white-label platform. 
              Perfect for airports, universities, festivals, and municipalities.
            </p>
            
            {/* Premium feature badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {[
                { icon: MapPin, text: "Zero Development", color: "bg-card/90 backdrop-blur-lg border border-accent/30 text-accent shadow-soft" },
                { icon: Shield, text: "Enterprise Security", color: "bg-card/90 backdrop-blur-lg border border-primary/30 text-foreground shadow-soft" },
                { icon: Zap, text: "Instant ROI", color: "bg-card/90 backdrop-blur-lg border border-accent/30 text-accent shadow-soft" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 ${feature.color} rounded-full px-4 py-2 hover-lift micro-bounce`}
                >
                  <feature.icon className="w-4 h-4" />
                  <span className="font-medium text-sm tracking-tight">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full sm:w-auto min-w-48 text-lg font-semibold px-8 py-4 h-auto micro-glow"
                onClick={() => navigate('/festival')}
              >
                <Sparkles className="w-5 h-5" />
                View Festival Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto min-w-48 text-lg font-medium px-8 py-4 h-auto border-2 border-foreground/20 hover:border-foreground text-foreground hover:bg-foreground hover:text-background"
                onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Calculate ROI
              </Button>
            </div>
            
            {/* Premium trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 opacity-70">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium text-sm tracking-tight">Venue-First Design</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium text-sm tracking-tight">Enterprise Security</span>
              </div>
            </div>
          </div>

          {/* Premium demo preview */}
          <div className={`relative order-1 lg:order-2 mb-8 lg:mb-0 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative max-w-sm lg:max-w-md mx-auto">
              {/* Enhanced preview card */}
              <Card className="bg-card/95 backdrop-blur-xl border border-border shadow-premium hover:shadow-elegant transition-all duration-500 hover-lift micro-glow group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Tent className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg heading-premium">Lostly at MidBurn</h3>
                  </div>
                  
                  <img src={campImage.url} alt="Lostly camp at the desert festival" className="aspect-[4/3] w-full rounded-lg object-cover" />
                  <p className="mt-4 text-lg font-semibold text-foreground">Lost in the dust? We’re with you.</p>
                  <p className="mt-2 text-xs text-muted-foreground">Illustrative MidBurn experience · No real reports</p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 micro-bounce font-medium bg-background text-foreground border-2 border-foreground/20 hover:bg-foreground hover:text-background"
                    onClick={() => navigate('/festival')}
                  >
                    View Festival Demo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Premium floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full animate-glow-pulse backdrop-blur-sm" />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-primary/20 rounded-full animate-glow-pulse backdrop-blur-sm delay-700" />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-accent/30 rounded-full animate-glow-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};