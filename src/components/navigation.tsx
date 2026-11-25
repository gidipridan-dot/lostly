import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <nav aria-label="Main navigation" className={`editorial-nav sticky top-0 z-50 ${scrolled || isOpen ? 'nav-solid' : 'nav-over-photo'}`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold" aria-label="Lostly home"><MapPin className="h-5 w-5" /><span>Lostly</span></Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#learn-more" className="editorial-nav-link text-sm">Platform</a>
            <a href="#pricing" className="editorial-nav-link text-sm">Pricing</a>
          </div>
          <Button asChild variant="link" className="hidden h-auto p-0 text-current md:inline-flex"><a href="#contact">Partner with us <ArrowRight /></a></Button>
          <Button variant="ghost" size="icon" className="md:hidden text-current" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</Button>
        </div>
        {isOpen && <div id="mobile-navigation" className="border-t border-border pb-6 pt-4 md:hidden">
          <a href="#learn-more" className="editorial-nav-link block py-3" onClick={() => setIsOpen(false)}>Platform</a>
          <a href="#pricing" className="editorial-nav-link block py-3" onClick={() => setIsOpen(false)}>Pricing</a>
          <Button asChild variant="link" className="mt-4 h-auto p-0"><a href="#contact" onClick={() => setIsOpen(false)}>Partner with us <ArrowRight /></a></Button>
        </div>}
      </div>
    </nav>
  );
};
