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
  name: "Shivam GreenSolar Energy",
  url: "https://www.shivamgreensolarenergy.in",
  logo: "https://www.shivamgreensolarenergy.in/logoo1.png",
  description: "Leading solar energy solutions provider in India, offering residential, commercial, and industrial solar installations.",
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
    "https://www.facebook.com/shivamgreensolar",
    "https://twitter.com/ShivamGreenSolar",
    "https://www.linkedin.com/company/shivamgreensolar",
    "https://www.instagram.com/shivamgreensolar",
  ],
};

export const localBusinessSchema = {
  ...organizationSchema,
  "@type": "LocalBusiness",
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-18:00",
};

export const websiteSchema = {
  name: "Shivam GreenSolar Energy",
  url: "https://www.shivamgreensolarenergy.in",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.shivamgreensolarenergy.in/search?q={search_term_string}",
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

