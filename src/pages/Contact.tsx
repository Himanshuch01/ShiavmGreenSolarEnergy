import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import TestimonialForm from "@/components/sections/TestimonialForm";
import StructuredData, { localBusinessSchema } from "@/components/seo/StructuredData";

const baseUrl = "https://shivamgreensolarenergy.in";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const services = [
  "Residential Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Solar Rooftop",
  "Solar Maintenance",
  "Other",
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+91 9511048844",
    link: "tel:+919511048844",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@shivamgreensolar.com",
    link: "mailto:info@shivamgreensolar.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Kalyanpur west, Lucknow 226022",
    link: "#map",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 9:00 AM - 6:00 PM",
    link: null,
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from("contact_inquiries")
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
          },
        ]);

      if (error) {
        throw error;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      reset();
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Contact Shivam Green Solar Energy | Solar Installation Support</title>
        <meta
          name="description"
          content="Contact Shivam Green Solar Energy for solar installation queries, pricing, and consultations."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/contact`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/contact`} />
        <meta property="og:title" content="Contact Shivam Green Solar Energy" />
        <meta property="og:description" content="Contact Shivam Green Solar Energy for solar installation queries, pricing, and consultations." />
        <meta property="og:image" content={`${baseUrl}/logoo1.png`} />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Shivam Green Solar Energy" />
        <meta name="twitter:description" content="Contact us for solar installation queries, pricing, and consultations." />
      </Helmet>
      
      <StructuredData type="LocalBusiness" data={localBusinessSchema} />

      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-hero-pattern">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Contact Us
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Let's Start Your{" "}
                <span className="text-gradient">Solar Journey</span>
              </h1>
              {/* SEO: Add keywords naturally in first 100 words */}
              <p className="text-lg text-muted-foreground">
                Contact Shivam Green Solar Energy (shivam solar, shivam solar energy) for 
                rooftop solar solutions and a free consultation for your home or business in India.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Info */}
              <AnimatedSection direction="left" className="lg:col-span-1">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    Get in Touch
                  </h2>
                  
                  {contactInfo.map((info) => (
                    <div key={info.title} className="glass-card p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold mb-1 text-sm sm:text-base">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base break-words"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground text-sm sm:text-base">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Contact Form */}
              <AnimatedSection direction="right" className="lg:col-span-2">
                <div className="glass-card p-6 sm:p-8 md:p-12">
                  <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          {...register("name")}
                          className="h-12"
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register("email")}
                          className="h-12"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          {...register("phone")}
                          className="h-12"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In *</Label>
                        <Select onValueChange={(value) => setValue("service", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.service && (
                          <p className="text-sm text-destructive">{errors.service.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your solar requirements..."
                        rows={5}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Testimonial Form Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Share Your Experience
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Leave a{" "}
                <span className="text-gradient">Testimonial</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Help others make informed decisions by sharing your experience with our solar solutions.
              </p>
            </AnimatedSection>

            <div className="max-w-2xl mx-auto">
              <TestimonialForm />
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map" className="h-64 sm:h-80 md:h-96 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2345678901234!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93fba75b0a4b026a!2sKalyanpur%2C%20Lucknow%2C%20Uttar%20Pradesh%20226022!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shivam GreenSolar Energy Office Location - Kalyanpur, Lucknow"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
