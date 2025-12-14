import { Shield, Clock, ThumbsUp, Headphones, BadgeCheck, Wallet } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const features = [
  {
    icon: Shield,
    title: "25 Years Warranty",
    description: "Industry-leading warranty on all our solar panels and installations.",
  },
  {
    icon: BadgeCheck,
    title: "MNRE Certified",
    description: "Government approved and certified solar solutions provider.",
  },
  {
    icon: Clock,
    title: "Quick Installation",
    description: "Professional installation completed within 7-14 days.",
  },
  {
    icon: Wallet,
    title: "Easy Financing",
    description: "Flexible EMI options and government subsidy assistance.",
  },
  {
    icon: ThumbsUp,
    title: "Quality Products",
    description: "Premium Tier-1 solar panels from trusted global manufacturers.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support and maintenance services.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimatedSection direction="left">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Trusted by{" "}
                <span className="text-gradient">15,000+ Customers</span>{" "}
                Across India
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're not just installing solar panels – we're building a sustainable 
                future. Our commitment to quality, service, and customer satisfaction 
                sets us apart in the industry.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <div className="glass-card px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Government</p>
                    <p className="text-xs text-muted-foreground">Approved</p>
                  </div>
                </div>
                <div className="glass-card px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <BadgeCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">ISO 9001</p>
                    <p className="text-xs text-muted-foreground">Certified</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection
                key={feature.title}
                delay={index * 0.1}
                direction="right"
              >
                <div className="glass-card p-6 h-full hover-lift group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
