import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, Building2, Factory, Warehouse, Wrench, Check, ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import StructuredData, { organizationSchema } from "@/components/seo/StructuredData";

const baseUrl = "https://shivamgreensolarenergy.in";

const serviceData = {
  residential: {
    icon: Home,
    title: "Residential Solar",
    description: "Power your home with clean, renewable solar energy. Our residential solar solutions are designed to maximize savings while providing energy independence for your family.",
    hero: "Transform Your Home into a Power Plant",
    benefits: [
      "Reduce electricity bills by up to 90%",
      "Increase property value by 3-4%",
      "25-year performance warranty",
      "Net metering enabled - sell excess power",
      "Government subsidy up to 40%",
      "Zero maintenance hassle with our plans",
    ],
    process: [
      { step: "1", title: "Free Consultation", description: "Our experts assess your energy needs and rooftop potential" },
      { step: "2", title: "Custom Design", description: "We create an optimized system design for maximum efficiency" },
      { step: "3", title: "Documentation", description: "We handle all permits and subsidy applications" },
      { step: "4", title: "Installation", description: "Professional installation in 7-14 days" },
      { step: "5", title: "Commissioning", description: "System activation and grid connection" },
      { step: "6", title: "Monitoring", description: "24/7 performance monitoring and support" },
    ],
    faqs: [
      { q: "How much roof space do I need?", a: "Typically, you need about 100 sq ft per kW of solar panels. A 3kW system (sufficient for most homes) would need approximately 300 sq ft of shadow-free roof space." },
      { q: "What is the payback period?", a: "With government subsidies and current electricity rates, most residential systems pay back in 4-5 years, after which you enjoy virtually free electricity for 20+ years." },
      { q: "Will solar panels work during monsoon?", a: "Yes! Modern solar panels work in all weather conditions. While output may be reduced on cloudy days, you'll still generate significant power throughout the year." },
      { q: "What happens to excess electricity?", a: "Through net metering, excess electricity is exported to the grid and you receive credits on your electricity bill, effectively spinning your meter backwards." },
    ],
  },
  commercial: {
    icon: Building2,
    title: "Commercial Solar",
    description: "Reduce operational costs and demonstrate environmental leadership with our commercial solar solutions for offices, retail spaces, and business establishments.",
    hero: "Power Your Business Sustainably",
    benefits: [
      "Lower operating costs significantly",
      "Accelerated depreciation tax benefits",
      "Enhanced brand sustainability image",
      "Scalable solutions for growing businesses",
      "Corporate carbon footprint reduction",
      "Energy independence and price stability",
    ],
    process: [
      { step: "1", title: "Energy Audit", description: "Comprehensive analysis of your commercial energy consumption" },
      { step: "2", title: "Feasibility Study", description: "Technical and financial viability assessment" },
      { step: "3", title: "System Design", description: "Custom engineering for your facility" },
      { step: "4", title: "Financing Options", description: "PPA, CAPEX, or lease options" },
      { step: "5", title: "Installation", description: "Minimal disruption to business operations" },
      { step: "6", title: "O&M Services", description: "Ongoing maintenance and monitoring" },
    ],
    faqs: [
      { q: "What size system does my business need?", a: "System size depends on your energy consumption, available roof/ground space, and budget. Our engineers will design an optimal system after a detailed energy audit." },
      { q: "What are the tax benefits?", a: "Commercial solar installations qualify for accelerated depreciation (40% in Year 1, 20% thereafter), significantly reducing your tax liability." },
      { q: "Can I install solar on a rented building?", a: "Yes! With landlord consent, we offer various models including rooftop leasing arrangements that benefit both parties." },
      { q: "What about power during non-sunny hours?", a: "Your building remains connected to the grid. Solar reduces your consumption during daytime, and grid power supplements when needed." },
    ],
  },
  industrial: {
    icon: Factory,
    title: "Industrial Solar",
    description: "Large-scale solar power solutions for manufacturing plants, warehouses, and industrial facilities. Achieve massive energy savings while meeting sustainability goals.",
    hero: "Industrial-Scale Clean Energy",
    benefits: [
      "MW-scale installations possible",
      "Significant reduction in power costs",
      "Ground-mounted and rooftop options",
      "Power purchase agreements available",
      "CSR and sustainability compliance",
      "Energy storage integration options",
    ],
    process: [
      { step: "1", title: "Site Assessment", description: "Detailed evaluation of your industrial facility" },
      { step: "2", title: "Load Analysis", description: "Understanding your power requirements and patterns" },
      { step: "3", title: "Engineering Design", description: "Custom MW-scale system design" },
      { step: "4", title: "Project Financing", description: "Structured financing and PPA options" },
      { step: "5", title: "EPC Execution", description: "Professional project execution" },
      { step: "6", title: "O&M Contract", description: "Comprehensive operations and maintenance" },
    ],
    faqs: [
      { q: "What is the minimum project size?", a: "We typically handle industrial projects starting from 100 kW, with no upper limit. We have executed MW-scale projects across India." },
      { q: "What financing options are available?", a: "Options include CAPEX, OPEX (PPA), and hybrid models. We can structure deals to match your capital and operational requirements." },
      { q: "How does this affect our operations?", a: "Installation is planned to minimize disruption. Most work happens during non-production hours, and our teams are experienced in industrial environments." },
      { q: "What about grid stability?", a: "Large installations include sophisticated power conditioning equipment to ensure grid stability and compliance with all regulations." },
    ],
  },
  rooftop: {
    icon: Warehouse,
    title: "Solar Rooftop",
    description: "Maximize your unused rooftop potential with efficient solar installations. Ideal for all building types - residential, commercial, and institutional.",
    hero: "Unlock Your Rooftop's Potential",
    benefits: [
      "Utilize unused rooftop space",
      "Reduce heat absorption in building",
      "Custom designs for any roof type",
      "Quick installation timelines",
      "Weather-resistant installations",
      "Remote monitoring capabilities",
    ],
    process: [
      { step: "1", title: "Roof Survey", description: "Structural assessment and shadow analysis" },
      { step: "2", title: "System Sizing", description: "Optimal capacity based on roof area and consumption" },
      { step: "3", title: "Mounting Design", description: "Custom mounting solution for your roof type" },
      { step: "4", title: "Permits", description: "Handle all regulatory approvals" },
      { step: "5", title: "Installation", description: "Professional installation with safety protocols" },
      { step: "6", title: "Handover", description: "Training and monitoring system setup" },
    ],
    faqs: [
      { q: "What roof types are suitable?", a: "We install on RCC, metal sheet, tile, and most other roof types. Our engineers design custom mounting systems for each roof type." },
      { q: "Will it damage my roof?", a: "No! Our mounting systems are designed to protect your roof. We use non-penetrating mounts where possible and provide waterproofing for all penetrations." },
      { q: "How much weight will it add?", a: "A typical rooftop solar installation adds about 15-20 kg per sq meter, which is well within the design capacity of most roofs." },
      { q: "What about maintenance?", a: "Solar panels require minimal maintenance - just occasional cleaning. We offer annual maintenance contracts for worry-free operation." },
    ],
  },
  maintenance: {
    icon: Wrench,
    title: "Solar Maintenance",
    description: "Keep your solar investment performing at peak efficiency with our comprehensive maintenance, monitoring, and support services.",
    hero: "Protect Your Solar Investment",
    benefits: [
      "Regular cleaning and inspection",
      "Performance optimization",
      "24/7 monitoring and alerts",
      "Quick repair response",
      "Annual health checkups",
      "Warranty claim assistance",
    ],
    process: [
      { step: "1", title: "System Audit", description: "Complete assessment of your existing system" },
      { step: "2", title: "Performance Check", description: "Identify any underperforming components" },
      { step: "3", title: "Cleaning", description: "Professional panel cleaning" },
      { step: "4", title: "Repairs", description: "Fix any identified issues" },
      { step: "5", title: "Optimization", description: "Fine-tune for maximum output" },
      { step: "6", title: "Reporting", description: "Detailed performance reports" },
    ],
    faqs: [
      { q: "How often should panels be cleaned?", a: "We recommend cleaning every 3-6 months depending on your location. Dusty areas or those with bird activity may need more frequent cleaning." },
      { q: "What's included in the AMC?", a: "Our Annual Maintenance Contract includes quarterly cleaning, bi-annual electrical checks, 24/7 monitoring, and priority repair response." },
      { q: "Can you service systems from other installers?", a: "Yes! We provide maintenance services for solar systems installed by any provider. Our technicians are trained on all major brands." },
      { q: "What happens if something breaks?", a: "Our AMC includes priority response for breakdowns. We maintain inventory of common spares and can replace most components within 24-48 hours." },
    ],
  },
};

type ServiceKey = keyof typeof serviceData;

export default function ServiceDetail() {
  const { serviceType } = useParams<{ serviceType: string }>();

  if (!serviceType || !serviceData[serviceType as ServiceKey]) {
    return <Navigate to="/services" replace />;
  }

  const service = serviceData[serviceType as ServiceKey];
  const Icon = service.icon;

  return (
    <>
      <Helmet>
        {/* SEO: Dynamic title & description with keywords */}
        <title>
          {service.title} – Shivam Green Solar Energy
        </title>
        <meta
          name="description"
          content={`${service.description} Offered by Shivam Green Solar Energy, a solar energy company in India providing rooftop solar solutions.`}
        />
        {/* SEO: Keywords */}
        <meta
          name="keywords"
          content="shivam solar, shivam solar energy, shivamgreen solar, shivam green solar energy, solar energy company in India, rooftop solar solutions"
        />
        {/* SEO: Canonical per service */}
        <link rel="canonical" href={`${baseUrl}/services/${serviceType}`} />
        {/* SEO: Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/services/${serviceType}`} />
        <meta property="og:title" content={`${service.title} – Rooftop Solar Solutions`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={`${baseUrl}/logoo1.png`} />
        {/* SEO: Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${service.title} – Shivam Green Solar Energy`} />
        <meta name="twitter:description" content={service.description} />
      </Helmet>

      {/* SEO: BreadcrumbList schema */}
      <StructuredData
        type="BreadcrumbList"
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
            { "@type": "ListItem", position: 3, name: service.title, item: `${baseUrl}/services/${serviceType}` },
          ],
        }}
      />

      {/* SEO: FAQPage schema for rich results */}
      <StructuredData
        type="FAQPage"
        data={{
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />

      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-hero-pattern">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-solar-gradient shadow-glow flex items-center justify-center">
                <Icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {service.hero}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {service.description}
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Benefits
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Why Choose Our {service.title}?
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <AnimatedSection key={benefit} delay={index * 0.1}>
                  <div className="glass-card p-4 sm:p-6 flex items-start gap-3 sm:gap-4 h-full hover-lift">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <p className="font-medium text-sm sm:text-base">{benefit}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Process
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                How We Work
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {service.process.map((step, index) => (
                <AnimatedSection key={step.step} delay={index * 0.1}>
                  <div className="relative">
                    <div className="glass-card p-5 sm:p-6 h-full">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-solar-gradient shadow-glow flex items-center justify-center mb-3 sm:mb-4 font-display font-bold text-primary-foreground text-base sm:text-lg">
                        {step.step}
                      </div>
                      <h3 className="font-display font-semibold text-base sm:text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                FAQs
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Frequently Asked Questions
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <AccordionItem value={`item-${index}`} className="glass-card px-6">
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-6">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </AnimatedSection>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get a free consultation and customized quote for your {service.title.toLowerCase()} needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Get Free Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/calculator">
                    Calculate Savings
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
