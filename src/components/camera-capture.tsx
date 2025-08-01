import React, { useRef, useState, useCallback } from 'react';
import { Camera, Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CameraCaptureProps {
  onCapture: (photoUrl: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCapture = useCallback(async () => {
    setIsCapturing(true);
    
    // Simulate camera shutter effect
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // For demo purposes, trigger file input
    fileInputRef.current?.click();
    setIsCapturing(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  }, [capturedImage, onCapture]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-6 border-0 bg-card/70 backdrop-blur-sm">
        {capturedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={capturedImage}
                alt="Captured item"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleRetake}
                className="flex-1 hover-scale"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 hover-scale bg-gradient-to-r from-primary to-primary/80"
              >
                <Camera className="w-4 h-4 mr-2" />
                Use Photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-primary/30">
              <Camera className={`w-12 h-12 text-primary transition-all duration-200 ${isCapturing ? 'animate-bounce' : ''}`} />
            </div>
            
            <Button
              onClick={handleCapture}
              size="lg"
              className={`hover-scale bg-gradient-to-r from-primary to-primary/80 transition-all duration-200 ${
                isCapturing ? 'animate-pulse' : ''
              }`}
              disabled={isCapturing}
            >
              <Camera className="w-5 h-5 mr-2" />
              {isCapturing ? 'Capturing...' : 'Take Photo'}
            </Button>
            
            <div className="mt-4">
              <Button
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                className="text-muted-foreground hover:text-foreground"
              >
                <Upload className="w-4 h-4 mr-2" />
                or upload from gallery
              </Button>
            </div>
          </div>
        )}
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};