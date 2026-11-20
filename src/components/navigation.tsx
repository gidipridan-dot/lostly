import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <MapPin className="h-5 w-5 text-foreground" />
            <span className="text-xl font-semibold text-foreground">Lostly</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#learn-more" 
              className="text-foreground/80 hover:text-foreground transition-all duration-300 font-medium tracking-tight hover:-translate-y-0.5"
            >
              Platform
            </a>
            <a 
              href="#pricing" 
              className="text-foreground/80 hover:text-foreground transition-all duration-300 font-medium tracking-tight hover:-translate-y-0.5"
            >
              Pricing
            </a>
            <a 
              href="#contact" 
              className="text-foreground/80 hover:text-foreground transition-all duration-300 font-medium tracking-tight hover:-translate-y-0.5"
            >
              Partner With Us
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden hover:scale-100"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* CTA Button */}
          <Button 
            variant="outline" 
            size="lg"
            className="hidden rounded-lg px-5 hover:scale-100 md:inline-flex"
            onClick={() => navigate('/festival')}
          >
            Enter the festival <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-premium animate-scale-in">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <a 
                href="#learn-more" 
                className="block text-foreground/80 hover:text-foreground transition-all duration-300 font-medium py-2 hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Platform
              </a>
              <a 
                href="#pricing" 
                className="block text-foreground/80 hover:text-foreground transition-all duration-300 font-medium py-2 hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="block text-foreground/80 hover:text-foreground transition-all duration-300 font-medium py-2 hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Partner With Us
              </a>
              <Button 
                variant="outline" 
                size="lg"
                className="mt-4 w-full rounded-lg hover:scale-100"
                onClick={() => {
                  navigate('/festival');
                  setIsOpen(false);
                }}
              >
                Enter the festival <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};