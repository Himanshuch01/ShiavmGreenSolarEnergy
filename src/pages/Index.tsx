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
        {/* SEO: Optimized title with primary keywords + brand */}
        <title>Shivam Green Solar Energy | Solar Energy Company in India & Rooftop Solar Solutions</title>
        <meta
          name="description"
          /* SEO: Refined description (150–160 chars) with target keywords */
          content="Shivam Green Solar Energy (shivam solar, shivam solar energy) offers rooftop solar solutions across India. A trusted solar energy company in India with 150+ installations."
        />
        <meta
          name="keywords"
          /* SEO: Include primary keywords naturally */
          content="shivam solar, shivam solar energy, shivamgreen solar, shivam green solar energy, solar energy company in India, rooftop solar solutions"
        />
        <meta name="author" content="Shivam GreenSolar Energy" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        {/* SEO: Canonical homepage */}
        <link rel="canonical" href={baseUrl} />

        {/* SEO: Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content="Shivam Green Solar Energy | Solar Energy Company in India" />
        <meta property="og:description" content="Rooftop solar solutions by a trusted solar energy company in India." />
        <meta property="og:image" content={`${baseUrl}/logoo1.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Shivam GreenSolar Energy" />
        <meta property="og:locale" content="en_IN" />

        {/* SEO: Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content="Shivam Green Solar Energy" />
        <meta name="twitter:description" content="Rooftop solar solutions across India by a trusted provider." />
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
