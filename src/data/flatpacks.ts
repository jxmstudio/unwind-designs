// Complete Flat Pack Product Data for Toyota Troopcarriers
// All pricing and specifications as per scope requirements

export interface FlatPackProduct {
  id: string;
  name: string;
  kitType: 'Wander' | 'Roam' | 'Premium';
  fridgeType: 'Chest Fridge' | 'Upright Fridge';
  finish: 'Plain hardwood' | 'Eucalyptus Black Hex' | 'Birch Black Hex' | 'Black Hex' | 'White' | 'Plain Birch' | 'Premium';
  price: number;
  slug: string;
  description: string;
  shortDescription: string;
  descriptionHtml?: string; // Rich HTML description for PDP
  images: string[];
  videoUrl?: string;
  features: string[];
  specifications: Record<string, string>;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  badges: string[];
  shipClass: 'standard' | 'oversized' | 'freight';
  upsells: string[]; // IDs of recommended products
  installationRequired: boolean;
  warranty: string;
  assemblyTime: string;
  sku: string;
  inStock: boolean;
  stockQuantity: number;
  comingSoon?: boolean; // New field for products not yet available
  rating: number;
  reviewCount: number;
  tags: string[];
  category: string;
  subcategory: string;
  // New fields for Troopy Packs classification
  isTroopyPack: boolean;
  troopyPackSlug: string; // For the main kit page (wander-kit, roam-kit, premium-kit)
  createdAt: Date;
  updatedAt: Date;
}

// Wander Kit Products (Budget Range)
export const wanderKits: FlatPackProduct[] = [
  // Chest Fridge Variants
  {
    id: "wander-chest-plain",
    name: "Wander Kit - Chest Fridge (Plain Hardwood)",
    kitType: "Wander",
    fridgeType: "Chest Fridge",
    finish: "Plain hardwood",
    price: 3750.00,
    slug: "wander-kit-chest-fridge-plain-hardwood",
    description: "The Wander Kit in plain hardwood offers an affordable entry point into professional troopy fitouts. This chest fridge configuration maximizes storage space while maintaining the reliable functionality you need for weekend adventures and short trips.",
    shortDescription: "Budget-friendly flat pack with chest fridge configuration",
    images: ["/products/wander-chest-plain-1.jpg", "/products/wander-chest-plain-2.jpg"],
    videoUrl: "/videos/wander-chest-plain-walkthrough.mp4",
    features: [
      "Chest fridge configuration for maximum cooling efficiency",
      "Plain hardwood finish for natural aesthetic",
      "Modular design for easy assembly",
      "Slide-out storage drawers",
      "Built-in power management",
      "Tool-free assembly system"
    ],
    specifications: {
      "Material": "Marine-grade plywood with plain hardwood veneer",
      "Fridge Space": "Compatible with 40-60L chest fridges",
      "Storage Volume": "180L total internal storage",
      "Power System": "12V DC compatible",
      "Mounting": "Vehicle-specific brackets included",
      "Finish": "Natural hardwood with protective coating"
    },
    dimensions: {
      length: 180,
      width: 120,
      height: 85
    },
    weight: 45.0,
    badges: ["Budget", "Easy Assembly"],
    shipClass: "oversized",
    upsells: ["cushion-set-wander", "insulation-kit-basic", "led-strip-warm"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "4-6 hours",
    sku: "WK-CF-PH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: false, // Wander Kit is now available
    rating: 4.6,
    reviewCount: 89,
    tags: ["Flat Pack", "Troopcarrier", "Budget", "Chest Fridge", "Plain Hardwood"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wander-chest-eucalyptus",
    name: "Wander Kit - Chest Fridge (Eucalyptus Black Hex)",
    kitType: "Wander",
    fridgeType: "Chest Fridge",
    finish: "Eucalyptus Black Hex",
    price: 4400.00,
    slug: "wander-kit-chest-fridge-eucalyptus-black-hex",
    description: "Upgrade your Wander Kit with the striking Eucalyptus Black Hex finish. This modern geometric pattern adds contemporary style while maintaining all the practical benefits of the chest fridge configuration.",
    shortDescription: "Wander Kit with premium Eucalyptus Black Hex finish",
    images: ["/products/wander-chest-eucalyptus-1.jpg", "/products/wander-chest-eucalyptus-2.jpg"],
    videoUrl: "/videos/wander-chest-eucalyptus-walkthrough.mp4",
    features: [
      "Eye-catching Eucalyptus Black Hex pattern",
      "Chest fridge configuration for efficiency",
      "Premium veneer finish",
      "Coordinated hardware and fittings",
      "Easy-clean surfaces",
      "UV-resistant coating"
    ],
    specifications: {
      "Material": "Marine-grade plywood with Eucalyptus Black Hex veneer",
      "Fridge Space": "Compatible with 40-60L chest fridges",
      "Storage Volume": "180L total internal storage",
      "Power System": "12V DC compatible",
      "Mounting": "Vehicle-specific brackets included",
      "Finish": "Eucalyptus Black Hex with protective coating"
    },
    dimensions: {
      length: 180,
      width: 120,
      height: 85
    },
    weight: 45.0,
    badges: ["Budget", "Premium Finish"],
    shipClass: "oversized",
    upsells: ["cushion-set-eucalyptus", "insulation-kit-basic", "led-strip-cool"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "4-6 hours",
    sku: "WK-CF-EBH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: false, // Wander Kit is now available
    rating: 4.7,
    reviewCount: 67,
    tags: ["Flat Pack", "Troopcarrier", "Budget", "Chest Fridge", "Eucalyptus", "Black Hex"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wander-chest-birch",
    name: "Wander Kit - Chest Fridge (Birch Black Hex)",
    kitType: "Wander",
    fridgeType: "Chest Fridge",
    finish: "Birch Black Hex",
    price: 5250.00,
    slug: "wander-kit-chest-fridge-birch-black-hex",
    description: "The premium finish option for the Wander Kit, featuring beautiful Birch Black Hex veneer. This striking pattern combines the natural beauty of birch with a modern geometric design.",
    shortDescription: "Top-tier Wander Kit with beautiful Birch Black Hex finish",
    images: ["/products/wander-chest-birch-1.jpg", "/products/wander-chest-birch-2.jpg"],
    videoUrl: "/videos/wander-chest-birch-walkthrough.mp4",
    features: [
      "Premium Birch Black Hex veneer",
      "Superior grain pattern and texture",
      "Chest fridge optimization",
      "High-end hardware included",
      "Scratch-resistant surface",
      "Professional installation guides"
    ],
    specifications: {
      "Material": "Marine-grade plywood with Birch Black Hex veneer",
      "Fridge Space": "Compatible with 40-60L chest fridges",
      "Storage Volume": "180L total internal storage",
      "Power System": "12V DC compatible",
      "Mounting": "Vehicle-specific brackets included",
      "Finish": "Birch Black Hex with premium protective coating"
    },
    dimensions: {
      length: 180,
      width: 120,
      height: 85
    },
    weight: 45.0,
    badges: ["Budget", "Premium Veneer"],
    shipClass: "oversized",
    upsells: ["cushion-set-birch", "insulation-kit-premium", "led-strip-rgb"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "4-6 hours",
    sku: "WK-CF-BBH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: false, // Wander Kit is now available
    rating: 4.8,
    reviewCount: 43,
    tags: ["Flat Pack", "Troopcarrier", "Budget", "Chest Fridge", "Birch", "Black Hex", "Premium Veneer"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  // Upright Fridge Variants
  {
    id: "wander-upright-plain",
    name: "Wander Kit - Upright Fridge (Plain Hardwood)",
    kitType: "Wander",
    fridgeType: "Upright Fridge",
    finish: "Plain hardwood",
    price: 4350.00,
    slug: "wander-kit-upright-fridge-plain-hardwood",
    description: "The upright fridge configuration of the Wander Kit provides easy access to food and drinks while maximizing floor space. Perfect for those who prefer traditional fridge functionality.",
    shortDescription: "Budget-friendly upright fridge configuration in plain hardwood",
    images: ["/products/wander-upright-plain-1.jpg", "/products/wander-upright-plain-2.jpg"],
    videoUrl: "/videos/wander-upright-plain-walkthrough.mp4",
    features: [
      "Upright fridge configuration for easy access",
      "Plain hardwood natural finish",
      "Optimized storage compartments",
      "Pull-out work surface",
      "Integrated cable management",
      "Quick-release mounting system"
    ],
    specifications: {
      "Material": "Marine-grade plywood with plain hardwood veneer",
      "Fridge Space": "Compatible with 40-60L upright fridges",
      "Storage Volume": "160L total internal storage",
      "Power System": "12V DC compatible",
      "Mounting": "Vehicle-specific brackets included",
      "Finish": "Natural hardwood with protective coating"
    },
    dimensions: {
      length: 180,
      width: 120,
      height: 110
    },
    weight: 48.0,
    badges: ["Budget", "Easy Access"],
    shipClass: "oversized",
    upsells: ["cushion-set-wander", "insulation-kit-basic", "water-tank-20l"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "5-7 hours",
    sku: "WK-UF-PH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: false, // Wander Kit is now available
    rating: 4.5,
    reviewCount: 76,
    tags: ["Flat Pack", "Troopcarrier", "Budget", "Upright Fridge", "Plain Hardwood"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wander-upright-eucalyptus",
    name: "Wander Kit - Upright Fridge (Eucalyptus Black Hex)",
    kitType: "Wander",
    fridgeType: "Upright Fridge",
    finish: "Eucalyptus Black Hex",
    price: 5050.00,
    slug: "wander-kit-upright-fridge-eucalyptus-black-hex",
    description: "Combine the convenience of upright fridge access with the modern style of Eucalyptus Black Hex finish. This configuration offers the perfect balance of functionality and aesthetics.",
    shortDescription: "Upright fridge Wander Kit with Eucalyptus Black Hex finish",
    images: ["/products/wander-upright-eucalyptus-1.jpg", "/products/wander-upright-eucalyptus-2.jpg"],
    videoUrl: "/videos/wander-upright-eucalyptus-walkthrough.mp4",
    features: [
      "Contemporary Eucalyptus Black Hex pattern",
      "Upright fridge easy access design",
      "Premium veneer application",
      "Coordinated trim and hardware",
      "Stain-resistant surface",
      "Professional edge banding"
    ],
    specifications: {
      "Material": "Marine-grade plywood with Eucalyptus Black Hex veneer",
      "Fridge Space": "Compatible with 40-60L upright fridges",
      "Storage Volume": "160L total internal storage",
      "Power System": "12V DC compatible",
      "Mounting": "Vehicle-specific brackets included",
      "Finish": "Eucalyptus Black Hex with protective coating"
    },
    dimensions: {
      length: 180,
      width: 120,
      height: 110
    },
    weight: 48.0,
    badges: ["Budget", "Premium Finish", "Easy Access"],
    shipClass: "oversized",
    upsells: ["cushion-set-eucalyptus", "insulation-kit-premium", "water-tank-20l"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "5-7 hours",
    sku: "WK-UF-EBH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: false, // Wander Kit is now available
    rating: 4.6,
    reviewCount: 52,
    tags: ["Flat Pack", "Troopcarrier", "Budget", "Upright Fridge", "Eucalyptus", "Black Hex"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wander-upright-birch",
    name: "Wander Kit - Upright Fridge (Birch Black Hex)",
    kitType: "Wander",
    fridgeType: "Upright Fridge",
    finish: "Birch Black Hex",
    price: 5950.00,
    slug: "wander-kit-upright-fridge-birch-black-hex",
    description: "The ultimate Wander Kit configuration featuring upright fridge convenience and the luxurious Birch Black Hex finish. Perfect for those who want premium aesthetics without the premium price.",
    shortDescription: "Premium Birch Black Hex upright fridge Wander Kit",
    images: ["/products/wander-upright-birch-1.jpg", "/products/wander-upright-birch-2.jpg"],
    videoUrl: "/videos/wander-upright-birch-walkthrough.mp4",
    features: [
      "Luxury Birch Black Hex veneer",
      "Upright fridge convenience",
      "Premium timber grain showcase",
      "High-quality soft-close mechanisms",
      "Durable surface treatment",
      "Professional installation support"
    ],
    specifications: {
      "Material": "Marine-grade plywood with Birch Black Hex veneer",
      "Fridge Space": "Compatible with 40-60L upright fridges",
      "Storage Volume": "160L total internal storage",
      "Power System": "12V DC compatible",
      "Mounting": "Vehicle-specific brackets included",
      "Finish": "Birch Black Hex with premium protective coating"
    },
    dimensions: {
      length: 180,
      width: 120,
      height: 110
    },
    weight: 48.0,
    badges: ["Budget", "Premium Veneer", "Easy Access"],
    shipClass: "oversized",
    upsells: ["cushion-set-birch", "insulation-kit-premium", "water-tank-25l"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "5-7 hours",
    sku: "WK-UF-BBH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: false, // Wander Kit is now available
    rating: 4.8,
    reviewCount: 31,
    tags: ["Flat Pack", "Troopcarrier", "Budget", "Upright Fridge", "Birch", "Black Hex", "Premium Veneer"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  // Wander Troopy Flat Pack (Main Product)
  {
    id: "wander-troopy-flat-pack",
    name: "Wander Troopy Flat Pack",
    kitType: "Wander",
    fridgeType: "Chest Fridge", // Default, but configurable
    finish: "black-hex", // Default, but configurable
    price: 3750.00,
    slug: "wander-troopy-flat-pack",
    description: "You asked - we delivered, our wander Troopy kit! The design you all love at a price point to help you hit the road! Offered in a plain wood finish or the ever popular black hex finish* Please note the black hex finish is different to our Premium Roam kit - you can read more about the differences here.\n\nWhat to Expect:\n✨ Easy Assembly: Setup designed for all skill levels.\n🔧 Quality Components that make camping a breeze\n⚡️ Thoughtful design for maximum storage and convenience.\n\nBenefits of our Wander flat pack:\n\n• Using Swiss designed cabinetry connectors, full installation is achieved in a weekend with no experience required.\n• Maximum functionality with accessible storage when inside AND outside your Troopy!\n• Unique day bed set up for the ultimate in comfort when stuck inside on a rainy day while maintaining access to your storage. This design allows access to storage under the bed while inside your Troopy!\n• Shower cabinet access from the drivers side window from a standard sliding window or gullwing.\n• Option for a plain plywood finish for those wanting a natural look or to paint your own colour and in a eucalyptus plywood with a black hex film for added style and durability. Please read our material selection blog for all the information about what we use.\n\nKey Dimensions\n\n• Fridge Space - approx 850x460 - Looking to fit a larger fridge? Get in contact as options may be available to accommodate.\n• Bed Dimensions - approx 1900x950\n• Walkway - approx 360 wide (enough room to comfortable walk through and not snag your feet.\n\nWeight Approx 120kg\n\nManufacturing Partner: No Goat for Jack\nWe have teamed up with a mechanical engineer/industrial designer with a top of the line manufacturing facility to be able to bring the product to life. Using state of the art machinery we are able to produce a premium product at an affordable price point.\n\nInstallation available by request in Brooklyn VIC and Perth\n\nShipping: Free pickup from Brooklyn VIC\n\nShipping available Australia wide. For an accurate quote please contact us. We offer shipping to nearly 200 depot locations Australia wide or direct to your door. The shipping quote calculated at checkout may not be accurate dependent on your location and by messaging us you are likely to receive a more competitive rate.\n\nHave a question? Call Karim on 0417362209",
    shortDescription: "Budget-friendly flat pack solution for Toyota Troopcarriers",
    images: [
      "/brand/wander-troopy-flat-pack-346203.jpg",
      "/brand/wander-troopy-flat-pack-537705.jpg",
      "/brand/wander-troopy-flat-pack-705534.jpg",
      "/brand/wander-troopy-flat-pack-937135.jpg",
      "/brand/wander-troopy-flat-pack-939319.jpg",
      "/brand/wander-troopy-flat-pack-281517.jpg"
    ],
    videoUrl: "/videos/wander-troopy-flat-pack-walkthrough.mp4",
    features: [
      "Easy assembly with Swiss designed cabinetry connectors",
      "Maximum functionality with accessible storage",
      "Unique day bed setup for comfort",
      "Shower cabinet access from driver's side window",
      "Multiple finish options available",
      "Weekend installation with no experience required"
    ],
    specifications: {
      "Fridge Space": "Approx 850x460mm",
      "Bed Dimensions": "Approx 1900x950mm", 
      "Walkway": "Approx 360mm wide",
      "Weight": "Approx 120kg",
      "Assembly": "Weekend installation",
      "Manufacturing": "No Goat for Jack partnership"
    },
    dimensions: {
      length: 1900,
      width: 950,
      height: 1200
    },
    weight: 120.0,
    badges: ["Budget", "Easy Assembly", "Complete Kit"],
    shipClass: "oversized",
    upsells: ["cushion-set-troopy-flat-packs", "shower-outlet", "mass-noise-liner"],
    variantOptions: [
      {
        name: "Finish",
        values: [
          { value: "black-hex", label: "Black Hex", available: true },
          { value: "plain-plywood", label: "Plain Plywood", available: true }
        ]
      }
    ],
    variants: [
      { 
        id: "WFP-BH", 
        price: 4400.00, 
        sku: "WFP-BH-001", 
        available: true, 
        options: { Finish: "Black Hex" } 
      },
      { 
        id: "WFP-PP", 
        price: 3750.00, 
        sku: "WFP-PP-001", 
        available: true, 
        options: { Finish: "Plain Plywood" } 
      }
    ],
    installationRequired: true,
    warranty: "1 year",
    assemblyTime: "Weekend",
    sku: "WFP-001",
    inStock: true,
    stockQuantity: 5,
    comingSoon: false,
    rating: 4.8,
    reviewCount: 1,
    tags: ["Flat Pack", "Troopcarrier", "Wander", "Complete Kit", "Storage"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "wander-kit",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  }
];

// Roam Kit Products (Mid-Range)
export const roamKits: FlatPackProduct[] = [
  // Chest Fridge Variants
  {
    id: "roam-chest-black",
    name: "Roam Kit - Chest Fridge (Black Hex)",
    kitType: "Roam",
    fridgeType: "Chest Fridge",
    finish: "Black Hex",
    price: 6700.00,
    slug: "roam-kit-chest-fridge-black-hex",
    description: "Step up to the Roam Kit with striking Black Hex finish. This mid-range option includes enhanced features, better hardware, and superior build quality while maintaining the efficient chest fridge configuration.",
    shortDescription: "Mid-range flat pack with Black Hex finish and enhanced features",
    images: ["/products/roam-chest-black-1.jpg", "/products/roam-chest-black-2.jpg"],
    videoUrl: "/videos/roam-chest-black-walkthrough.mp4",
    features: [
      "Bold Black Hex contemporary finish",
      "Enhanced chest fridge cooling efficiency",
      "Premium soft-close drawer systems",
      "Integrated LED lighting",
      "Advanced cable management",
      "Heavy-duty mounting hardware",
      "Quick-connect electrical system"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with Black Hex veneer",
      "Fridge Space": "Compatible with 50-80L chest fridges",
      "Storage Volume": "220L total internal storage",
      "Power System": "12V/24V DC compatible with monitoring",
      "Mounting": "Heavy-duty vehicle-specific brackets",
      "Finish": "Black Hex with premium protective coating"
    },
    dimensions: {
      length: 200,
      width: 130,
      height: 90
    },
    weight: 55.0,
    badges: ["Mid-Range", "Enhanced Features"],
    shipClass: "oversized",
    upsells: ["cushion-set-roam", "insulation-kit-premium", "electrical-kit-advanced"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "6-8 hours",
    sku: "RK-CF-BH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: true,
    rating: 4.7,
    reviewCount: 124,
    tags: ["Flat Pack", "Troopcarrier", "Mid-Range", "Chest Fridge", "Black Hex", "LED Lighting"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "roam-kit",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "roam-chest-white",
    name: "Roam Kit - Chest Fridge (White)",
    kitType: "Roam",
    fridgeType: "Chest Fridge",
    finish: "White",
    price: 6950.00,
    slug: "roam-kit-chest-fridge-white",
    description: "The clean, bright White finish Roam Kit creates an open, spacious feeling in your troopy. Perfect for those who prefer a modern, minimalist aesthetic with all the enhanced Roam Kit features.",
    shortDescription: "Clean white finish Roam Kit with chest fridge configuration",
    images: ["/products/roam-chest-white-1.jpg", "/products/roam-chest-white-2.jpg"],
    videoUrl: "/videos/roam-chest-white-walkthrough.mp4",
    features: [
      "Clean white finish for bright interior",
      "Enhanced chest fridge efficiency",
      "Premium soft-close mechanisms",
      "Integrated task lighting",
      "Hidden cable routing",
      "Reinforced mounting points",
      "Easy-clean surfaces"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with white finish",
      "Fridge Space": "Compatible with 50-80L chest fridges",
      "Storage Volume": "220L total internal storage",
      "Power System": "12V/24V DC compatible with monitoring",
      "Mounting": "Heavy-duty vehicle-specific brackets",
      "Finish": "High-quality white with protective coating"
    },
    dimensions: {
      length: 200,
      width: 130,
      height: 90
    },
    weight: 55.0,
    badges: ["Mid-Range", "Bright Interior"],
    shipClass: "oversized",
    upsells: ["cushion-set-white", "insulation-kit-premium", "led-strip-bright"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "6-8 hours",
    sku: "RK-CF-WH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: true,
    rating: 4.8,
    reviewCount: 97,
    tags: ["Flat Pack", "Troopcarrier", "Mid-Range", "Chest Fridge", "White", "Bright"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "roam-kit",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "roam-chest-birch",
    name: "Roam Kit - Chest Fridge (Plain Birch)",
    kitType: "Roam",
    fridgeType: "Chest Fridge",
    finish: "Plain Birch",
    price: 6950.00,
    slug: "roam-kit-chest-fridge-plain-birch",
    description: "Natural Plain Birch brings warmth and organic beauty to your Roam Kit. The beautiful grain patterns and natural variations make each installation unique while providing all the enhanced features of the Roam range.",
    shortDescription: "Natural birch finish Roam Kit showcasing beautiful timber grain",
    images: ["/products/roam-chest-birch-1.jpg", "/products/roam-chest-birch-2.jpg"],
    videoUrl: "/videos/roam-chest-birch-walkthrough.mp4",
    features: [
      "Natural Plain Birch timber beauty",
      "Chest fridge optimization",
      "Enhanced drawer systems",
      "Ambient LED lighting",
      "Professional cable management",
      "Reinforced construction",
      "Natural grain showcase"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with Plain Birch veneer",
      "Fridge Space": "Compatible with 50-80L chest fridges",
      "Storage Volume": "220L total internal storage",
      "Power System": "12V/24V DC compatible with monitoring",
      "Mounting": "Heavy-duty vehicle-specific brackets",
      "Finish": "Plain Birch with natural protective coating"
    },
    dimensions: {
      length: 200,
      width: 130,
      height: 90
    },
    weight: 55.0,
    badges: ["Mid-Range", "Natural Timber"],
    shipClass: "oversized",
    upsells: ["cushion-set-birch", "insulation-kit-premium", "led-strip-warm"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "6-8 hours",
    sku: "RK-CF-PB-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: true,
    rating: 4.9,
    reviewCount: 83,
    tags: ["Flat Pack", "Troopcarrier", "Mid-Range", "Chest Fridge", "Plain Birch", "Natural"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "roam-kit",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-15")
  },
  // Upright Fridge Variants
  {
    id: "roam-upright-black",
    name: "Roam Kit - Upright Fridge (Black Hex)",
    kitType: "Roam",
    fridgeType: "Upright Fridge",
    finish: "Black Hex",
    price: 7200.00,
    slug: "roam-kit-upright-fridge-black-hex",
    description: "The Roam Kit upright fridge configuration in bold Black Hex finish provides the perfect balance of accessibility and style. Enhanced features and superior build quality set this apart from budget options.",
    shortDescription: "Mid-range upright fridge configuration with bold Black Hex finish",
    images: ["/products/roam-upright-black-1.jpg", "/products/roam-upright-black-2.jpg"],
    videoUrl: "/videos/roam-upright-black-walkthrough.mp4",
    features: [
      "Bold Black Hex contemporary styling",
      "Upright fridge easy access",
      "Premium soft-close systems",
      "Integrated work surface",
      "Advanced LED lighting",
      "Heavy-duty drawer slides",
      "Professional cable management"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with Black Hex veneer",
      "Fridge Space": "Compatible with 50-80L upright fridges",
      "Storage Volume": "200L total internal storage",
      "Power System": "12V/24V DC compatible with monitoring",
      "Mounting": "Heavy-duty vehicle-specific brackets",
      "Finish": "Black Hex with premium protective coating"
    },
    dimensions: {
      length: 200,
      width: 130,
      height: 115
    },
    weight: 58.0,
    badges: ["Mid-Range", "Enhanced Features", "Easy Access"],
    shipClass: "oversized",
    upsells: ["cushion-set-roam", "water-tank-30l", "electrical-kit-advanced"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "7-9 hours",
    sku: "RK-UF-BH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: true,
    rating: 4.7,
    reviewCount: 109,
    tags: ["Flat Pack", "Troopcarrier", "Mid-Range", "Upright Fridge", "Black Hex"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "roam-kit",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "roam-upright-white",
    name: "Roam Kit - Upright Fridge (White)",
    kitType: "Roam",
    fridgeType: "Upright Fridge",
    finish: "White",
    price: 7450.00,
    slug: "roam-kit-upright-fridge-white",
    description: "Bright, clean White finish combined with upright fridge convenience creates the ultimate in accessible storage. The Roam Kit's enhanced features ensure this is a step above budget options.",
    shortDescription: "Bright white upright fridge Roam Kit for maximum accessibility",
    images: ["/products/roam-upright-white-1.jpg", "/products/roam-upright-white-2.jpg"],
    videoUrl: "/videos/roam-upright-white-walkthrough.mp4",
    features: [
      "Bright white finish for spacious feel",
      "Upright fridge convenience",
      "Enhanced soft-close mechanisms",
      "Integrated prep surface",
      "Bright task lighting",
      "Heavy-duty construction",
      "Easy maintenance surfaces"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with white finish",
      "Fridge Space": "Compatible with 50-80L upright fridges",
      "Storage Volume": "200L total internal storage",
      "Power System": "12V/24V DC compatible with monitoring",
      "Mounting": "Heavy-duty vehicle-specific brackets",
      "Finish": "High-quality white with protective coating"
    },
    dimensions: {
      length: 200,
      width: 130,
      height: 115
    },
    weight: 58.0,
    badges: ["Mid-Range", "Bright Interior", "Easy Access"],
    shipClass: "oversized",
    upsells: ["cushion-set-white", "water-tank-30l", "led-strip-bright"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "7-9 hours",
    sku: "RK-UF-WH-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: true,
    rating: 4.8,
    reviewCount: 87,
    tags: ["Flat Pack", "Troopcarrier", "Mid-Range", "Upright Fridge", "White", "Bright"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "roam-kit",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "roam-upright-birch",
    name: "Roam Kit - Upright Fridge (Plain Birch)",
    kitType: "Roam",
    fridgeType: "Upright Fridge",
    finish: "Plain Birch",
    price: 7450.00,
    slug: "roam-kit-upright-fridge-plain-birch",
    description: "Natural Plain Birch beauty meets upright fridge functionality in this premium Roam Kit configuration. The enhanced features and natural timber grain create a warm, inviting interior space.",
    shortDescription: "Natural birch upright fridge Roam Kit with enhanced features",
    images: ["/products/roam-upright-birch-1.jpg", "/products/roam-upright-birch-2.jpg"],
    videoUrl: "/videos/roam-upright-birch-walkthrough.mp4",
    features: [
      "Natural Plain Birch timber showcase",
      "Upright fridge accessibility",
      "Premium drawer systems",
      "Integrated work station",
      "Warm LED lighting",
      "Reinforced mounting",
      "Natural grain preservation"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with Plain Birch veneer",
      "Fridge Space": "Compatible with 50-80L upright fridges",
      "Storage Volume": "200L total internal storage",
      "Power System": "12V/24V DC compatible with monitoring",
      "Mounting": "Heavy-duty vehicle-specific brackets",
      "Finish": "Plain Birch with natural protective coating"
    },
    dimensions: {
      length: 200,
      width: 130,
      height: 115
    },
    weight: 58.0,
    badges: ["Mid-Range", "Natural Timber", "Easy Access"],
    shipClass: "oversized",
    upsells: ["cushion-set-birch", "water-tank-30l", "led-strip-warm"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "7-9 hours",
    sku: "RK-UF-PB-001",
    inStock: false,
    stockQuantity: 0,
    comingSoon: true,
    rating: 4.9,
    reviewCount: 71,
    tags: ["Flat Pack", "Troopcarrier", "Mid-Range", "Upright Fridge", "Plain Birch", "Natural"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "roam-kit",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-15")
  }
];

// Premium Kit Products (High-End)
export const premiumKits: FlatPackProduct[] = [
  {
    id: "premium-chest",
    name: "Premium Kit - Chest Fridge",
    kitType: "Premium",
    fridgeType: "Chest Fridge",
    finish: "Premium",
    price: 9850.00,
    slug: "premium-kit-chest-fridge",
    description: "The ultimate in flat pack luxury. Our Premium Kit with chest fridge configuration features the finest materials, premium hardware, and exclusive design elements. This is the choice for those who demand the absolute best.",
    shortDescription: "Ultimate luxury flat pack with premium materials and hardware",
    images: ["/products/premium-chest-1.jpg", "/products/premium-chest-2.jpg", "/products/premium-chest-3.jpg"],
    videoUrl: "/videos/premium-chest-walkthrough.mp4",
    features: [
      "Premium multi-tone timber finish",
      "Chest fridge maximum efficiency",
      "German-engineered soft-close systems",
      "Integrated smart lighting with controls",
      "Premium stainless steel hardware",
      "Advanced power management system",
      "Professional installation included",
      "Custom fit guarantee",
      "Luxury interior fittings"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with luxury multi-tone veneer",
      "Fridge Space": "Compatible with 60-100L chest fridges",
      "Storage Volume": "280L total internal storage",
      "Power System": "12V/24V DC with smart monitoring and USB outlets",
      "Mounting": "Premium heavy-duty vehicle-specific brackets",
      "Finish": "Multi-tone premium veneer with luxury protective coating"
    },
    dimensions: {
      length: 220,
      width: 140,
      height: 95
    },
    weight: 70.0,
    badges: ["Premium", "Professional Install", "Smart Features"],
    shipClass: "freight",
    upsells: ["cushion-set-premium", "electrical-kit-premium", "water-system-complete"],
    installationRequired: true,
    warranty: "5 years",
    assemblyTime: "Professional installation included",
    sku: "PK-CF-PREM-001",
    inStock: true,
    stockQuantity: 3,
    rating: 4.9,
    reviewCount: 47,
    tags: ["Flat Pack", "Troopcarrier", "Premium", "Chest Fridge", "Luxury", "Smart Features"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "premium-kit",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "premium-upright",
    name: "Premium Kit - Upright Fridge",
    kitType: "Premium",
    fridgeType: "Upright Fridge",
    finish: "Premium",
    price: 10650.00,
    slug: "premium-kit-upright-fridge",
    description: "The pinnacle of flat pack design. The Premium Kit upright fridge configuration combines ultimate accessibility with uncompromising luxury. Every detail has been perfected for the most discerning adventurers.",
    shortDescription: "Ultimate luxury upright fridge configuration with premium features",
    images: ["/products/premium-upright-1.jpg", "/products/premium-upright-2.jpg", "/products/premium-upright-3.jpg"],
    videoUrl: "/videos/premium-upright-walkthrough.mp4",
    features: [
      "Premium multi-tone timber finish",
      "Upright fridge ultimate accessibility",
      "German-engineered mechanisms",
      "Smart lighting with app control",
      "Premium stainless steel fixtures",
      "Integrated work station with power",
      "Professional installation included",
      "Custom measurements and fit",
      "Luxury storage solutions"
    ],
    specifications: {
      "Material": "Premium marine-grade plywood with luxury multi-tone veneer",
      "Fridge Space": "Compatible with 60-100L upright fridges",
      "Storage Volume": "260L total internal storage",
      "Power System": "12V/24V DC with smart monitoring, USB outlets, and 240V inverter ready",
      "Mounting": "Premium heavy-duty vehicle-specific brackets",
      "Finish": "Multi-tone premium veneer with luxury protective coating"
    },
    dimensions: {
      length: 220,
      width: 140,
      height: 120
    },
    weight: 73.0,
    badges: ["Premium", "Professional Install", "Smart Features", "Easy Access"],
    shipClass: "freight",
    upsells: ["cushion-set-premium", "electrical-kit-premium", "water-system-deluxe"],
    installationRequired: true,
    warranty: "5 years",
    assemblyTime: "Professional installation included",
    sku: "PK-UF-PREM-001",
    inStock: true,
    stockQuantity: 2,
    rating: 5.0,
    reviewCount: 23,
    tags: ["Flat Pack", "Troopcarrier", "Premium", "Upright Fridge", "Luxury", "Smart Features"],
    category: "Storage",
    subcategory: "Complete Kits",
    isTroopyPack: true,
    troopyPackSlug: "premium-kit",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15")
  }
];

// All flat pack products combined
export const allFlatPacks: FlatPackProduct[] = [
  ...wanderKits,
  ...roamKits,
  ...premiumKits
];

// Helper functions
export function getFlatPacksByKitType(kitType: 'Wander' | 'Roam' | 'Premium'): FlatPackProduct[] {
  return allFlatPacks.filter(product => product.kitType === kitType);
}

export function getFlatPacksByFridgeType(fridgeType: 'Chest Fridge' | 'Upright Fridge'): FlatPackProduct[] {
  return allFlatPacks.filter(product => product.fridgeType === fridgeType);
}

export function getFlatPackBySlug(slug: string): FlatPackProduct | undefined {
  return allFlatPacks.find(product => product.slug === slug);
}

export function getFlatPackById(id: string): FlatPackProduct | undefined {
  return allFlatPacks.find(product => product.id === id);
}

export function getFlatPacksByPriceRange(min: number, max: number): FlatPackProduct[] {
  return allFlatPacks.filter(product => product.price >= min && product.price <= max);
}

export function getFlatPacksInStock(): FlatPackProduct[] {
  return allFlatPacks.filter(product => product.inStock);
}

export function getFlatPackKitTypes(): string[] {
  return ['Wander', 'Roam', 'Premium'];
}

// Helper function to get products by base kit type
export function getFlatPacksByBaseKit(kitType: 'Wander' | 'Roam' | 'Premium'): FlatPackProduct[] {
  return allFlatPacks.filter(pack => pack.kitType === kitType);
}

// Helper function to get base kit slug from kit type
export function getBaseKitSlug(kitType: 'Wander' | 'Roam' | 'Premium'): string {
  const slugMap = {
    'Wander': 'wander',
    'Roam': 'roam', 
    'Premium': 'premium'
  };
  return slugMap[kitType];
}

// Helper function to get kit type from base kit slug
export function getKitTypeFromSlug(slug: string): 'Wander' | 'Roam' | 'Premium' | null {
  const typeMap: Record<string, 'Wander' | 'Roam' | 'Premium'> = {
    'wander': 'Wander',
    'roam': 'Roam',
    'premium': 'Premium'
  };
  return typeMap[slug] || null;
}

export function getFlatPackFinishes(): string[] {
  return Array.from(new Set(allFlatPacks.map(product => product.finish)));
}
