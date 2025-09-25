"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Star, ShoppingCart, Info } from "lucide-react";
import { useState } from "react";
import { useFeatureFlag } from "@/lib/feature-flags";
import { useCart } from "@/lib/cart-context";
import { getUpsellsByIds, UpsellProduct } from "@/data/upsells";

interface RecommendedItemsProps {
  upsellIds?: string[];
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showAddToCart?: boolean;
  className?: string;
}

export function RecommendedItems({
  upsellIds = [],
  title = "Recommended Add-ons",
  subtitle = "Complete your fitout with these popular accessories",
  maxItems = 4,
  showAddToCart = true,
  className = ""
}: RecommendedItemsProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const upsellsEnabled = useFeatureFlag('FEATURE_UPSELLS');

  // If upsells feature is disabled, don't render
  if (!upsellsEnabled) {
    return null;
  }

  // Get upsell products
  const upsellProducts = getUpsellsByIds(upsellIds).slice(0, maxItems);

  if (upsellProducts.length === 0) {
    return null;
  }

  const toggleItemSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const addSelectedToCart = () => {
    selectedItems.forEach(itemId => {
      const product = upsellProducts.find(p => p.id === itemId);
      if (product) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "",
          category: product.category,
          shortDescription: product.shortDescription
        });
      }
    });
    setSelectedItems(new Set());
  };

  const addSingleItemToCart = (product: UpsellProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      category: product.category,
      shortDescription: product.shortDescription
    });
  };

  const totalSelectedPrice = Array.from(selectedItems).reduce((total, itemId) => {
    const product = upsellProducts.find(p => p.id === itemId);
    return total + (product?.price || 0);
  }, 0);

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl lg:text-3xl font-bold text-textPrimary mb-2">
          {title}
        </h3>
        <p className="text-lg text-textPrimary/80">
          {subtitle}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {upsellProducts.map((product, index) => {
          const isSelected = selectedItems.has(product.id);
          const savings = product.originalPrice ? product.originalPrice - product.price : 0;
          
          return (
            <motion.div
              key={product.id}
              className={`group relative bg-cream-300 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                isSelected 
                  ? 'border-brown-500 shadow-medium' 
                  : 'border-transparent hover:border-brown-300 shadow-soft hover:shadow-medium'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Selection Overlay */}
              {isSelected && (
                <div className="absolute inset-0 bg-brown-500 bg-opacity-10 z-10 pointer-events-none" />
              )}

              {/* Product Image */}
              <div className="relative h-40 bg-gradient-to-br from-brown-200 to-brown-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-textPrimary/80">
                    <div className="text-3xl mb-2">📦</div>
                    <p className="text-caption font-medium">{product.category}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isPopular && (
                    <Badge variant="destructive" size="sm">
                      Popular
                    </Badge>
                  )}
                  {savings > 0 && (
                    <Badge variant="secondary" size="sm">
                      Save ${savings.toFixed(0)}
                    </Badge>
                  )}
                </div>

                {/* Selection Button */}
                <motion.button
                  onClick={() => toggleItemSelection(product.id)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-brown-500 text-white shadow-medium'
                      : 'bg-white bg-opacity-80 text-brown-500 hover:bg-opacity-100'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className={`w-4 h-4 transition-transform duration-200 ${
                    isSelected ? 'rotate-45' : ''
                  }`} />
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-textPrimary text-caption mb-1 group-hover:text-brown-500 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-caption text-textPrimary/80 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-surface-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-caption text-textPrimary/80">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-bold text-brown-500">
                      ${product.price.toFixed(2)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-caption text-textPrimary/80 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  {product.installationRequired && (
                    <div className="flex items-center gap-1 text-caption text-textPrimary/80">
                      <Info className="w-3 h-3" />
                      <span>Install req.</span>
                    </div>
                  )}
                </div>

                {/* Individual Add to Cart */}
                {showAddToCart && (
                  <Button
                    size="sm"
                    onClick={() => addSingleItemToCart(product)}
                    className="w-full bg-brown-500 hover:bg-darkBrown text-cream-400 text-caption py-2"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bulk Actions */}
      {selectedItems.size > 0 && showAddToCart && (
        <motion.div
          className="bg-brown-500 text-white rounded-xl p-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4">
            <div className="text-lg font-semibold mb-1">
              {selectedItems.size} item{selectedItems.size > 1 ? 's' : ''} selected
            </div>
            <div className="text-cream-200">
              Total: ${totalSelectedPrice.toFixed(2)}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={addSelectedToCart}
              variant="secondary"
              className="bg-cream-400 text-textPrimary hover:bg-cream-300"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add Selected to Cart
            </Button>
            
            <Button
              onClick={() => setSelectedItems(new Set())}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brown-500"
            >
              Clear Selection
            </Button>
          </div>
        </motion.div>
      )}

      {/* Categories Info */}
      <div className="mt-8 text-center">
        <div className="inline-flex flex-wrap gap-2">
          {Array.from(new Set(upsellProducts.map(p => p.category))).map(category => (
            <Badge key={category} variant="outline" size="sm">
              {category}
            </Badge>
          ))}
        </div>
        <p className="text-body-small text-textPrimary/80 mt-2">
          Professional installation available for electrical and plumbing items
        </p>
      </div>
    </div>
  );
}
