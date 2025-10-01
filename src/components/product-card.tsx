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
      className="group bg-cream-400 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-borderNeutral hover:border-brown-300"
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
          <img
            src={product.images[0]}
            alt={name}
            className="w-full h-full object-cover"
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
        
        {/* Quick Actions */}
        <motion.div 
          className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 bg-cream-400/90 hover:bg-cream-400 text-textPrimary hover:text-brown-500 rounded-full shadow-soft"
            >
              <Heart size={16} />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Add to Cart Overlay or Coming Soon Badge */}
        <motion.div 
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
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
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-cream-200"
                }`}
              />
            ))}
          </div>
          <span className="text-caption text-textPrimary/80 ml-1">
            ({reviewCount})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-body-small font-medium text-textPrimary mb-2 line-clamp-2 group-hover:text-brown-500 transition-colors">
          {name}
        </h3>

        {/* Status Badge */}
        {!isPurchasable && (
          <Badge className="bg-amber-500 text-white font-semibold border-0 mb-2 text-caption">
            {comingSoon ? 'Coming Soon' : 'Unavailable'}
          </Badge>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-brown-500">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-body-small text-textPrimary/80 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <Link href={`/products/${product.slug}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className="w-full border-brown-500 text-brown-500 hover:bg-brown-500 hover:border-brown-500 hover:text-white font-semibold transition-colors"
            >
              View Details
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
