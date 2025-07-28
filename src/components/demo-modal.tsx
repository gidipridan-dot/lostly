import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Camera, 
  MessageCircle, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Package,
  Smartphone,
  Wallet,
  Key,
  DollarSign
} from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DemoStep = 
  | "choose-journey"
  | "lost-report"
  | "lost-browse"
  | "lost-contact"
  | "lost-success"
  | "found-report"
  | "found-browse"
  | "found-contact"
  | "found-success";

const mockFoundItems = [
  {
    id: 1,
    type: "Wallet",
    description: "Brown leather wallet found near Central Park entrance",
    location: "Central Park, NYC",
    date: "2024-01-28",
    image: "/placeholder.svg",
    finder: "Sarah M."
  },
  {
    id: 2,
    type: "Phone",
    description: "iPhone 15 in blue case with stickers",
    location: "Coffee Bean, 5th Ave",
    date: "2024-01-27",
    image: "/placeholder.svg",
    finder: "Mike R."
  }
];

const mockLostItems = [
  {
    id: 1,
    type: "Keys",
    description: "Set of house keys with blue keychain",
    location: "Downtown Metro Station",
    date: "2024-01-28",
    owner: "Alex K."
  },
  {
    id: 2,
    type: "Backpack",
    description: "Black laptop bag with university logo",
    location: "Campus Library",
    date: "2024-01-27",
    owner: "Emma S."
  }
];

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<DemoStep>("choose-journey");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const resetDemo = () => {
    setCurrentStep("choose-journey");
    setSelectedItem(null);
  };

  const handleClose = () => {
    resetDemo();
    onClose();
  };

  const renderChooseJourney = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">✨ Experience Lostly</h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          Choose your journey to see how we reunite people with their belongings
        </p>
      </div>
      
      <div className="grid gap-4 sm:gap-6">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 active:scale-95" 
          onClick={() => setCurrentStep("lost-report")}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">😔 I Lost Something</h4>
                <p className="text-muted-foreground text-sm">
                  Report & recover your lost items quickly
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 active:scale-95" 
          onClick={() => setCurrentStep("found-report")}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">🎉 I Found Something</h4>
                <p className="text-muted-foreground text-sm">
                  Help someone reunite with their belongings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLostReport = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("choose-journey")} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold">😞 Report Lost Item</h3>
          <p className="text-muted-foreground text-sm">Tell us what you've lost</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            📦 What did you lose?
          </label>
          <Input 
            placeholder="e.g., Wallet, Phone, Keys..." 
            defaultValue="Brown leather wallet" 
            className="mt-1"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            📝 Description
          </label>
          <Textarea 
            placeholder="Describe your item in detail..." 
            defaultValue="Brown leather wallet with my driver's license and credit cards. Has a small tear on the back corner."
            className="mt-1 min-h-[80px]"
          />
        </div>
        
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              📍 Where did you lose it?
            </label>
            <Input 
              placeholder="Location..." 
              defaultValue="Central Park, near the pond" 
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              📅 When?
            </label>
            <Input 
              type="date" 
              defaultValue="2024-01-28" 
              className="mt-1"
            />
          </div>
        </div>

        {/* Reward Section */}
        <div className="border border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 rounded-lg p-4">
          <label className="text-sm font-medium flex items-center gap-2 mb-3">
            💰 Offer Reward (Optional)
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <Input 
                type="number" 
                placeholder="Amount" 
                defaultValue="25"
                className="flex-1"
              />
            </div>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">
            💡 Tip: Offering a reward increases your chances of recovery by 3x!
          </p>
        </div>
        
        <div className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center">
          <Camera className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">📸 Upload photos (optional)</p>
          <p className="text-xs text-muted-foreground mt-1">Photos help others identify your item</p>
        </div>
        
        <Button 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
          onClick={() => setCurrentStep("lost-browse")}
        >
          🚀 Submit Report & Find My Item
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderLostBrowse = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-report")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Browse Found Items</h3>
          <p className="text-muted-foreground">Great! We found some potential matches</p>
        </div>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800 dark:text-green-200">Your report has been submitted!</span>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm mt-1">
          We'll notify you if anyone reports finding your item. Meanwhile, check these recent finds:
        </p>
      </div>
      
      <div className="space-y-4">
        {mockFoundItems.map((item) => (
          <Card 
            key={item.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              item.type === "Wallet" ? "ring-2 ring-primary ring-opacity-50" : ""
            }`}
            onClick={() => {
              setSelectedItem(item);
              setCurrentStep("lost-contact");
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{item.type}</h4>
                    {item.type === "Wallet" && (
                      <Badge variant="secondary" className="text-xs">Potential Match!</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLostContact = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-browse")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Contact Finder</h3>
          <p className="text-muted-foreground">Send a secure message to the finder</p>
        </div>
      </div>
      
      {selectedItem && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarFallback>{selectedItem.finder.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{selectedItem.finder}</h4>
                <p className="text-sm text-muted-foreground">Found your {selectedItem.type.toLowerCase()}</p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm">{selectedItem.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Your message</label>
          <Textarea 
            placeholder="Introduce yourself and confirm details..."
            defaultValue="Hi! I think you found my wallet. It's brown leather with a small tear on the back corner. I lost it near Central Park yesterday around 3 PM. Can we arrange to meet?"
          />
        </div>
        
        <Button className="w-full" onClick={() => setCurrentStep("lost-success")}>
          Send Secure Message
          <MessageCircle className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          Your contact information remains private until both parties agree to meet
        </p>
      </div>
    </div>
  );

  const renderLostSuccess = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Sarah will be notified and can respond through our secure messaging system. 
          You'll receive updates via email and app notifications.
        </p>
      </div>
      
      <div className="bg-muted rounded-lg p-4 text-left">
        <h4 className="font-semibold mb-2">What happens next?</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Sarah receives your message and can verify item details</li>
          <li>• If it's a match, you can arrange a safe meeting location</li>
          <li>• Lostly provides meetup safety tips and guidelines</li>
          <li>• Once reunited, both parties can rate the experience</li>
        </ul>
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={resetDemo}>
          Try Other Journey
        </Button>
        <Button onClick={handleClose}>
          Close Demo
        </Button>
      </div>
    </div>
  );

  // Found item journey functions
  const renderFoundReport = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("choose-journey")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Report Found Item</h3>
          <p className="text-muted-foreground">Help someone get their belongings back</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">What did you find?</label>
          <Input placeholder="e.g., Phone, Keys, Bag..." defaultValue="Set of car keys" />
        </div>
        
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea 
            placeholder="Describe the item in detail..." 
            defaultValue="Set of car keys with a blue rubber keychain that says 'NYPL'. Also has what looks like house keys and a small flashlight attached."
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Where did you find it?</label>
            <Input placeholder="Location..." defaultValue="Downtown Metro Station, Platform B" />
          </div>
          <div>
            <label className="text-sm font-medium">When?</label>
            <Input type="date" defaultValue="2024-01-28" />
          </div>
        </div>
        
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Upload photos (helps with matching)</p>
        </div>
        
        <Button className="w-full" onClick={() => setCurrentStep("found-browse")}>
          Submit Found Item
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderFoundBrowse = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-report")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Check Lost Items</h3>
          <p className="text-muted-foreground">See if anyone is looking for what you found</p>
        </div>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800 dark:text-green-200">Item posted successfully!</span>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm mt-1">
          We're checking for matches. Here are recent lost item reports in your area:
        </p>
      </div>
      
      <div className="space-y-4">
        {mockLostItems.map((item) => (
          <Card 
            key={item.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              item.type === "Keys" ? "ring-2 ring-primary ring-opacity-50" : ""
            }`}
            onClick={() => {
              setSelectedItem(item);
              setCurrentStep("found-contact");
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Key className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{item.type}</h4>
                    {item.type === "Keys" && (
                      <Badge variant="secondary" className="text-xs">Potential Match!</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                    <span>by {item.owner}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFoundContact = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-browse")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Contact Owner</h3>
          <p className="text-muted-foreground">Reach out to the person who lost this item</p>
        </div>
      </div>
      
      {selectedItem && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarFallback>{selectedItem.owner.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{selectedItem.owner}</h4>
                <p className="text-sm text-muted-foreground">Lost their {selectedItem.type.toLowerCase()}</p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm">{selectedItem.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Your message</label>
          <Textarea 
            placeholder="Ask questions to verify it's their item..."
            defaultValue="Hi! I found a set of keys that might be yours. They have a blue keychain that says 'NYPL' and some house keys. Is this what you're looking for? Can you tell me more about the keychain to verify?"
          />
        </div>
        
        <Button className="w-full" onClick={() => setCurrentStep("found-success")}>
          Send Secure Message
          <MessageCircle className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          Your contact information remains private until both parties agree to meet
        </p>
      </div>
    </div>
  );

  const renderFoundSuccess = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">Great Work!</h3>
        <p className="text-muted-foreground mb-6">
          Alex will be notified about your message. You're helping someone get their keys back! 
          This is what makes communities stronger.
        </p>
      </div>
      
      <div className="bg-muted rounded-lg p-4 text-left">
        <h4 className="font-semibold mb-2">What happens next?</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Alex can respond with more details to verify ownership</li>
          <li>• If confirmed, you can arrange a convenient meetup location</li>
          <li>• Lostly suggests safe, public meeting spots</li>
          <li>• You both rate the experience and build community trust</li>
        </ul>
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={resetDemo}>
          Try Other Journey
        </Button>
        <Button onClick={handleClose}>
          Close Demo
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "choose-journey":
        return renderChooseJourney();
      case "lost-report":
        return renderLostReport();
      case "lost-browse":
        return renderLostBrowse();
      case "lost-contact":
        return renderLostContact();
      case "lost-success":
        return renderLostSuccess();
      case "found-report":
        return renderFoundReport();
      case "found-browse":
        return renderFoundBrowse();
      case "found-contact":
        return renderFoundContact();
      case "found-success":
        return renderFoundSuccess();
      default:
        return renderChooseJourney();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="text-lg sm:text-xl">🔍 Lostly Demo</DialogTitle>
        </DialogHeader>
        {renderCurrentStep()}
      </DialogContent>
    </Dialog>
  );
};