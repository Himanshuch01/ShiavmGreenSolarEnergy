import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: [
    { name: "Residential Solar", path: "/services/residential" },
    { name: "Commercial Solar", path: "/services/commercial" },
    { name: "Industrial Solar", path: "/services/industrial" },
    { name: "Solar Rooftop", path: "/services/rooftop" },
    { name: "Solar Maintenance", path: "/services/maintenance" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about#team" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
  resources: [
    { name: "Solar Calculator", path: "/calculator" },
    { name: "FAQs", path: "/faqs" },
    { name: "Solar Guide", path: "/guide" },
    { name: "Case Studies", path: "/case-studies" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/shivamgreensolar/", label: "Instagram" },
];

interface FooterProps {
  showCTA?: boolean;
}

export default function Footer({ showCTA = true }: FooterProps) {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      {showCTA && (
        <div className="container-custom">
          <div className="relative -top-16 bg-gradient-to-r from-primary via-primary/90 to-secondary/90 rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-xl">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight">
                  Start Your Solar Journey
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed font-light">
                  Free consultation and a tailored solar solution designed for your property.
                </p>
              </div>
              <Button variant="secondary" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8" asChild>
                <Link to="/contact" className="group/btn flex items-center gap-2">
                  <span className="font-medium text-primary">Get Started</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className={`container-custom pb-8 sm:pb-12 ${showCTA ? 'pt-0' : 'pt-16 sm:pt-20'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-6">
              <img
                src="/logoo1.png"
                alt="Shivam GreenSolar Energy Logo"
                className="h-8 sm:h-10 w-auto"
              />
              <span className="font-display font-bold text-lg sm:text-xl">
                Shivam <span className="text-primary">GreenSolar</span> Energy
              </span>
            </Link>
            <p className="text-background/70 mb-4 sm:mb-6 max-w-sm text-sm sm:text-base">
              Leading the renewable energy revolution with innovative solar solutions
              for homes, businesses, and industries. Power your future sustainably.
            </p>
            {/* SEO: Add sr-only NAP + local keywords without changing UI */}
            <p className="sr-only">
              Shivam Green Solar Energy (shivam solar, shivam solar energy, shivamgreen solar) is a solar energy company in India based in Lucknow, Uttar Pradesh, offering rooftop solar solutions and consultation.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="mailto:info@shivamgreensolar.com"
                className="flex items-center gap-2 sm:gap-3 text-background/70 hover:text-primary transition-colors text-sm sm:text-base break-words"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>shivamgreensolar28@gmail.com</span>
              </a>
              <div className="flex flex-col gap-2 sm:gap-3">
                <a
                  href="tel:+918009430952"
                  className="flex items-center gap-2 sm:gap-3 text-background/70 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>+91 8009430952</span>
                </a>
                <a
                  href="tel:+918400713758"
                  className="flex items-center gap-2 sm:gap-3 text-background/70 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>+91 8400713758</span>
                </a>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-background/70 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" />
                <span>Kalyanpur west, Lucknow 226022</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {/* SEO: Add rel="nofollow" for placeholder pages to avoid crawl of 404s */}
                  <Link
                    to={link.path}
                    rel={link.path === "/careers" || link.path === "/blog" ? "nofollow" : undefined}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {/* SEO: Add rel="nofollow" for placeholder resources to avoid crawl of 404s */}
                  <Link
                    to={link.path}
                    rel={["/faqs", "/guide", "/case-studies"].includes(link.path) ? "nofollow" : undefined}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Shivam GreenSolar Energy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
