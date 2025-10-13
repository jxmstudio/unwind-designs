"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

import { type Product } from "@/lib/product-utils";
import { formatPrice, isProductPurchasable } from "@/lib/product-utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isDisabled, safeAnimation } = useReducedMotionSafe();
  const {
    name,
    price,
    originalPrice,
    rating,
    reviewCount,
    isOnSale,
    salePercentage,
    category,
    comingSoon
  } = product;

  const isPurchasable = isProductPurchasable(product);

  const handleAddToCart = () => {
    if (!isPurchasable) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0] || '',
      category: product.category,
      shortDescription: product.shortDescription
    });
  };

  return (
    <motion.div 
      className="group bg-cream-400 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-borderNeutral hover:border-brown-300 flex flex-col h-full"
      whileHover={{ 
        y: isDisabled ? 0 : -4,
        transition: { duration: safeAnimation.duration || 0.3 }
      }}
      whileTap={{ 
        scale: isDisabled ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, /* ease: "easeOut" */ }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cream-300">
        {product.images && product.images[0] ? (
          <motion.img
            src={product.images[0]}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: isDisabled ? 1 : 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Placeholder if no image or image fails to load */}
        <div 
          className={`w-full h-full bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center ${product.images && product.images[0] ? 'hidden' : ''}`}
        >
          <div className="text-textPrimary/80 text-body-small text-center px-4">
            {category || 'Product Image'}
          </div>
        </div>
        
        {/* Sale Badge */}
        {isOnSale && salePercentage && (
          <Badge className="absolute top-3 left-3 bg-brown-500 text-white font-semibold border-0">
            -{salePercentage}%
          </Badge>
        )}
        
        {/* Quick Actions - Always visible on mobile */}
        <motion.div 
          className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 sm:w-10 sm:h-10 p-0 bg-cream-400/90 hover:bg-cream-400 text-textPrimary hover:text-brown-500 rounded-full shadow-soft"
              aria-label="Add to wishlist"
            >
              <Heart size={16} />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Add to Cart Overlay or Coming Soon Badge */}
        <motion.div 
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto"
          >
            {!isPurchasable ? (
              <div className="bg-amber-500 text-white font-semibold px-4 py-2 rounded-xl shadow-medium transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-caption">
                {comingSoon ? 'Coming Soon' : 'Unavailable'}
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="bg-brown-500 hover:bg-darkBrown text-white font-semibold px-4 py-2 rounded-xl shadow-medium transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-caption"
              >
                <ShoppingCart size={14} className="mr-1" />
                Add to Cart
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                <Star
                  size={14}
                  className={`${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-cream-200"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-caption text-textPrimary/80 ml-1">
            ({reviewCount})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm sm:text-body-small font-medium text-textPrimary mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-brown-500 transition-colors">
          {name}
        </h3>

        {/* Status Badge */}
        {!isPurchasable && (
          <Badge className="bg-amber-500 text-white font-semibold border-0 mb-2 text-xs sm:text-caption">
            {comingSoon ? 'Coming Soon' : 'Unavailable'}
          </Badge>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base sm:text-lg font-bold text-brown-500">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs sm:text-body-small text-textPrimary/80 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons - Stacked on mobile - pushed to bottom */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          {isPurchasable && (
            <motion.div
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              className="sm:flex-1"
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-brown-500 hover:bg-darkBrown text-white font-semibold transition-colors text-xs px-3 py-1.5 h-9 rounded-md"
              >
                <ShoppingCart size={14} className="mr-1.5" />
                Add to Cart
              </Button>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: isDisabled ? 1 : 1.02 }}
            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
            className="sm:flex-1"
          >
            <Link href={`/products/${product.slug}`} className="block w-full">
              <Button
                variant="outline"
                className="w-full border-2 border-brown-500 text-brown-500 hover:bg-brown-500 hover:border-brown-500 hover:text-white font-semibold transition-colors text-xs px-3 py-1.5 h-9 rounded-md box-border"
              >
                View Details
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
