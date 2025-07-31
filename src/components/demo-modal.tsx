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
    ThumbsUp,
    Truck,
    Plane,
    Globe,
    FileText
  } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DemoStep = 
  | "choose-journey"
  | "lost-report"
  | "lost-browse"
  | "lost-verification"
  | "lost-match"
  | "lost-contact"
  | "lost-next-steps"
  | "lost-delivery-options"
  | "lost-meetup-waiver"
  | "lost-complete-rate"
  | "lost-success"
  | "found-report"
  | "found-browse"
  | "found-verification"
  | "found-match"
  | "found-contact"
  | "found-next-steps"
  | "found-delivery-options"
  | "found-meetup-waiver"
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
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          ✨ Experience Lostly
        </h3>
        <p className="text-muted-foreground text-base sm:text-lg">
          Choose your journey to see how we reunite people with their belongings
        </p>
      </div>
      
      <div className="grid gap-6">
        <Card 
          className="cursor-pointer hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] group border-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/30 dark:hover:to-pink-900/30" 
          onClick={() => setCurrentStep("lost-report")}
        >
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-strong transition-all duration-300 group-hover:scale-110">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-red-600 transition-colors">
                  I Lost Something
                </h4>
                <p className="text-muted-foreground text-base">
                  Report & recover your lost items quickly with our smart matching system
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] group border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30" 
          onClick={() => setCurrentStep("found-report")}
        >
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-strong transition-all duration-300 group-hover:scale-110">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                  I Found Something
                </h4>
                <p className="text-muted-foreground text-base">
                  Help someone reunite with their belongings and be a community hero
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          🔒 Your privacy is protected throughout the entire process
        </p>
      </div>
    </div>
  );

  const renderLostReport = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentStep("choose-journey")} 
          className="p-3 hover:bg-primary/10 rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            😞 Report Lost Item
          </h3>
          <p className="text-muted-foreground text-base">Help us help you find what you've lost</p>
        </div>
      </div>

      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-300/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-red-800 dark:text-red-200">Quick Recovery Tips</h4>
          </div>
          <p className="text-red-700 dark:text-red-300">
            The more details you provide, the faster we can help you recover your item. Be specific!
          </p>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card className="hover:shadow-md transition-all duration-200 border-primary/20">
          <CardContent className="p-6">
            <label className="text-base font-semibold flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-primary" />
              What did you lose? *
            </label>
            <Input 
              placeholder="e.g., Wallet, Phone, Keys, Laptop..." 
              defaultValue="Brown leather wallet" 
              className="text-base h-12 border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium flex items-center gap-2 mb-3">
              <MessageCircle className="w-4 h-4 text-primary" />
              Detailed Description *
            </label>
            <Textarea 
              placeholder="Describe your item in detail - colors, brands, unique features, what's inside..." 
              defaultValue="Brown leather wallet with my driver's license and credit cards. Has a small tear on the back corner and a photo of my dog in the clear pocket."
              className="min-h-[100px] text-base"
            />
            <p className="text-xs text-muted-foreground mt-2">
              💡 Tip: Unique details help us match your item faster
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                Where did you lose it? *
              </label>
              <Input 
                placeholder="Be as specific as possible..." 
                defaultValue="Central Park, near the pond entrance by 5th Avenue" 
                className="text-base"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                When did you lose it? *
              </label>
              <Input 
                type="date" 
                defaultValue="2024-01-28" 
                className="text-base"
              />
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Reward Section */}
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">Offer Reward (Optional)</h4>
            </div>
            <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
              💰 Items with rewards are recovered 3x faster!
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-medium">$</span>
                <Input 
                  type="number" 
                  placeholder="Amount" 
                  defaultValue="25"
                  className="flex-1"
                />
              </div>
              <span className="text-sm text-muted-foreground">USD</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium mb-2">Add Photos (Optional)</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Photos help others identify your item quickly
            </p>
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-elegant hover:shadow-strong transition-all duration-300 hover:scale-[1.02]" 
          onClick={() => setCurrentStep("lost-browse")}
        >
          Submit Report & Start Search
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          🔒 Your personal information stays private until you choose to share it
        </p>
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
              setCurrentStep("lost-verification");
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
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-match")}>
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
        
        <Button className="w-full" onClick={() => setCurrentStep("lost-next-steps")}>
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
        <h3 className="text-2xl font-bold mb-4">Delivery Scheduled! 📦</h3>
        <p className="text-muted-foreground mb-6">
          Your wallet will be delivered via domestic shipping in 2-3 business days. 
          Sarah is so grateful to help you get your belongings back!
        </p>
      </div>
      
      <div className="bg-muted rounded-lg p-4 text-left">
        <h4 className="font-semibold mb-2">Delivery Details</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Secure packaging with tracking number provided</li>
          <li>• Insurance coverage included for item protection</li>
          <li>• Signature required upon delivery for security</li>
          <li>• Both parties can rate the experience once delivered</li>
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

  const renderFoundReport = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("choose-journey")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">🎉 Report Found Item</h3>
          <p className="text-muted-foreground">Help someone get their belongings back</p>
        </div>
      </div>

      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-green-800 dark:text-green-200">You're Making a Difference!</h4>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Thank you for being a good samaritan. Your actions help build stronger communities!
          </p>
        </CardContent>
      </Card>
      
      <div className="space-y-5">
        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-primary" />
              What did you find? *
            </label>
            <Input 
              placeholder="e.g., Phone, Keys, Bag, Jewelry..." 
              defaultValue="Set of car keys" 
              className="text-base"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium flex items-center gap-2 mb-3">
              <MessageCircle className="w-4 h-4 text-primary" />
              Detailed Description *
            </label>
            <Textarea 
              placeholder="Describe the item in detail - colors, brands, unique features, contents..." 
              defaultValue="Set of car keys with a blue rubber keychain that says 'NYPL'. Also has what looks like house keys and a small LED flashlight attached."
              className="min-h-[100px] text-base"
            />
            <p className="text-xs text-muted-foreground mt-2">
              💡 Tip: Detailed descriptions help us match with the right owner
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                Where did you find it? *
              </label>
              <Input 
                placeholder="Be as specific as possible..." 
                defaultValue="Downtown Metro Station, Platform B near the benches" 
                className="text-base"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                When did you find it? *
              </label>
              <Input 
                type="date" 
                defaultValue="2024-01-28" 
                className="text-base"
              />
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium mb-2">Add Photos (Recommended)</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Photos help us match with the right owner quickly
            </p>
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Safety First</h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              🔒 We'll verify ownership before sharing any contact details. Your safety is our priority.
            </p>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
          onClick={() => setCurrentStep("found-browse")}
        >
          Submit Found Item
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          🤝 You're helping build a more connected community
        </p>
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
              setCurrentStep("found-verification");
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
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-match")}>
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
        
        <Button className="w-full" onClick={() => setCurrentStep("found-next-steps")}>
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
          onClick={() => setCurrentStep("lost-verification")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          className="flex-1"
          onClick={() => setCurrentStep("lost-contact")}
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
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-contact")}>
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
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 2: Choose Delivery Method</h4>
                <p className="text-sm text-muted-foreground">Safe, secure delivery options</p>
              </div>
            </div>
            <p className="text-sm">
              Lostly offers multiple delivery options: domestic, express, or worldwide shipping based on your location and item value.
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
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-browse")}>
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
        onClick={() => setCurrentStep("lost-match")}
      >
        Complete Verification
        <CheckCircle className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderLostDeliveryOptions = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-next-steps")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Approve Delivery Method</h3>
          <p className="text-muted-foreground">Sarah suggested a delivery option for your wallet</p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-green-800 dark:text-green-200">Delivery Suggestion Received!</h4>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          Sarah has verified your ownership and suggested a delivery method. Please approve payment to proceed.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-green-100 text-green-600">SM</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">Sarah M. (Finder)</h4>
              <p className="text-sm text-muted-foreground">Suggested delivery method</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Domestic Delivery - $12.99</h4>
                <p className="text-sm text-muted-foreground">Standard shipping within your country</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-blue-600">Recommended</p>
                <p className="text-xs text-muted-foreground">2-3 days</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Sarah will ship your wallet once you approve payment</p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">Payment Approval Required</h4>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
          As the item owner, you'll pay for shipping costs ($12.99). Payment will be processed securely after you approve.
        </p>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            onClick={() => setCurrentStep("lost-complete-rate")}
          >
            ✅ Approve Payment ($12.99)
            <DollarSign className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            ❌ Decline & Suggest Alternative
          </Button>
        </div>
      </div>


      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <h4 className="font-semibold text-amber-800 dark:text-amber-200">Last Resort Option</h4>
        </div>
        <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
          If delivery isn't suitable, you can arrange an in-person meetup (requires liability waiver).
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-amber-300 text-amber-700 hover:bg-amber-100"
          onClick={() => setCurrentStep("lost-meetup-waiver")}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Arrange Meetup Instead
        </Button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">Payment Information</h4>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          As the item owner, you'll pay for shipping costs. Payment will be processed securely after delivery confirmation.
        </p>
      </div>
    </div>
  );

  const renderLostCompleteRate = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-delivery-options")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Complete & Rate Experience</h3>
          <p className="text-muted-foreground">Your wallet is on its way! Rate your experience</p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-green-800 dark:text-green-200">Delivery Confirmed!</h4>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          Your wallet has been successfully delivered via Uber Direct. Sarah went above and beyond to help you!
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-green-100 text-green-600">SM</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">Sarah M.</h4>
              <p className="text-sm text-muted-foreground">Found and returned your wallet</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rate Sarah's helpfulness</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-8 h-8 text-yellow-400 fill-yellow-400 cursor-pointer hover:scale-110 transition-transform" />
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Leave a thank you message (optional)</label>
              <Textarea 
                placeholder="Thank Sarah for her kindness..."
                defaultValue="Thank you so much Sarah! You're a lifesaver. I was so worried about losing my wallet and you made my day by finding it. The world needs more people like you! 🙏"
                className="min-h-[80px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-amber-800 dark:text-amber-200">Reward Sarah (Optional)</h4>
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
            Show extra appreciation for Sarah's kindness with a monetary reward
          </p>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                $5
              </Button>
              <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                $10
              </Button>
              <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                $25
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Custom: $</span>
              <Input 
                type="number" 
                placeholder="Amount" 
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-semibold mb-2">Your Experience Summary</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>🔍 Reported: Brown leather wallet</li>
          <li>✅ Matched: Found by Sarah M. in 1 day</li>
          <li>🔐 Verified: Ownership confirmed securely</li>
          <li>🚚 Delivered: Via Uber Direct ($12.99)</li>
          <li>⏱️ Total time: 6 hours from report to delivery</li>
        </ul>
      </div>

      <Button 
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        onClick={() => setCurrentStep("lost-success")}
      >
        Complete Experience
        <CheckCircle className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderLostMeetupWaiver = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("lost-delivery-options")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Meetup Liability Waiver</h3>
          <p className="text-muted-foreground">Legal disclaimer for in-person meetings</p>
        </div>
      </div>

      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-800 dark:text-red-200">Important Legal Notice</h4>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">
            By choosing to meet in person, you acknowledge and accept full responsibility for your safety.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Liability Waiver Agreement
            </h4>
            <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto text-sm space-y-3">
              <p><strong>ASSUMPTION OF RISK AND RELEASE OF LIABILITY</strong></p>
              
              <p>By selecting the in-person meetup option, I, the undersigned, understand and acknowledge that:</p>
              
              <ul className="space-y-2 ml-4">
                <li>• I am voluntarily choosing to meet another person in connection with the return of lost/found items</li>
                <li>• Lostly Inc. ("Company") does not control, supervise, or monitor in-person meetings</li>
                <li>• Meeting strangers involves inherent risks including but not limited to personal injury, theft, fraud, or other criminal activity</li>
                <li>• I am solely responsible for my personal safety and security during any meetup</li>
                <li>• I agree to meet only in safe, public locations with good lighting and visibility</li>
              </ul>

              <p><strong>RELEASE AND WAIVER:</strong> I hereby release, waive, discharge, and covenant not to sue the Company, its officers, directors, employees, and agents from any and all liability, claims, demands, actions, and causes of action arising out of or relating to any loss, damage, or injury that may be sustained by me during or as a result of any in-person meetup.</p>

              <p><strong>INDEMNIFICATION:</strong> I agree to indemnify and hold harmless the Company from any claims arising from my participation in in-person meetups.</p>

              <p className="text-xs text-muted-foreground">This waiver shall be binding upon my heirs, successors, and assigns.</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <input type="checkbox" id="waiver-agree" className="w-4 h-4" />
          <label htmlFor="waiver-agree" className="text-sm">
            I have read, understood, and agree to the terms of this liability waiver
          </label>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <input type="checkbox" id="safety-acknowledge" className="w-4 h-4" />
          <label htmlFor="safety-acknowledge" className="text-sm">
            I acknowledge that Lostly is not responsible for my safety during in-person meetings
          </label>
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={() => setCurrentStep("lost-success")}
      >
        Accept Waiver & Arrange Meetup
        <FileText className="w-4 h-4 ml-2" />
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We strongly recommend using our secure delivery options instead of in-person meetings
      </p>
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
          onClick={() => setCurrentStep("found-verification")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          className="flex-1"
          onClick={() => setCurrentStep("found-contact")}
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
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-contact")}>
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
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Step 2: Choose Delivery Method</h4>
                <p className="text-sm text-muted-foreground">Safe, secure delivery options</p>
              </div>
            </div>
            <p className="text-sm">
              Lostly offers multiple delivery options: domestic, express, or worldwide shipping based on location and item value.
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
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-browse")}>
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
        onClick={() => setCurrentStep("found-delivery-options")}
      >
        Choose Delivery Method
        <Package className="w-4 h-4 ml-2" />
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
          Keys will be delivered to Alex via domestic shipping in 2-3 business days. 
          Alex is so grateful - you've just made their week!
        </p>
      </div>
      
      <div className="bg-muted rounded-lg p-4 text-left">
        <h4 className="font-semibold mb-2">Delivery Details</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>📦 Secure packaging with tracking provided</li>
          <li>🚚 Free shipping covered by Lostly</li>
          <li>📱 Both parties will receive delivery updates</li>
          <li>🔒 Insurance included for safe transport</li>
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

  const renderFoundDeliveryOptions = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-verification")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Choose Delivery Method</h3>
          <p className="text-muted-foreground">How should we send the keys to Alex?</p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-green-800 dark:text-green-200">Ownership Verified!</h4>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          Alex has proven ownership. Select the best delivery method for returning their keys.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="cursor-pointer hover:shadow-md transition-all border-primary/50 bg-primary/5" onClick={() => setCurrentStep("found-success")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Domestic Delivery - $12.99</h4>
                <p className="text-sm text-muted-foreground">Standard shipping within your country</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-blue-600">Recommended</p>
                <p className="text-xs text-muted-foreground">2-3 days</p>
              </div>
            </div>
            <p className="text-sm">Alex will pay for shipping upon approval</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => setCurrentStep("found-success")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Express Delivery - $24.99</h4>
                <p className="text-sm text-muted-foreground">Expedited shipping for urgent items</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-orange-600">Fast</p>
                <p className="text-xs text-muted-foreground">1-2 days</p>
              </div>
            </div>
            <p className="text-sm">Priority handling for time-sensitive returns</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => setCurrentStep("found-success")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Worldwide Delivery - $39.99</h4>
                <p className="text-sm text-muted-foreground">International shipping anywhere</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-purple-600">Global</p>
                <p className="text-xs text-muted-foreground">5-10 days</p>
              </div>
            </div>
            <p className="text-sm">Global coverage with customs handling included</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">Waiting for Alex's Approval</h4>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
          Your delivery suggestion will be sent to Alex for approval and payment. Once Alex approves, Lostly will arrange pickup from your location.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-l-4 border-blue-500">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Selected: Domestic Delivery ($12.99)</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Alex will be notified to approve payment for this option</p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <h4 className="font-semibold text-amber-800 dark:text-amber-200">Alternative Option</h4>
        </div>
        <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
          If delivery isn't suitable, you can arrange an in-person meetup (requires liability waiver).
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-amber-300 text-amber-700 hover:bg-amber-100"
          onClick={() => setCurrentStep("found-meetup-waiver")}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Arrange Meetup Instead
        </Button>
      </div>
    </div>
  );

  const renderFoundMeetupWaiver = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("found-delivery-options")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold">Meetup Liability Waiver</h3>
          <p className="text-muted-foreground">Legal disclaimer for in-person meetings</p>
        </div>
      </div>

      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-800 dark:text-red-200">Important Legal Notice</h4>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">
            By choosing to meet in person, you acknowledge and accept full responsibility for your safety.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Liability Waiver Agreement
            </h4>
            <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto text-sm space-y-3">
              <p><strong>ASSUMPTION OF RISK AND RELEASE OF LIABILITY</strong></p>
              
              <p>By selecting the in-person meetup option, I, the undersigned, understand and acknowledge that:</p>
              
              <ul className="space-y-2 ml-4">
                <li>• I am voluntarily choosing to meet another person in connection with the return of lost/found items</li>
                <li>• Lostly Inc. ("Company") does not control, supervise, or monitor in-person meetings</li>
                <li>• Meeting strangers involves inherent risks including but not limited to personal injury, theft, fraud, or other criminal activity</li>
                <li>• I am solely responsible for my personal safety and security during any meetup</li>
                <li>• I agree to meet only in safe, public locations with good lighting and visibility</li>
              </ul>

              <p><strong>RELEASE AND WAIVER:</strong> I hereby release, waive, discharge, and covenant not to sue the Company, its officers, directors, employees, and agents from any and all liability, claims, demands, actions, and causes of action arising out of or relating to any loss, damage, or injury that may be sustained by me during or as a result of any in-person meetup.</p>

              <p><strong>INDEMNIFICATION:</strong> I agree to indemnify and hold harmless the Company from any claims arising from my participation in in-person meetups.</p>

              <p className="text-xs text-muted-foreground">This waiver shall be binding upon my heirs, successors, and assigns.</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <input type="checkbox" id="waiver-agree-found" className="w-4 h-4" />
          <label htmlFor="waiver-agree-found" className="text-sm">
            I have read, understood, and agree to the terms of this liability waiver
          </label>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <input type="checkbox" id="safety-acknowledge-found" className="w-4 h-4" />
          <label htmlFor="safety-acknowledge-found" className="text-sm">
            I acknowledge that Lostly is not responsible for my safety during in-person meetings
          </label>
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={() => setCurrentStep("found-success")}
      >
        Accept Waiver & Arrange Meetup
        <FileText className="w-4 h-4 ml-2" />
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We strongly recommend using our secure delivery options instead of in-person meetings
      </p>
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
      case "lost-delivery-options":
        return renderLostDeliveryOptions();
      case "lost-complete-rate":
        return renderLostCompleteRate();
      case "lost-meetup-waiver":
        return renderLostMeetupWaiver();
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
      case "found-delivery-options":
        return renderFoundDeliveryOptions();
      case "found-meetup-waiver":
        return renderFoundMeetupWaiver();
      case "found-success":
        return renderFoundSuccess();
      default:
        return renderChooseJourney();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl">
        <div className="p-6 sm:p-8">
          <DialogHeader className="text-center sm:text-left mb-6">
          </DialogHeader>
          {renderCurrentStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};