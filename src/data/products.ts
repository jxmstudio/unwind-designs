// Comprehensive Product Catalogue for Unwind Designs
// Includes flat packs, accessories, and components

// Re-export existing flat pack types and data
export type { FlatPackProduct } from './flatpacks';
export { 
  allFlatPacks, 
  wanderKits, 
  roamKits, 
  premiumKits,
  getFlatPacksByKitType,
  getFlatPacksByFridgeType,
  getFlatPackBySlug,
  getFlatPackById,
  getFlatPacksByPriceRange,
  getFlatPacksInStock,
  getFlatPackKitTypes,
  getFlatPackFinishes,
  getFlatPacksByBaseKit,
  getBaseKitSlug,
  getKitTypeFromSlug
} from './flatpacks';

// Import allFlatPacks for use in this file
import { allFlatPacks, FlatPackProduct, getFlatPackBySlug } from './flatpacks';

// Re-export existing upsell types and data
export type { UpsellProduct } from './upsells';
export {
  allUpsellProducts,
  cushionProducts,
  insulationProducts,
  electricalProducts,
  waterProducts,
  storageProducts,
  getUpsellsByCategory,
  getUpsellsByCompatibility,
  getUpsellById,
  getUpsellsByIds,
  getPopularUpsells,
  getUpsellCategories
} from './upsells';

// Import allUpsellProducts for use in this file
import { allUpsellProducts, UpsellProduct, getUpsellCategories } from './upsells';

// Import test products
import { testProducts, TestProduct, getTestProductBySlug, getTestProductById } from './test-products';

// Union type for all products
export type Product = FlatPackProduct | UpsellProduct | ComponentProduct | TestProduct;

// New Product Interface for Components and Accessories
export interface ComponentProduct {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  videoUrl?: string;
  category: 'Panels' | 'Flooring' | 'Accessories' | 'Plumbing' | 'Complete Kits' | 'Ventilation' | 'Compressors' | 'Water Systems' | 'Sound Deadening' | 'Utility Panels' | 'DIY Build' | 'Fridges' | 'Water Heaters' | 'Bathroom' | 'Hardware';
  subcategory: string;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  compatibility: string[]; // Which vehicles/kits this works with
  isPopular?: boolean;
  comingSoon?: boolean; // New field for products not yet available
  installationRequired: boolean;
  warranty: string;
  assemblyTime?: string;
  sku: string;
  slug: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  badges: string[];
  shipClass: 'standard' | 'oversized' | 'freight';
  upsells: string[]; // IDs of recommended products
  // New fields for Troopy Packs classification
  isTroopyPack: boolean;
  troopyPackSlug?: string; // For the main kit page (wander-kit, roam-kit, premium-kit)
  createdAt: Date;
  updatedAt: Date;
}

// NEW PRODUCTS FROM NOTION LIST

// General Flat Pack Products (simplified versions for overview)
export const generalFlatPackProducts: ComponentProduct[] = [
  {
    id: "wander-troopy-flat-pack-general",
    name: "Wander Troopy Flat Pack",
    description: "Our budget-friendly flat pack solution for Toyota Troopcarriers. Perfect for weekend adventures with reliable storage and basic amenities. Multiple finish options available.", // TODO: update description based on final marketing copy
    shortDescription: "Budget-friendly flat pack for weekend adventures",
    price: 3750.00, // Starting price for plain hardwood chest fridge variant
    images: ["/products/wander-general-1.jpg", "/products/wander-general-2.jpg"], // TODO: update with actual product images
    videoUrl: "/videos/wander-overview.mp4", // TODO: create overview video
    category: "Complete Kits",
    subcategory: "Budget Range",
    tags: ["Flat Pack", "Troopcarrier", "Budget", "Weekend", "Marine Grade"],
    features: [
      "Multiple fridge configuration options",
      "Three finish choices available",
      "Marine-grade plywood construction",
      "Tool-free assembly system",
      "Slide-out storage drawers",
      "Built-in power management"
    ],
    specifications: {
      "Material": "Marine-grade plywood",
      "Configurations": "Chest or upright fridge options",
      "Finishes": "Plain hardwood, Eucalyptus Black Hex, Birch Black Hex",
      "Assembly": "4-6 hours typical",
      "Compatibility": "Toyota Troopcarrier"
    },
    weight: 45.0,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "2-3 years depending on finish",
    assemblyTime: "4-6 hours",
    sku: "WK-GENERAL-001",
    slug: "wander-troopy-flat-pack",
    inStock: true,
    stockQuantity: 25,
    rating: 4.6,
    reviewCount: 189,
    badges: ["Budget", "Popular"],
    shipClass: "oversized",
    upsells: ["cushion-set-wander", "insulation-kit-basic", "led-strip-warm"],
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "roam-troopy-flat-pack-general", 
    name: "Roam Troopy Flat Pack",
    description: "Our most popular mid-range flat pack featuring enhanced hardware, LED lighting, and premium finishes. Perfect balance of features and value for extended adventures.", // TODO: update description based on final marketing copy
    shortDescription: "Most popular mid-range flat pack with enhanced features",
    price: 6700.00, // Starting price for Black Hex chest fridge variant
    images: ["/products/roam-general-1.jpg", "/products/roam-general-2.jpg"], // TODO: update with actual product images  
    videoUrl: "/videos/roam-overview.mp4", // TODO: create overview video
    category: "Complete Kits",
    subcategory: "Mid-Range",
    tags: ["Flat Pack", "Troopcarrier", "Mid-Range", "Popular", "LED Lighting"],
    features: [
      "Enhanced soft-close drawer systems",
      "Integrated LED lighting included",
      "Premium finishes available", 
      "Advanced cable management",
      "Heavy-duty mounting hardware",
      "Quick-connect electrical system"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood",
      "Configurations": "Chest or upright fridge options",
      "Finishes": "Black Hex, White, Plain Birch",
      "Assembly": "6-8 hours typical",
      "Compatibility": "Toyota Troopcarrier"
    },
    weight: 55.0,
    compatibility: ["Toyota Troopcarrier"],
    isPopular: true,
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "6-8 hours", 
    sku: "RK-GENERAL-001",
    slug: "roam-troopy-flat-pack",
    inStock: false,
    stockQuantity: 0,
    comingSoon: true,
    rating: 4.8,
    reviewCount: 267,
    badges: ["Most Popular", "Enhanced Features"],
    shipClass: "oversized",
    upsells: ["cushion-set-roam", "insulation-kit-premium", "electrical-kit-advanced"],
    isTroopyPack: true,
    troopyPackSlug: "roam-kit",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "premium-troopy-kits-general",
    name: "Premium Troopy Kits", 
    description: "The ultimate in flat pack luxury featuring premium multi-tone finishes, smart lighting controls, and German-engineered hardware. Professional installation included.", // TODO: update description based on final marketing copy
    shortDescription: "Ultimate luxury flat pack with premium materials",
    price: 9850.00, // Starting price for chest fridge variant
    images: ["/products/premium-general-1.jpg", "/products/premium-general-2.jpg"], // TODO: update with actual product images
    videoUrl: "/videos/premium-overview.mp4", // TODO: create overview video  
    category: "Complete Kits",
    subcategory: "Premium Range",
    tags: ["Flat Pack", "Troopcarrier", "Premium", "Luxury", "Smart Features"],
    features: [
      "Premium multi-tone timber finish",
      "German-engineered soft-close systems", 
      "Smart lighting with app control",
      "Premium stainless steel hardware",
      "Professional installation included",
      "Advanced power management system"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with luxury veneer",
      "Configurations": "Chest or upright fridge options", 
      "Finishes": "Premium multi-tone",
      "Assembly": "Professional installation included",
      "Compatibility": "Toyota Troopcarrier"
    },
    weight: 70.0,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "5 years",
    assemblyTime: "Professional installation included",
    sku: "PK-GENERAL-001", 
    slug: "premium-troopy-kits",
    inStock: true,
    stockQuantity: 5,
    rating: 4.9,
    reviewCount: 70,
    badges: ["Premium", "Professional Install"],
    shipClass: "freight",
    upsells: ["cushion-set-premium", "electrical-kit-premium", "water-system-complete"],
    isTroopyPack: true,
    troopyPackSlug: "premium-kit",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15")
  }
];

// Side Panel Products 
export const sidePanelProducts: ComponentProduct[] = [
  {
    id: "troopy-side-panels-basic",
    name: "Troopy Side Panels",
    description: "Clean, functional side panels designed specifically for Toyota Troopcarriers. These panels provide a finished interior look while protecting the vehicle's original walls.", // TODO: update description, media, pricing
    shortDescription: "Basic side panels for interior finishing",
    price: 850.00, // TODO: update pricing
    images: ["/products/side-panels-basic-1.jpg", "/products/side-panels-basic-2.jpg"], // TODO: update with actual product images
    category: "Panels",
    subcategory: "Interior Panels",
    tags: ["Panels", "Troopcarrier", "Interior", "Protection"],
    features: [
      "Custom-fit for Toyota Troopcarrier",
      "Marine-grade plywood construction",
      "Easy installation with brackets",
      "Multiple finish options available",
      "Protects original vehicle walls",
      "Removable design"
    ],
    specifications: {
      "Material": "Marine-grade plywood", // TODO: update specifications
      "Thickness": "12mm",
      "Finish": "Multiple options available",
      "Installation": "Bracket mounting system",
      "Compatibility": "Toyota Troopcarrier all models"
    },
    dimensions: {
      length: 200,
      width: 120,
      height: 2
    },
    weight: 25.0,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "2-3 hours",
    sku: "SP-BASIC-001",
    slug: "troopy-side-panels",
    inStock: true,
    stockQuantity: 15,
    rating: 4.4, // TODO: update rating and reviews
    reviewCount: 42,
    badges: ["Custom Fit"],
    shipClass: "oversized",
    upsells: ["troopy-side-panels-storage", "insulation-kit-basic"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "troopy-side-panels-storage",
    name: "Troopy Side Panels with Storage",
    description: "Enhanced side panels featuring integrated storage compartments, perfect for organizing smaller items while maintaining the clean interior aesthetic.", // TODO: update description, media, pricing
    shortDescription: "Side panels with integrated storage compartments",
    price: 1250.00, // TODO: update pricing 
    images: ["/products/side-panels-storage-1.jpg", "/products/side-panels-storage-2.jpg"], // TODO: update with actual product images
    category: "Panels",
    subcategory: "Storage Panels",
    tags: ["Panels", "Troopcarrier", "Storage", "Organization"],
    features: [
      "Integrated storage compartments",
      "Custom-fit for Toyota Troopcarrier", 
      "Premium marine-grade construction",
      "Soft-close storage doors",
      "Multiple compartment sizes",
      "Easy access design"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood", // TODO: update specifications
      "Storage Volume": "45L total across all compartments",
      "Compartments": "6 various sized storage areas",
      "Installation": "Enhanced bracket mounting",
      "Compatibility": "Toyota Troopcarrier all models"
    },
    dimensions: {
      length: 200,
      width: 120, 
      height: 8
    },
    weight: 35.0,
    compatibility: ["Toyota Troopcarrier"],
    isPopular: true,
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "3-4 hours",
    sku: "SP-STOR-001",
    slug: "troopy-side-panels-with-storage",
    inStock: true,
    stockQuantity: 12,
    rating: 4.7, // TODO: update rating and reviews
    reviewCount: 38,
    badges: ["Popular", "Enhanced Storage"],
    shipClass: "oversized", 
    upsells: ["storage-organizers", "led-strip-warm"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Flooring Products
export const flooringProducts: ComponentProduct[] = [
  {
    id: "troopy-floor",
    name: "Troopy Floor",
    description: "Professional-grade flooring solution designed specifically for Toyota Troopcarriers. Provides durable, easy-to-clean surface with integrated attachment points for fitout components.", // TODO: update description, media, pricing
    shortDescription: "Professional flooring system for Troopcarriers",
    price: 950.00, // TODO: update pricing
    images: ["/products/troopy-floor-1.jpg", "/products/troopy-floor-2.jpg"], // TODO: update with actual product images
    category: "Flooring",
    subcategory: "Vehicle Flooring",
    tags: ["Flooring", "Troopcarrier", "Professional", "Durable"],
    features: [
      "Custom-fit for Toyota Troopcarrier",
      "Heavy-duty marine-grade materials",
      "Integrated attachment points",
      "Easy-to-clean surface", 
      "Non-slip texture",
      "Removable for maintenance"
    ],
    specifications: {
      "Material": "Marine-grade plywood with vinyl surface", // TODO: update specifications
      "Thickness": "18mm", 
      "Surface": "Anti-slip vinyl coating",
      "Attachment Points": "Pre-drilled mounting locations",
      "Compatibility": "Toyota Troopcarrier all models"
    },
    dimensions: {
      length: 220,
      width: 140,
      height: 2
    },
    weight: 45.0,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "1-2 hours",
    sku: "FLOOR-001",
    slug: "troopy-floor", 
    inStock: true,
    stockQuantity: 20,
    rating: 4.6, // TODO: update rating and reviews
    reviewCount: 67,
    badges: ["Professional Grade"],
    shipClass: "oversized",
    upsells: ["insulation-kit-basic", "wander-troopy-flat-pack-general"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Accessory Products
export const accessoryProducts: ComponentProduct[] = [
  {
    id: "cushion-set-troopy-kits",
    name: "Cushion Set for Troopy Kits",
    description: "Premium cushion set designed to complement any of our Troopy flat pack configurations. Available in multiple colors and materials to match your kit finish.", // TODO: update description, media, pricing
    shortDescription: "Premium cushions for all Troopy kit configurations",
    price: 450.00, // TODO: update pricing
    images: ["/products/cushion-troopy-kits-1.jpg", "/products/cushion-troopy-kits-2.jpg"], // TODO: update with actual product images
    category: "Accessories",
    subcategory: "Cushions",
    tags: ["Cushions", "Troopcarrier", "Comfort", "Custom Fit"],
    features: [
      "Compatible with all flat pack kits",
      "Multiple color options available",
      "Marine-grade vinyl construction",
      "High-density foam core",
      "Water-resistant and easy to clean",
      "Custom sizing available"
    ],
    specifications: {
      "Material": "Marine-grade vinyl with foam core", // TODO: update specifications
      "Thickness": "8cm high-density foam",
      "Colors": "6 standard colors available",
      "Attachment": "Velcro and snap fasteners",
      "Compatibility": "All Troopy flat pack configurations"
    },
    dimensions: {
      length: 120,
      width: 60,
      height: 8
    },
    weight: 3.5,
    compatibility: ["Wander Kit", "Roam Kit", "Premium Kit"],
    isPopular: true,
    installationRequired: false,
    warranty: "2 years",
    sku: "CUSH-TROOPY-001",
    slug: "cushion-set-troopy-kits",
    inStock: true,
    stockQuantity: 25,
    rating: 4.7, // TODO: update rating and reviews
    reviewCount: 94,
    badges: ["Popular", "Multi-Compatible"],
    shipClass: "standard",
    upsells: ["storage-organizers", "led-strip-warm"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Plumbing Products
export const plumbingProducts: ComponentProduct[] = [
  {
    id: "shower-outlet",
    name: "Shower Outlet",
    description: "Compact external shower outlet system perfect for outdoor washing and cleaning. Easy installation with quick-connect fittings and integrated water flow control.", // TODO: update description, media, pricing
    shortDescription: "External shower system for outdoor use", 
    price: 180.00, // TODO: update pricing
    images: ["/products/shower-outlet-1.jpg", "/products/shower-outlet-2.jpg"], // TODO: update with actual product images
    category: "Plumbing",
    subcategory: "External Outlets",
    tags: ["Plumbing", "Shower", "External", "Outdoor"],
    features: [
      "Quick-connect water fittings",
      "Integrated flow control valve",
      "Stainless steel construction",
      "Lockable for security",
      "Universal hose compatibility",
      "Easy installation design"
    ],
    specifications: {
      "Material": "Stainless steel body", // TODO: update specifications
      "Connection": "Standard garden hose thread",
      "Flow Rate": "8L/min maximum",
      "Installation": "Single mounting point required",
      "Compatibility": "All water systems 20L+"
    },
    dimensions: {
      length: 15,
      width: 10,
      height: 8
    },
    weight: 1.2,
    compatibility: ["Water Tank 20L", "Water Tank 30L", "All flat pack kits"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "30 minutes",
    sku: "SHOWER-001",
    slug: "shower-outlet",
    inStock: true,
    stockQuantity: 35,
    rating: 4.5, // TODO: update rating and reviews
    reviewCount: 78,
    badges: ["Quick Install"],
    shipClass: "standard",
    upsells: ["water-tank-30l", "water-tank-20l"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"), 
    updatedAt: new Date("2024-01-15")
  }
];

// Ventilation Products
export const ventilationProducts: ComponentProduct[] = [
  {
    id: "troopy-utility-vent",
    name: "Troopy Utility Vent (Ark Earth)",
    description: "High-quality utility vent designed specifically for Toyota Troopcarriers. Provides excellent ventilation while maintaining weather protection.",
    shortDescription: "Professional utility vent for Troopcarriers",
    price: 85.00,
    images: ["/products/utility-vent-1.jpg", "/products/utility-vent-2.jpg"],
    category: "Ventilation",
    subcategory: "Utility Vents",
    tags: ["Ventilation", "Troopcarrier", "Weather Resistant", "Professional"],
    features: [
      "Weather-resistant construction",
      "Easy installation design",
      "Durable materials",
      "Professional finish",
      "Troopcarrier specific fit",
      "Long-lasting performance"
    ],
    specifications: {
      "Material": "High-grade plastic with metal components",
      "Size": "Standard Troopcarrier fit",
      "Installation": "Screw-on mounting",
      "Weather Rating": "IP65",
      "Compatibility": "Toyota Troopcarrier"
    },
    dimensions: {
      length: 20,
      width: 15,
      height: 5
    },
    weight: 0.8,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "15 minutes",
    sku: "VENT-001",
    slug: "troopy-utility-vent",
    inStock: true,
    stockQuantity: 25,
    rating: 4.6,
    reviewCount: 42,
    badges: ["Professional Grade"],
    shipClass: "standard",
    upsells: ["troopy-side-panels"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Compressor Products
export const compressorProducts: ComponentProduct[] = [
  {
    id: "arb-twin-compressor-bracket",
    name: "ARB Twin Compressor Bracket (Ark Earth)",
    description: "Heavy-duty mounting bracket for ARB twin air compressors. Designed for secure installation in Toyota Troopcarriers with easy access for maintenance.",
    shortDescription: "Heavy-duty ARB compressor mounting bracket",
    price: 120.00,
    images: ["/products/arb-bracket-1.jpg", "/products/arb-bracket-2.jpg"],
    category: "Compressors",
    subcategory: "Mounting Brackets",
    tags: ["Compressor", "ARB", "Mounting", "Heavy Duty", "Professional"],
    features: [
      "Heavy-duty construction",
      "ARB twin compressor compatible",
      "Secure mounting system",
      "Easy maintenance access",
      "Professional installation",
      "Durable materials"
    ],
    specifications: {
      "Material": "Powder-coated steel",
      "Compatibility": "ARB Twin Compressor",
      "Installation": "Vehicle-specific mounting",
      "Weight Capacity": "Up to 15kg",
      "Finish": "Black powder coat"
    },
    dimensions: {
      length: 30,
      width: 20,
      height: 8
    },
    weight: 2.5,
    compatibility: ["Toyota Troopcarrier", "ARB Twin Compressor"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "45 minutes",
    sku: "ARB-BRACKET-001",
    slug: "arb-twin-compressor-bracket",
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 28,
    badges: ["Heavy Duty", "Professional"],
    shipClass: "standard",
    upsells: ["arb-twin-compressor"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Water Tank Products
export const waterTankProducts: ComponentProduct[] = [
  {
    id: "62l-stainless-water-tank",
    name: "62L Stainless Steel Water Tank",
    description: "High-quality stainless steel water tank with 62L capacity. Perfect for extended adventures with durable construction and easy maintenance.",
    shortDescription: "62L stainless steel water tank",
    price: 450.00,
    images: ["/products/62l-tank-1.jpg", "/products/62l-tank-2.jpg"],
    category: "Water Systems",
    subcategory: "Water Tanks",
    tags: ["Water Tank", "Stainless Steel", "62L", "Durable", "Professional"],
    features: [
      "Stainless steel construction",
      "62L capacity",
      "Easy maintenance",
      "Durable design",
      "Professional grade",
      "Long-lasting performance"
    ],
    specifications: {
      "Material": "304 Stainless Steel",
      "Capacity": "62 Liters",
      "Dimensions": "400mm x 300mm x 500mm",
      "Weight": "8.5kg",
      "Fittings": "Standard BSP threads"
    },
    dimensions: {
      length: 40,
      width: 30,
      height: 50
    },
    weight: 8.5,
    compatibility: ["Toyota Troopcarrier", "All flat pack kits"],
    installationRequired: true,
    warranty: "5 years",
    assemblyTime: "2 hours",
    sku: "TANK-62L-001",
    slug: "62l-stainless-water-tank",
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 35,
    badges: ["Professional Grade", "Stainless Steel"],
    shipClass: "oversized",
    upsells: ["water-pump-40psi", "shower-outlet"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "90l-troopy-water-tank",
    name: "90L Troopy Water Tank",
    description: "Large capacity 90L water tank designed specifically for Toyota Troopcarriers. Provides ample water storage for extended adventures.",
    shortDescription: "90L water tank for Troopcarriers",
    price: 680.00,
    images: ["/products/90l-tank-1.jpg", "/products/90l-tank-2.jpg"],
    category: "Water Systems",
    subcategory: "Water Tanks",
    tags: ["Water Tank", "90L", "Troopcarrier", "Large Capacity", "Professional"],
    features: [
      "90L large capacity",
      "Troopcarrier specific design",
      "Heavy-duty construction",
      "Easy installation",
      "Professional grade",
      "Extended adventure ready"
    ],
    specifications: {
      "Material": "Food-grade plastic",
      "Capacity": "90 Liters",
      "Dimensions": "500mm x 400mm x 450mm",
      "Weight": "12kg",
      "Compatibility": "Toyota Troopcarrier"
    },
    dimensions: {
      length: 50,
      width: 40,
      height: 45
    },
    weight: 12.0,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "3 hours",
    sku: "TANK-90L-001",
    slug: "90l-troopy-water-tank",
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 22,
    badges: ["Large Capacity", "Professional"],
    shipClass: "oversized",
    upsells: ["90l-plumbing-kit", "water-pump-40psi"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Sound Deadening Products
export const soundDeadeningProducts: ComponentProduct[] = [
  {
    id: "mass-noise-liner",
    name: "Car Builders Mass Noise Liner",
    description: "Professional mass noise liner for effective sound deadening. Reduces road noise and improves cabin acoustics in Toyota Troopcarriers.",
    shortDescription: "Professional mass noise liner",
    price: 95.00,
    images: ["/products/mass-liner-1.jpg", "/products/mass-liner-2.jpg"],
    category: "Sound Deadening",
    subcategory: "Mass Liners",
    tags: ["Sound Deadening", "Mass Liner", "Noise Reduction", "Professional"],
    features: [
      "Effective noise reduction",
      "Easy installation",
      "Professional grade",
      "Durable materials",
      "Improved acoustics",
      "Long-lasting performance"
    ],
    specifications: {
      "Material": "Butyl rubber with aluminum",
      "Thickness": "2mm",
      "Coverage": "1 square meter",
      "Weight": "2.5kg per sheet",
      "Installation": "Self-adhesive"
    },
    dimensions: {
      length: 100,
      width: 100,
      height: 0.2
    },
    weight: 2.5,
    compatibility: ["Toyota Troopcarrier", "All vehicles"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "1 hour per sheet",
    sku: "MASS-LINER-001",
    slug: "mass-noise-liner",
    inStock: true,
    stockQuantity: 20,
    rating: 4.5,
    reviewCount: 48,
    badges: ["Professional Grade"],
    shipClass: "standard",
    upsells: ["troopy-sound-pack"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "troopy-sound-pack",
    name: "Carbuilders Troopy Sound Deadening Pack",
    description: "Complete sound deadening pack specifically designed for Toyota Troopcarriers. Includes all materials needed for professional sound insulation.",
    shortDescription: "Complete Troopcarrier sound deadening pack",
    price: 280.00,
    images: ["/products/sound-pack-1.jpg", "/products/sound-pack-2.jpg"],
    category: "Sound Deadening",
    subcategory: "Complete Packs",
    tags: ["Sound Deadening", "Complete Pack", "Troopcarrier", "Professional"],
    features: [
      "Complete sound deadening solution",
      "Troopcarrier specific design",
      "Professional installation guide",
      "All materials included",
      "Effective noise reduction",
      "Easy installation"
    ],
    specifications: {
      "Contents": "Mass liner, foam, adhesive",
      "Coverage": "Complete Troopcarrier",
      "Materials": "Professional grade",
      "Installation": "DIY friendly",
      "Compatibility": "Toyota Troopcarrier"
    },
    dimensions: {
      length: 60,
      width: 40,
      height: 10
    },
    weight: 8.0,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "4-6 hours",
    sku: "SOUND-PACK-001",
    slug: "troopy-sound-pack",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 31,
    badges: ["Complete Pack", "Professional"],
    shipClass: "oversized",
    upsells: ["mass-noise-liner"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Combined new component products
export const allComponentProducts: ComponentProduct[] = [
  ...generalFlatPackProducts,
  ...sidePanelProducts,
  ...flooringProducts,
  ...accessoryProducts,
  ...plumbingProducts,
  ...ventilationProducts,
  ...compressorProducts,
  ...waterTankProducts,
  ...soundDeadeningProducts
];

// Import additional products
import { allAdditionalProducts } from './additional-products';

// Combined ALL products (flat packs + upsells + components + test products + additional products)
export const allProducts = [
  ...allFlatPacks,
  ...allUpsellProducts,
  ...allComponentProducts,
  ...allAdditionalProducts,
  ...testProducts
];

// Helper functions for component products
export function getComponentsByCategory(category: ComponentProduct['category']): ComponentProduct[] {
  return allComponentProducts.filter(product => product.category === category);
}

export function getComponentsByCompatibility(compatibility: string): ComponentProduct[] {
  return allComponentProducts.filter(product => 
    product.compatibility.some(compat => 
      compat.toLowerCase().includes(compatibility.toLowerCase())
    )
  );
}

export function getComponentById(id: string): ComponentProduct | undefined {
  return allComponentProducts.find(product => product.id === id);
}

export function getComponentBySlug(slug: string): ComponentProduct | undefined {
  return allComponentProducts.find(product => product.slug === slug);
}

export function getPopularComponents(): ComponentProduct[] {
  return allComponentProducts.filter(product => product.isPopular);
}

// Universal product search functions
export function getAnyProductById(id: string): Product | undefined {
  return allProducts.find((product: Product) => product.id === id);
}

export function getAnyProductBySlug(slug: string): FlatPackProduct | ComponentProduct | TestProduct | undefined {
  const flatPack = getFlatPackBySlug(slug);
  if (flatPack) return flatPack;
  
  const component = getComponentBySlug(slug);
  if (component) return component;
  
  return getTestProductBySlug(slug);
}

export function getAllProductCategories(): string[] {
  const flatPackCategories = Array.from(new Set(allFlatPacks.map(p => p.category)));
  const upsellCategories = getUpsellCategories();
  const componentCategories = Array.from(new Set(allComponentProducts.map(p => p.category)));
  
  return Array.from(new Set([...flatPackCategories, ...upsellCategories, ...componentCategories]));
}

// Troopy Pack filtering functions
export function getTroopyPackProducts(): (FlatPackProduct | ComponentProduct)[] {
  return allProducts.filter((product: Product) => 'isTroopyPack' in product && product.isTroopyPack === true) as (FlatPackProduct | ComponentProduct)[];
}

export function getNonTroopyPackProducts(): Product[] {
  return allProducts.filter((product: Product) => !('isTroopyPack' in product) || product.isTroopyPack !== true);
}

export function getTroopyPackBySlug(slug: string): (FlatPackProduct | ComponentProduct)[] {
  return getTroopyPackProducts().filter((product: FlatPackProduct | ComponentProduct) => product.troopyPackSlug === slug);
}

export function getTroopyPackKitTypes(): string[] {
  return ['wander-kit', 'roam-kit', 'premium-kit'];
}
