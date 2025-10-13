"use client";

import { useState } from "react";
import { ProductVariantSection, normalizeProductForVariants } from "./ProductVariantSection";
import { useCart } from "@/lib/cart-context";

interface ProductPageWithVariantsProps {
  product: any; // Any product type
  children?: React.ReactNode; // Custom content to render alongside variants
}

export function ProductPageWithVariants({ product, children }: ProductPageWithVariantsProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = async (variant: any, quantity: number) => {
    const cartItem = {
      id: variant.id,
      name: `${product.name}${Object.entries(variant.selectedOptions).map(([key, value]) => {
        const option = product.variantOptions?.find((opt: any) => opt.name === key);
        const optionValue = option?.values.find((v: any) => v.value === value);
        return optionValue ? ` - ${optionValue.label}` : '';
      }).join('')}`,
      price: variant.price,
      image: product.images?.[0] || '',
      category: product.category,
      shortDescription: product.shortDescription || product.description,
      // Include shipping data for accurate quotes
      weight: product.weight || 1,
      dimensions: product.dimensions,
      shipClass: product.shipClass || 'standard'
    };

    addItem(cartItem);
  };

  return (
    <div className="space-y-6">
      {/* Custom product content */}
      {children}
      
      {/* Universal variant selection */}
      <ProductVariantSection
        product={normalizeProductForVariants(product)}
        onVariantChange={handleVariantChange}
        onAddToCart={handleAddToCart}
        showPrice={true}
        showSKU={true}
        showStockStatus={true}
        showSelectedSummary={true}
        showAddToCart={true}
      />
    </div>
  );
}

// Example usage component
export function ExampleProductPage({ product }: { product: any }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      
      <ProductPageWithVariants product={product}>
        {/* Any custom content you want to show above the variant selector */}
        <div className="mb-6">
          <p className="text-gray-600">{product.description}</p>
        </div>
      </ProductPageWithVariants>
    </div>
  );
}
