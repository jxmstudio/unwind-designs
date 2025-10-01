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

// Cushion Products
export const cushionProducts: UpsellProduct[] = [
  {
    id: "cushion-set-wander",
    name: "Wander Kit Cushion Set",
    description: "Custom-fitted cushions designed specifically for Wander Kit configurations. Made from durable, easy-clean marine vinyl with high-density foam for long-lasting comfort.",
    shortDescription: "Custom cushions for Wander Kit",
    price: 450.00,
    originalPrice: 500.00,
    images: ["/images/placeholder.svg"],
    category: "Cushions",
    subcategory: "Seat Cushions",
    tags: ["Cushions", "Wander Kit", "Marine Vinyl", "Custom Fit"],
    features: [
      "Custom-fitted for Wander Kit dimensions",
      "Marine-grade vinyl covering",
      "High-density foam core",
      "Water-resistant and easy to clean",
      "Available in multiple colors",
      "Velcro attachment system"
    ],
    compatibility: ["Wander"],
    isPopular: true,
    installationRequired: false,
    warranty: "2 years",
    sku: "CUSH-WAN-001",
    weight: 3.5,
    dimensions: {
      length: 120,
      width: 60,
      height: 8
    },
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: "cushion-set-roam",
    name: "Roam Kit Premium Cushion Set",
    description: "Premium cushion set for Roam Kit configurations featuring memory foam and premium fabric options. Designed for extended comfort during long adventures.",
    shortDescription: "Premium cushions for Roam Kit",
    price: 650.00,
    images: ["/images/placeholder.svg"],
    category: "Cushions",
    subcategory: "Premium Cushions",
    tags: ["Cushions", "Roam Kit", "Memory Foam", "Premium"],
    features: [
      "Memory foam for superior comfort",
      "Premium fabric options available",
      "Perfect fit for Roam Kit",
      "Breathable and moisture-wicking",
      "Removable and washable covers",
      "Quick-release mounting system"
    ],
    compatibility: ["Roam"],
    installationRequired: false,
    warranty: "3 years",
    sku: "CUSH-ROAM-001",
    weight: 4.2,
    dimensions: {
      length: 130,
      width: 65,
      height: 10
    },
    inStock: true,
    stockQuantity: 12,
    rating: 4.8,
    reviewCount: 67
  },
  {
    id: "cushion-set-premium",
    name: "Premium Kit Luxury Cushion Set",
    description: "Ultimate luxury cushion set featuring the finest materials and craftsmanship. Memory foam with cooling gel, premium leather options, and integrated heating elements.",
    shortDescription: "Luxury cushions for Premium Kit",
    price: 950.00,
    images: ["/images/placeholder.svg"],
    category: "Cushions",
    subcategory: "Luxury Cushions",
    tags: ["Cushions", "Premium Kit", "Luxury", "Heated", "Leather"],
    features: [
      "Memory foam with cooling gel",
      "Premium leather and fabric options",
      "Integrated heating elements",
      "Perfect fit for Premium Kit",
      "Climate control compatibility",
      "Professional installation available"
    ],
    compatibility: ["Premium"],
    installationRequired: true,
    warranty: "5 years",
    sku: "CUSH-PREM-001",
    weight: 5.8,
    dimensions: {
      length: 140,
      width: 70,
      height: 12
    },
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 34
  }
];

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
