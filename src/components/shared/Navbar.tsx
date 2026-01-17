import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Services",
    path: "/services",
    subLinks: [
      { name: "Residential Solar", path: "/services/residential" },
      { name: "Commercial Solar", path: "/services/commercial" },
      { name: "Industrial Solar", path: "/services/industrial" },
      { name: "Solar Rooftop", path: "/services/rooftop" },
      { name: "Solar Maintenance", path: "/services/maintenance" },
    ],
  },
  { name: "Calculator", path: "/calculator" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out font-medium",
        isScrolled
          ? "glass py-3 shadow-lg backdrop-blur-md bg-white/80 dark:bg-black/80"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            <img
              src="/logoo1.png"
              alt="Shivam GreenSolar Energy Logo"
              className="h-10 sm:h-12 w-auto relative transform transition-transform duration-300 group-hover:rotate-3"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl text-foreground leading-none tracking-tight hidden min-[375px]:block">
              Shivam <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">GreenSolar</span>
            </span>
            <span className="text-[10px] tracking-widest text-muted-foreground font-medium uppercase hidden min-[375px]:block">
              Energy 
            </span>
            <span className="font-display font-bold text-base text-foreground min-[375px]:hidden">
              <span className="text-primary">SG</span> Energy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-white/40 dark:bg-black/20 backdrop-blur-sm p-1.5 rounded-full border border-white/20 shadow-sm">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.subLinks && setOpenDropdown(link.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.path}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-1 group overflow-hidden",
                  location.pathname === link.path ||
                    (link.subLinks && location.pathname.startsWith(link.path))
                    ? "text-primary-foreground font-semibold shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                {/* Active Background Animation */}
                {(location.pathname === link.path ||
                  (link.subLinks && location.pathname.startsWith(link.path))) && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                <span className="relative z-10 flex items-center gap-1">
                  {link.name}
                  {link.subLinks && (
                    <ChevronDown className={cn(
                      "w-3 h-3 transition-transform duration-300",
                      openDropdown === link.name ? "rotate-180" : ""
                    )} />
                  )}
                </span>

                {/* Hover Underline (for non-active items) */}
                {!(location.pathname === link.path || (link.subLinks && location.pathname.startsWith(link.path))) && (
                  <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-primary/50 w-0 group-hover:w-[calc(100%-2rem)] transition-all duration-300 rounded-full" />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {link.subLinks && openDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 w-64 glass-card p-3 border border-white/50 shadow-xl rounded-2xl overflow-hidden z-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/90 dark:from-black/60 dark:to-black/90 backdrop-blur-xl -z-10" />
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        to={subLink.path}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl text-sm transition-all duration-200 group/item relative overflow-hidden",
                          location.pathname === subLink.path
                            ? "text-primary font-medium bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                        )}
                      >
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300",
                          location.pathname === subLink.path ? "bg-primary scale-125" : "bg-primary/30 group-hover/item:bg-primary"
                        )} />
                        {subLink.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+918009430952"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <span>+91 8009430952</span>
          </a>
          <Button
            variant="default"
            size="lg"
            className="relative overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 rounded-full px-8 bg-gradient-to-r from-primary to-secondary border-0 group"
            asChild
          >
            <Link to="/contact">
              <span className="relative z-10">Get Free Quote</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7 text-foreground" />
            ) : (
              <Menu className="w-7 h-7 text-foreground" />
            )}
          </motion.div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden shadow-2xl"
          >
            <div className="container-custom py-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => !link.subLinks && setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all",
                      location.pathname === link.path
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.name}
                    {link.name === "Get Free Quote" && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {link.subLinks && (
                    <div className="ml-4 mt-2 pl-4 border-l-2 border-primary/20 space-y-1">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                            location.pathname === subLink.path
                              ? "text-primary bg-primary/5 font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6 mt-4 border-t border-border/50"
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20"
                  asChild
                >
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get Free Quote</Link>
                </Button>

                <a
                  href="tel:+918009430952"
                  className="flex items-center justify-center gap-2 mt-4 text-sm font-medium text-muted-foreground"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call us: +91 8009430952</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
