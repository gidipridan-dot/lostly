import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategorySelect } from '@/components/category-select';
import { CameraCapture } from '@/components/camera-capture';
import { LocationSelect } from '@/components/location-select';
import { useNavigate } from 'react-router-dom';

type Step = 'category' | 'photo' | 'location' | 'submitted';

export default function LostFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [capturedPhoto, setCapturedPhoto] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [reward, setReward] = useState<string>('');
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => setCurrentStep('photo'), 200);
  };

  const handlePhotoCapture = (photoUrl: string) => {
    setCapturedPhoto(photoUrl);
    setTimeout(() => setCurrentStep('location'), 200);
  };

  const handleLocationConfirm = (selectedLocation: string, rewardAmount?: string) => {
    setLocation(selectedLocation);
    if (rewardAmount) {
      setReward(rewardAmount);
    }
    setCurrentStep('submitted');
    setTimeout(() => navigate('/'), 3000);
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

      case 'photo':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Snap It</h1>
              <p className="text-muted-foreground text-lg">Take a clear photo of your {selectedCategory.toLowerCase()}</p>
            </div>
            <CameraCapture onCapture={handlePhotoCapture} />
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
              <p>✓ Photo analysis complete</p>
              <p>✓ Scanning nearby found items</p>
              <p>✓ Alerts activated</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => currentStep === 'category' ? navigate('/') : setCurrentStep('category')}
            className="hover-scale"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex space-x-2">
            {['category', 'photo', 'location'].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  ['category', 'photo', 'location'].indexOf(currentStep) >= index
                    ? 'bg-primary'
                    : 'bg-primary/20'
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