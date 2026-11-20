import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Truck, Package, Gift, Heart, QrCode, Check, ChevronRight, Globe, ShieldCheck, CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { VerificationQuiz } from '@/components/verification-quiz';
import { type ItemDetails } from '@/components/item-details-form';
import { useNavigate } from 'react-router-dom';

type Step = 'verify' | 'recovery' | 'reward' | 'confirm' | 'tracking';
type RecoveryMethod = 'pickup' | 'courier' | 'international' | null;
type FinderRewardPref = 'accept' | 'decline' | 'donate';

// Demo data
const demoItem = {
  category: 'Backpack',
  photo: '/placeholder.svg',
  description: 'Blue Nike backpack with a small tear on the side. Contains a red water bottle.',
  locationFound: 'Central Park, New York',
  dateFound: 'March 4, 2026',
  finderRewardPref: 'accept' as FinderRewardPref,
};

const demoItemDetails: ItemDetails = {
  itemName: '',
  color: 'Blue',
  brand: 'Nike',
  condition: 'Small tear',
  contents: ['Red water bottle'],
  uniqueMarks: ['Sticker on the back'],
  additionalNotes: '',
};

const STEPS: Step[] = ['verify', 'recovery', 'reward', 'confirm', 'tracking'];
const SERVICE_FEE = 4;

export default function RecoveryFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('verify');
  const [verified, setVerified] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState<RecoveryMethod>(null);
  const [rewardAmount, setRewardAmount] = useState<number>(0);
  const [customReward, setCustomReward] = useState('');
  const [confirmOwner, setConfirmOwner] = useState(false);
  const [confirmTerms, setConfirmTerms] = useState(false);

  const stepIndex = STEPS.indexOf(currentStep);

  const shippingCost = recoveryMethod === 'pickup' ? 0 : recoveryMethod === 'courier' ? 15 : recoveryMethod === 'international' ? 65 : 0;
  const totalCost = shippingCost + rewardAmount + (shippingCost > 0 || rewardAmount > 0 ? SERVICE_FEE : 0);

  const goBack = () => {
    if (stepIndex <= 0) navigate('/');
    else setCurrentStep(STEPS[stepIndex - 1]);
  };

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setCurrentStep(STEPS[stepIndex + 1]);
  };

  const handleVerificationResult = (passed: boolean) => {
    if (passed) {
      setVerified(true);
      setTimeout(() => goNext(), 1500);
    }
  };

  const handleRewardSelect = (amount: number) => {
    setRewardAmount(amount);
    setCustomReward('');
  };

  const handleCustomReward = (val: string) => {
    setCustomReward(val);
    const num = parseFloat(val);
    setRewardAmount(isNaN(num) || num < 0 ? 0 : Math.round(num * 100) / 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6 md:py-10 max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={goBack} className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          {currentStep !== 'tracking' && (
            <div className="flex gap-1.5 shrink-0">
              {STEPS.slice(0, -1).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i <= stepIndex ? 'w-6 sm:w-8 bg-primary' : 'w-3 sm:w-4 bg-primary/20'
                  }`}
                />
              ))}
            </div>
          )}
          <div className="w-10 shrink-0" />
        </div>


        {/* Step 1: Verification */}
        {currentStep === 'verify' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Confirm this item is yours</h1>
              <p className="text-muted-foreground">Verify ownership to start recovery</p>
            </div>

            {/* Item preview */}
            <Card className="overflow-hidden border-border">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <img src={demoItem.photo} alt={demoItem.category} className="w-20 h-20 opacity-50" />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{demoItem.category}</h3>
                  <Badge variant="outline" className="text-xs border-border">{demoItem.dateFound}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{demoItem.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  {demoItem.locationFound}
                </div>
              </div>
            </Card>

            {!verified ? (
              <VerificationQuiz
                category={demoItem.category}
                itemDetails={demoItemDetails}
                requiredCorrect={2}
                onResult={handleVerificationResult}
              />
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-foreground">Ownership Verified</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Recovery Method */}
        {currentStep === 'recovery' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">How would you like to receive your item?</h1>
              <p className="text-muted-foreground">Choose the best option for you</p>
            </div>

            <div className="space-y-3">
              {/* Local Pickup */}
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  recoveryMethod === 'pickup'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/40'
                }`}
                onClick={() => setRecoveryMethod('pickup')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Local Pickup</h3>
                      <span className="text-sm font-bold text-primary">Free</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">Pick up at the designated location</p>
                    {recoveryMethod === 'pickup' && (
                      <div className="mt-3 p-3 bg-muted rounded-lg space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Central Park Lost & Found Office</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Mon–Fri, 9:00 AM – 5:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <QrCode className="w-3.5 h-3.5" />
                          <span>QR code sent after confirmation</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Local Courier */}
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  recoveryMethod === 'courier'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/40'
                }`}
                onClick={() => setRecoveryMethod('courier')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Local Courier</h3>
                      <span className="text-sm font-bold text-foreground">€15</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">Delivered to your door in ~45 min</p>
                    {recoveryMethod === 'courier' && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg text-sm">
                          <img src="/placeholder.svg" alt="Uber" className="w-5 h-5" />
                          <span className="text-foreground">Uber Courier</span>
                          <span className="ml-auto text-muted-foreground">~45 min</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg text-sm">
                          <img src="/placeholder.svg" alt="Gett" className="w-5 h-5" />
                          <span className="text-foreground">Gett Delivery</span>
                          <span className="ml-auto text-muted-foreground">~60 min</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* International Shipping */}
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  recoveryMethod === 'international'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/40'
                }`}
                onClick={() => setRecoveryMethod('international')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">International Shipping</h3>
                      <span className="text-sm font-bold text-foreground">€65</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">3–5 business days worldwide</p>
                    {recoveryMethod === 'international' && (
                      <div className="mt-3 space-y-2">
                        {['DHL Express', 'FedEx', 'UPS'].map((carrier) => (
                          <div key={carrier} className="flex items-center gap-2 p-2 bg-muted rounded-lg text-sm">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="text-foreground">{carrier}</span>
                            <span className="ml-auto text-muted-foreground">3–5 days</span>
                          </div>
                        ))}
                        <p className="text-xs text-muted-foreground">Shipping label generated automatically</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <Button onClick={goNext} disabled={!recoveryMethod} className="w-full">
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 3: Finder Reward */}
        {currentStep === 'reward' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Say thanks to the finder</h1>
              <p className="text-muted-foreground text-sm">
                Someone took the time to report and protect your item. You may optionally reward them.
              </p>
            </div>

            {demoItem.finderRewardPref === 'decline' ? (
              <Card className="p-4 border-border text-center">
                <Heart className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">The finder has declined any reward</p>
              </Card>
            ) : demoItem.finderRewardPref === 'donate' ? (
              <Card className="p-4 border-border text-center">
                <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">The finder prefers donations to charity</p>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 20].map((amt) => (
                    <Card
                      key={amt}
                      className={`p-4 text-center cursor-pointer transition-all duration-200 ${
                        rewardAmount === amt && !customReward
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/40'
                      }`}
                      onClick={() => handleRewardSelect(amt)}
                    >
                      <span className="text-xl font-bold text-foreground">€{amt}</span>
                    </Card>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Custom amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={customReward}
                      onChange={(e) => handleCustomReward(e.target.value)}
                      className="pl-7 bg-background border-border"
                    />
                  </div>
                </div>
              </>
            )}

            {demoItem.finderRewardPref === 'accept' ? (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => { setRewardAmount(0); setCustomReward(''); goNext(); }} className="flex-1">
                  Skip reward
                </Button>
                <Button onClick={goNext} className="flex-1">
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => { setRewardAmount(0); goNext(); }} className="w-full" size="lg">
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 'confirm' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Review & Confirm</h1>
              <p className="text-muted-foreground">Check the details before proceeding</p>
            </div>

            <Card className="p-4 border-border space-y-4">
              {/* Recovery method */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {recoveryMethod === 'pickup' && <MapPin className="w-4 h-4 text-muted-foreground" />}
                  {recoveryMethod === 'courier' && <Truck className="w-4 h-4 text-muted-foreground" />}
                  {recoveryMethod === 'international' && <Globe className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-sm text-foreground">
                    {recoveryMethod === 'pickup' ? 'Local Pickup' : recoveryMethod === 'courier' ? 'Local Courier' : 'International Shipping'}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {shippingCost === 0 ? 'Free' : `€${shippingCost}`}
                </span>
              </div>

              {rewardAmount > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Finder reward</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">€{rewardAmount}</span>
                </div>
              )}

              {(shippingCost > 0 || rewardAmount > 0) && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Lostly service fee</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">€{SERVICE_FEE}</span>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">
                  {totalCost === 0 ? 'Free' : `€${totalCost}`}
                </span>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirm-owner"
                  checked={confirmOwner}
                  onCheckedChange={(v) => setConfirmOwner(v === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="confirm-owner" className="text-sm text-foreground leading-snug cursor-pointer">
                  I confirm this item belongs to me
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirm-terms"
                  checked={confirmTerms}
                  onCheckedChange={(v) => setConfirmTerms(v === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="confirm-terms" className="text-sm text-foreground leading-snug cursor-pointer">
                  I agree to Lostly terms and recovery conditions
                </Label>
              </div>
            </div>

            <Button
              onClick={goNext}
              disabled={!confirmOwner || !confirmTerms}
              className="w-full"
              size="lg"
            >
              Confirm Recovery
            </Button>
          </div>
        )}

        {/* Step 5: Tracking */}
        {currentStep === 'tracking' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Recovery in Progress</h1>
              <p className="text-muted-foreground text-sm">Your item is on its way back to you</p>
            </div>

            {recoveryMethod !== 'pickup' && (
              <Card className="p-4 border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tracking number</span>
                  <span className="text-sm font-mono font-medium text-foreground">LST-2026-X8K4M</span>
                </div>
              </Card>
            )}

            <div className="space-y-0">
              {[
                { label: 'Item found', detail: demoItem.dateFound, done: true },
                { label: 'Ownership verified', detail: 'Just now', done: true },
                { label: recoveryMethod === 'pickup' ? 'Ready for pickup' : 'Courier scheduled', detail: 'Processing', done: true },
                { label: recoveryMethod === 'pickup' ? 'Picked up' : 'Shipping in progress', detail: 'Pending', done: false },
                { label: 'Delivered', detail: '', done: false },
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      step.done ? 'bg-primary border-primary' : 'bg-background border-border'
                    }`} />
                    {i < arr.length - 1 && (
                      <div className={`w-0.5 h-10 ${step.done ? 'bg-primary' : 'bg-border'}`} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={`text-sm font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    {step.detail && (
                      <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
