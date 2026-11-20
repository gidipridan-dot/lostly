import { Button } from "@/components/ui/button";
import { ArrowRight, Tent } from "lucide-react";
import { Link } from "react-router-dom";
import campImage from "@/assets/desert-camp.asset.json";

export const HeroSection = () => (
  <section className="festival-theme">
    <div className="lostly-opening relative isolate overflow-hidden">
      <img
        src={campImage.url}
        alt="The Lostly crew welcomes a traveler to camp in the desert"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="festival-scrim absolute inset-0" />
      <div className="lostly-opening-content relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-16">
        <p className="flex items-center gap-2 text-sm text-festival-ink"><Tent className="h-4 w-4" /> A little light in the dust.</p>
        <h1 className="festival-heading mt-5 text-5xl leading-none text-festival-ink sm:text-6xl">Lostly</h1>
        <p className="festival-heading mt-5 max-w-md text-3xl leading-tight text-festival-ink sm:text-4xl">Lost in the dust?<br />We’re with you.</p>
        <p className="lostly-opening-copy mt-4 max-w-sm text-base leading-relaxed text-festival-ink">A few clues. A helping hand. A path back to the things that matter.</p>
        <Button asChild size="lg" className="mt-7 rounded-lg bg-festival-light text-festival-light-foreground shadow-none hover:scale-100 hover:bg-festival-light/90">
          <Link to="/festival">Enter the festival <ArrowRight /></Link>
        </Button>
        <p className="lostly-opening-note mt-3 text-xs text-festival-ink">MidBurn concept · No real reports</p>
      </div>
    </div>
    <div className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-xs uppercase text-muted-foreground">For venues. For their people.</p>
          <h2 className="festival-heading mt-2 text-2xl text-foreground">Your venue. Your community. More reunions.</h2>
        </div>
        <Button asChild variant="link" className="h-auto self-start p-0 text-foreground hover:scale-100 sm:self-auto"><a href="#contact">Bring Lostly to your venue <ArrowRight /></a></Button>
      </div>
    </div>
  </section>
);
