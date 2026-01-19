import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CountUp from "@/components/shared/CountUp";
import StructuredData, { organizationSchema } from "@/components/seo/StructuredData";

const baseUrl = "https://shivamgreensolarenergy.in";

const timeline = [
  { year: "2009", title: "Founded", description: "Started with a vision to make solar energy accessible to everyone." },
  { year: "2012", title: "1,000 Installations", description: "Reached our first major milestone in residential solar." },
  { year: "2015", title: "Commercial Expansion", description: "Launched commercial and industrial solar solutions." },
  { year: "2018", title: "National Presence", description: "Expanded operations to 15+ states across India." },
  { year: "2021", title: "10,000+ Projects", description: "Celebrated 10,000+ successful solar installations." },
  { year: "2024", title: "Innovation Leader", description: "Pioneering smart solar solutions and AI-powered monitoring." },
];

const team = [
  {
    name: "Shivam Chauhan",
    role: "Founder & SEO",
    image: "#",
  },
];

const certifications = [

  "ISO 9001:2015",
  "ISO 14001:2015",
  "BIS Certified",
  "NABCEP Trained",
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us – Shivam Green Solar Energy</title>
        <meta
          name="description"
          content="Learn about Shivam Green Solar Energy, our mission, experience, and commitment to clean solar power."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/about`} />
        {/* SEO: Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/about`} />
        <meta property="og:title" content="About Shivam Green Solar Energy" />
        <meta property="og:description" content="A trusted solar energy company in India offering rooftop solar solutions." />
        <meta property="og:image" content={`${baseUrl}/logoo1.png`} />
        {/* SEO: Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Shivam Green Solar Energy" />
        <meta name="twitter:description" content="Leading rooftop solar solutions provider in India." />
      </Helmet>

      {/* SEO: Organization structured data */}
      <StructuredData type="Organization" data={organizationSchema} />

      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-hero-pattern">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                About Shivam GreenSolar Energy
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Powering India's{" "}
                <span className="text-gradient">Sustainable Future</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Shivam Green Solar Energy is a solar energy company in India delivering
                rooftop solar solutions for homes, businesses, and industries. As shivam
                solar and shivam solar energy, we make clean energy accessible and affordable.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection direction="left">
                <div className="glass-card p-8 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To accelerate India's transition to clean energy by providing world-class
                    solar solutions that are accessible, affordable, and reliable. We aim to
                    empower every household and business to become energy independent while
                    contributing to a sustainable planet.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="glass-card p-8 h-full">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be India's most trusted solar energy partner, leading the charge
                    towards a carbon-neutral future. We envision a world where clean,
                    renewable energy powers every home, every business, and every community,
                    creating a healthier planet for future generations.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Timeline - temporarily hidden */}
        {false && (
          <section className="section-padding bg-muted">
            <div className="container-custom">
              <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Our Journey
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  6 months of{" "}
                  <span className="text-gradient">Solar Excellence</span>
                </h2>
              </AnimatedSection>

              <div className="relative max-w-4xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-1/2" />

                {timeline.map((item, index) => (
                  <AnimatedSection
                    key={item.year}
                    delay={index * 0.1}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-8 md:mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                  >
                    <div className={`flex-1 w-full md:w-auto ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      <div className="glass-card p-4 sm:p-6 inline-block w-full md:w-auto">
                        <span className="text-primary font-display font-bold text-xl sm:text-2xl">
                          {item.year}
                        </span>
                        <h3 className="font-display font-semibold text-base sm:text-lg mt-2 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm">{item.description}</p>
                      </div>
                    </div>

                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-glow shrink-0" />

                    <div className="flex-1 hidden md:block" />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Team Section
        <section id="team" className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Meet the{" "}
                <span className="text-gradient">Leaders</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Passionate experts driving India's solar revolution
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {team.map((member, index) => (
                <AnimatedSection key={member.name} delay={index * 0.1}>
                  <div className="glass-card p-4 sm:p-6 text-center group">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/10">
                          <span className="font-display text-lg">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href="#"
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href="#"
                          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section> */}

        {/* Certifications */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Certifications
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Trusted &{" "}
                <span className="text-gradient">Certified</span>
              </h2>
            </AnimatedSection>

            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <AnimatedSection key={cert} delay={index * 0.1}>
                  <div className="glass-card px-6 py-4 flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-medium">{cert}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}