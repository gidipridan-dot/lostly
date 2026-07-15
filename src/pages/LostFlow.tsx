import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Camera, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategorySelect } from '@/components/category-select';
import { CameraCapture } from '@/components/camera-capture';
import { LocationSelect } from '@/components/location-select';
import { ItemDetailsForm, type ItemDetails } from '@/components/item-details-form';
import { useNavigate } from 'react-router-dom';

type Step = 'category' | 'method' | 'photo' | 'details' | 'location' | 'submitted';

export default function LostFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [capturedPhoto, setCapturedPhoto] = useState<string>('');
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [location, setLocation] = useState<string>('');
  const [reward, setReward] = useState<string>('');
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);


  // Steps for progress indicator (excluding 'method' choice screen)
  const progressSteps = ['category', 'method', 'location'];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => setCurrentStep('method'), 200);
  };

  const handlePhotoCapture = (photoUrl: string) => {
    setCapturedPhoto(photoUrl);
    setTimeout(() => setCurrentStep('location'), 200);
  };

  const handleDetailsSubmit = (details: ItemDetails) => {
    setItemDetails(details);
    setTimeout(() => setCurrentStep('location'), 200);
  };

  const handleLocationConfirm = (selectedLocation: string, rewardAmount?: string) => {
    setLocation(selectedLocation);
    if (rewardAmount) {
      setReward(rewardAmount);
    }
    setCurrentStep('submitted');
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    redirectTimeoutRef.current = setTimeout(() => navigate('/'), 3000);
  };


  const goBack = () => {
    switch (currentStep) {
      case 'category': navigate('/'); break;
      case 'method': setCurrentStep('category'); break;
      case 'photo':
      case 'details': setCurrentStep('method'); break;
      case 'location': setCurrentStep(capturedPhoto ? 'photo' : itemDetails ? 'details' : 'method'); break;
      default: navigate('/');
    }
  };

  const getProgressIndex = () => {
    if (currentStep === 'category') return 0;
    if (currentStep === 'method' || currentStep === 'photo' || currentStep === 'details') return 1;
    if (currentStep === 'location') return 2;
    return 3;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'category':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">What did you lose?</h1>
              <p className="text-muted-foreground text-lg">Pick the category to get started</p>
            </div>
            <CategorySelect onSelect={handleCategorySelect} />
          </div>
        );

      case 'method':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">How would you like to identify it?</h1>
              <p className="text-muted-foreground text-lg">Choose the method that works best for you</p>
            </div>
            <div className="space-y-4">
              <Card
                className="p-6 cursor-pointer border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                onClick={() => setCurrentStep('photo')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Upload a Photo</h3>
                    <p className="text-sm text-muted-foreground">Take or upload a photo of your item</p>
                  </div>
                </div>
              </Card>
              <Card
                className="p-6 cursor-pointer border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                onClick={() => setCurrentStep('details')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Describe the Item</h3>
                    <p className="text-sm text-muted-foreground">No photo? Provide details for smart verification</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'photo':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {selectedCategory === 'Passport' || selectedCategory === 'Other' ? 'Scan Document' : `Capture ${selectedCategory}`}
              </h1>
              <p className="text-muted-foreground text-lg">
                {selectedCategory === 'Passport' || selectedCategory === 'Other' ? 'Position document flat and scan' : `Take a clear photo of your ${selectedCategory.toLowerCase()}`}
              </p>
            </div>
            <CameraCapture onCapture={handlePhotoCapture} itemCategory={selectedCategory} />
          </div>
        );

      case 'details':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Describe your {selectedCategory}</h1>
              <p className="text-muted-foreground text-lg">
                These details will be used to verify your ownership when the item is found
              </p>
            </div>
            <ItemDetailsForm category={selectedCategory} onSubmit={handleDetailsSubmit} />
          </div>
        );

      case 'location':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Where did you lose it?</h1>
              <p className="text-muted-foreground text-lg">Help others know where to look</p>
            </div>
            <LocationSelect 
              onConfirm={handleLocationConfirm} 
              showReward={true}
            />
          </div>
        );

      case 'submitted':
        return (
          <div className="animate-scale-in text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Submitted!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              We'll notify you if someone finds your {selectedCategory.toLowerCase()}
              {reward && <span className="block mt-1 text-primary font-medium">💰 Reward offered: {reward}</span>}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {capturedPhoto && <p>✓ Photo analysis complete</p>}
              {itemDetails && <p>✓ Verification questions ready</p>}
              <p>✓ Scanning nearby found items</p>
              <p>✓ Alerts activated</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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
            {progressSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  getProgressIndex() >= index
                    ? 'bg-primary'
                    : 'bg-primary/20'
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