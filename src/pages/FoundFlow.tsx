import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategorySelect } from '@/components/category-select';
import { CameraCapture } from '@/components/camera-capture';
import { LocationSelect } from '@/components/location-select';
import { useNavigate } from 'react-router-dom';

type Step = 'camera' | 'category' | 'manual-category' | 'location' | 'submitted';

export default function FoundFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('camera');
  const [capturedPhoto, setCapturedPhoto] = useState<string>('');
  const [detectedCategory, setDetectedCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const navigate = useNavigate();

  const handlePhotoCapture = (photoUrl: string) => {
    setCapturedPhoto(photoUrl);
    
    // Simulate AI detection
    setTimeout(() => {
      const categories = ['Keys', 'Phone', 'Wallet', 'Headphones', 'Passport'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setDetectedCategory(randomCategory);
      setCurrentStep('category');
    }, 1500);
  };

  const handleCategoryConfirm = () => {
    setTimeout(() => setCurrentStep('location'), 200);
  };

  const handleManualCategorySelect = (category: string) => {
    setDetectedCategory(category);
    setTimeout(() => setCurrentStep('location'), 200);
  };

  const handleLocationConfirm = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setCurrentStep('submitted');
    setTimeout(() => navigate('/'), 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'camera':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Found Something?</h1>
              <p className="text-muted-foreground text-lg">Snap a quick photo to get started</p>
            </div>
            <CameraCapture onCapture={handlePhotoCapture} />
          </div>
        );

      case 'category':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">AI Detection</h1>
              <p className="text-muted-foreground text-lg">We think this is a <strong>{detectedCategory}</strong></p>
            </div>
            
            <Card className="p-6 border-0 bg-card/70 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <img
                  src={capturedPhoto}
                  alt="Found item"
                  className="w-32 h-32 object-cover rounded-lg mx-auto shadow-lg"
                />
                <div className="space-y-3">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-lg font-semibold text-foreground">Detected: {detectedCategory}</p>
                    <p className="text-sm text-muted-foreground">AI confidence: 94%</p>
                  </div>
                  
                  <Button
                    onClick={handleCategoryConfirm}
                    size="lg"
                    className="w-full hover-scale bg-gradient-to-r from-primary to-primary/80"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Looks Right
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('manual-category')}
                    className="w-full"
                  >
                    Pick Different Category
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'manual-category':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Pick Category</h1>
              <p className="text-muted-foreground text-lg">What type of item did you find?</p>
            </div>
            <CategorySelect onSelect={handleManualCategorySelect} />
          </div>
        );

      case 'location':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Where did you find it?</h1>
              <p className="text-muted-foreground text-lg">Help the owner know where you found their {detectedCategory.toLowerCase()}</p>
            </div>
            <LocationSelect onConfirm={handleLocationConfirm} />
          </div>
        );

      case 'submitted':
        return (
          <div className="animate-scale-in text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Amazing!</h1>
            <p className="text-muted-foreground text-lg mb-8">Your good deed is recorded. We'll match this with someone looking for their {detectedCategory.toLowerCase()}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Photo uploaded securely</p>
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => currentStep === 'camera' ? navigate('/') : setCurrentStep('camera')}
            className="hover-scale"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex space-x-2">
            {['camera', 'category', 'location'].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  ['camera', 'category', 'manual-category', 'location'].indexOf(currentStep) >= index
                    ? 'bg-green-500'
                    : 'bg-green-500/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            {renderStep()}
          </Card>
        </div>
      </div>
    </div>
  );
}