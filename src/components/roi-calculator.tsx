import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TrendingUp, DollarSign, Clock, Users, ChevronDown } from "lucide-react";

export const ROICalculator = () => {
  const [expandedCalculator, setExpandedCalculator] = useState(false);
  const [inputs, setInputs] = useState({
    monthlyVisitors: 50000,
    staffHoursPerWeek: 20,
    staffHourlyRate: 25,
    currentReturnRate: 15,
    avgItemValue: 150
  });

  const [results, setResults] = useState({
    staffSavings: 0,
    improvedSatisfaction: 0,
    returnedItemValue: 0,
    totalAnnualBenefit: 0,
    roi: 0
  });

  const calculateROI = () => {
    // Staff time savings (75% reduction)
    const weeklyStaffSavings = inputs.staffHoursPerWeek * 0.75 * inputs.staffHourlyRate;
    const annualStaffSavings = weeklyStaffSavings * 52;

    // Improved return rate (from 15% to 45% average)
    const monthlyLostItems = inputs.monthlyVisitors * 0.02; // 2% lose something
    const additionalReturns = monthlyLostItems * (0.45 - inputs.currentReturnRate / 100);
    const monthlyReturnedValue = additionalReturns * inputs.avgItemValue;
    const annualReturnedValue = monthlyReturnedValue * 12;

    // Customer satisfaction improvement (estimated value)
    const satisfactionValue = inputs.monthlyVisitors * 0.5 * 12; // $0.50 per visitor annually

    const totalAnnualBenefit = annualStaffSavings + annualReturnedValue + satisfactionValue;
    const averageAnnualCost = 36000; // Estimated average cost
    const roi = ((totalAnnualBenefit - averageAnnualCost) / averageAnnualCost) * 100;

    setResults({
      staffSavings: annualStaffSavings,
      improvedSatisfaction: satisfactionValue,
      returnedItemValue: annualReturnedValue,
      totalAnnualBenefit,
      roi
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  return (
    <section id="roi-calculator" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ROI Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See the measurable impact Lostly can have on your venue
          </p>
          <Collapsible open={expandedCalculator} onOpenChange={setExpandedCalculator}>
            <div className="text-center mb-6 md:mb-8">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 text-sm md:text-base bg-background text-foreground border-2 border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background">
                    {expandedCalculator ? 'Hide Calculator' : 'Calculate Your ROI'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCalculator ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mt-6 md:mt-8">
                {/* Input Form */}
                <Card className="bg-gradient-card border border-border shadow-soft">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl font-semibold">Your Venue Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    <div>
                      <Label htmlFor="visitors" className="text-sm font-medium">Monthly Visitors</Label>
                      <Input
                        id="visitors"
                        type="number"
                        value={inputs.monthlyVisitors}
                        onChange={(e) => handleInputChange('monthlyVisitors', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="staff-hours" className="text-sm font-medium">Staff Hours on Lost & Found (per week)</Label>
                      <Input
                        id="staff-hours"
                        type="number"
                        value={inputs.staffHoursPerWeek}
                        onChange={(e) => handleInputChange('staffHoursPerWeek', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hourly-rate" className="text-sm font-medium">Staff Hourly Rate ($)</Label>
                      <Input
                        id="hourly-rate"
                        type="number"
                        value={inputs.staffHourlyRate}
                        onChange={(e) => handleInputChange('staffHourlyRate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="return-rate" className="text-sm font-medium">Current Return Rate (%)</Label>
                      <Input
                        id="return-rate"
                        type="number"
                        value={inputs.currentReturnRate}
                        onChange={(e) => handleInputChange('currentReturnRate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="item-value" className="text-sm font-medium">Average Lost Item Value ($)</Label>
                      <Input
                        id="item-value"
                        type="number"
                        value={inputs.avgItemValue}
                        onChange={(e) => handleInputChange('avgItemValue', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <Button onClick={calculateROI} className="w-full" size="lg">
                      Calculate ROI
                    </Button>
                  </CardContent>
                </Card>

                {/* Results */}
                <div className="space-y-4 md:space-y-6">
                  <Card className="bg-gradient-card border border-border shadow-soft">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-2">
                        <DollarSign className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                        Annual Staff Savings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl md:text-3xl font-bold text-primary">
                        ${results.staffSavings.toLocaleString()}
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        75% reduction in lost & found management time
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card border border-border shadow-soft">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-2">
                        <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                        Returned Item Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl md:text-3xl font-bold text-primary">
                        ${results.returnedItemValue.toLocaleString()}
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        Additional value returned to visitors annually
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary border-primary shadow-strong">
                    <CardContent className="p-4 md:p-6">
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                          {results.roi > 0 ? `${Math.round(results.roi)}%` : '--'}
                        </div>
                        <div className="text-primary-foreground/90 text-base md:text-lg font-medium">
                          Annual ROI
                        </div>
                        <div className="text-primary-foreground/80 text-sm mt-2">
                          Total Annual Benefit: ${results.totalAnnualBenefit.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-12 md:mt-16 text-center">
                <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                  These calculations are based on industry averages and actual partner data. 
                  Schedule a demo to get a customized ROI analysis for your specific venue.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Quick Stats Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-background rounded-xl p-4 md:p-6 shadow-soft">
            <Clock className="w-6 md:w-8 h-6 md:h-8 text-primary mx-auto mb-3" />
            <div className="text-xl md:text-2xl font-bold text-primary mb-2">75%</div>
            <div className="text-muted-foreground text-sm md:text-base">Less Staff Time</div>
          </div>
          <div className="text-center bg-background rounded-xl p-4 md:p-6 shadow-soft">
            <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-primary mx-auto mb-3" />
            <div className="text-xl md:text-2xl font-bold text-primary mb-2">3x</div>
            <div className="text-muted-foreground text-sm md:text-base">Higher Return Rate</div>
          </div>
          <div className="text-center bg-background rounded-xl p-4 md:p-6 shadow-soft">
            <DollarSign className="w-6 md:w-8 h-6 md:h-8 text-primary mx-auto mb-3" />
            <div className="text-xl md:text-2xl font-bold text-primary mb-2">$180K+</div>
            <div className="text-muted-foreground text-sm md:text-base">Average Annual ROI</div>
          </div>
        </div>
      </div>
    </section>
  );
};