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
  // Additional fields for enhanced product display
  isOnSale?: boolean;
  salePercentage?: number;
  colorOptions?: Array<{
    value: string;
    label: string;
    available: boolean;
  }>;
  thicknessOptions?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  faceplateSizeOptions?: Array<{
    value: string;
    label: string;
    available: boolean;
  }>;
  shippingInfo?: {
    freeShippingThreshold: number;
    freeShippingText: string;
    freeShippingDetails: string;
  };
  guaranteeInfo?: {
    title: string;
    details: string;
  };
  requiresEmailOrder?: boolean;
  sideOptions?: Array<{
    value: string;
    label: string;
    available: boolean;
  }>;
  utilityPanelOptions?: Array<{
    value: string;
    label: string;
    available: boolean;
  }>;
  variantOptions?: Array<{
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
  }>;
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
}

// NEW PRODUCTS FROM NOTION LIST

// General Flat Pack Products (simplified versions for overview)
export const generalFlatPackProducts: ComponentProduct[] = [
  // Removed duplicate wander-troopy-flat-pack-general (use wander-troopy-flat-pack from flatpacks.ts instead)
  {
    id: "roam-troopy-flat-pack-general", 
    name: "Roam Troopy Flat Pack",
    description: "Our most popular mid-range flat pack featuring enhanced hardware, LED lighting, and premium finishes. Perfect balance of features and value for extended adventures.", // TODO: update description based on final marketing copy
    shortDescription: "Most popular mid-range flat pack with enhanced features",
    price: 6700.00, // Starting price for Black Hex chest fridge variant
    images: ["/images/placeholder.svg"], // TODO: update with actual product images  
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
    upsells: ["cushion-set-roam"],
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
    images: ["/images/placeholder.svg"], // TODO: update with actual product images
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
    images: ["/images/placeholder.svg"], // TODO: update with actual product images
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
    upsells: ["troopy-side-panels-storage"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "troopy-side-panels-storage",
    name: "Troopy Side Panels with added storage",
    description: "Transform your Troopcarrier interior with our premium side panels featuring integrated storage compartments.\n\nThese custom-designed panels replace your factory side panels and add valuable storage space while maintaining a sleek, professional finish. Perfect for organizing tools, recovery gear, and camping essentials.\n\n**Key Features:**\n• 3 reveals each side with storage boxes\n• Matching rear door panels included\n• Premium 6.5mm Black Hex on Birch plywood construction\n• All mounting hardware included (M5 nutserts, bolts, washers)\n• Factory-fit design for seamless integration\n• Optional bungee cord system for securing gear\n\n**What's Included:**\n- Left and right side panels with storage boxes\n- Matching rear door panels\n- Complete hardware kit\n- Installation instructions\n\n**Installation:**\nDIY-friendly installation in 3-4 hours. No permanent modifications required.\n\nPickup available at Export Drive (Usually ready in 2-4 days).",
    shortDescription: "Premium side panels with integrated storage boxes for Troopcarrier",
    price: 865.00,
    originalPrice: 895.00,
    images: [
      "/brand/troopy-side-panels-with-added-storage-637344.jpg",
      "/brand/troopy-side-panels-with-added-storage-676294.jpg",
      "/brand/troopy-side-panels-with-added-storage-753557.jpg",
      "/brand/troopy-side-panels-with-added-storage-883026.jpg"
    ],
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
      "Material": "6.5mm Black Hex on Birch plywood",
      "Reveals": "3 each side with boxes",
      "Rear Doors": "Matching rear door panels included",
      "Hardware": "M5 nutserts, bolts, washers included",
      "Compatibility": "Toyota Troopcarrier"
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
    warranty: "1 year",
    assemblyTime: "3-4 hours",
    sku: "SP-STOR-001",
    slug: "troopy-side-panels-with-storage",
    inStock: true,
    stockQuantity: 12,
    rating: 4.7, // TODO: update rating and reviews
    reviewCount: 38,
    badges: ["Popular", "Enhanced Storage"],
    // Variant options and explicit variants for button-group selector
    variantOptions: [
      {
        name: "Material",
        values: [
          { value: "Plain Birch", label: "Plain Birch", available: true },
          { value: "Black Hex", label: "Black Hex", available: true }
        ]
      },
      {
        name: "Bungee",
        values: [
          { value: "No Bungee", label: "No Bungee", available: true },
          { value: "With Bungee", label: "With Bungee", available: true }
        ]
      }
    ],
    variants: [
      { id: "PB-NB", price: 850.00, sku: "PB-NB", available: true, options: { Material: "Plain Birch", Bungee: "No Bungee" } },
      { id: "PB-WB", price: 865.00, sku: "PB-WB", available: true, options: { Material: "Plain Birch", Bungee: "With Bungee" } },
      { id: "BH-NB", price: 850.00, sku: "BH-NB", available: true, options: { Material: "Black Hex", Bungee: "No Bungee" } },
      { id: "BH-WB", price: 865.00, sku: "BH-WB", available: true, options: { Material: "Black Hex", Bungee: "With Bungee" } }
    ],
    shipClass: "oversized", 
    upsells: [],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    shippingInfo: {
      freeShippingThreshold: 0,
      freeShippingText: "Bulky Item Shipping Details",
      freeShippingDetails: "Free Pickup in Brooklyn Victoria. Shipping available Australia wide and calculated on a case by case basis. For the best shipping rates fill out the quote form or send us a message. Shipping to a business address with access to a forklift is the cheapest option. Residential and depot collect options also available. We ship to over 200 depots Australia wide to help provide you with the best shipping rates."
    },
    guaranteeInfo: {
      title: "Unwind Guarantee",
      details: "We guarantee products that are fit for purpose. Lifetime access to our customer support. Receive advice on installation and product tips anytime. Minimum 1 year warranty on all products (Refer product description for each item warranty). Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply."
    },
    
    updatedAt: new Date("2024-09-30")
  }
];

// Flooring Products
export const flooringProducts: ComponentProduct[] = [];

// Accessory Products
export const accessoryProducts: ComponentProduct[] = [
  {
    id: "cushion-set-troopy-kits",
    name: "Cushion Set For Troopy Flat Packs",
    description: "Cushion set for your Troopy flat pack. Designed to complement Wander/Roam and Upright kits with durable, easy-clean covers and comfortable foam. Pickup available at Export Drive (Usually ready in 2–4 days).",
    shortDescription: "Premium cushion set for Troopy flat packs",
    price: 850.00,
    originalPrice: 895.00,
    images: [
      "/brand/cushion-set-for-troopy-flat-packs-312040.jpg",
      "/brand/cushion-set-for-troopy-flat-packs-258801.jpg"
    ],
    category: "Accessories",
    subcategory: "Cushions",
    tags: ["Cushions", "Troopcarrier", "Comfort", "Custom Fit"],
    features: [
      "Compatible with Wander/Roam and Upright kits",
      "Color options: Grey, Beige",
      "Durable, easy-clean covers",
      "High-density foam for comfort",
      "Professional finish",
      "Made to fit Troopy dimensions"
    ],
    specifications: {
      "Materials": "High-density foam, durable fabric covers",
      "Colors": "Grey, Beige",
      "Fit": "Wander/Roam Kit, Upright Kit",
      "Cleaning": "Easy-clean covers",
      "Compatibility": "Troopy flat pack configurations"
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
    warranty: "1 year",
    sku: "CUSH-TROOPY-001",
    slug: "cushion-set-troopy-kits",
    inStock: true,
    stockQuantity: 25,
    rating: 4.7, // TODO: update rating and reviews
    reviewCount: 94,
    badges: ["Popular", "Multi-Compatible"],
    shipClass: "standard",
    upsells: [],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    shippingInfo: {
      freeShippingThreshold: 450,
      freeShippingText: "Free Shipping on orders over $450",
      freeShippingDetails: "Excludes Bulky Items, Flat Packs and dangerous goods. We aim to dispatch your order within 24 hours. Standard delivery within 3-6 days. Add 2-3 days for rural areas. We automatically pick the most appropriate courier based on your total order. Express Post Available."
    },
    guaranteeInfo: {
      title: "Unwind Guarantee",
      details: "We guarantee products that are fit for purpose. Lifetime access to our customer support. Receive advice on installation and product tips anytime. Minimum 1 year warranty on all products (Refer product description for each item warranty). Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply."
    },
    variantOptions: [
      {
        name: "Flat Pack Model",
        values: [
          { value: "wander-roam", label: "Wander/Roam Kit", available: true },
          { value: "upright", label: "Upright Kit", available: true }
        ]
      },
      {
        name: "Color",
        values: [
          { value: "grey", label: "Grey", available: true },
          { value: "beige", label: "Beige", available: true }
        ]
      }
    ],
    updatedAt: new Date("2024-09-30")
  }
];

// Plumbing Products
export const plumbingProducts: ComponentProduct[] = [
  {
    id: "shower-outlet",
    name: "Troopy Shower Outlet Kit",
    description: "Designed specifically for our flat packs. Includes a super simple to install mixer tap, flexible hose, and an adjustable shower head with multiple modes and an on/off button to help save precious water while on the road.",
    shortDescription: "Mixer tap, hose and adjustable shower head",
    price: 125.00,
    images: [
      "/brand/troopy-shower-outlet-kit-146456.jpg",
      "/brand/troopy-shower-outlet-kit-151059.jpg",
      "/brand/troopy-shower-outlet-kit-616672.jpg"
    ],
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
      "Mixer": "Included, simple install",
      "Hose": "Flexible hose",
      "Shower head": "Adjustable with multiple modes and on/off button",
      "Compatibility": "Troopy flat packs and standard water systems"
    },
    dimensions: {
      length: 15,
      width: 10,
      height: 8
    },
    weight: 1.2,
    compatibility: ["Water Tank 20L", "Water Tank 30L", "All flat pack kits"],
    installationRequired: true,
    warranty: "1 year",
    assemblyTime: "30 minutes",
    sku: "SHOWER-001",
    slug: "shower-outlet",
    inStock: true,
    stockQuantity: 35,
    rating: 4.5, // TODO: update rating and reviews
    reviewCount: 78,
    badges: ["Quick Install"],
    shipClass: "standard",
    upsells: [],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"), 
    shippingInfo: {
      freeShippingThreshold: 450,
      freeShippingText: "Free Shipping on orders over $450",
      freeShippingDetails: "Excludes Bulky Items, Flat Packs and dangerous goods. We aim to dispatch your order within 24 hours. Standard delivery within 3-6 days. Add 2-3 days for rural areas. We automatically pick the most appropriate courier based on your total order. Express Post Available."
    },
    guaranteeInfo: {
      title: "Unwind Guarantee",
      details: "We guarantee products that are fit for purpose. Lifetime access to our customer support. Receive advice on installation and product tips anytime. Minimum 1 year warranty on all products (Refer product description for each item warranty). Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply."
    },
    updatedAt: new Date("2024-09-30")
  }
];

// Ventilation Products
export const ventilationProducts: ComponentProduct[] = [
  {
    id: "troopy-utility-vent",
    name: "Troopcarrier Utility Vent - Ark Earth",
    description: "Available now! - Limited quantity ready for immediate dispatch\n\nDiscover the ultimate in functionality and style with our new utility vents, meticulously handcrafted by Ark Earth Fabrication in Perth. Engineered for Troopcarriers and Landcruisers, these vents boast a factory look, concealing outlets seamlessly.\n\nKey Features:\n• Easy access to power, air, and water\n• Secure magnetic catch for reliable closure\n• Suitable for both passenger and driver sides\n• Stainless steel construction for enduring quality\n\nOptions:\n- All models are constructed from stainless steel\n\nBlack powder coated vent with fittings\n1x 1/2\" Water Outlet\n1x 1/4\" Air Outlet\n1x 3/8\" Breather\n1x Anderson Plug\n\nBlack powder coated vent without fittings\nVent box only - no fittings provided so you can customise them to suit your requirements. Please note holes come pre drilled for the above size fittings.\n\nVersatile Installation:\nEasily install in minutes in any Landcruiser with a factory vent or in any other vehicle with a simple cutout wherever you need it. The utility vents come standard with 2x Nitto fittings and 1x Anderson plug. Perfect for all your air, water and power needs!\n\nFuture-Ready Integration:\nDesigned to complement our 75 & 78 Series 65L Troop Carrier water tanks. Get ready for a seamless blend of form and function.\n\nUpgrade your vehicle with this sleek addition. Secure your vent now and experience the perfect fusion of aesthetics and utility!",
    shortDescription: "Stainless utility vent with optional fittings (Troopy/Landcruiser)",
    price: 320.00,
    images: [
      "/brand/troopcarrier-utility-vent-ark-earth-422540.jpg",
      "/brand/troopcarrier-utility-vent-ark-earth-518089.jpg",
      "/brand/troopcarrier-utility-vent-ark-earth-694455.jpg",
      "/brand/troopcarrier-utility-vent-ark-earth-702171.jpg"
    ],
    category: "Ventilation",
    subcategory: "Utility Vents",
    tags: ["Ventilation", "Troopcarrier", "Utility Vent", "Ark Earth"],
    features: [
      "Easy access to power, air, and water",
      "Secure magnetic catch for reliable closure",
      "Suitable for both passenger and driver sides",
      "Stainless steel construction for enduring quality",
      "Factory look - conceals outlets seamlessly",
      "Easily install in minutes in any Landcruiser with a factory vent"
    ],
    specifications: {
      "Material": "Stainless steel (black powder coat)",
      "Fit": "Troopcarrier and Landcruiser factory vent locations",
      "Fittings Option": "Water 1/2”, Air 1/4”, Breather 3/8”, Anderson Plug",
      "Install": "Minutes with simple tools",
      "Sides": "Passenger or Driver"
    },
    dimensions: {
      length: 20,
      width: 15,
      height: 5
    },
    weight: 0.8,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: true,
    warranty: "1 year",
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
    shippingInfo: {
      freeShippingThreshold: 450,
      freeShippingText: "Free Shipping on orders over $450",
      freeShippingDetails: "Excludes Bulky Items, Flat Packs and dangerous goods. We aim to dispatch your order within 24 hours. Standard delivery within 3-6 days. Add 2-3 days for rural areas. We automatically pick the most appropriate courier based on your total order. Express Post Available."
    },
    guaranteeInfo: {
      title: "Unwind Guarantee",
      details: "We guarantee products that are fit for purpose. Lifetime access to our customer support. Receive advice on installation and product tips anytime. Minimum 1 year warranty on all products (Refer product description for each item warranty). Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply."
    },
    variantOptions: [
      {
        name: "Option",
        values: [
          { value: "with-fittings", label: "With Fittings", available: true, price: 360.00 },
          { value: "no-fittings", label: "No Fittings", available: true, price: 320.00 }
        ]
      }
    ],
    variants: [
      { 
        id: "with-fittings", 
        price: 360.00, 
        sku: "VENT-001-WF", 
        available: true, 
        inStock: true,
        stockQuantity: 25,
        options: { Option: "With Fittings" } 
      },
      { 
        id: "no-fittings", 
        price: 320.00, 
        sku: "VENT-001-NF", 
        available: true, 
        inStock: true,
        stockQuantity: 25,
        options: { Option: "No Fittings" } 
      }
    ],
    updatedAt: new Date("2024-09-30")
  }
];

// Compressor Products
export const compressorProducts: ComponentProduct[] = [
  {
    id: "arb-twin-compressor-bracket",
    name: "Landcruiser Troopcarrier 75,78 series ARB twin compressor bracket - Ark Earth",
    description: "ARB Twin compressor bracket suitable for 75, 78 Series Landcruiser Troopcarrier\n\nKey Features\n- Easy installation - uses existing factory mounts\n- Compatible with side panels and utility box\n- Designed to perfectly fit the twin ARB Compressor\n\n*A single ARB compressor and some other compressors will also fit but will require DIY modification.\n\nSuitable for 75,78 Series Landcruiser Troopcarrier\n- Stainless steel construction\n- Compressor mounts directly to the bracket\n- The compressor bracket bolts underneath the vent and to the side body of the vehicle\n- Compatible with our Vent utility box\n- Compatible with side panels\n- Fittings and hose options includes all fittings and hose to plumb the twin ARB compressor to the ARK Earth Vent Replacement.\n\n* For Drivers side mounting only - Passenger side bracket coming soon.",
    shortDescription: "ARB twin compressor bracket for 75/78 Series Troopy",
    price: 180.00,
    images: ["/brand/67.jpg"],
    category: "Compressors",
    subcategory: "Mounting Brackets",
    tags: ["Compressor", "ARB", "Bracket", "Troopcarrier", "Ark Earth"],
    features: [
      "Heavy-duty construction",
      "ARB twin compressor compatible",
      "Secure mounting system",
      "Easy maintenance access",
      "Professional installation",
      "Durable materials"
    ],
    specifications: {
      "Material": "Stainless steel",
      "Compatibility": "ARB Twin Compressor (and some single with mods)",
      "Installation": "Uses existing factory mounts",
      "Side": "Driver side (passenger coming soon)",
      "Includes": "Optional fittings and hose kit"
    },
    dimensions: {
      length: 30,
      width: 20,
      height: 8
    },
    weight: 2.5,
    compatibility: ["Toyota Troopcarrier", "ARB Twin Compressor"],
    installationRequired: true,
    warranty: "1 year",
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
    shippingInfo: {
      freeShippingThreshold: 450,
      freeShippingText: "Free Shipping on orders over $450",
      freeShippingDetails: "Excludes Bulky Items, Flat Packs and dangerous goods. We aim to dispatch your order within 24 hours. Standard delivery within 3-6 days. Add 2-3 days for rural areas. We automatically pick the most appropriate courier based on your total order. Express Post Available."
    },
    guaranteeInfo: {
      title: "Unwind Guarantee",
      details: "We guarantee products that are fit for purpose. Lifetime access to our customer support. Receive advice on installation and product tips anytime. Minimum 1 year warranty on all products (Refer product description for each item warranty). Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply."
    },
    variantOptions: [
      {
        name: "Material",
        values: [
          { value: "bracket-only", label: "Bracket Only", available: true },
          { value: "bracket-fittings", label: "Bracket with fittings and hose", available: true }
        ]
      }
    ],
    updatedAt: new Date("2024-09-30")
  }
];

// Water Tank Products
export const waterTankProducts: ComponentProduct[] = [
  {
    id: "62l-stainless-water-tank",
    name: "62L Stainless Steel Landcruiser Water Tank | 78 & 75 Series troop carrier",
    description: "We are working hard to build stock levels, for urgent orders please call us on 0417362209.\n\nContact us for a shipping quote - shipping will be invoice separately if you check out via the website.\n\nApproximately 2-4 Week Lead Time (Message for up to date availability).\n\nAvailable for local install in Brooklyn VIC or Australia wide shipping.\n\nToyota Troopcarrier 53L/62L Stainless Steel water tank. Our tank mounts behind your sub fuel tank. Designed to millimeter perfection to maximise your on board water supply!\n\nThis tank has been tested on some of Australia's harshest tracks and is built tough!\n\n53L sits up a little higher than the 62L giving you more off road clearance. (This is only necessary to consider for extreme off road conditions)\n\nQuick tank Facts:\n- 62L or 53L Stainless steel tank, Electropolished for maximum corrosion resistance & food grade properties\n- Mounts are fixed to the tank (no straps)\n- Tank mounts to existing locations on the chassis\n- Easy and fast Installation with basic hand tools and mechanical knowledge.\n- Australian made and hand built by Ark Earth Fabrication\n\nOther notes:\n- Installation available at our Brooklyn VIC Workshop\n- Pumps and plumbing kits are available, send us a message.\n- Pairs perfectly with our side vent replacement!\n\nPickup Available in Brooklyn Victoria\n\n*Contact us for Shipping Quote - Shipping will be invoiced separately if you do not request a quote*",
    shortDescription: "62L/53L stainless steel water tank for 78/75 Series Troopy",
    price: 1280.00,
    images: [
      "/brand/65l-stainless-steel-landcruiser-water-tank-78-75-series-troop-carrier-340332.jpg",
      "/brand/65l-stainless-steel-landcruiser-water-tank-78-75-series-troop-carrier-895704.jpg",
      "/brand/65l-stainless-steel-landcruiser-water-tank-78-75-series-troop-carrier-949973.jpg"
    ],
    category: "Water Systems",
    subcategory: "Water Tanks",
    tags: ["Water Tank", "Stainless Steel", "62L", "Durable", "Professional"],
    features: [
      "62L or 53L Stainless steel tank, Electropolished for maximum corrosion resistance",
      "Mounts are fixed to the tank (no straps)",
      "Tank mounts to existing locations on the chassis",
      "Easy and fast Installation with basic hand tools",
      "Australian made and hand built by Ark Earth Fabrication",
      "Tested on Australia's harshest tracks - built tough!"
    ],
    specifications: {
      "Material": "304 Stainless Steel (Electropolished)",
      "Capacity": "62L or 53L",
      "Mounting": "Existing chassis locations, mounts fixed to tank",
      "Install": "Basic hand tools; Australian made",
      "Notes": "53L sits higher for more clearance"
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
    shippingInfo: {
      freeShippingThreshold: 0,
      freeShippingText: "Bulky Item Shipping Details",
      freeShippingDetails: "Free Pickup in Brooklyn Victoria. Shipping available Australia wide and calculated on a case by case basis. For the best shipping rates fill out the quote form or send us a message. Shipping to a business address with access to a forklift is the cheapest option. Residential and depot collect options also available. We ship to over 200 depots Australia wide to help provide you with the best shipping rates."
    },
    guaranteeInfo: {
      title: "Unwind Guarantee",
      details: "We guarantee products that are fit for purpose. Lifetime access to our customer support. Receive advice on installation and product tips anytime. Minimum 1 year warranty on all products (Refer product description for each item warranty). Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply"
    },
    variantOptions: [
      {
        name: "Size",
        values: [
          { value: "62l", label: "62L", available: true, price: 1280.00 },
          { value: "53l", label: "53L", available: true, price: 1250.00 }
        ]
      }
    ],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-09-30"),
    videoUrl: "https://youtu.be/qdP-rNhHmDA"
  },
  {
    id: "90l-troopy-water-tank",
    name: "90L Troopcarrier Water Tank",
    description: "Our 90L Troopcarrier water tank has arrived. Please email us to place an order.\n\nQuick tank Facts:\n\n-Mounts between the Diffs in the centre of the Troopy.\n\n-Mounts without requiring access inside the body. All brackets are bolted from underneath.\n\n-Comes with 3x 1/2 fittings welded to the tank, intended for water in / water out / breather\n\n-All tank components are made from stainless steel, which is chemically cleaned after fabrication. We do all of these processes in house at Ark Earth Products.\n\n-This product requires exhaust modification. The exhaust must be within 200mm of the passenger side chassis rail. Please contact us for more information.\n\n-During installation the handbrake cable is removed and passed through the centre of the water tank (the water tank has a cable pass through its centre)\n\nWater tank recommendations:\n\nOur 90L water tank is a great asset to have for overlanding in your Troopy. The 90L tank can also be paired with either of our rear mounted water tanks. This combination can allow you to carry around 150L of water between 2 tanks.\n\nFor more information please send us an email.",
    shortDescription: "90L stainless steel water tank for Troopcarriers",
    price: 1950.00,
    images: ["/brand/90Ltank.jpg"],
    category: "Water Systems",
    subcategory: "Water Tanks",
    tags: ["Water Tank", "90L", "Troopcarrier", "Stainless Steel", "Professional", "Email Order"],
    features: [
      "90L large capacity",
      "Stainless steel construction",
      "Mounts between diffs in centre of Troopy",
      "No body access required for installation",
      "3x 1/2 fittings welded to tank",
      "Chemically cleaned after fabrication",
      "Handbrake cable pass-through design"
    ],
    specifications: {
      "Material": "Stainless Steel",
      "Capacity": "90 Liters",
      "Mounting": "Between diffs, centre of Troopy",
      "Installation": "Bolted from underneath",
      "Fittings": "3x 1/2 inch welded fittings",
      "Processing": "Chemically cleaned in-house",
      "Exhaust Requirement": "Within 200mm of passenger side chassis rail",
      "Cable Pass": "Handbrake cable through centre"
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
    badges: ["Stainless Steel", "Professional", "Email Order"],
    shipClass: "oversized",
    upsells: ["90l-plumbing-kit", "water-pump-40psi"],
    isTroopyPack: false,
    colorOptions: [
      { value: "black", label: "Black", available: true }
    ],
    requiresEmailOrder: true,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Sound Deadening Products
export const soundDeadeningProducts: ComponentProduct[] = [
  {
    id: "mass-noise-liner",
    name: "Car Builders Mass Noise Liner",
    description: "2x sheets required for the rear of a Troopy, 2 additional sheets required if also using for front of Troopy.\n\nTroopy Floor Template is a special order item and generally has a processing time of 3-5 days. This is cut to order by Carbuilders directly.\n\nThe rear only option contains 2x sheets which are cut to size for the rear floor pan. This is highly recommended to install under a fit out.\n\nThe Template option for the entire troopy comes with 4 sheets cut to size for under the seats, floor pan and rear cargo area.\n\nCar Builders Mass Noise Liner is a 12mm thick, heavy weight, acoustic barrier. This product is used over the top of sound deadening (stage 1) which is applied directly onto the sheet metal. Sound deadening stops noise created by panel vibration whereas Mass Noise Liner (stage 2) reduces air borne noise generated from the engine, road etc. This premium carpet underlay is an OEM product used in high-end luxury vehicles. Mass Noise Liner replaces cotton jute or shoddy, creating far superior sound proofing results.\n\nConstruction\n2mm Mass Loaded vinyl upper layer, coupled with an 10mm closed cell foam to create the most effective means of acoustic blocking. Our flexible closed cell foam is water resistant and offers superior thermal insulation.\n\nFeatures/Advantages\n- Heavy duty sound blocking\n- Water resistant\n- Removable\n- Cuts with scissor and knife\n- Reduces heat transfer\n- Does not rot or deteriorate\n\nApplications\n- Firewalls\n- Cargo areas\n- Van floors\n- Boot floors\n\nIt is not 100% necessary to put Stage 1 Sound Deadener underneath Mass Noise Liner on cargo area floors or van floors due to the metal already being fairly rigid from the ribs. The Mass Noise Liner will be an effective floor sound proofing by itself.\n\nIdeal for:\n- 4WD's and muscle cars - firewall barrier to reduce engine noise\n- Trucks - reduce engine noise and heat on floors and firewalls, great for serviceability\n- Exhaust drone - drop in as a boot liner to reduce exhaust drone particular common in 6's, V8's and flat fours.\n- Engine rooms, compressors etc\n\nNote: due to the weight of our Mass Noise Liner it is not recommended for use on the underside of horizontal surfaces. For these applications you should use our light weight foam such as Acoustic Liner, Water proof carpet underlay, Under bonnet insulation or our 6mm Insul-layer.",
    shortDescription: "12mm acoustic barrier with MLV and closed-cell foam",
    price: 95.00,
    images: ["/brand/dog1.png", "/brand/dog2.png", "/brand/dog3.png"],
    category: "Sound Deadening",
    subcategory: "Mass Liners",
    tags: ["Sound Deadening", "Mass Liner", "Noise Reduction", "Professional"],
    features: [
      "Heavy duty sound blocking - 12mm thick acoustic barrier",
      "Water resistant closed cell foam construction",
      "Removable and cuts easily with scissors and knife",
      "Reduces heat transfer and provides thermal insulation",
      "OEM product used in high-end luxury vehicles",
      "Does not rot or deteriorate over time"
    ],
    specifications: {
      "Construction": "2mm Mass Loaded Vinyl + 10mm closed cell foam",
      "Thickness": "12mm",
      "Sheets": "Rear only: 2 sheets. Full Troopy: 4 sheets",
      "Fitment": "Rear floor, under seats, floor pan, cargo area",
      "Water Resistance": "Closed cell foam layer",
      "Install": "Cuts with scissors/knife; removable"
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
    description: "We are super excited to be providing you legends with the ultimate sound deadening packs from Carbuilders!\n\nOur most popular kit is Pack 2 with the pre cut floor pan and pre cut foam insulation.\n\n## Pack 1\n\n• **4 Boxes (7.2sq/m) of Stage 1 Sound Deadener** - Apply to your firewall, front floor pan, under front seats, inner 1/4 panels, rear wheel arches, door skins.\n• **2 Boxes (3.6sq/m) of Water Proof Underlay** - Apply to front floor pan and under front seats.\n• **1 x Install kit** - Includes 1 x application roller, 1 x utility knife, 1 x roll of foil tape, stubby holder & bottle opener\n\n## Pack 2\n\n• **4 Boxes (7.2sq/m) of Stage 1 Sound Deadener** - Apply to your firewall, front floor pan, under front seats, inner 1/4 panels, rear wheel arches, door skins. This leaves 8 x Sound Deadener sheets for cargo area - see layout in above photos.\n• **2 Sheets (3sq/m) of Mass Noise Liner** - Stage 2 underlay sound barrier apply to foot wells, transmission tunnel, under seats.\n• **2 Sheets (3sq/m) of Mass Noise Liner** - Stage 2 sound barrier apply to rear cargo area.\n• **1 x Install kit** - Includes 1 x application roller, 1 x utility knife, 1 x roll of foil tape, stubby holder & bottle opener.\n\n## Pre-Cut Floorpan\n\nThis option is available if you are purchasing Pack 2. We have machine cut the Mass Noise Liner (Stage 2 underlay) for Troopy floorpans to suit the Land Cruiser Troopcarrier (2007) 78 Series. This allows you to simply directly drop in the stage 2 underlay and it will save you significant time in having to template the material to fit.\n\n## Pre-Cut Insulation Pack\n\nPre-cut Insulation Packs are designed to be used in addition to the sound deadening packs (Pack 1 - Standard or Pack 2 - Premium) to achieve optimal sound and insulation results. This pack uses precut insulation material, Van Liner, in the quarter panels and/or on the roof. This is particularly effective if the vehicle is being used for extended touring.\n\n### Quarter Panels\n\nPre-cut Van Liner - 10mm peel and stick closed cell foam. Create a radiant heat barrier and soft surface to reduce sound energy. Upholstery glue can be applied to this ready to trim with carpet if desired.\n\n**If you require insulation for the roof please send us a message.**\n\n## Roof\n\nThe factory headliner in the Troopy is a tight fit and will only allow for Stage 1 Sound Deadener to fit underneath it. If you are replacing the factory lining then you are able to add more insulation. We pre-cut our Van Liner to suit the roof, this can be covered with carpet. These pre-cut sheets are available in our Insulation Packs. If you require an insulation pack (van liner and carpet, please get in contact with Karim - 0417362209)\n\n### Troopy Roof Kit Includes\n\n**Roof Pack (approx 15kg)**\n\n• **2 Boxes (3.6sq/m) of Stage 1 Sound Deadener** - Apply to your roof skin to control resonance, minimum 50% coverage of open skin sheet metal.\n• **1 x Aluminium Foil Tape** - Use to seal all sound deadener edges.\n• **1 x Application Roller** - To roll on the Stage 1 Sound Deadener (not included if purchased with an above pack that already comes with a roller)",
    shortDescription: "Ultimate sound deadening packs from Carbuilders for Troopcarriers",
    price: 790.00,
    images: [
      "/brand/sound1.png",
      "/brand/sound 2.png", 
      "/brand/sound3.png"
    ],
    category: "Sound Deadening",
    subcategory: "Complete Packs",
    tags: ["Sound Deadening", "Complete Pack", "Troopcarrier", "Professional", "Carbuilders", "Stage 1", "Stage 2", "Pre-cut"],
    features: [
      "Complete sound deadening solution",
      "Troopcarrier specific design",
      "Professional installation guide",
      "All materials included",
      "Effective noise reduction",
      "Easy installation",
      "Pre-cut floorpan option",
      "Pre-cut insulation option",
      "Stage 1 and Stage 2 materials",
      "Install kit included"
    ],
    specifications: {
      "Pack 1 Contents": "4 Boxes Stage 1 Sound Deadener (7.2sq/m), 2 Boxes Water Proof Underlay (3.6sq/m), Install kit",
      "Pack 2 Contents": "4 Boxes Stage 1 Sound Deadener (7.2sq/m), 2 Sheets Mass Noise Liner (3sq/m each), Install kit",
      "Pre-cut Floorpan": "Machine cut Mass Noise Liner for Land Cruiser Troopcarrier (2007) 78 Series",
      "Pre-cut Insulation": "10mm peel and stick closed cell foam Van Liner",
      "Materials": "Professional grade Carbuilders",
      "Installation": "DIY friendly with detailed guide",
      "Compatibility": "Toyota Troopcarrier 78 Series",
      "Coverage": "Complete vehicle interior"
    },
    dimensions: {
      length: 60,
      width: 40,
      height: 15
    },
    weight: 12.0,
    compatibility: ["Toyota Troopcarrier 78 Series", "Land Cruiser Troopcarrier (2007)"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "4-6 hours",
    sku: "SOUND-PACK-001",
    slug: "troopy-sound-pack",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 1,
    badges: ["Complete Pack", "Professional", "Carbuilders"],
    shipClass: "oversized",
    upsells: ["mass-noise-liner"],
    isTroopyPack: false,
    variantOptions: [
      {
        name: "Pack",
        values: [
          { value: "pack1", label: "Pack 1", available: true },
          { value: "pack2", label: "Pack 2", available: true }
        ]
      },
      {
        name: "Pre Cut Floorpan",
        values: [
          { value: "no", label: "No", available: true },
          { value: "yes", label: "Yes", available: false }
        ]
      },
      {
        name: "Pre Cut Insulation",
        values: [
          { value: "yes", label: "Yes", available: true },
          { value: "no", label: "No", available: true }
        ]
      }
    ],
    shippingInfo: {
      freeShippingThreshold: 450,
      freeShippingText: "Free Shipping on orders over $450",
      freeShippingDetails: "Excludes Bulky Items, Flat Packs and dangerous goods. We aim to dispatch your order within 24 hours. Standard delivery within 3-6 days. Add 2-3 days for rural areas. We automatically pick the most appropriate courier based on your total order. Express Post Available. Free Pickup in Brooklyn Victoria. Shipping available Australia wide and calculated on a case by case basis. For the best shipping rates fill out the quote form or send us a message. Shipping to a business address with access to a forklift is the cheapest option. Residential and depot collect options also available. We ship to over 200 depots Australia wide to help provide you with the best shipping rates."
    },
    guaranteeInfo: {
      title: "Unwind Guarantee",
      details: "We guarantee products that are fit for purpose. Lifetime access to our customer support. Receive advice on installation and product tips anytime. Minimum 1 year warranty on all products (Refer product description for each item warranty). Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply"
    },
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-20")
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

// Combined ALL products (flat packs + upsells + components + additional products)
// Test products removed - no longer needed in production
export const allProducts = [
  ...allFlatPacks,
  ...allUpsellProducts,
  ...allComponentProducts,
  ...allAdditionalProducts
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
