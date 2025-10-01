// Universal variant types that work with any product structure

export interface VariantOptionValue {
  value: string;
  label: string;
  available: boolean;
  variantId?: string;
  price?: number;
  image?: string;
  sku?: string;
  inStock?: boolean;
  stockQuantity?: number;
  // Additional metadata
  metadata?: Record<string, any>;
}

export interface VariantOption {
  name: string;
  displayName?: string;
  values: VariantOptionValue[];
  required?: boolean;
  type?: 'color' | 'size' | 'text' | 'select';
  // Additional configuration
  config?: {
    showStockStatus?: boolean;
    allowMultiple?: boolean;
    customRenderer?: string;
  };
}

export interface SelectedOptions {
  [optionName: string]: string;
}

export interface Variant {
  id: string;
  price: number;
  available: boolean;
  sku?: string;
  image?: string;
  selectedOptions: SelectedOptions;
  inStock?: boolean;
  stockQuantity?: number;
  // Additional variant data
  metadata?: Record<string, any>;
}

export interface ResolvedVariant {
  id: string;
  price: number;
  originalPrice?: number;
  sku?: string;
  image?: string;
  available: boolean;
  inStock?: boolean;
  stockQuantity?: number;
  selectedOptions: SelectedOptions;
  // Add other variant-specific properties
}

// Product interface that supports variants
export interface ProductWithVariants {
  id: string;
  name: string;
  price: number;
  images: string[];
  variantOptions?: VariantOption[];
  variants?: Array<{
    id: string;
    price: number;
    originalPrice?: number;
    sku?: string;
    image?: string;
    available: boolean;
    inStock?: boolean;
    stockQuantity?: number;
    options: { [key: string]: string };
  }>;
  // Base product data
  [key: string]: any;
}

// Configuration for different product types
export interface VariantConfig {
  // Shopify-style configuration
  shopify?: {
    productId: string;
    variantId: string;
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
  // Custom configuration
  custom?: {
    optionMapping: Record<string, string>;
    priceCalculation: 'base' | 'additive' | 'custom';
    imageMapping: Record<string, string>;
  };
}

// Utility types for variant resolution
export type VariantResolver = (product: ProductWithVariants, selectedOptions: SelectedOptions) => Variant | null;

export type OptionChangeHandler = (optionName: string, value: string) => void;

// Hook return type
export interface UseVariantSelectionReturn {
  selectedOptions: SelectedOptions;
  selectedVariant: Variant | null;
  handleOptionChange: OptionChangeHandler;
  resetSelection: () => void;
  isComplete: boolean;
  isLoading?: boolean;
  error?: string | null;
}
