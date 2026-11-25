import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import campImage from "@/assets/desert-camp.asset.json";

export const HeroSection = () => (
  <section className="editorial-opening">
    <div className="lostly-opening relative isolate overflow-hidden">
      <img
        src={campImage.url}
        alt="The Lostly crew welcomes a traveler to camp in the desert"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="festival-scrim absolute inset-0" />
      <div className="lostly-opening-content relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-16">
        <p className="editorial-meta hero-reveal text-festival-ink">A little light in the dust.</p>
        <h1 className="display-heading hero-reveal mt-6 max-w-3xl text-festival-ink">Lost in the dust?<br />We’re with you.</h1>
        <p className="lostly-opening-copy hero-reveal mt-6 max-w-sm text-base leading-relaxed text-festival-ink">A few clues. A helping hand. A path back to the things that matter.</p>
        <Button asChild size="lg" className="editorial-cta hero-reveal mt-8 w-full shadow-none sm:w-auto">
          <Link to="/festival">Enter the festival <ArrowRight /></Link>
        </Button>
        <p className="lostly-opening-note editorial-meta mt-4 text-festival-ink">MidBurn concept · No real reports</p>
      </div>
    </div>
    <div className="editorial-trust border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border sm:grid-cols-4">
        {['For venues', 'White-label', 'Lost & found', 'Festival concept'].map((fact) => <p key={fact} className="editorial-meta px-6 py-6 text-center text-muted-foreground">{fact}</p>)}
      </div>
    </div>
    <div className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-xs uppercase text-muted-foreground">For venues. For their people.</p>
          <h2 className="display-heading mt-2 text-2xl text-foreground">Your venue. Your community. More reunions.</h2>
        </div>
        <Button asChild variant="link" className="h-auto self-start p-0 text-foreground hover:scale-100 sm:self-auto"><a href="#contact">Bring Lostly to your venue <ArrowRight /></a></Button>
      </div>
    </div>
  </section>
);
