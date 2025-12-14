import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function CTA() {
  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Start Your Solar Journey
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Save{" "}
            <span className="text-gradient">₹50,000+ Annually</span>{" "}
            on Electricity?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Take the first step towards energy independence. Get a free consultation 
            and customized solar solution for your property.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                <Phone className="w-5 h-5" />
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/calculator">
                <Calculator className="w-5 h-5" />
                Calculate Your Savings
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass-card p-4 text-center">
              <p className="font-display font-bold text-2xl text-primary">Free</p>
              <p className="text-sm text-muted-foreground">Site Survey</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="font-display font-bold text-2xl text-primary">0% EMI</p>
              <p className="text-sm text-muted-foreground">Financing Available</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="font-display font-bold text-2xl text-primary">40%</p>
              <p className="text-sm text-muted-foreground">Govt Subsidy</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
