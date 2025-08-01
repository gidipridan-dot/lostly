import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Users, Zap, Search, Package, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DemoModal } from "@/components/demo-modal";

export const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const navigate = useNavigate();

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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">
          {/* Main content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm border border-background/30 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 mb-6 lg:mb-8">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
              <span className="text-primary-foreground text-xs lg:text-sm font-medium">
                Trusted by Institutions & Municipalities
              </span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-4 lg:mb-6 leading-tight">
              Find What's Lost,
              <br />
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Return What's Found
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
              The first location-based platform that makes losing something less painful 
              and finding something more rewarding. Built for safety, powered by community.
            </p>
            
            {/* Key features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-4 mb-8 lg:mb-12 px-4 lg:px-0">
              <div className="flex items-center gap-1.5 lg:gap-2 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
                <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
                <span className="text-primary-foreground text-xs lg:text-sm font-medium">Location-Based</span>
              </div>
              <div className="flex items-center gap-1.5 lg:gap-2 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
                <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
                <span className="text-primary-foreground text-xs lg:text-sm font-medium">Anonymous & Safe</span>
              </div>
              <div className="flex items-center gap-1.5 lg:gap-2 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
                <Zap className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
                <span className="text-primary-foreground text-xs lg:text-sm font-medium">Real-Time Alerts</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start items-center mb-8 lg:mb-12 px-4 lg:px-0">
              <Button 
                variant="accent" 
                size="lg" 
                className="w-full sm:min-w-48 text-base lg:text-lg"
                onClick={() => navigate('/found')}
              >
                Request Demo
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:min-w-48 text-base lg:text-lg"
                onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-8 opacity-80 px-4 lg:px-0">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
                <span className="text-primary-foreground text-xs lg:text-sm">Institutional-First Approach</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-primary-foreground/30" />
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
                <span className="text-primary-foreground text-xs lg:text-sm">Privacy-Focused Design</span>
              </div>
            </div>
          </div>

          {/* Demo Preview - Mobile & Desktop */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0 px-4 lg:px-0">
            <div className="relative max-w-sm lg:max-w-md mx-auto">
              {/* Preview card with demo glimpse */}
              <Card className="bg-background/95 backdrop-blur-md border-primary/20 shadow-elegant hover:shadow-strong transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Eye className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-base lg:text-lg">Experience Lostly</h3>
                  </div>
                  
                  {/* Mock interface preview */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 lg:gap-3">
                      <div 
                        className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg p-3 lg:p-4 text-white cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => navigate('/lost')}
                      >
                        <Search className="w-4 h-4 lg:w-6 lg:h-6 mb-1 lg:mb-2" />
                        <div className="text-xs lg:text-sm font-medium">I Lost Something</div>
                        <div className="text-xs opacity-80 hidden lg:block">3-step recovery</div>
                      </div>
                      <div 
                        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-3 lg:p-4 text-white cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => navigate('/found')}
                      >
                        <Package className="w-4 h-4 lg:w-6 lg:h-6 mb-1 lg:mb-2" />
                        <div className="text-xs lg:text-sm font-medium">I Found Something</div>
                        <div className="text-xs opacity-80 hidden lg:block">Snap & help</div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-2 lg:p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium">Recent Match</span>
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        "Brown leather wallet found near Central Park..."
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                        <Badge variant="secondary" className="text-xs hidden sm:inline-flex">Delivery Arranged</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3 lg:mt-4 text-xs lg:text-sm"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    Try Interactive Demo
                  </Button>
                </CardContent>
              </Card>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-6 h-6 lg:w-8 lg:h-8 bg-accent rounded-full animate-pulse opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 w-4 h-4 lg:w-6 lg:h-6 bg-primary rounded-full animate-pulse opacity-40 delay-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};