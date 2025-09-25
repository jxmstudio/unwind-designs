"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Star, Clock } from "lucide-react";
import { staggerContainer, staggerItem, sectionReveal, modalBackdrop, modalContent } from "@/lib/motion";
import { useFeatureFlag } from "@/lib/feature-flags";
import { getFeaturedGalleryItems, getGalleryCategories, getGalleryByCategory, GalleryItem } from "@/data/gallery";
import Link from "next/link";

interface GalleryPreviewProps {
  items?: GalleryItem[];
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const enhancedGalleryEnabled = useFeatureFlag('FEATURE_ENHANCED_GALLERY');
  
  // Use enhanced gallery data if available, otherwise use provided items or fallback to placeholder
  const featuredItems = enhancedGalleryEnabled ? getFeaturedGalleryItems().slice(0, 6) : [];
  const categories = enhancedGalleryEnabled ? getGalleryCategories() : [];
  
  // Determine display items based on feature flag and props
  let displayItems: GalleryItem[] = [];
  
  if (enhancedGalleryEnabled) {
    displayItems = selectedCategory === 'all' 
      ? featuredItems 
      : getGalleryByCategory(selectedCategory as GalleryItem['category']).slice(0, 6);
  } else if (items && items.length > 0) {
    displayItems = items;
  } else {
    // Fallback to placeholder when no items provided
    displayItems = [{
      id: 'placeholder',
      title: 'No Images Available',
      description: 'Images will be available soon',
      category: 'Complete Fitout',
      subcategory: 'Placeholder',
      images: ['/images/placeholder.svg'],
      featuredImage: '/images/placeholder.svg',
      vehicle: 'Toyota Troopcarrier',
      completionDate: new Date(),
      features: [],
      tags: ['Placeholder'],
      buildTime: 'TBD',
      difficulty: 'Easy',
      estimatedCost: { min: 0, max: 0 },
      isPopular: false,
      isFeatured: false
    }];
  }

  const openLightbox = (image: GalleryItem, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % displayItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(displayItems[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + displayItems.length) % displayItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(displayItems[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <motion.section 
      className="py-20 bg-cream-300"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-textPrimary mb-4">
            {enhancedGalleryEnabled ? "Our Latest Builds" : "Gallery"}
          </h2>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto">
            {enhancedGalleryEnabled ? 
              "See real customer builds and get inspired for your own Troopy transformation." :
              "Explore our completed fitouts and get inspired for your own project."
            }
          </p>
          
          {/* Category Filter */}
          {enhancedGalleryEnabled && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-body-small font-medium transition-all duration-200 ${
                  selectedCategory === 'all' 
                    ? 'bg-brown-500 text-white' 
                    : 'bg-cream-400 text-textSecondary hover:bg-brown-100'
                }`}
              >
                All Builds
              </button>
              {categories.slice(0, 5).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-body-small font-medium transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-brown-500 text-white' 
                      : 'bg-cream-400 text-textSecondary hover:bg-brown-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="group cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-soft hover:shadow-medium transition-all duration-300">
                  {/* Image Container */}
                  <div className="w-full h-64 bg-gradient-to-br from-brown-200 to-brown-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    {item.featuredImage && item.featuredImage !== '/images/placeholder.svg' ? (
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-textSecondary">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-body-small font-medium">{item.category}</p>
                        {item.kit && (
                          <p className="text-caption text-textSecondary">{item.kit} Kit</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.isFeatured && (
                      <div className="px-2 py-1 bg-brown-500 text-white text-caption rounded-full font-medium">
                        Featured
                      </div>
                    )}
                    {item.isPopular && (
                      <div className="px-2 py-1 bg-yellow-500 text-white text-caption rounded-full font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Popular
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Enhanced Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-body-small font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-caption text-white/90 line-clamp-2">
                      {item.description}
                    </p>
                    {item.buildTime && item.buildTime !== 'N/A' && item.buildTime !== 'TBD' && (
                      <div className="flex items-center gap-1 mt-1 text-caption text-white/80">
                        <Clock className="w-3 h-3" />
                        <span>{item.buildTime}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Click Handler */}
                  <button
                    onClick={() => openLightbox(item, index)}
                    className="absolute inset-0 w-full h-full"
                    aria-label={`Open ${item.title} in lightbox`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/our-fitouts">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              {enhancedGalleryEnabled ? "View All Builds" : "View Full Gallery"}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeLightbox}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] mx-4"
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="w-full h-96 bg-gradient-to-br from-brown-200 to-brown-300 rounded-lg overflow-hidden">
              {selectedImage.featuredImage && selectedImage.featuredImage !== '/images/placeholder.svg' ? (
                <img
                  src={selectedImage.featuredImage}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-textSecondary">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-xl font-medium">{selectedImage.category}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-lg text-white/95">{selectedImage.description}</p>
              <p className="text-body-small text-white/90 mt-2">
                {currentIndex + 1} of {displayItems.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}
