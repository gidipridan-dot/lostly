import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  organizationName: z.string().trim().min(1, "Organization name is required").max(100),
  contactName: z.string().trim().min(1, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000)
});

export const LeadQualificationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
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
        contactName: "",
        email: "",
        phone: "",
        message: ""
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
                    className="mt-1"
                  />
                  {errors.organizationName && (
                    <p className="text-sm text-destructive mt-1">{errors.organizationName}</p>
                  )}
                </div>

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
                    className="mt-1"
                  />
                  {errors.contactName && (
                    <p className="text-sm text-destructive mt-1">{errors.contactName}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
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

              <div>
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about your needs, challenges, or any questions you have..."
                  className="mt-1 h-32"
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message}</p>
                )}
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