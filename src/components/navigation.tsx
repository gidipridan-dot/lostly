import { Button } from "@/components/ui/button";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-primary rounded-lg p-2">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Lostly</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#partners" className="text-foreground hover:text-primary transition-colors">
              Partners
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* CTA Button */}
          <Button variant="default" className="hidden sm:inline-flex">
            Request Demo
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a 
                href="#how-it-works" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#partners" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Partners
              </a>
              <a 
                href="#contact" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <Button variant="default" className="w-full">
                Request Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};