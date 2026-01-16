
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
const openingImages = [
  {
    id: 1,
    src: "/group.jpeg",
    title: "Inauguration Ceremony",
    date: "Jan 15, 2026"
  },
  {
    id: 2,
    src: "/dii.jpeg",
    title: "Key Handover",
    date: "Jan 15, 2026"
  },
  {
    id: 3,
    src: "/group3.jpeg",
    title: "Team Celebration",
    date: "Jan 15, 2026"
  },
  {
    id: 4,
    src: "/dii4.jpeg",
    title: "Key Handover",
    date: "Jan 15, 2026"
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <>
      <Helmet>
        <title>Grand Opening | Shivam GreenSolar Energy</title>
        <meta name="description" content="Highlights from our Grand Opening ceremony." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-muted/20 flex items-center justify-center">
        <section className="container-custom">

          <div className="max-w-6xl mx-auto bg-white dark:bg-card border border-border/50 shadow-xl rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12 text-center border-b border-border/50">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Milestone Event
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-foreground mb-4">
                Grand Opening
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Celebrating the beginning of our journey towards a sustainable future.
                A glimpse into our inauguration day.
              </p>
            </div>

            <div className="p-4 md:p-8 bg-muted/10">
              <Carousel
                plugins={[plugin.current]}
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full max-w-4xl mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {openingImages.map((img) => (
                    <CarouselItem key={img.id} className="basis-full">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl bg-background transition-all duration-300 mx-auto"
                        onClick={() => setSelectedImage(img.src)}
                      >
                        <div className="aspect-video relative overflow-hidden bg-black">
                          <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-contain transition-transform duration-700"
                          />
                          {/* Removed group-hover:scale to avoid weird containment scaling issues, or kept it subtle */}

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                            {/* Overlay logic */}
                          </div>

                          {/* Text Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                            <h3 className="font-semibold text-xl md:text-2xl leading-none mb-2">{img.title}</h3>
                            <p className="text-sm md:text-base text-white/80">{img.date}</p>
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-6">
                  <CarouselPrevious className="static translate-y-0 hover:bg-primary hover:text-white border-primary/20" />
                  <CarouselNext className="static translate-y-0 hover:bg-primary hover:text-white border-primary/20" />
                </div>
              </Carousel>
            </div>
          </div>

        </section>
      </main>

      <Footer showCTA={false} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={selectedImage}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
