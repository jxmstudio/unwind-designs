"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// Import actual product data
import { allProducts } from "@/data/products";

// Get featured products from actual product data
const featuredProducts = [
  {
    id: "wander-troopy-flat-pack",
    name: "Wander Troopy Flat Pack",
    price: 3750.00,
    originalPrice: 4400.00,
    image: "/brand/wander-troopy-flat-pack-346203.jpg",
    rating: 4.8,
    reviewCount: 189,
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
    category: "Complete Kits"
  },
  {
    id: "roam-troopy-flat-pack-general",
    name: "Roam Troopy Flat Pack",
    price: 6700.00,
    originalPrice: 7200.00,
    image: "/images/placeholder.svg", // Will be updated when actual images are available
    rating: 4.8,
    reviewCount: 267,
    badge: "Most Popular",
    badgeColor: "bg-blue-500",
    category: "Complete Kits"
  },
  {
    id: "troopy-side-panels-storage",
    name: "Troopy Side Panels with Storage",
    price: 850.00,
    originalPrice: 950.00,
    image: "/brand/troopy-side-panels-with-added-storage-637344.jpg",
    rating: 4.7,
    reviewCount: 38,
    badge: "Popular",
    badgeColor: "bg-green-500",
    category: "Panels"
  },
  {
    id: "cushion-set-troopy-kits",
    name: "Cushion Set For Troopy Flat Packs",
    price: 850.00,
    originalPrice: 895.00,
    image: "/brand/cushion-set-for-troopy-flat-packs-312040.jpg",
    rating: 4.7,
    reviewCount: 94,
    badge: "Accessory",
    badgeColor: "bg-purple-500",
    category: "Accessories"
  }
];

export function FeaturedSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <motion.section 
      className="py-24 bg-gradient-to-b from-cream-400 to-surface-100"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-textPrimary mb-6">
            Featured Flat Packs
          </h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
            Our most popular Toyota Troopcarrier flat pack solutions. Professional-grade systems with Australia-wide shipping included.
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slider Container */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    className="bg-cream-300 rounded-xl p-8 border border-borderNeutral shadow-soft hover:shadow-medium transition-all duration-300"
                    variants={staggerItem}
                    whileHover={{ y: -8 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Product Image */}
                      <div className="relative">
                        <div className="w-full h-64 bg-cream-200 rounded-lg flex items-center justify-center">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={`${product.name} - ${product.category} fitout solution`}
                              className="w-full h-full object-cover rounded-lg"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <div 
                            className="text-textSecondary text-center"
                            style={{ display: product.image ? 'none' : 'block' }}
                          >
                            <div className="text-4xl mb-2" role="img" aria-label="Vehicle icon">🚐</div>
                            <p className="text-body-small">{product.category}</p>
                          </div>
                        </div>
                        
                        {/* Badge */}
                        {product.badge && (
                          <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white border-0`}>
                            {product.badge}
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-textPrimary mb-2">
                            {product.name}
                          </h3>
                          <p className="text-textSecondary">
                            Category: {product.category}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-cream-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-body-small text-textSecondary">
                            ({product.reviewCount} reviews)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-brown-500">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-lg text-textSecondary line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.originalPrice && (
                            <p className="text-body-small text-red-600 font-medium">
                              Save ${(product.originalPrice - product.price).toFixed(2)}!
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3">
                          <Link href={`/product/${product.id}`}>
                            <Button className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-6 py-3 rounded-xl">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          </Link>
                          <Link href={`/product/${product.id}`}>
                            <Button variant="outline" className="border-borderNeutral text-textPrimary hover:bg-brown-100 px-6 py-3 rounded-xl">
                              Quick View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-brown-500 scale-125' 
                    : 'bg-borderNeutral hover:bg-brown-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream-300 rounded-full flex items-center justify-center text-textPrimary hover:bg-brown-100 transition-colors border border-borderNeutral"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream-300 rounded-full flex items-center justify-center text-textPrimary hover:bg-brown-100 transition-colors border border-borderNeutral"
          >
            →
          </button>
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/flat-packs">
            <Button className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-4 text-lg rounded-xl">
              View All Flat Packs
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
