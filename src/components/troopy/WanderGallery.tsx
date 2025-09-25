"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const wanderGalleryImages = [
  {
    src: "/brand/wandertroop1.jpg",
    alt: "Wander Kit in Toyota Troopcarrier - Adventure Setup",
    title: "Adventure Ready",
    description: "Complete Wander Kit setup in a Toyota Troopcarrier"
  },
  {
    src: "/brand/wandertroop2.webp", 
    alt: "Wander Kit Storage Solutions",
    title: "Smart Storage",
    description: "Efficient storage compartments and organization"
  },
  {
    src: "/brand/wandertroop3.webp",
    alt: "Wander Kit Kitchen Setup",
    title: "Compact Kitchen",
    description: "Functional kitchen setup for weekend adventures"
  }
];

export function WanderGallery() {
  const { isDisabled } = useReducedMotionSafe();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % wanderGalleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? wanderGalleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <m.div
            initial={isDisabled ? {} : "hidden"}
            whileInView={isDisabled ? {} : "visible"}
            viewport={{ once: true, margin: "-100px" }}
            variants={isDisabled ? {} : staggerContainer}
          >
            {/* Section Header */}
            <m.div variants={isDisabled ? {} : staggerItem} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-4">
                See the Wander Kit in Action
              </h2>
              <p className="text-lg text-textSecondary max-w-2xl mx-auto">
                Real setups from fellow adventurers who chose the Wander Kit for their weekend escapes and budget-conscious builds.
              </p>
            </m.div>

            {/* Gallery Grid */}
            <m.div 
              variants={isDisabled ? {} : staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {wanderGalleryImages.map((image, index) => (
                <m.div
                  key={index}
                  variants={isDisabled ? {} : staggerItem}
                  whileHover={isDisabled ? {} : { y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="overflow-hidden bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <m.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ZoomIn className="w-6 h-6 text-green-600" />
                        </m.div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-textPrimary mb-2">
                        {image.title}
                      </h3>
                      <p className="text-textSecondary text-body-small">
                        {image.description}
                      </p>
                    </div>
                  </Card>
                </m.div>
              ))}
            </m.div>

            {/* CTA */}
            <m.div variants={isDisabled ? {} : staggerItem} className="text-center mt-12">
              <p className="text-textSecondary mb-6">
                Ready to start your own Wander Kit adventure?
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('configurations');
                  if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - 120;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                View Wander Configurations
              </Button>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:bg-white/20 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:bg-white/20 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Image */}
            <m.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={wanderGalleryImages[selectedImage].src}
                alt={wanderGalleryImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {wanderGalleryImages[selectedImage].title}
                </h3>
                <p className="text-white/80">
                  {wanderGalleryImages[selectedImage].description}
                </p>
              </div>
            </m.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-body-small">
              {selectedImage + 1} of {wanderGalleryImages.length}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
