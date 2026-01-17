import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sun, Zap, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-pattern">
      {/* Background decoration - Fixed container reference */}
      {/* Background decoration - Static SVG for Production Safety */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
          </defs>
          {/* Large soft blue circle (top-right) */}
          <circle
            cx="80"
            cy="20"
            r="30"
            fill="hsl(var(--primary))"
            fillOpacity="0.1"
            filter="url(#blurFilter)"
          />
          {/* Smaller teal circle (bottom-left) */}
          <circle
            cx="20"
            cy="80"
            r="25"
            fill="hsl(var(--secondary))"
            fillOpacity="0.1"
            filter="url(#blurFilter)"
          />
        </svg>
      </div>

      <div className="container-custom relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sun className="w-4 h-4" />
              <span>India's Leading Solar Solutions Provider</span>
            </motion.div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Power Your Future with{" "}
              <span className="text-gradient">Clean Solar Energy</span>
            </h1>

            {/* SEO: Add primary keywords naturally in first 100 words */}
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg">
              Shivam Green Solar Energy is a trusted solar energy company in India offering
              rooftop solar solutions for homes and businesses. Transform your property with
              sustainable solar and reduce energy costs by up to 90%.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="group">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/calculator" className="group">
                  Calculate Savings
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">155+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Installations</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">750K+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">kg CO₂ Saved</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block z-10"
          >
            {/* Visual Container with enforced aspect ratio and no flex shrink */}
            <div
              className="relative w-full max-w-md lg:ml-auto xl:mx-auto flex-none"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* Main circle - Static for stability */}
              <div className="absolute inset-0 rounded-full bg-solar-gradient opacity-20" />

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 left-10 glass-card p-4 z-20"
                initial={{ y: 0 }}
                animate={{ y: -10 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Solar Power</p>
                    <p className="text-xs text-muted-foreground">100% Clean</p>
                  </div>
                </div>
              </motion.div>

              {/* Central Sun - Static Position, no rotation */}
              <div
                className="absolute w-64 h-64 rounded-full bg-solar-gradient shadow-glow flex items-center justify-center z-10"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate3d(-50%, -50%, 0)"
                }}
              >
                <Sun className="w-24 h-24 text-primary-foreground" />
              </div>

              {/* Removed Orbit rings to prevent distortion/layout shifts */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path
            d="M0 50C360 100 1080 0 1440 50V100H0V50Z"
            fill="hsl(var(--muted))"
          />
        </svg>
      </div>
    </section>
  );
}
