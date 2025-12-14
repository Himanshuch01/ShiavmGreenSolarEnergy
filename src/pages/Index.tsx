import { Helmet } from "react-helmet-async";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Shivam GreenSolar Energy - India's Leading Solar Energy Solutions Provider</title>
        <meta
          name="description"
          content="Transform your home or business with sustainable solar solutions. Reduce energy costs by up to 90% with Shivam GreenSolar Energy's premium solar installations across India."
        />
        <meta
          name="keywords"
          content="solar energy, solar panels, solar installation, renewable energy, solar rooftop, India solar, green energy"
        />
      </Helmet>
      
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
