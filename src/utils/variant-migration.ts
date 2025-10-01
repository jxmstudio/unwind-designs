// Utility functions to migrate existing products to the new variant system

import { VariantOption, ProductWithVariants } from "@/types/variants";

// Convert old-style product options to new variant options
export function migrateProductToVariants(product: any): ProductWithVariants {
  const variantOptions: VariantOption[] = [];

  // Migrate colorOptions
  if (product.colorOptions && product.colorOptions.length > 0) {
    variantOptions.push({
      name: "Color",
      displayName: "Color",
      type: "color",
      required: true,
      values: product.colorOptions.map((option: any) => ({
        value: option.value,
        label: option.label,
        available: option.available,
        price: product.price, // Base price, can be overridden
        inStock: option.available
      }))
    });
  }

  // Migrate thicknessOptions
  if (product.thicknessOptions && product.thicknessOptions.length > 0) {
    variantOptions.push({
      name: "Thickness",
      displayName: "Drawer/Door Thickness",
      type: "text",
      required: true,
      values: product.thicknessOptions.map((option: any) => ({
        value: option.value,
        label: option.label,
        available: true, // Assume available if not specified
        price: product.price
      }))
    });
  }

  // Migrate faceplateSizeOptions
  if (product.faceplateSizeOptions && product.faceplateSizeOptions.length > 0) {
    variantOptions.push({
      name: "Faceplate Size",
      displayName: "Faceplate Size",
      type: "text",
      required: true,
      values: product.faceplateSizeOptions.map((option: any) => ({
        value: option.value,
        label: option.label,
        available: option.available,
        price: product.price
      }))
    });
  }

  // Migrate sideOptions
  if (product.sideOptions && product.sideOptions.length > 0) {
    variantOptions.push({
      name: "Side",
      displayName: "Side of the vehicle",
      type: "text",
      required: true,
      values: product.sideOptions.map((option: any) => ({
        value: option.value,
        label: option.label,
        available: option.available,
        price: product.price
      }))
    });
  }

  // Migrate utilityPanelOptions
  if (product.utilityPanelOptions && product.utilityPanelOptions.length > 0) {
    variantOptions.push({
      name: "Utility Panel",
      displayName: "Utility Panel configuration (NOT INCLUDED) Plumbing kit only.",
      type: "text",
      required: true,
      values: product.utilityPanelOptions.map((option: any) => ({
        value: option.value,
        label: option.label,
        available: option.available,
        price: product.price
      }))
    });
  }

  // Migrate existing variantOptions (if already in new format)
  if (product.variantOptions && product.variantOptions.length > 0) {
    variantOptions.push(...product.variantOptions);
  }

  return {
    ...product,
    variantOptions: variantOptions.length > 0 ? variantOptions : undefined
  };
}

// Batch migrate multiple products
export function migrateProductsToVariants(products: any[]): ProductWithVariants[] {
  return products.map(migrateProductToVariants);
}

// Create variant options from a simple configuration
export function createVariantOptions(config: {
  colors?: string[];
  sizes?: string[];
  materials?: string[];
  sides?: string[];
  custom?: Array<{
    name: string;
    displayName?: string;
    type?: 'color' | 'size' | 'text' | 'select';
    values: string[];
    required?: boolean;
  }>;
}): VariantOption[] {
  const options: VariantOption[] = [];

  if (config.colors) {
    options.push({
      name: "Color",
      displayName: "Color",
      type: "color",
      required: true,
      values: config.colors.map(color => ({
        value: color.toLowerCase().replace(/\s+/g, '-'),
        label: color,
        available: true,
        inStock: true
      }))
    });
  }

  if (config.sizes) {
    options.push({
      name: "Size",
      displayName: "Size",
      type: "size",
      required: true,
      values: config.sizes.map(size => ({
        value: size.toLowerCase().replace(/\s+/g, '-'),
        label: size,
        available: true,
        inStock: true
      }))
    });
  }

  if (config.materials) {
    options.push({
      name: "Material",
      displayName: "Material",
      type: "text",
      required: true,
      values: config.materials.map(material => ({
        value: material.toLowerCase().replace(/\s+/g, '-'),
        label: material,
        available: true,
        inStock: true
      }))
    });
  }

  if (config.sides) {
    options.push({
      name: "Side",
      displayName: "Side of the vehicle",
      type: "text",
      required: true,
      values: config.sides.map(side => ({
        value: side.toLowerCase().replace(/\s+/g, '-'),
        label: side,
        available: true,
        inStock: true
      }))
    });
  }

  if (config.custom) {
    config.custom.forEach(customOption => {
      options.push({
        name: customOption.name,
        displayName: customOption.displayName || customOption.name,
        type: customOption.type || 'text',
        required: customOption.required !== false,
        values: customOption.values.map(value => ({
          value: value.toLowerCase().replace(/\s+/g, '-'),
          label: value,
          available: true,
          inStock: true
        }))
      });
    });
  }

  return options;
}

// Example usage for different product types
export const exampleConfigs = {
  // T-shirt example
  tshirt: {
    colors: ['Black', 'White', 'Red', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    materials: ['Cotton', 'Polyester', 'Blend']
  },
  
  // Water tank example
  waterTank: {
    sides: ['Passenger side', 'Drivers side'],
    custom: [{
      name: 'Utility Panel',
      displayName: 'Utility Panel configuration (NOT INCLUDED) Plumbing kit only.',
      values: ['4 Fitting utility panel', '5 Fitting utility panel'],
      required: true
    }]
  },
  
  // Hardware example
  hardware: {
    colors: ['Black', 'White', 'Gold', 'Silver'],
    custom: [{
      name: 'Thickness',
      displayName: 'Drawer/Door Thickness',
      values: ['6-11mm', '12-14mm', '15mm or more'],
      required: true
    }]
  }
};
