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
  DollarSign,
  Users,
  Shield,
  Clock,
  AlertCircle,
  Star,
  ThumbsUp
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
  | "lost-match"
  | "lost-next-steps"
  | "lost-verification"
  | "lost-success"
  | "found-report"
  | "found-browse"
  | "found-contact"
  | "found-match"
  | "found-next-steps"
  | "found-verification"
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
        
        <Button className="w-full" onClick={() => setCurrentStep("lost-match")}>
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
        
        <Button className="w-full" onClick={() => setCurrentStep("found-match")}>
          Send Secure Message
          <MessageCircle className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          Your contact information remains private until both parties agree to meet
        </p>
      </div>
    </div>
  );

  // New match and verification screens
  const renderLostMatch = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">🎉 There's a Match!</h3>
        <p className="text-muted-foreground">
          Sarah responded to your message about the wallet
        </p>
      </div>

      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">Sarah M.</h4>
              <p className="text-sm text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p className="text-sm">
              "Hi! Yes, that sounds like my wallet! It's brown leather and does have a small tear on the back corner. 
              I also have my Chase credit card and NY driver's license inside. Can we arrange to meet?"
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setCurrentStep("lost-browse")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          className="flex-1"
          onClick={() => setCurrentStep("lost-next-steps")}
        >
          What's Next?
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderLostNextSteps = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-match")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">What's Next?</h3>
          <p className="text-muted-foreground">Let's verify and arrange the handover</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 1: Verification</h4>
                <p className="text-sm text-muted-foreground">Both parties verify item details</p>
              </div>
            </div>
            <p className="text-sm">
              To ensure this is really your wallet, Sarah will ask you to verify specific details that only the true owner would know.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 2: Safe Meetup</h4>
                <p className="text-sm text-muted-foreground">Arrange meeting at secure location</p>
              </div>
            </div>
            <p className="text-sm">
              Lostly will suggest safe, public meeting spots near both of you with good lighting and security.
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 3: Complete & Rate</h4>
                <p className="text-sm text-muted-foreground">Confirm handover and build trust</p>
              </div>
            </div>
            <p className="text-sm">
              Both parties confirm the successful handover and rate the experience to build community trust.
            </p>
          </CardContent>
        </Card>
      </div>

      <Button 
        className="w-full"
        onClick={() => setCurrentStep("lost-verification")}
      >
        Start Verification Process
        <Shield className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderLostVerification = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-next-steps")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Verification Process</h3>
          <p className="text-muted-foreground">Prove the wallet is yours</p>
        </div>
      </div>

      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold">Sarah needs verification</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Answer these questions to prove the wallet is yours:
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Question 1 of 3</h4>
            <p className="text-sm mb-3">What color is your driver's license photo background?</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Blue</Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">Red</Button>
              <Button variant="outline" size="sm">Gray</Button>
              <Button variant="outline" size="sm">White</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Question 2 of 3</h4>
            <p className="text-sm mb-3">What's the last 4 digits of your Chase card?</p>
            <Input placeholder="____" disabled className="max-w-20" />
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Question 3 of 3</h4>
            <p className="text-sm mb-3">How much cash was in the wallet (approximately)?</p>
            <Input placeholder="$" disabled className="max-w-24" />
          </CardContent>
        </Card>
      </div>

      <Button 
        className="w-full"
        onClick={() => setCurrentStep("lost-success")}
      >
        Submit Verification
        <CheckCircle className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  // Found item match screens
  const renderFoundMatch = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">🎉 It's a Match!</h3>
        <p className="text-muted-foreground">
          Alex thinks you found their keys
        </p>
      </div>

      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">Alex K.</h4>
              <p className="text-sm text-muted-foreground">1 minute ago</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p className="text-sm">
              "Thank you so much! Those are definitely my keys. The blue keychain is from the NY Public Library where I work. 
              I also have my apartment keys and a small LED flashlight. Where can we meet?"
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setCurrentStep("found-browse")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          className="flex-1"
          onClick={() => setCurrentStep("found-next-steps")}
        >
          What's Next?
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderFoundNextSteps = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-match")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">What's Next?</h3>
          <p className="text-muted-foreground">Help verify and arrange the handover</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 1: Verify Ownership</h4>
                <p className="text-sm text-muted-foreground">Ask questions only the owner would know</p>
              </div>
            </div>
            <p className="text-sm">
              Before meeting, ask Alex specific questions about the keys to ensure they're the real owner.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 2: Safe Meetup</h4>
                <p className="text-sm text-muted-foreground">Meet at a secure, public location</p>
              </div>
            </div>
            <p className="text-sm">
              Lostly will suggest safe meeting spots that are convenient for both parties.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 3: Make Their Day</h4>
                <p className="text-sm text-muted-foreground">Complete the good deed</p>
              </div>
            </div>
            <p className="text-sm">
              You're about to make someone's day by returning their lost keys. Community heroes like you make the world better!
            </p>
          </CardContent>
        </Card>
      </div>

      <Button 
        className="w-full"
        onClick={() => setCurrentStep("found-verification")}
      >
        Start Verification
        <Shield className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderFoundVerification = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-next-steps")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Verify Ownership</h3>
          <p className="text-muted-foreground">Ask Alex to prove these are their keys</p>
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold">Verification Questions</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Ask these questions to make sure Alex is the real owner:
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Question 1</h4>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm mb-2">What does the keychain say?</p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
              <p className="text-sm text-green-700 dark:text-green-300">✓ "NYPL - I work at the library"</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Question 2</h4>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm mb-2">How many keys are on the ring?</p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
              <p className="text-sm text-green-700 dark:text-green-300">✓ "5 keys total - 2 apartment, 2 work, 1 mailbox"</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Question 3</h4>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm mb-2">What else is attached to the keys?</p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
              <p className="text-sm text-green-700 dark:text-green-300">✓ "A small LED flashlight for emergencies"</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-green-800 dark:text-green-200">Verification Complete!</h4>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          Alex correctly answered all questions. These are definitely their keys!
        </p>
      </div>

      <Button 
        className="w-full"
        onClick={() => setCurrentStep("found-success")}
      >
        Arrange Meetup
        <MapPin className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderFoundSuccess = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">You're a Hero! 🦸‍♀️</h3>
        <p className="text-muted-foreground mb-6">
          Meetup arranged for tomorrow at 2 PM at Central Café. 
          Alex is so grateful - you've just made their week!
        </p>
      </div>
      
      <div className="bg-muted rounded-lg p-4 text-left">
        <h4 className="font-semibold mb-2">Meeting Details</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>📍 Central Café, 123 Main St</li>
          <li>⏰ Tomorrow at 2:00 PM</li>
          <li>📱 Both parties will receive SMS reminders</li>
          <li>🔒 Safe, public location with good lighting</li>
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
      case "lost-match":
        return renderLostMatch();
      case "lost-next-steps":
        return renderLostNextSteps();
      case "lost-verification":
        return renderLostVerification();
      case "lost-success":
        return renderLostSuccess();
      case "found-report":
        return renderFoundReport();
      case "found-browse":
        return renderFoundBrowse();
      case "found-contact":
        return renderFoundContact();
      case "found-match":
        return renderFoundMatch();
      case "found-next-steps":
        return renderFoundNextSteps();
      case "found-verification":
        return renderFoundVerification();
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