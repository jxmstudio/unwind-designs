"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
import { cardHover } from "@/lib/motion";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    image?: string;
    category: string;
    rating: number;
    reviewCount: number;
    badge?: string;
    badgeColor?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
  };
  onQuickView?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
}

export function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart, 
  onWishlist 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(product.id);
  };

  const handleQuickView = () => {
    onQuickView?.(product.id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id);
  };

  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
  const savingsPercentage = product.compareAtPrice ? Math.round((savings / product.compareAtPrice) * 100) : 0;

  return (
    <motion.div
      className="group relative bg-surface-50 border border-borderNeutral/60 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
      variants={cardHover}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <div className="w-full h-full bg-gradient-to-br from-surface-200 to-surface-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-textPrimary/80">
              <div className="text-4xl mb-2">🚐</div>
              <p className="text-body-small font-medium">{product.category}</p>
            </div>
          )}
        </div>

        {/* Enhanced Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <Badge 
              variant="destructive" 
              size="sm"
              className="shadow-soft"
            >
              {product.badge}
            </Badge>
          )}
          {product.isNew && (
            <Badge 
              variant="success" 
              size="sm"
              className="shadow-soft"
            >
              New
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge 
              variant="warning" 
              size="sm"
              className="shadow-soft"
            >
              Best Seller
            </Badge>
          )}
        </div>

        {/* Enhanced Wishlist Button */}
        <motion.button
          onClick={handleWishlist}
          className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-textPrimary/80 hover:text-error-500 transition-all duration-200 shadow-medium hover:shadow-lg"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-5 h-5 ${isWishlisted ? 'fill-error-500 text-error-500' : ''}`} 
          />
        </motion.button>

        {/* Enhanced Quick View Button */}
        <motion.div
          className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleQuickView}
              variant="secondary"
              size="sm"
              className="bg-white text-brown-500 hover:bg-brown-500 hover:text-white border-0 shadow-lg text-caption px-3 py-2 font-semibold"
            >
              <Eye className="w-3 h-3 mr-1" />
              Quick View
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Savings Badge */}
        {savings > 0 && (
          <div className="absolute bottom-4 left-4">
            <Badge 
              variant="destructive" 
              size="sm"
              className="shadow-soft"
            >
              Save ${savings.toFixed(0)}
            </Badge>
          </div>
        )}
      </div>

      {/* Enhanced Content */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <p className="text-caption text-accent-600 uppercase tracking-wider font-semibold">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-semibold text-textPrimary text-body-small leading-tight group-hover:text-accent-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Enhanced Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(product.rating)
                    ? "text-warning-400 fill-current"
                    : "text-surface-300"
                }`}
              />
            ))}
          </div>
          <span className="text-caption text-textPrimary/80 font-medium">
            ({product.reviewCount})
          </span>
        </div>

        {/* Enhanced Price */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-accent-600">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-body-small text-textPrimary/80 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-body-small text-error-600 font-semibold">
              Save {savingsPercentage}%!
            </p>
          )}
        </div>

        {/* Enhanced Actions */}
        <div className="flex gap-3 pt-2">
          {product.comingSoon ? (
            <div className="flex-1 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 text-yellow-900 font-semibold py-3 rounded-lg text-center">
              <div className="text-sm">🚀 Coming Soon</div>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              size="default"
              className="flex-1 bg-accent-500 hover:bg-accent-600 text-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-300/50 rounded-2xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
