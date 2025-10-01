"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Universal variant option structure
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
}

export interface VariantOption {
  name: string;
  displayName?: string; // Human-readable name for display
  values: VariantOptionValue[];
  required?: boolean;
  type?: 'color' | 'size' | 'text' | 'select'; // For different rendering styles
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
}

interface UniversalVariantSelectorProps {
  options: VariantOption[];
  selectedOptions: SelectedOptions;
  onChange: (optionName: string, value: string) => void;
  className?: string;
  showStockStatus?: boolean;
  disabled?: boolean;
}

export function UniversalVariantSelector({ 
  options, 
  selectedOptions, 
  onChange, 
  className = "",
  showStockStatus = true,
  disabled = false
}: UniversalVariantSelectorProps) {
  const [focusedOption, setFocusedOption] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent, optionName: string, value: string) => {
    const option = options.find(opt => opt.name === optionName);
    if (!option || disabled) return;

    const currentIndex = option.values.findIndex(v => v.value === value);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = (currentIndex + 1) % option.values.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex === 0 ? option.values.length - 1 : currentIndex - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (option.values[currentIndex].available) {
          onChange(optionName, value);
        }
        return;
    }

    const newValue = option.values[newIndex];
    if (newValue && newValue.available) {
      onChange(optionName, newValue.value);
    }
  };

  const renderColorOption = (option: VariantOption, value: VariantOptionValue, isSelected: boolean) => {
    const isDisabled = !value.available || disabled;
    
    return (
      <button
        key={value.value}
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (value.available && !disabled) {
            onChange(option.name, value.value);
          }
        }}
        onKeyDown={(e) => handleKeyDown(e, option.name, value.value)}
        onFocus={() => setFocusedOption(`${option.name}-${value.value}`)}
        onBlur={() => setFocusedOption(null)}
        className={`
          relative w-12 h-12 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2
          ${isSelected
            ? 'border-brown-500 ring-2 ring-brown-200'
            : isDisabled
            ? 'border-gray-200 cursor-not-allowed opacity-50'
            : 'border-gray-300 hover:border-brown-300'
          }
          ${focusedOption === `${option.name}-${value.value}` ? 'ring-2 ring-brown-300' : ''}
        `}
        style={{
          backgroundColor: value.value === 'black' ? '#000000' : 
                          value.value === 'white' ? '#ffffff' :
                          value.value === 'gold' ? '#ffd700' :
                          value.value === 'silver' ? '#c0c0c0' :
                          value.value === 'red' ? '#ff0000' :
                          value.value === 'blue' ? '#0000ff' :
                          value.value === 'green' ? '#008000' :
                          value.value === 'brown' ? '#8b4513' :
                          value.value
        }}
        title={value.label}
      >
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </button>
    );
  };

  const renderTextOption = (option: VariantOption, value: VariantOptionValue, isSelected: boolean) => {
    const isDisabled = !value.available || disabled;
    
    return (
      <button
        key={value.value}
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (value.available && !disabled) {
            onChange(option.name, value.value);
          }
        }}
        onKeyDown={(e) => handleKeyDown(e, option.name, value.value)}
        onFocus={() => setFocusedOption(`${option.name}-${value.value}`)}
        onBlur={() => setFocusedOption(null)}
        className={`
          px-4 py-2 rounded-lg border-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2
          ${isSelected
            ? 'border-brown-500 bg-brown-500 text-white shadow-md'
            : isDisabled
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:border-brown-300 hover:bg-brown-50'
          }
          ${focusedOption === `${option.name}-${value.value}` ? 'ring-2 ring-brown-300' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          <span>{value.label}</span>
          {showStockStatus && value.stockQuantity !== undefined && (
            <Badge 
              variant={value.stockQuantity > 0 ? "secondary" : "destructive"}
              className="text-xs"
            >
              {value.stockQuantity > 0 ? `${value.stockQuantity} left` : 'Out of stock'}
            </Badge>
          )}
        </div>
      </button>
    );
  };

  const renderSizeOption = (option: VariantOption, value: VariantOptionValue, isSelected: boolean) => {
    const isDisabled = !value.available || disabled;
    
    return (
      <button
        key={value.value}
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (value.available && !disabled) {
            onChange(option.name, value.value);
          }
        }}
        onKeyDown={(e) => handleKeyDown(e, option.name, value.value)}
        onFocus={() => setFocusedOption(`${option.name}-${value.value}`)}
        onBlur={() => setFocusedOption(null)}
        className={`
          w-16 h-16 flex items-center justify-center rounded-lg border-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2
          ${isSelected
            ? 'border-brown-500 bg-brown-500 text-white shadow-md'
            : isDisabled
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:border-brown-300 hover:bg-brown-50'
          }
          ${focusedOption === `${option.name}-${value.value}` ? 'ring-2 ring-brown-300' : ''}
        `}
      >
        {value.label}
      </button>
    );
  };

  const renderOption = (option: VariantOption, value: VariantOptionValue, isSelected: boolean) => {
    switch (option.type) {
      case 'color':
        return renderColorOption(option, value, isSelected);
      case 'size':
        return renderSizeOption(option, value, isSelected);
      default:
        return renderTextOption(option, value, isSelected);
    }
  };

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {options.map((option) => {
        const hasUnavailableOptions = option.values.some(v => !v.available);
        const isRequired = option.required !== false; // Default to required
        
        return (
          <div key={option.name} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {option.displayName || option.name}
              </h3>
              {isRequired && (
                <span className="text-red-500 text-sm">*Required</span>
              )}
            </div>
            
            <div
              role="radiogroup"
              aria-label={option.displayName || option.name}
              className={`flex flex-wrap gap-2 ${
                option.type === 'color' ? 'gap-3' : 
                option.type === 'size' ? 'gap-2' : 'gap-2'
              }`}
            >
              {option.values.map((value) => {
                const isSelected = selectedOptions[option.name] === value.value;
                return renderOption(option, value, isSelected);
              })}
            </div>
            
            {hasUnavailableOptions && showStockStatus && (
              <p className="text-sm text-gray-500">
                * Some options may be out of stock
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Utility function to resolve variant based on selected options
export function resolveVariant(product: any, selectedOptions: SelectedOptions): Variant | null {
  if (!product.variantOptions || Object.keys(selectedOptions).length === 0) {
    return null;
  }

  // Check if all required options are selected
  const requiredOptions = product.variantOptions.filter((opt: VariantOption) => opt.required !== false);
  const hasAllRequired = requiredOptions.every((opt: VariantOption) => 
    selectedOptions[opt.name] && selectedOptions[opt.name].length > 0
  );

  if (!hasAllRequired) {
    return null;
  }

  // First, try to find a matching variant in the product.variants array
  if (product.variants && product.variants.length > 0) {
    const matchingVariant = product.variants.find((variant: any) => {
      return Object.entries(selectedOptions).every(([optionName, selectedValue]) => {
        // Find the option in variantOptions to get the label
        const option = product.variantOptions.find((opt: any) => opt.name === optionName);
        if (!option) return false;
        
        const optionValue = option.values.find((v: any) => v.value === selectedValue);
        if (!optionValue) return false;
        
        // Check if this variant has the matching option label
        return variant.options && variant.options[optionName] === optionValue.label;
      });
    });

    if (matchingVariant) {
      return {
        id: matchingVariant.id,
        price: matchingVariant.price,
        available: matchingVariant.available,
        sku: matchingVariant.sku,
        image: matchingVariant.image || product.images?.[0],
        selectedOptions,
        inStock: matchingVariant.inStock !== undefined ? matchingVariant.inStock : true,
        stockQuantity: matchingVariant.stockQuantity || product.stockQuantity
      };
    }
  }

  // Fallback: Create variant ID based on selected options
  const optionValues = Object.entries(selectedOptions)
    .sort(([a], [b]) => a.localeCompare(b)) // Ensure consistent ordering
    .map(([, value]) => value);
  
  const variantId = `${product.id}-${optionValues.join('-')}`;
  
  // Calculate price (could be overridden by specific variant pricing)
  let variantPrice = product.price;
  let variantImage = product.images?.[0];
  let variantSku = product.sku;
  let inStock = true;
  let stockQuantity = product.stockQuantity;

  // Check if any selected option has specific pricing/image/sku
  product.variantOptions.forEach((option: VariantOption) => {
    const selectedValue = option.values.find(v => v.value === selectedOptions[option.name]);
    if (selectedValue) {
      if (selectedValue.price !== undefined) {
        variantPrice = selectedValue.price;
      }
      if (selectedValue.image) {
        variantImage = selectedValue.image;
      }
      if (selectedValue.sku) {
        variantSku = selectedValue.sku;
      }
      if (selectedValue.inStock !== undefined) {
        inStock = selectedValue.inStock;
      }
      if (selectedValue.stockQuantity !== undefined) {
        stockQuantity = selectedValue.stockQuantity;
      }
    }
  });

  return {
    id: variantId,
    price: variantPrice,
    available: inStock,
    sku: `${variantSku}-${optionValues.join('-')}`,
    image: variantImage,
    selectedOptions: selectedOptions,
    inStock: inStock,
    stockQuantity: stockQuantity
  };
}

// Hook for managing variant selection
export function useVariantSelection(product: any, initialOptions: SelectedOptions = {}) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(initialOptions);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // Memoize the product to prevent unnecessary re-renders
  const stableProduct = useMemo(() => product, [product.id, product.variantOptions?.length]);

  // Use useCallback to memoize the variant resolution
  const resolveVariantMemo = useCallback((product: any, options: SelectedOptions) => {
    return resolveVariant(product, options);
  }, []);

  useEffect(() => {
    if (stableProduct.variantOptions && Object.keys(selectedOptions).length > 0) {
      const variant = resolveVariantMemo(stableProduct, selectedOptions);
      setSelectedVariant(variant);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedOptions, stableProduct, resolveVariantMemo]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const resetSelection = () => {
    setSelectedOptions({});
    setSelectedVariant(null);
  };

  return {
    selectedOptions,
    selectedVariant,
    handleOptionChange,
    resetSelection,
    isComplete: selectedVariant !== null
  };
}
