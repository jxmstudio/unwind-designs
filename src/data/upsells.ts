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
    images: ["/products/cushions-wander-1.jpg", "/products/cushions-wander-2.jpg"],
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
    images: ["/products/cushions-roam-1.jpg", "/products/cushions-roam-2.jpg"],
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
    images: ["/products/cushions-premium-1.jpg", "/products/cushions-premium-2.jpg"],
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
  {
    id: "insulation-kit-basic",
    name: "Basic Insulation Kit",
    description: "Essential insulation kit for temperature control and noise reduction. Includes reflective insulation panels and installation hardware for basic thermal protection.",
    shortDescription: "Basic thermal insulation for all kits",
    price: 180.00,
    images: ["/products/insulation-basic-1.jpg", "/products/insulation-basic-2.jpg"],
    category: "Insulation",
    subcategory: "Thermal Insulation",
    tags: ["Insulation", "Thermal", "Basic", "All Kits"],
    features: [
      "Reflective aluminum surface",
      "Foam core for thermal protection",
      "Easy cut-to-fit installation",
      "Reduces heat transfer",
      "Noise dampening properties",
      "Self-adhesive backing"
    ],
    compatibility: ["Wander", "Roam", "Premium"],
    installationRequired: true,
    warranty: "2 years",
    sku: "INSUL-BASIC-001",
    weight: 2.8,
    dimensions: {
      length: 100,
      width: 50,
      height: 2
    },
    inStock: true,
    stockQuantity: 25,
    rating: 4.5,
    reviewCount: 156
  },
  {
    id: "insulation-kit-premium",
    name: "Premium Insulation System",
    description: "Advanced multi-layer insulation system with vapor barrier and acoustic dampening. Professional-grade materials for maximum thermal efficiency and comfort.",
    shortDescription: "Advanced insulation with vapor barrier",
    price: 350.00,
    images: ["/products/insulation-premium-1.jpg", "/products/insulation-premium-2.jpg"],
    category: "Insulation",
    subcategory: "Advanced Insulation",
    tags: ["Insulation", "Premium", "Vapor Barrier", "Acoustic"],
    features: [
      "Multi-layer construction",
      "Vapor barrier included",
      "Superior acoustic dampening",
      "Professional-grade materials",
      "Custom-cut for perfect fit",
      "Installation guide included"
    ],
    compatibility: ["Roam", "Premium"],
    isPopular: true,
    installationRequired: true,
    warranty: "5 years",
    sku: "INSUL-PREM-001",
    weight: 4.5,
    dimensions: {
      length: 120,
      width: 60,
      height: 3
    },
    inStock: true,
    stockQuantity: 18,
    rating: 4.8,
    reviewCount: 92
  }
];

// Electrical Products
export const electricalProducts: UpsellProduct[] = [
  {
    id: "led-strip-warm",
    name: "Warm White LED Strip Kit",
    description: "Complete LED strip lighting kit with warm white LEDs, dimmer control, and all installation hardware. Perfect for creating ambient lighting in your fitout.",
    shortDescription: "Warm white LED lighting kit",
    price: 120.00,
    images: ["/products/led-warm-1.jpg", "/products/led-warm-2.jpg"],
    category: "Electrical",
    subcategory: "Interior Lighting",
    tags: ["LED", "Lighting", "Warm White", "Dimmable"],
    features: [
      "3000K warm white LEDs",
      "Dimmable with touch control",
      "5 meters of LED strip included",
      "12V DC operation",
      "Easy installation with adhesive backing",
      "Remote control included"
    ],
    compatibility: ["Wander", "Roam", "Premium"],
    installationRequired: false,
    warranty: "3 years",
    sku: "LED-WARM-001",
    weight: 0.8,
    dimensions: {
      length: 500,
      width: 1,
      height: 0.5
    },
    inStock: true,
    stockQuantity: 35,
    rating: 4.6,
    reviewCount: 203
  },
  {
    id: "electrical-kit-advanced",
    name: "Advanced Electrical System",
    description: "Comprehensive electrical upgrade including 12V distribution panel, USB outlets, inverter-ready wiring, and monitoring system. Professional installation recommended.",
    shortDescription: "Complete electrical upgrade system",
    price: 850.00,
    images: ["/products/electrical-advanced-1.jpg", "/products/electrical-advanced-2.jpg"],
    category: "Electrical",
    subcategory: "Power Systems",
    tags: ["Electrical", "Power", "Advanced", "12V", "Inverter Ready"],
    features: [
      "12V distribution panel with fuses",
      "Multiple USB charging outlets",
      "Inverter-ready wiring harness",
      "Voltage monitoring system",
      "Professional-grade components",
      "Comprehensive installation guide"
    ],
    compatibility: ["Roam", "Premium"],
    installationRequired: true,
    warranty: "5 years",
    sku: "ELEC-ADV-001",
    weight: 8.5,
    dimensions: {
      length: 40,
      width: 30,
      height: 15
    },
    inStock: true,
    stockQuantity: 12,
    rating: 4.9,
    reviewCount: 78
  }
];

// Water System Products
export const waterProducts: UpsellProduct[] = [
  {
    id: "water-tank-20l",
    name: "20L Fresh Water Tank System",
    description: "Complete 20-liter fresh water system with tank, pump, fittings, and tap. Perfect for basic water needs during weekend adventures.",
    shortDescription: "20L water system for basic needs",
    price: 280.00,
    images: ["/products/water-20l-1.jpg", "/products/water-20l-2.jpg"],
    category: "Plumbing",
    subcategory: "Water Tanks",
    tags: ["Water", "Tank", "20L", "Fresh Water", "Pump"],
    features: [
      "20-liter capacity tank",
      "12V water pump included",
      "Tap and fittings provided",
      "Food-grade plastic tank",
      "Easy installation design",
      "Level indicator included"
    ],
    compatibility: ["Wander", "Roam"],
    installationRequired: true,
    warranty: "3 years",
    sku: "WATER-20L-001",
    weight: 12.0,
    dimensions: {
      length: 45,
      width: 30,
      height: 25
    },
    inStock: true,
    stockQuantity: 20,
    rating: 4.4,
    reviewCount: 134
  },
  {
    id: "water-tank-30l",
    name: "30L Fresh Water Tank System",
    description: "Enhanced 30-liter fresh water system with pressure pump, accumulator tank, and multiple outlet options. Ideal for extended trips and comfort.",
    shortDescription: "30L water system with pressure pump",
    price: 420.00,
    images: ["/products/water-30l-1.jpg", "/products/water-30l-2.jpg"],
    category: "Plumbing",
    subcategory: "Water Tanks",
    tags: ["Water", "Tank", "30L", "Pressure Pump", "Extended Use"],
    features: [
      "30-liter capacity tank",
      "Pressure pump with accumulator",
      "Multiple outlet connections",
      "Digital level display",
      "Quick-connect fittings",
      "Winterization drain valve"
    ],
    compatibility: ["Roam", "Premium"],
    isPopular: true,
    installationRequired: true,
    warranty: "3 years",
    sku: "WATER-30L-001",
    weight: 18.5,
    dimensions: {
      length: 55,
      width: 35,
      height: 30
    },
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 87
  }
];

// Storage Products
export const storageProducts: UpsellProduct[] = [
  {
    id: "storage-organizers",
    name: "Modular Storage Organizers",
    description: "Set of modular storage organizers designed to maximize space efficiency in flat pack configurations. Includes various sized containers and dividers.",
    shortDescription: "Modular organizers for efficient storage",
    price: 85.00,
    images: ["/products/storage-organizers-1.jpg", "/products/storage-organizers-2.jpg"],
    category: "Storage",
    subcategory: "Organization",
    tags: ["Storage", "Organization", "Modular", "Space Efficient"],
    features: [
      "Multiple container sizes included",
      "Adjustable dividers",
      "Stackable design",
      "Clear labeling system",
      "Durable plastic construction",
      "Custom fit for flat pack drawers"
    ],
    compatibility: ["Wander", "Roam", "Premium"],
    installationRequired: false,
    warranty: "2 years",
    sku: "STOR-ORG-001",
    weight: 2.2,
    dimensions: {
      length: 40,
      width: 30,
      height: 20
    },
    inStock: true,
    stockQuantity: 40,
    rating: 4.3,
    reviewCount: 167
  }
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
