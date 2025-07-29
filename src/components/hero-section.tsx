import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Users, Zap, Search, Package, Eye } from "lucide-react";
import { useState } from "react";
import { DemoModal } from "@/components/demo-modal";

export const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/30 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Main content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm border border-background/30 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground text-sm font-medium">
                Trusted by Institutions & Municipalities
              </span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Find What's Lost,
              <br />
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Return What's Found
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The first location-based platform that makes losing something less painful 
              and finding something more rewarding. Built for safety, powered by community.
            </p>
            
            {/* Key features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground text-sm font-medium">Location-Based Matching</span>
              </div>
              <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground text-sm font-medium">Anonymous & Safe</span>
              </div>
              <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground text-sm font-medium">Real-Time Alerts</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Button 
                variant="accent" 
                size="lg" 
                className="min-w-48 text-lg"
                onClick={() => setIsDemoOpen(true)}
              >
                Request Demo
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="min-w-48 text-lg"
                onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-8 opacity-80">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-foreground" />
                <span className="text-primary-foreground text-sm">Institutional-First Approach</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-primary-foreground/30" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-foreground" />
                <span className="text-primary-foreground text-sm">Privacy-Focused Design</span>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="hidden lg:block relative">
            <div className="relative max-w-md mx-auto">
              {/* Preview card with demo glimpse */}
              <Card className="bg-background/95 backdrop-blur-md border-primary/20 shadow-elegant hover:shadow-strong transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">Experience Lostly</h3>
                  </div>
                  
                  {/* Mock interface preview */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg p-4 text-white cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setIsDemoOpen(true)}
                      >
                        <Search className="w-6 h-6 mb-2" />
                        <div className="text-sm font-medium">I Lost Something</div>
                        <div className="text-xs opacity-80">Report & recover</div>
                      </div>
                      <div 
                        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-4 text-white cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setIsDemoOpen(true)}
                      >
                        <Package className="w-6 h-6 mb-2" />
                        <div className="text-sm font-medium">I Found Something</div>
                        <div className="text-xs opacity-80">Help reunite</div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium">Recent Match</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        "Brown leather wallet found near Central Park..."
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                        <Badge variant="secondary" className="text-xs">Delivery Arranged</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    Try Interactive Demo
                  </Button>
                </CardContent>
              </Card>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-primary rounded-full animate-pulse opacity-40 delay-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};