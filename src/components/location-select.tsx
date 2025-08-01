import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface LocationSelectProps {
  onConfirm: (location: string) => void;
}

const suggestedLocations = [
  { id: 'current', label: 'Current Location', icon: Navigation, description: 'Use GPS location' },
  { id: 'office', label: 'Office Building', icon: Building, description: 'Workplace area' },
  { id: 'home', label: 'Near Home', icon: Home, description: 'Residential area' },
  { id: 'transit', label: 'Public Transit', icon: MapPin, description: 'Bus, train, subway' },
];

export const LocationSelect: React.FC<LocationSelectProps> = ({ onConfirm }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [currentLocationName, setCurrentLocationName] = useState<string>('');

  useEffect(() => {
    // Simulate getting current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this
          setCurrentLocationName('Downtown Coffee Shop, Main St');
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handleLocationSelect = (locationId: string, locationLabel: string) => {
    if (locationId === 'current') {
      setSelectedLocation(currentLocationName || 'Current Location');
    } else {
      setSelectedLocation(locationLabel);
    }
  };

  const handleConfirm = () => {
    const finalLocation = customLocation.trim() || selectedLocation;
    if (finalLocation) {
      onConfirm(finalLocation);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Location Options */}
      <div className="grid grid-cols-2 gap-3">
        {suggestedLocations.map((location) => {
          const IconComponent = location.icon;
          const isSelected = selectedLocation === location.label || 
            (location.id === 'current' && selectedLocation === currentLocationName);
          
          return (
            <Card
              key={location.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 border-0 bg-card/70 backdrop-blur-sm hover:bg-card/90 ${
                isSelected ? 'ring-2 ring-primary bg-primary/10' : ''
              }`}
              onClick={() => handleLocationSelect(location.id, location.label)}
            >
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <p className="font-medium text-sm text-foreground">{location.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{location.description}</p>
                {location.id === 'current' && currentLocationName && (
                  <p className="text-xs text-primary mt-1 truncate">{currentLocationName}</p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom Location Input */}
      <Card className="p-4 border-0 bg-card/70 backdrop-blur-sm">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Or specify exact location:</label>
          <Input
            placeholder="e.g., Central Park bench near fountain"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            className="border-0 bg-background/50"
          />
        </div>
      </Card>

      {/* Confirm Button */}
      <Button
        onClick={handleConfirm}
        disabled={!selectedLocation && !customLocation.trim()}
        size="lg"
        className="w-full hover-scale bg-gradient-to-r from-primary to-primary/80"
      >
        <MapPin className="w-5 h-5 mr-2" />
        Confirm Location
      </Button>

      {/* Privacy Note */}
      <p className="text-xs text-muted-foreground text-center">
        📍 Location helps others know where to look. We only share general area, not exact coordinates.
      </p>
    </div>
  );
};