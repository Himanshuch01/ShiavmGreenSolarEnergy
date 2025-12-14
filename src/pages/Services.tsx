import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, Building2, Factory, Warehouse, Wrench, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Residential Solar",
    description: "Transform your home into a power-generating asset. Our residential solar solutions are designed to maximize savings and minimize your carbon footprint.",
    path: "/services/residential",
    features: ["Up to 90% bill reduction", "25-year warranty", "Net metering enabled", "Government subsidy assistance"],
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description: "Reduce operational costs and demonstrate environmental responsibility with our commercial solar installations for offices, retail, and business spaces.",
    path: "/services/commercial",
    features: ["Lower operating costs", "Tax benefits", "Brand sustainability", "Scalable solutions"],
  },
  {
    icon: Factory,
    title: "Industrial Solar",
    description: "Large-scale solar power solutions for manufacturing plants, warehouses, and industrial facilities. Maximize production while minimizing energy costs.",
    path: "/services/industrial",
    features: ["MW-scale installations", "Ground-mounted options", "Power purchase agreements", "24/7 monitoring"],
  },
  {
    icon: Warehouse,
    title: "Solar Rooftop",
    description: "Make the most of your unused rooftop space. Our rooftop solar systems are optimized for maximum energy generation with minimal structural impact.",
    path: "/services/rooftop",
    features: ["Custom design", "Quick installation", "Weather resistant", "Remote monitoring"],
  },
  {
    icon: Wrench,
    title: "Solar Maintenance",
    description: "Keep your solar investment performing at its best with our comprehensive maintenance and support services.",
    path: "/services/maintenance",
    features: ["Regular cleaning", "Performance optimization", "Repair services", "System upgrades"],
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Solar Services - Shivam GreenSolar Energy | Residential, Commercial & Industrial Solutions</title>
        <meta
          name="description"
          content="Explore Shivam GreenSolar Energy's comprehensive solar solutions including residential, commercial, industrial, rooftop, and maintenance services across India."
        />
      </Helmet>

      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-hero-pattern">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Services
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Complete Solar{" "}
                <span className="text-gradient">Solutions</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                From residential rooftops to industrial complexes, we provide end-to-end 
                solar energy solutions tailored to your specific needs and requirements.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="space-y-16">
              {services.map((service, index) => (
                <AnimatedSection
                  key={service.title}
                  direction={index % 2 === 0 ? "left" : "right"}
                >
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                  }`}>
                    <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                      <div className="w-16 h-16 rounded-2xl bg-solar-gradient shadow-glow flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="hero" size="lg" asChild>
                        <Link to={service.path} className="group">
                          Learn More
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                    <div className={`glass-card p-8 aspect-video flex items-center justify-center ${
                      index % 2 !== 0 ? "lg:order-1" : ""
                    }`}>
                      <service.icon className="w-32 h-32 text-primary/20" />
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Not Sure Which Solution Fits You?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our solar experts will help you find the perfect solution for your needs. 
                Get a free consultation today!
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
