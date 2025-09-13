"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

// Product Grid Skeleton
export function ProductGridSkeleton() {
  const { isDisabled, safeAnimation } = useReducedMotionSafe();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-cream-300 border border-borderNeutral rounded-xl p-4 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: safeAnimation.duration || 0.3, 
            delay: isDisabled ? 0 : index * 0.1 
          }}
        >
          {/* Image Skeleton */}
          <div className="aspect-square bg-cream-200 rounded-lg animate-pulse" />
          
          {/* Content Skeletons */}
          <div className="space-y-3">
            <div className="h-3 bg-cream-200 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-cream-200 rounded animate-pulse w-full" />
            <div className="h-3 bg-cream-200 rounded animate-pulse w-1/2" />
            <div className="h-5 bg-cream-200 rounded animate-pulse w-1/4" />
            <div className="h-8 bg-cream-200 rounded-lg animate-pulse w-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Product Detail Page Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-cream-200 rounded-xl animate-pulse" />
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square bg-cream-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-3 bg-cream-200 rounded animate-pulse w-1/4" />
            <div className="h-8 bg-cream-200 rounded animate-pulse w-3/4" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-5 h-5 bg-cream-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-4 bg-cream-200 rounded animate-pulse w-20" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="h-8 bg-cream-200 rounded animate-pulse w-32" />
            <div className="h-4 bg-cream-200 rounded animate-pulse w-24" />
          </div>

          {/* Description */}
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-4 bg-cream-200 rounded animate-pulse w-full" />
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="h-5 bg-cream-200 rounded animate-pulse w-32" />
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cream-200 rounded-full animate-pulse" />
                  <div className="h-4 bg-cream-200 rounded animate-pulse w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-5 bg-cream-200 rounded animate-pulse w-20" />
              <div className="flex items-center border border-borderNeutral rounded-lg">
                <div className="w-10 h-10 bg-cream-200 animate-pulse" />
                <div className="w-12 h-10 bg-cream-300 border-x border-borderNeutral flex items-center justify-center">
                  <div className="w-8 h-4 bg-cream-200 rounded animate-pulse" />
                </div>
                <div className="w-10 h-10 bg-cream-200 animate-pulse" />
              </div>
            </div>
            <div className="h-12 bg-cream-200 rounded-lg animate-pulse w-full" />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 space-y-6">
        <div className="border-b border-borderNeutral">
          <div className="flex space-x-8">
            {["Description", "Specifications", "Reviews", "Shipping"].map((tab) => (
              <div key={tab} className="py-4">
                <div className="h-5 bg-cream-200 rounded animate-pulse w-24" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-4 bg-cream-200 rounded animate-pulse w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Category Filter Skeleton
export function CategoryFilterSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-cream-200 rounded animate-pulse w-32" />
      <div className="space-y-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-4 h-4 bg-cream-200 rounded animate-pulse" />
            <div className="h-4 bg-cream-200 rounded animate-pulse w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Search Results Skeleton
export function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-3">
        <div className="h-6 bg-cream-200 rounded animate-pulse w-48" />
        <div className="h-4 bg-cream-200 rounded animate-pulse w-32" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-8 bg-cream-200 rounded-full animate-pulse w-20" />
        ))}
      </div>

      {/* Results Grid */}
      <ProductGridSkeleton />
    </div>
  );
}

// Cart Skeleton
export function CartSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-cream-200 rounded animate-pulse w-32" />
      
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex gap-4 p-4 bg-cream-300 rounded-xl border border-borderNeutral">
          <div className="w-20 h-20 bg-cream-200 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-cream-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-cream-200 rounded animate-pulse w-1/2" />
            <div className="h-6 bg-cream-200 rounded animate-pulse w-20" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cream-200 rounded animate-pulse" />
            <div className="w-12 h-8 bg-cream-300 border border-borderNeutral rounded flex items-center justify-center">
              <div className="w-8 h-4 bg-cream-200 rounded animate-pulse" />
            </div>
            <div className="w-8 h-8 bg-cream-200 rounded animate-pulse" />
          </div>
        </div>
      ))}

      {/* Cart Summary */}
      <div className="bg-cream-300 rounded-xl p-6 border border-borderNeutral space-y-4">
        <div className="h-6 bg-cream-200 rounded animate-pulse w-32" />
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex justify-between">
            <div className="h-4 bg-cream-200 rounded animate-pulse w-24" />
            <div className="h-4 bg-cream-200 rounded animate-pulse w-20" />
          </div>
        ))}
        <div className="border-t border-borderNeutral pt-4">
          <div className="flex justify-between">
            <div className="h-6 bg-cream-200 rounded animate-pulse w-32" />
            <div className="h-6 bg-cream-200 rounded animate-pulse w-24" />
          </div>
        </div>
        <div className="h-12 bg-cream-200 rounded-lg animate-pulse w-full" />
      </div>
    </div>
  );
}

