"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, X, Truck, Shield, Clock } from "lucide-react";
import { modalBackdrop, modalContent } from "@/lib/motion";

interface QuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    image?: string;
    category: string;
    rating: number;
    reviewCount: number;
    description: string;
    features: string[];
    specifications: Record<string, string>;
    badge?: string;
    badgeColor?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
  } | null;
}

export function QuickView({ isOpen, onClose, product }: QuickViewProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
  const savingsPercentage = product.compareAtPrice ? Math.round((savings / product.compareAtPrice) * 100) : 0;

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    // Add to cart logic
    onClose();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-cream-400 rounded-2xl shadow-2xl"
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-textPrimary hover:bg-white transition-colors shadow-soft"
              aria-label="Close quick view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Side - Image */}
              <div className="relative">
                <div className="w-full h-80 lg:h-full bg-gradient-to-br from-brown-200 to-brown-300 flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-textPrimary/80">
                      <div className="text-6xl mb-4">🚐</div>
                      <p className="text-lg font-medium">{product.category}</p>
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <Badge className={`${product.badgeColor || 'bg-red-500'} text-white border-0`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white border-0">
                      New
                    </Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge className="bg-amber-500 text-white border-0">
                      Best Seller
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <motion.button
                  onClick={handleWishlist}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-textPrimary/80 hover:text-red-500 transition-colors shadow-soft"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </motion.button>
              </div>

              {/* Right Side - Content */}
              <div className="p-6 lg:p-8 space-y-6">
                {/* Header */}
                <div>
                  <p className="text-sm text-textPrimary/80 uppercase tracking-wide font-medium mb-2">
                    {product.category}
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-textPrimary mb-3 leading-tight">
                    {product.name}
                  </h2>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-cream-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-textPrimary/80">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-brown-500">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xl text-textPrimary/80 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-lg text-red-600 font-medium">
                      Save ${savings.toFixed(2)} ({savingsPercentage}% off!)
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-textPrimary/80 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-textPrimary mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-textPrimary/80">
                        <div className="w-2 h-2 bg-brown-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-brown-400 mx-auto mb-2" />
                    <p className="text-xs text-textPrimary/80">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-brown-400 mx-auto mb-2" />
                    <p className="text-xs text-textPrimary/80">2 Year Warranty</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-brown-400 mx-auto mb-2" />
                    <p className="text-xs text-textPrimary/80">Fast Delivery</p>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-textPrimary font-medium">Quantity:</label>
                    <div className="flex items-center border border-borderNeutral rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-textPrimary hover:bg-brown-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 h-10 flex items-center justify-center text-textPrimary border-x border-borderNeutral">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-textPrimary hover:bg-brown-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      size="lg"
                      className="flex-1 bg-brown-500 hover:bg-darkBrown text-cream-400 py-4 text-lg font-semibold rounded-xl"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* View Full Details Link */}
                <div className="text-center pt-4 border-t border-borderNeutral">
                  <button className="text-brown-500 hover:text-darkBrown font-medium transition-colors">
                    View Full Product Details →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
