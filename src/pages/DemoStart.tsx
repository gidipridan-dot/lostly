import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Package, ArrowLeft, ArrowRight, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import campImage from '@/assets/desert-camp.asset.json';

export default function DemoStart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <section className="festival-theme relative isolate overflow-hidden bg-background">
        <img src={campImage.url} alt="The welcoming lost and found camp at a desert festival" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="festival-scrim absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">
          <p className="mb-4 flex items-center gap-2 text-sm text-festival-ink"><Tent className="h-5 w-5" /> MIDBURN · LOST & FOUND</p>
          <h1 className="festival-heading max-w-lg text-4xl leading-tight text-festival-ink sm:text-5xl">Lost in the dust?<br />We’re with you.</h1>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-festival-ink">A camp, a crew, and a little light at the end of the tunnel.</p>
          <Button asChild size="lg" className="mt-6 rounded-lg bg-festival-light text-festival-light-foreground hover:scale-100 hover:bg-festival-light/90">
            <Link to="/festival">Enter the festival <ArrowRight /></Link>
          </Button>
          <p className="mt-3 text-xs text-festival-ink">Illustrative festival demo · No real reports</p>
          <Button asChild variant="link" className="mt-3 h-auto whitespace-normal p-0 text-festival-ink hover:scale-100"><Link to="/festival/claim">See a match notification & camp pickup <ArrowRight /></Link></Button>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 sm:py-10">
        {/* Header */}
        <div className="mx-auto flex max-w-lg items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover-scale"
            aria-label="Back to Lostly home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm text-muted-foreground">Classic Lostly experience</span>
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Experience Lostly
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose your journey to see how our platform works
            </p>
          </div>

          <div className="grid gap-6">
            {/* Lost Something */}
            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 group"
              onClick={() => navigate('/lost')}
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">I Lost Something</h3>
                  <p className="text-muted-foreground">
                    3-step recovery process: Category → Photo → Location
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Quick & secure reporting</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Found Something */}
            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 group"
              onClick={() => navigate('/found')}
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">I Found Something</h3>
                  <p className="text-muted-foreground">
                    Camera-first: Snap → AI detect → Location → Done
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">5-second good deed</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 This is an interactive demo. No real items will be reported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}