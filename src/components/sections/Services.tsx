import { Link } from "react-router-dom";
import { Home, Building2, Factory, Warehouse, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";

const services = [
  {
    icon: Home,
    title: "Residential Solar",
    description: "Power your home with clean, renewable solar energy. Reduce bills and increase property value.",
    path: "/services/residential",
    color: "primary",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description: "Sustainable energy solutions for offices, retail spaces, and commercial buildings.",
    path: "/services/commercial",
    color: "secondary",
  },
  {
    icon: Factory,
    title: "Industrial Solar",
    description: "Large-scale solar installations for manufacturing plants and industrial facilities.",
    path: "/services/industrial",
    color: "accent",
  },
  {
    icon: Warehouse,
    title: "Solar Rooftop",
    description: "Maximize your rooftop potential with efficient solar panel installations.",
    path: "/services/rooftop",
    color: "primary",
  },
  {
    icon: Wrench,
    title: "Solar Maintenance",
    description: "Keep your solar system performing at peak efficiency with our maintenance services.",
    path: "/services/maintenance",
    color: "secondary",
  },
];

const colorClasses = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  secondary: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
  accent: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
};

export default function Services() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Complete Solar Solutions for{" "}
            <span className="text-gradient">Every Need</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From residential rooftops to industrial complexes, we provide end-to-end 
            solar energy solutions tailored to your requirements.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <Link
                to={service.path}
                className="group glass-card p-8 h-full flex flex-col hover-lift"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${colorClasses[service.color as keyof typeof colorClasses]}`}
                >
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="flex items-center text-primary font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.5}>
          <Button variant="hero" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
