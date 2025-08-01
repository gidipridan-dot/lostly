import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DemoStart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="absolute left-4 top-8 hover-scale"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Experience Lostly
            </h1>
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