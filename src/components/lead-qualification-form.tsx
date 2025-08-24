import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone, User, Calendar, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LeadQualificationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactName: "",
    role: "",
    email: "",
    phone: "",
    monthlyVisitors: "",
    currentSolution: "",
    timeline: "",
    budget: "",
    challenges: "",
    goals: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Demo Request Submitted",
        description: "Our team will contact you within 24 hours to schedule your personalized demo.",
      });
      setIsSubmitting(false);
      setFormData({
        organizationName: "",
        organizationType: "",
        contactName: "",
        role: "",
        email: "",
        phone: "",
        monthlyVisitors: "",
        currentSolution: "",
        timeline: "",
        budget: "",
        challenges: "",
        goals: ""
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Schedule Your Personalized Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get a customized walkthrough of Lostly tailored to your venue's specific needs and challenges
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-card border border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Tell Us About Your Organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Organization Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="org-name" className="text-sm font-medium flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Organization Name
                    </Label>
                    <Input
                      id="org-name"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      placeholder="Your organization name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="org-type" className="text-sm font-medium">Organization Type</Label>
                    <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">University/College</SelectItem>
                        <SelectItem value="municipality">Municipality/Government</SelectItem>
                        <SelectItem value="airport">Airport/Transportation</SelectItem>
                        <SelectItem value="festival">Festival/Events</SelectItem>
                        <SelectItem value="hospital">Hospital/Healthcare</SelectItem>
                        <SelectItem value="mall">Shopping Center/Mall</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="visitors" className="text-sm font-medium">Monthly Visitors/Users</Label>
                    <Select value={formData.monthlyVisitors} onValueChange={(value) => handleInputChange('monthlyVisitors', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select visitor range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under 10,000</SelectItem>
                        <SelectItem value="10k-50k">10,000 - 50,000</SelectItem>
                        <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                        <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                        <SelectItem value="over-500k">Over 500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name" className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Contact Name
                    </Label>
                    <Input
                      id="contact-name"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="Your full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-sm font-medium">Role/Title</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder="Your job title"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@organization.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timeline" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Implementation Timeline
                  </Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="When do you want to start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediately</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-12-months">6-12 months</SelectItem>
                      <SelectItem value="exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Budget Range
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000/month</SelectItem>
                      <SelectItem value="5k-15k">$5,000 - $15,000/month</SelectItem>
                      <SelectItem value="15k-50k">$15,000 - $50,000/month</SelectItem>
                      <SelectItem value="over-50k">Over $50,000/month</SelectItem>
                      <SelectItem value="flexible">Flexible/Need guidance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="challenges" className="text-sm font-medium">Current Challenges</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => handleInputChange('challenges', e.target.value)}
                    placeholder="What challenges are you facing with lost items, visitor services, or operational efficiency?"
                    className="mt-1 h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="goals" className="text-sm font-medium">Goals & Objectives</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="What do you hope to achieve with a lost & found solution?"
                    className="mt-1 h-24"
                  />
                </div>
              </div>

              <div className="text-center pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="px-12"
                >
                  {isSubmitting ? "Submitting..." : "Schedule My Demo"}
                </Button>
                <p className="text-muted-foreground text-sm mt-4">
                  Our team will contact you within 24 hours to schedule your personalized demo
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};