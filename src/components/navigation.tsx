import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Zap, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-elegant' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 hover-lift group"
          >
            <div className={`bg-primary rounded-xl p-2.5 transition-all duration-300 group-hover:scale-110 ${
              isScrolled ? 'shadow-soft' : 'shadow-glow'
            }`}>
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground heading-premium">Lostly</span>
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
            className="md:hidden micro-bounce"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="lg"
            className="hidden sm:inline-flex micro-bounce font-semibold px-6"
            onClick={() => navigate('/demo')}
          >
            <Building className="w-4 h-4" />
            Request Demo
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
                variant="hero" 
                size="lg"
                className="w-full mt-4 micro-bounce"
                onClick={() => {
                  navigate('/demo');
                  setIsOpen(false);
                }}
              >
                <Building className="w-4 h-4" />
                Request Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};