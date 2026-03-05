import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VerificationQuiz } from '@/components/verification-quiz';
import { type ItemDetails } from '@/components/item-details-form';
import { useNavigate } from 'react-router-dom';

// Demo data simulating a found item report
const demoItemDetails: ItemDetails = {
  color: 'Blue',
  brand: 'Nike',
  condition: 'Small tear',
  contents: ['Red water bottle'],
  uniqueMarks: ['Sticker on the back'],
  additionalNotes: '',
};

export default function ClaimVerification() {
  const navigate = useNavigate();
  const [result, setResult] = useState<{ passed: boolean; score: number; total: number } | null>(null);

  const handleResult = (passed: boolean, score: number, total: number) => {
    setResult({ passed, score, total });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover-scale">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-medium text-sm">Smart Verification</span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {result ? (result.passed ? 'Verified!' : 'Not a Match') : 'Verify Ownership'}
              </h1>
              <p className="text-muted-foreground text-lg">
                {result
                  ? result.passed
                    ? "You've been verified as the owner"
                    : 'The answers did not match. Please try again or contact support.'
                  : 'Answer a few questions to prove this item is yours'}
              </p>
            </div>

            <VerificationQuiz
              category="Backpack"
              itemDetails={demoItemDetails}
              requiredCorrect={2}
              onResult={handleResult}
            />

            {result && (
              <div className="mt-6">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                >
                  Back to Home
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
