import { Helmet } from "react-helmet-async";

// SEO: Extend schema types to include FAQPage for rich results
interface StructuredDataProps {
  type: "Organization" | "LocalBusiness" | "WebSite" | "Service" | "BreadcrumbList" | "FAQPage"; // SEO: Added FAQPage
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(baseSchema)}</script>
    </Helmet>
  );
}

// Pre-configured schemas
export const organizationSchema = {
  name: "Shivam Green Solar Energy",
  alternateName: "Shivam GreenSolar Energy",
  url: "https://shivamgreensolarenergy.in",
  logo: "https://shivamgreensolarenergy.in/logoo1.png",
  description: "Leading solar energy company in India offering rooftop solar solutions for residential, commercial, and industrial properties.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kalyanpur west",
    addressLocality: "Lucknow",
    postalCode: "226022",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8009430952",
    contactType: "Customer Service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [
    "https://www.instagram.com/shivamgreensolar",
  ],
};

export const localBusinessSchema = {
  ...organizationSchema,
  "@type": "LocalBusiness",
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-18:00",
  geo: {
    "@type": "GeoCoordinates",
    latitude: "26.90075",
    longitude: "80.971306",
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  name: "Shivam Green Solar Energy",
  alternateName: "Shivam GreenSolar Energy",
  url: "https://shivamgreensolarenergy.in",
  description: "Solar energy company in India providing rooftop solar solutions",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://shivamgreensolarenergy.in/?s={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// SEO: Helper to build BreadcrumbList
export const buildBreadcrumbList = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

