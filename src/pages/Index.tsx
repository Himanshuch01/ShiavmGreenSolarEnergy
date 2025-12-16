import { Helmet } from "react-helmet-async";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import StructuredData, { organizationSchema, websiteSchema } from "@/components/seo/StructuredData";

const baseUrl = "https://www.shivamgreensolarenergy.in";

export default function Index() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Shivam GreenSolar Energy - India's Leading Solar Energy Solutions Provider</title>
        <meta
          name="description"
          content="Transform your home or business with sustainable solar solutions. Reduce energy costs by up to 90% with Shivam GreenSolar Energy's premium solar installations across India. 150+ installations, 120+ happy customers."
        />
        <meta
          name="keywords"
          content="solar energy, solar panels, solar installation, renewable energy, solar rooftop, India solar, green energy, clean energy, solar power, solar system, solar inverter, solar battery, Lucknow solar, Uttar Pradesh solar"
        />
        <meta name="author" content="Shivam GreenSolar Energy" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={baseUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content="Shivam GreenSolar Energy - India's Leading Solar Energy Solutions Provider" />
        <meta property="og:description" content="Transform your home or business with sustainable solar solutions. Reduce energy costs by up to 90% with premium solar installations across India." />
        <meta property="og:image" content={`${baseUrl}/logoo1.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Shivam GreenSolar Energy" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content="Shivam GreenSolar Energy - India's Leading Solar Energy Solutions Provider" />
        <meta name="twitter:description" content="Transform your home or business with sustainable solar solutions. Reduce energy costs by up to 90%." />
        <meta name="twitter:image" content={`${baseUrl}/logoo1.png`} />
        <meta name="twitter:site" content="@ShivamGreenSolar" />
        <meta name="twitter:creator" content="@ShivamGreenSolar" />

        {/* Additional SEO */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Lucknow" />
        <meta name="geo.position" content="26.8467;80.9462" />
        <meta name="ICBM" content="26.8467, 80.9462" />
      </Helmet>
      
      <StructuredData type="Organization" data={organizationSchema} />
      <StructuredData type="WebSite" data={websiteSchema} />
      
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
