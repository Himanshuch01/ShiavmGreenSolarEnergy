import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { supabase, Testimonial } from "@/lib/supabase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTestimonials(data || []);
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      // Fallback to empty array if there's an error
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Default avatar if no image provided
  const getAvatarUrl = (testimonial: Testimonial) => {
    if (testimonial.image_url) return testimonial.image_url;
    // Generate a default avatar based on name initials
    const initials = testimonial.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&size=128`;
  };

  if (isLoading) {
    return (
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What Our{" "}
              <span className="text-gradient">Customers Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied customers who have made the switch to solar energy.
            </p>
          </AnimatedSection>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What Our{" "}
              <span className="text-gradient">Customers Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Be the first to share your experience with Shivam GreenSolar Energy!
            </p>
          </AnimatedSection>
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No testimonials yet. Check back soon or share your experience!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who have made the switch to solar energy.
          </p>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 sm:p-8 md:p-12"
            >
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary/20 mb-4 sm:mb-6" />
              
              <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-6 sm:mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={getAvatarUrl(testimonials[currentIndex])}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                    onError={(e) => {
                      // Fallback to initials avatar if image fails to load
                      const target = e.target as HTMLImageElement;
                      const initials = testimonials[currentIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2);
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&size=128`;
                    }}
                  />
                  <div>
                    <p className="font-display font-semibold text-base sm:text-lg">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
