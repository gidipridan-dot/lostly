import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Users, Zap, Search, Package, Eye, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DemoModal } from "@/components/demo-modal";

export const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
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
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="w-5 h-5" />
                Schedule Demo
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
                    <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg heading-premium">Experience Lostly</h3>
                  </div>
                  
                  {/* Enhanced interface preview */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-4 text-white cursor-pointer hover-lift micro-bounce shadow-soft hover:shadow-strong"
                        onClick={() => navigate('/lost')}
                      >
                        <Search className="w-6 h-6 mb-2" />
                        <div className="font-semibold text-sm">Lost Item</div>
                        <div className="text-xs opacity-80">3-step recovery</div>
                      </div>
                      <div 
                        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white cursor-pointer hover-lift micro-bounce shadow-soft hover:shadow-strong"
                        onClick={() => navigate('/found')}
                      >
                        <Package className="w-6 h-6 mb-2" />
                        <div className="font-semibold text-sm">Found Item</div>
                        <div className="text-xs opacity-80">Snap & help</div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-semibold text-sm text-foreground">Recent Match</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        "Brown leather wallet found near Gate 12..."
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs font-medium">Verified</Badge>
                        <Badge variant="secondary" className="text-xs font-medium">In Transit</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 micro-bounce font-medium bg-background text-foreground border-2 border-foreground/20 hover:bg-foreground hover:text-background"
                    onClick={() => navigate('/demo')}
                  >
                    Try Interactive Demo
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
      
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};