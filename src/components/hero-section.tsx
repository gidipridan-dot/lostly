import { Button } from "@/components/ui/button";
import { MapPin, Shield, Users, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/30 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm border border-background/30 rounded-full px-4 py-2 mb-8">
            <Shield className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground text-sm font-medium">
              Trusted by Institutions & Municipalities
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Find What's Lost,
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              Return What's Found
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            The first location-based platform that makes losing something less painful 
            and finding something more rewarding. Built for safety, powered by community.
          </p>
          
          {/* Key features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground font-medium">Location-Based Matching</span>
            </div>
            <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground font-medium">Anonymous & Safe</span>
            </div>
            <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground font-medium">Real-Time Alerts</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="accent" size="lg" className="min-w-48 text-lg">
              Request Partnership
            </Button>
            <Button variant="outline" size="lg" className="min-w-48 text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Learn More
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex items-center justify-center gap-8 opacity-80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground text-sm">Institutional-First Approach</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-primary-foreground/30" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground text-sm">Privacy-Focused Design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};