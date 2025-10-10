// Upsell Product Data for Flat Packs
// Cushions, insulation, plumbing, electrical add-ons

export interface UpsellProduct {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'Cushions' | 'Insulation' | 'Plumbing' | 'Electrical' | 'Storage' | 'Lighting';
  subcategory: string;
  tags: string[];
  features: string[];
  compatibility: string[]; // Kit types this upsell is compatible with
  isPopular?: boolean;
  installationRequired: boolean;
  warranty: string;
  sku: string;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
}

// Cushion Products - REMOVED (no longer available)
export const cushionProducts: UpsellProduct[] = [];

// Insulation Products
export const insulationProducts: UpsellProduct[] = [
];

// Electrical Products
export const electricalProducts: UpsellProduct[] = [
];

// Water System Products
export const waterProducts: UpsellProduct[] = [
];

// Storage Products
export const storageProducts: UpsellProduct[] = [
];

// All upsell products combined
export const allUpsellProducts: UpsellProduct[] = [
  ...cushionProducts,
  ...insulationProducts,
  ...electricalProducts,
  ...waterProducts,
  ...storageProducts
];

// Helper functions
export function getUpsellsByCategory(category: UpsellProduct['category']): UpsellProduct[] {
  return allUpsellProducts.filter(product => product.category === category);
}

export function getUpsellsByCompatibility(kitType: string): UpsellProduct[] {
  return allUpsellProducts.filter(product => 
    product.compatibility.includes(kitType)
  );
}

export function getUpsellById(id: string): UpsellProduct | undefined {
  return allUpsellProducts.find(product => product.id === id);
}

export function getUpsellsByIds(ids: string[]): UpsellProduct[] {
  return allUpsellProducts.filter(product => ids.includes(product.id));
}

export function getPopularUpsells(): UpsellProduct[] {
  return allUpsellProducts.filter(product => product.isPopular);
}

export function getUpsellCategories(): string[] {
  return Array.from(new Set(allUpsellProducts.map(product => product.category)));
}
