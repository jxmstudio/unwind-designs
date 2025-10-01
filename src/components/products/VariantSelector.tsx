"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export interface VariantOption {
  name: string;
  values: Array<{
    value: string;
    label: string;
    available: boolean;
    variantId?: string;
    price?: number;
    image?: string;
    sku?: string;
  }>;
}

export interface SelectedOptions {
  [optionName: string]: string;
}

interface VariantSelectorProps {
  options: VariantOption[];
  selectedOptions: SelectedOptions;
  onChange: (optionName: string, value: string) => void;
  className?: string;
}

export function VariantSelector({ 
  options, 
  selectedOptions, 
  onChange, 
  className = "" 
}: VariantSelectorProps) {
  const [focusedOption, setFocusedOption] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent, optionName: string, value: string) => {
    const option = options.find(opt => opt.name === optionName);
    if (!option) return;

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

  return (
    <div className={`space-y-6 ${className}`}>
      {options.map((option) => (
        <div key={option.name} className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
            <span className="text-red-500 text-sm">*Required</span>
          </div>
          
          <div
            role="radiogroup"
            aria-label={option.name}
            className="flex flex-wrap gap-2"
          >
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value.value;
              const isDisabled = !value.available;
              
              return (
                <button
                  key={value.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                  onClick={() => value.available && onChange(option.name, value.value)}
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
                  {value.label}
                </button>
              );
            })}
          </div>
          
          {option.values.some(v => !v.available) && (
            <p className="text-sm text-gray-500">
              * Some options may be out of stock
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Utility function to resolve variant based on selected options
export function resolveVariant(product: any, selectedOptions: SelectedOptions) {
  // For now, we'll create a simple variant ID based on selected options
  // In a real implementation, this would match against a variant matrix
  const optionValues = Object.values(selectedOptions);
  if (optionValues.length === 0) return null;
  
  const variantId = `${product.id}-${optionValues.join('-')}`;
  const variantPrice = product.price; // Base price, could be overridden by variant
  
  return {
    id: variantId,
    price: variantPrice,
    available: true,
    sku: `${product.sku}-${optionValues.join('-')}`,
    selectedOptions: selectedOptions
  };
}
