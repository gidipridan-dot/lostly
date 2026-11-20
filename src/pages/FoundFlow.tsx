import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategorySelect } from '@/components/category-select';
import { CameraCapture } from '@/components/camera-capture';
import { LocationSelect } from '@/components/location-select';
import { ItemDetailsForm, type ItemDetails } from '@/components/item-details-form';
import { itemDisplayName } from '@/lib/item-naming';
import { useNavigate } from 'react-router-dom';

type Step = 'category' | 'details' | 'camera' | 'location' | 'submitted';

export default function FoundFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('category');
  const [capturedPhoto, setCapturedPhoto] = useState<string>('');
  const [detectedCategory, setDetectedCategory] = useState<string>('');
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [location, setLocation] = useState<string>('');
  const navigate = useNavigate();
  const displayName = itemDisplayName(detectedCategory, itemDetails?.itemName);

  const steps: Step[] = ['category', 'details', 'camera', 'location'];

  const handleCategorySelect = (category: string) => {
    setDetectedCategory(category);
    setTimeout(() => setCurrentStep('details'), 200);
  };

  const handleDetailsSubmit = (details: ItemDetails) => {
    setItemDetails(details);
    setTimeout(() => setCurrentStep('camera'), 200);
  };

  const handlePhotoCapture = (photoUrl: string) => {
    setCapturedPhoto(photoUrl);
    setTimeout(() => setCurrentStep('location'), 200);
  };

  const handleLocationConfirm = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setCurrentStep('submitted');
    setTimeout(() => navigate('/'), 3000);
  };

  const goBack = () => {
    const idx = steps.indexOf(currentStep);
    if (idx <= 0) navigate('/');
    else setCurrentStep(steps[idx - 1]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'category':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">What did you find?</h1>
              <p className="text-muted-foreground text-lg">Pick the category that matches</p>
            </div>
            <CategorySelect onSelect={handleCategorySelect} />
          </div>
        );

      case 'details':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Describe the {displayName.toLowerCase()}</h1>
              <p className="text-muted-foreground text-lg">
                These details help verify ownership without a photo
              </p>
            </div>
            <ItemDetailsForm category={detectedCategory} onSubmit={handleDetailsSubmit} />
          </div>
        );

      case 'camera':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {detectedCategory === 'Passport' ? 'Scan Document' : `Capture the ${displayName.toLowerCase()}`}
              </h1>
              <p className="text-muted-foreground text-lg">
                {detectedCategory === 'Passport' ? 'Position document flat and scan' : 'Take a clear photo of the item'}
              </p>
            </div>
            <CameraCapture onCapture={handlePhotoCapture} itemCategory={displayName} />
          </div>
        );

      case 'location':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Where did you find it?</h1>
              <p className="text-muted-foreground text-lg">Help the owner know where you found their {displayName.toLowerCase()}</p>
            </div>
            <LocationSelect onConfirm={handleLocationConfirm} />
          </div>
        );

      case 'submitted':
        return (
          <div className="animate-scale-in text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Amazing!</h1>

            <p className="text-muted-foreground text-lg mb-8">Your good deed is recorded. We'll match this with someone looking for their {displayName.toLowerCase()}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Photo uploaded securely</p>
              <p>✓ Verification questions generated</p>
              <p>✓ Matching with lost reports</p>
              <p>✓ Owner will be notified</p>
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-foreground">🏆 You've helped 1 person this month!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-w-lg mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="hover-scale"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  steps.indexOf(currentStep) >= index
                    ? 'bg-green-500'
                    : 'bg-green-500/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto">
          <Card className="p-6 sm:p-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            {renderStep()}
          </Card>
        </div>

      </div>
    </div>
  );
}

