"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UniversalVariantSelector, useVariantSelection, resolveVariant as resolveVariantBase } from "./UniversalVariantSelector";
import { ProductWithVariants, SelectedOptions, ResolvedVariant } from "@/types/variants";

// Wrapper function that converts Variant to ResolvedVariant
function resolveVariant(product: any, selectedOptions: SelectedOptions): ResolvedVariant | null {
  const variant = resolveVariantBase(product, selectedOptions);
  if (!variant) return null;
  
  return {
    id: variant.id,
    price: variant.price,
    sku: variant.sku,
    image: variant.image,
    available: variant.available,
    inStock: variant.inStock,
    stockQuantity: variant.stockQuantity,
    selectedOptions: variant.selectedOptions,
  };
}

interface ProductVariantSectionProps {
  product: ProductWithVariants;
  onVariantChange?: (variant: any) => void;
  onAddToCart?: (variant: any, quantity: number) => void;
  className?: string;
  showPrice?: boolean;
  showSKU?: boolean;
  showStockStatus?: boolean;
  showSelectedSummary?: boolean;
  showAddToCart?: boolean;
  initialQuantity?: number;
}

export function ProductVariantSection({
  product,
  onVariantChange,
  onAddToCart,
  className = "",
  showPrice = true,
  showSKU = true,
  showStockStatus = true,
  showSelectedSummary = true,
  showAddToCart = true,
  initialQuantity = 1
}: ProductVariantSectionProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const {
    selectedOptions,
    selectedVariant,
    handleOptionChange,
    resetSelection,
    isComplete
  } = useVariantSelection(product);

  // Notify parent component when variant changes
  useEffect(() => {
    if (onVariantChange && selectedVariant) {
      onVariantChange(selectedVariant);
    }
  }, [selectedVariant, onVariantChange]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !onAddToCart) return;
    
    setIsAddingToCart(true);
    try {
      await onAddToCart(selectedVariant, quantity);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product.variantOptions || product.variantOptions.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Price Display */}
      {showPrice && (
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-gray-900">
            ${selectedVariant?.price?.toFixed(2) || product.price.toFixed(2)}
          </span>
          {selectedVariant?.sku && showSKU && (
            <span className="text-sm text-gray-500">SKU: {selectedVariant.sku}</span>
          )}
        </div>
      )}

      {/* Variant Selector */}
      <UniversalVariantSelector
        options={product.variantOptions}
        selectedOptions={selectedOptions}
        onChange={handleOptionChange}
        showStockStatus={showStockStatus}
      />

      {/* Selected Configuration Summary */}
      {showSelectedSummary && isComplete && selectedVariant && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Selected Configuration</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(selectedOptions).map(([optionName, value]) => {
                const option = product.variantOptions?.find(opt => opt.name === optionName);
                const optionValue = option?.values.find(v => v.value === value);
                return (
                  <div key={optionName} className="flex items-center justify-between py-1">
                    <span className="text-gray-600 font-medium">
                      {option?.displayName || optionName}:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {optionValue?.label}
                    </span>
                  </div>
                );
              })}
              {selectedVariant.stockQuantity !== undefined && (
                <div className="flex items-center justify-between py-1 border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-600 font-medium">Stock:</span>
                  <Badge 
                    variant={selectedVariant.stockQuantity > 0 ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {selectedVariant.stockQuantity > 0 ? `${selectedVariant.stockQuantity} available` : 'Out of stock'}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quantity and Add to Cart */}
      {showAddToCart && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
                disabled={!isComplete}
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
                disabled={!isComplete}
              >
                +
              </button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || !isComplete}
            className="w-full bg-brown-600 hover:bg-brown-700 text-white py-3 text-lg font-medium rounded-xl"
            size="lg"
          >
            {isAddingToCart ? (
              "Adding to Cart..."
            ) : !isComplete ? (
              "Please choose all options"
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

// Simple hook for easy integration
export function useProductVariants(product: ProductWithVariants) {
  return useVariantSelection(product);
}

// Utility function to convert any product to ProductWithVariants
export function normalizeProductForVariants(product: any): ProductWithVariants {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    images: product.images || [],
    variantOptions: product.variantOptions || [],
    ...product
  };
}
