"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const featuredProducts = [
  {
    id: "1",
    name: "Roam Troopy Flat Pack",
    price: 5950.00,
    originalPrice: 6500.00,
    image: "",
    rating: 4.8,
    reviewCount: 78,
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
    category: "Storage"
  },
  {
    id: "2",
    name: "Bushman DC85-X 85L Caravan Fridge",
    price: 1473.00,
    originalPrice: 1600.00,
    image: "",
    rating: 4.9,
    reviewCount: 134,
    badge: "Sale",
    badgeColor: "bg-red-500",
    category: "Appliances"
  },
  {
    id: "3",
    name: "Troopy Side Panels with Storage",
    price: 850.00,
    originalPrice: 950.00,
    image: "",
    rating: 4.7,
    reviewCount: 156,
    badge: "New",
    badgeColor: "bg-green-500",
    category: "Storage"
  },
  {
    id: "4",
    name: "12V Dimmable Reading Light",
    price: 80.00,
    originalPrice: null,
    image: "",
    rating: 4.8,
    reviewCount: 127,
    badge: null,
    badgeColor: "",
    category: "Lighting"
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
                            />
                          ) : (
                            <div className="text-textSecondary text-center">
                              <div className="text-4xl mb-2" role="img" aria-label="Vehicle icon">🚐</div>
                              <p className="text-sm">{product.category}</p>
                            </div>
                          )}
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
                          <span className="text-sm text-textSecondary">
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
                            <p className="text-sm text-red-600 font-medium">
                              Save ${(product.originalPrice - product.price).toFixed(2)}!
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3">
                          <Button className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-6 py-3 rounded-xl">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" className="border-borderNeutral text-textPrimary hover:bg-brown-100 px-6 py-3 rounded-xl">
                            Quick View
                          </Button>
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
