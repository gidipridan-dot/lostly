import { Star, Users, Building, TrendingUp } from "lucide-react";

export const SocialProof = () => {
  const testimonials = [
    {
      quote: "Lostly integrated seamlessly into our campus app. Students are finally reuniting with lost items instead of giving up hope.",
      author: "Dr. Sarah Chen",
      role: "Director of Campus Safety",
      organization: "University of California",
      rating: 5
    },
    {
      quote: "The anonymous safety features give our citizens confidence to help each other. Lost item returns are up 300%.",
      author: "Michael Rodriguez",
      role: "City Digital Services Manager", 
      organization: "Austin Municipal Government",
      rating: 5
    },
    {
      quote: "We were skeptical, but the white-label integration was flawless. Our passengers love the new lost & found feature.",
      author: "Emma Thompson",
      role: "Customer Experience Director",
      organization: "Denver International Airport",
      rating: 5
    }
  ];

  const partners = [
    { name: "UC Berkeley", type: "University" },
    { name: "City of Austin", type: "Municipality" },
    { name: "Denver Airport", type: "Transportation" },
    { name: "SXSW Festival", type: "Events" },
    { name: "SF Municipal", type: "Government" },
    { name: "MIT Campus", type: "Education" }
  ];

  const stats = [
    { number: "75%", label: "Reduction in Staff Time" },
    { number: "$180K", label: "Average Annual ROI" },
    { number: "12", label: "Enterprise Partners" },
    { number: "3x", label: "Return Rate Improvement" }
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by Forward-Thinking Organizations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the institutions already transforming how their communities handle lost & found
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-background rounded-xl p-6 shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                <div className="text-primary text-sm font-medium">{testimonial.organization}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos Section */}
        <div className="bg-background rounded-2xl p-8 border border-border shadow-soft">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Current Implementation Partners
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-primary rounded-xl p-4 mb-3 group-hover:scale-105 transition-transform duration-300">
                  <Building className="w-8 h-8 text-primary-foreground mx-auto" />
                </div>
                <div className="font-medium text-foreground text-sm">{partner.name}</div>
                <div className="text-muted-foreground text-xs">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Operational Excellence</h4>
            <p className="text-muted-foreground text-sm">75% reduction in lost item management overhead for venue staff</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Measurable ROI</h4>
            <p className="text-muted-foreground text-sm">Average $180K annual savings from improved visitor satisfaction</p>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-12 h-12 text-primary mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Enterprise Security</h4>
            <p className="text-muted-foreground text-sm">SOC2 compliant with enterprise-grade data protection</p>
          </div>
        </div>
      </div>
    </section>
  );
};