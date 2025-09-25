export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  videoUrl?: string; // For walkthrough videos
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  isOnSale: boolean;
  salePercentage?: number;
  inStock: boolean;
  stockQuantity: number;
  comingSoon?: boolean; // New field for products not yet available
  tags: string[];
  specifications: Record<string, string>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  features: string[];
  installationRequired: boolean;
  warranty: string;
  sku: string;
  upsells?: string[]; // IDs of recommended products
  shipClass?: 'standard' | 'oversized' | 'freight'; // For Big Post integration
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories?: string[];
}

export interface ProductFilter {
  category?: string;
  subcategory?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  onSale?: boolean;
  rating?: number;
  tags?: string[];
}

export interface ProductSort {
  field: 'price' | 'name' | 'rating' | 'createdAt' | 'popularity';
  direction: 'asc' | 'desc';
}

// Import flat pack data
import { allFlatPacks } from '@/data/flatpacks';

// Convert flat pack data to Product interface
const flatPackProducts: Product[] = allFlatPacks.map(flatPack => ({
  id: flatPack.id,
  name: flatPack.name,
  description: flatPack.description,
  price: flatPack.price,
  images: flatPack.images,
  videoUrl: flatPack.videoUrl,
  category: flatPack.category,
  subcategory: flatPack.subcategory,
  rating: flatPack.rating,
  reviewCount: flatPack.reviewCount,
  isOnSale: false, // Flat packs at fixed pricing
  inStock: flatPack.inStock,
  stockQuantity: flatPack.stockQuantity,
  tags: flatPack.tags,
  specifications: flatPack.specifications,
  weight: flatPack.weight,
  dimensions: flatPack.dimensions,
  features: flatPack.features,
  installationRequired: flatPack.installationRequired,
  warranty: flatPack.warranty,
  sku: flatPack.sku,
  upsells: flatPack.upsells,
  shipClass: flatPack.shipClass,
  createdAt: flatPack.createdAt,
  updatedAt: flatPack.updatedAt
}));

// Sample product data (original products)
export const otherProducts: Product[] = [
  {
    id: "1",
    name: "12V Dimmable Reading Light",
    description: "High-quality LED reading light perfect for vans and 4x4 vehicles. Features adjustable brightness and flexible mounting options.",
    price: 80.00,
    originalPrice: 95.00,
    images: ["/products/reading-light-1.jpg", "/products/reading-light-2.jpg"],
    category: "Lighting",
    subcategory: "Interior Lighting",
    rating: 4.8,
    reviewCount: 127,
    isOnSale: true,
    salePercentage: 16,
    inStock: true,
    stockQuantity: 45,
    tags: ["LED", "12V", "Dimmable", "Reading Light", "Van Accessory"],
    specifications: {
      "Voltage": "12V DC",
      "Power": "3W",
      "Lumens": "300lm",
      "Color Temperature": "3000K Warm White",
      "Mounting": "Flexible Arm",
      "Material": "Aluminum"
    },
    weight: 0.3,
    dimensions: {
      length: 15,
      width: 8,
      height: 25
    },
    features: [
      "Dimmable brightness control",
      "Flexible mounting arm",
      "Energy efficient LED",
      "Easy installation",
      "Weather resistant"
    ],
    installationRequired: false,
    warranty: "2 years",
    sku: "RL-12V-001",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Duoetto MK2 Digital Dual Voltage Water Heater",
    description: "Professional-grade 10L water heater with dual voltage operation. Perfect for campervans and mobile homes.",
    price: 417.00,
    originalPrice: 435.00,
    images: ["/products/water-heater-1.jpg", "/products/water-heater-2.jpg"],
    category: "Water Systems",
    subcategory: "Water Heaters",
    rating: 4.6,
    reviewCount: 89,
    isOnSale: true,
    salePercentage: 4,
    inStock: true,
    stockQuantity: 12,
    tags: ["Water Heater", "Dual Voltage", "10L", "Digital", "Professional"],
    specifications: {
      "Capacity": "10L",
      "Voltage": "12V/240V",
      "Power": "850W (240V), 180W (12V)",
      "Heating Time": "15-20 minutes",
      "Temperature Range": "30-70°C",
      "Material": "Stainless Steel"
    },
    weight: 2.8,
    dimensions: {
      length: 35,
      width: 25,
      height: 45
    },
    features: [
      "Dual voltage operation",
      "Digital temperature control",
      "Energy efficient",
      "Easy installation",
      "Professional grade"
    ],
    installationRequired: true,
    warranty: "3 years",
    sku: "WH-DUO-10L",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "3",
    name: "Troopcarrier Utility Vent - Ark Earth",
    description: "Premium ventilation solution specifically designed for Toyota Troopcarrier vehicles. Ensures optimal airflow and comfort.",
    price: 320.00,
    images: ["/products/vent-1.jpg", "/products/vent-2.jpg"],
    category: "Ventilation",
    subcategory: "Roof Vents",
    rating: 4.9,
    reviewCount: 203,
    isOnSale: false,
    inStock: true,
    stockQuantity: 28,
    tags: ["Ventilation", "Troopcarrier", "Roof Vent", "Ark Earth", "Premium"],
    specifications: {
      "Material": "ABS Plastic",
      "Size": "400mm x 400mm",
      "Installation": "Roof Mount",
      "Weather Rating": "IP65",
      "Color": "Ark Earth"
    },
    weight: 1.2,
    dimensions: {
      length: 40,
      width: 40,
      height: 8
    },
    features: [
      "Perfect fit for Troopcarrier",
      "Weather resistant",
      "Easy installation",
      "Optimal airflow",
      "Premium finish"
    ],
    installationRequired: true,
    warranty: "5 years",
    sku: "VT-TC-400",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "4",
    name: "Troopy Side Panels with Added Storage",
    description: "Custom side panels designed for Toyota Troopcarrier with integrated storage compartments for maximum organization.",
    price: 850.00,
    originalPrice: 806.00,
    images: ["/products/side-panels-1.jpg", "/products/side-panels-2.jpg"],
    category: "Storage",
    subcategory: "Side Panels",
    rating: 4.7,
    reviewCount: 156,
    isOnSale: true,
    salePercentage: 5,
    inStock: true,
    stockQuantity: 8,
    tags: ["Storage", "Side Panels", "Troopcarrier", "Custom", "Organization"],
    specifications: {
      "Material": "Marine Plywood",
      "Finish": "Water Resistant Coating",
      "Installation": "Side Mount",
      "Storage Capacity": "Multiple compartments",
      "Customizable": "Yes"
    },
    weight: 15.0,
    dimensions: {
      length: 120,
      width: 60,
      height: 25
    },
    features: [
      "Custom fit design",
      "Multiple storage compartments",
      "Water resistant finish",
      "Easy installation",
      "Professional quality"
    ],
    installationRequired: true,
    warranty: "2 years",
    sku: "SP-TC-CUSTOM",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  },
  {
    id: "5",
    name: "Roam Troopy Flat Pack",
    description: "Complete flat pack storage solution for Toyota Troopcarrier. Easy to assemble and install with comprehensive instructions.",
    price: 5950.00,
    images: ["/products/flat-pack-1.jpg", "/products/flat-pack-2.jpg"],
    category: "Storage",
    subcategory: "Complete Kits",
    rating: 4.5,
    reviewCount: 78,
    isOnSale: false,
    inStock: true,
    stockQuantity: 5,
    tags: ["Complete Kit", "Flat Pack", "Troopcarrier", "Storage", "Easy Assembly"],
    specifications: {
      "Material": "Marine Plywood",
      "Components": "Full interior kit",
      "Assembly": "Required",
      "Installation": "Professional recommended",
      "Customizable": "Limited"
    },
    weight: 45.0,
    dimensions: {
      length: 150,
      width: 80,
      height: 40
    },
    features: [
      "Complete storage solution",
      "Easy assembly",
      "Professional quality",
      "Comprehensive instructions",
      "All hardware included"
    ],
    installationRequired: true,
    warranty: "3 years",
    sku: "FP-TC-COMPLETE",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "6",
    name: "Bushman DC85-X 85L Caravan Fridge",
    description: "High-performance 85L portable fridge perfect for long trips. Features advanced cooling technology and energy efficiency.",
    price: 1473.00,
    originalPrice: 1406.00,
    images: ["/products/fridge-1.jpg", "/products/fridge-2.jpg"],
    category: "Appliances",
    subcategory: "Refrigeration",
    rating: 4.8,
    reviewCount: 134,
    isOnSale: true,
    salePercentage: 5,
    inStock: true,
    stockQuantity: 15,
    tags: ["Fridge", "85L", "Portable", "Energy Efficient", "Caravan"],
    specifications: {
      "Capacity": "85L",
      "Voltage": "12V/24V",
      "Power Consumption": "0.8-1.2kWh/day",
      "Temperature Range": "-18°C to +10°C",
      "Cooling System": "Compressor",
      "Material": "Stainless Steel"
    },
    weight: 28.0,
    dimensions: {
      length: 75,
      width: 45,
      height: 65
    },
    features: [
      "Advanced cooling technology",
      "Energy efficient operation",
      "Durable construction",
      "Easy temperature control",
      "Portable design"
    ],
    installationRequired: false,
    warranty: "3 years",
    sku: "FR-BUSH-85L",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08")
  },
  {
    id: "7",
    name: "Everlock Latches",
    description: "Heavy-duty latches designed for vehicle storage and security. Perfect for drawers, cabinets, and storage compartments.",
    price: 22.50,
    originalPrice: 25.00,
    images: ["/products/latches-1.jpg", "/products/latches-2.jpg"],
    category: "Hardware",
    subcategory: "Latches",
    rating: 4.9,
    reviewCount: 267,
    isOnSale: true,
    salePercentage: 10,
    inStock: true,
    stockQuantity: 120,
    tags: ["Latches", "Heavy Duty", "Security", "Storage", "Vehicle"],
    specifications: {
      "Material": "Zinc Alloy",
      "Finish": "Chrome Plated",
      "Load Capacity": "50kg",
      "Installation": "Screw Mount",
      "Lock Type": "Push Button"
    },
    weight: 0.15,
    dimensions: {
      length: 8,
      width: 4,
      height: 3
    },
    features: [
      "Heavy duty construction",
      "Secure locking mechanism",
      "Easy installation",
      "Durable finish",
      "Versatile mounting"
    ],
    installationRequired: false,
    warranty: "1 year",
    sku: "LH-EVER-001",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "8",
    name: "Carbuilders Troopy Sound Deadening Pack",
    description: "Professional sound deadening solution for Toyota Troopcarrier. Reduces road noise and improves acoustic comfort.",
    price: 590.00,
    images: ["/products/sound-deadening-1.jpg", "/products/sound-deadening-2.jpg"],
    category: "Soundproofing",
    subcategory: "Sound Deadening",
    rating: 4.4,
    reviewCount: 92,
    isOnSale: false,
    inStock: true,
    stockQuantity: 25,
    tags: ["Sound Deadening", "Troopcarrier", "Noise Reduction", "Professional", "Acoustic"],
    specifications: {
      "Material": "Butyl Rubber + Aluminium",
      "Thickness": "2.5mm",
      "Coverage": "Complete vehicle kit",
      "Installation": "Self-adhesive",
      "Temperature Range": "-40°C to +80°C"
    },
    weight: 8.5,
    dimensions: {
      length: 100,
      width: 50,
      height: 5
    },
    features: [
      "Professional grade material",
      "Easy self-adhesive installation",
      "Complete vehicle coverage",
      "Temperature resistant",
      "Long lasting performance"
    ],
    installationRequired: true,
    warranty: "2 years",
    sku: "SD-CB-TC",
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-22")
  }
];

// Combined product data (flat packs + other products)
export const sampleProducts: Product[] = [
  ...flatPackProducts,
  ...otherProducts
];

// Product categories
export const productCategories: ProductCategory[] = [
  {
    id: "lighting",
    name: "Lighting",
    description: "Interior and exterior lighting solutions for vehicles",
    image: "/categories/lighting.jpg",
    productCount: 15,
    subcategories: ["Interior Lighting", "Exterior Lighting", "LED Strips", "Switches"]
  },
  {
    id: "water-systems",
    name: "Water Systems",
    description: "Complete water management solutions for mobile living",
    image: "/categories/water-systems.jpg",
    productCount: 23,
    subcategories: ["Water Heaters", "Water Pumps", "Tanks", "Filtration"]
  },
  {
    id: "ventilation",
    name: "Ventilation",
    description: "Air circulation and climate control solutions",
    image: "/categories/ventilation.jpg",
    productCount: 18,
    subcategories: ["Roof Vents", "Fans", "Air Conditioning", "Ducting"]
  },
  {
    id: "storage",
    name: "Storage",
    description: "Custom storage solutions for every vehicle type",
    image: "/categories/storage.jpg",
    productCount: 42,
    subcategories: ["Side Panels", "Drawer Systems", "Complete Kits", "Organizers"]
  },
  {
    id: "appliances",
    name: "Appliances",
    description: "Essential appliances for mobile living",
    image: "/categories/appliances.jpg",
    productCount: 31,
    subcategories: ["Refrigeration", "Cooking", "Heating", "Cleaning"]
  },
  {
    id: "hardware",
    name: "Hardware",
    description: "Quality hardware and fasteners for installations",
    image: "/categories/hardware.jpg",
    productCount: 67,
    subcategories: ["Latches", "Hinges", "Fasteners", "Tools"]
  },
  {
    id: "soundproofing",
    name: "Soundproofing",
    description: "Noise reduction and acoustic solutions",
    image: "/categories/soundproofing.jpg",
    productCount: 12,
    subcategories: ["Sound Deadening", "Acoustic Panels", "Sealants", "Insulation"]
  }
];

// Helper functions
export function getProductsByCategory(category: string): Product[] {
  return sampleProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return sampleProducts.filter(product => product.subcategory?.toLowerCase() === subcategory.toLowerCase());
}

export function getProductsOnSale(): Product[] {
  return sampleProducts.filter(product => product.isOnSale);
}

export function getProductsInStock(): Product[] {
  return sampleProducts.filter(product => product.inStock);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}

export function filterProducts(filters: ProductFilter): Product[] {
  let filtered = [...sampleProducts];

  if (filters.category) {
    filtered = filtered.filter(product => 
      product.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters.subcategory) {
    filtered = filtered.filter(product => 
      product.subcategory?.toLowerCase() === filters.subcategory!.toLowerCase()
    );
  }

  if (filters.priceRange) {
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max
    );
  }

  if (filters.inStock !== undefined) {
    filtered = filtered.filter(product => product.inStock === filters.inStock);
  }

  if (filters.onSale !== undefined) {
    filtered = filtered.filter(product => product.isOnSale === filters.onSale);
  }

  if (filters.rating) {
    filtered = filtered.filter(product => product.rating >= filters.rating!);
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(product => 
      filters.tags!.some(tag => product.tags.includes(tag))
    );
  }

  return filtered;
}

export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const sorted = [...products];
  
  sorted.sort((a, b) => {
    let aValue: string | number, bValue: string | number;
    
    switch (sort.field) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'createdAt':
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      case 'popularity':
        aValue = a.reviewCount;
        bValue = b.reviewCount;
        break;
      default:
        return 0;
    }
    
    if (sort.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  return sorted;
}
