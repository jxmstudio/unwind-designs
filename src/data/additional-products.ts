// Additional Products for Unwind Designs
// These are supplementary products that complement the main product line

import { ComponentProduct } from './products';

// Utility Panel Products
export const utilityPanelProducts: ComponentProduct[] = [
  {
    id: "70-series-utility-panel",
    name: "70 Series Utility Panel (Faceless)",
    description: "Professional utility panel designed for 70 Series Land Cruisers. Provides organized storage and mounting points for various accessories.",
    shortDescription: "70 Series utility panel with storage",
    price: 180.00,
    images: ["/products/utility-panel-1.jpg", "/products/utility-panel-2.jpg"],
    category: "Utility Panels",
    subcategory: "70 Series",
    tags: ["Utility Panel", "70 Series", "Storage", "Professional"],
    features: [
      "70 Series specific design",
      "Organized storage compartments",
      "Professional mounting system",
      "Durable construction",
      "Easy installation",
      "Multiple mounting points"
    ],
    specifications: {
      "Material": "Marine-grade plywood",
      "Compatibility": "70 Series Land Cruiser",
      "Installation": "Vehicle-specific mounting",
      "Storage": "Multiple compartments",
      "Finish": "Natural timber"
    },
    dimensions: {
      length: 60,
      width: 40,
      height: 15
    },
    weight: 5.5,
    compatibility: ["70 Series Land Cruiser"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "2 hours",
    sku: "PANEL-70-001",
    slug: "70-series-utility-panel",
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 24,
    badges: ["Professional Grade"],
    shipClass: "oversized",
    upsells: ["troopy-side-panels"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// DIY Build Products
export const diyBuildProducts: ComponentProduct[] = [
  {
    id: "troopy-diy-starter-kit",
    name: "Troopy DIY Build Starter Kit",
    description: "Complete starter kit for DIY Troopcarrier builds. Includes essential tools, hardware, and materials to get you started on your project.",
    shortDescription: "Complete DIY build starter kit",
    price: 350.00,
    images: ["/products/diy-kit-1.jpg", "/products/diy-kit-2.jpg"],
    category: "DIY Build",
    subcategory: "Starter Kits",
    tags: ["DIY", "Starter Kit", "Tools", "Hardware", "Complete"],
    features: [
      "Complete starter kit",
      "Essential tools included",
      "Quality hardware",
      "DIY friendly",
      "Professional guide",
      "Everything you need to start"
    ],
    specifications: {
      "Contents": "Tools, hardware, materials",
      "Tools": "Basic hand tools included",
      "Hardware": "Stainless steel fasteners",
      "Guide": "Professional installation guide",
      "Compatibility": "Toyota Troopcarrier"
    },
    dimensions: {
      length: 50,
      width: 30,
      height: 20
    },
    weight: 12.0,
    compatibility: ["Toyota Troopcarrier"],
    installationRequired: false,
    warranty: "1 year",
    assemblyTime: "N/A",
    sku: "DIY-KIT-001",
    slug: "troopy-diy-starter-kit",
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 67,
    badges: ["Complete Kit", "DIY Friendly"],
    shipClass: "oversized",
    upsells: ["troopy-side-panels", "troopy-floor"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Bushman Fridge Products
export const bushmanProducts: ComponentProduct[] = [
  {
    id: "bushman-roadie-15l",
    name: "Bushman Roadie 15L",
    description: "Compact 15L Bushman fridge perfect for short trips and day adventures. Reliable cooling performance in a portable package.",
    shortDescription: "15L portable Bushman fridge",
    price: 450.00,
    images: ["/products/bushman-15l-1.jpg", "/products/bushman-15l-2.jpg"],
    category: "Fridges",
    subcategory: "Portable Fridges",
    tags: ["Bushman", "15L", "Portable", "Fridge", "Compact"],
    features: [
      "15L compact capacity",
      "Portable design",
      "Reliable cooling",
      "Energy efficient",
      "Easy to transport",
      "Perfect for day trips"
    ],
    specifications: {
      "Brand": "Bushman",
      "Capacity": "15 Liters",
      "Power": "12V/24V DC",
      "Weight": "12kg",
      "Dimensions": "400mm x 300mm x 400mm"
    },
    dimensions: {
      length: 40,
      width: 30,
      height: 40
    },
    weight: 12.0,
    compatibility: ["All vehicles", "Portable use"],
    installationRequired: false,
    warranty: "2 years",
    assemblyTime: "N/A",
    sku: "BUSHMAN-15L-001",
    slug: "bushman-roadie-15l",
    inStock: true,
    stockQuantity: 20,
    rating: 4.7,
    reviewCount: 89,
    badges: ["Portable", "Energy Efficient"],
    shipClass: "standard",
    upsells: ["bushman-dc50x"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "bushman-dc50x",
    name: "Bushman DC50-X",
    description: "50L Bushman DC50-X fridge with advanced features and reliable performance. Perfect for extended adventures and family trips.",
    shortDescription: "50L Bushman DC50-X fridge",
    price: 850.00,
    images: ["/products/bushman-dc50x-1.jpg", "/products/bushman-dc50x-2.jpg"],
    category: "Fridges",
    subcategory: "Portable Fridges",
    tags: ["Bushman", "50L", "DC50-X", "Advanced", "Family"],
    features: [
      "50L large capacity",
      "Advanced cooling system",
      "Energy efficient",
      "Digital temperature control",
      "Reliable performance",
      "Perfect for family trips"
    ],
    specifications: {
      "Brand": "Bushman",
      "Model": "DC50-X",
      "Capacity": "50 Liters",
      "Power": "12V/24V DC",
      "Weight": "18kg",
      "Features": "Digital control, LED lighting"
    },
    dimensions: {
      length: 50,
      width: 40,
      height: 45
    },
    weight: 18.0,
    compatibility: ["All vehicles", "Troopcarrier fitouts"],
    installationRequired: false,
    warranty: "3 years",
    assemblyTime: "N/A",
    sku: "BUSHMAN-DC50X-001",
    slug: "bushman-dc50x",
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 124,
    badges: ["Advanced Features", "Large Capacity"],
    shipClass: "oversized",
    upsells: ["bushman-dc85x"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "bushman-dc85x",
    name: "Bushman DC85-X",
    description: "Large 85L Bushman DC85-X fridge for extended adventures. Maximum capacity with advanced features for serious adventurers.",
    shortDescription: "85L Bushman DC85-X large fridge",
    price: 1200.00,
    images: ["/products/bushman-dc85x-1.jpg", "/products/bushman-dc85x-2.jpg"],
    category: "Fridges",
    subcategory: "Portable Fridges",
    tags: ["Bushman", "85L", "DC85-X", "Large", "Extended Adventures"],
    features: [
      "85L maximum capacity",
      "Advanced cooling technology",
      "Energy efficient operation",
      "Digital temperature control",
      "LED interior lighting",
      "Perfect for extended trips"
    ],
    specifications: {
      "Brand": "Bushman",
      "Model": "DC85-X",
      "Capacity": "85 Liters",
      "Power": "12V/24V DC",
      "Weight": "25kg",
      "Features": "Digital control, LED lighting, advanced cooling"
    },
    dimensions: {
      length: 60,
      width: 45,
      height: 50
    },
    weight: 25.0,
    compatibility: ["All vehicles", "Large fitouts"],
    installationRequired: false,
    warranty: "3 years",
    assemblyTime: "N/A",
    sku: "BUSHMAN-DC85X-001",
    slug: "bushman-dc85x",
    inStock: true,
    stockQuantity: 10,
    rating: 4.9,
    reviewCount: 76,
    badges: ["Maximum Capacity", "Advanced Features"],
    shipClass: "oversized",
    upsells: ["bushman-dc65x"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "bushman-original-35-52l",
    name: "Original Bushman 35–52L",
    description: "Classic Bushman fridge with 35-52L capacity range. Reliable performance with traditional Bushman quality and durability.",
    shortDescription: "Original Bushman 35-52L fridge",
    price: 650.00,
    images: ["/products/bushman-original-1.jpg", "/products/bushman-original-2.jpg"],
    category: "Fridges",
    subcategory: "Portable Fridges",
    tags: ["Bushman", "Original", "35-52L", "Classic", "Reliable"],
    features: [
      "35-52L capacity range",
      "Classic Bushman design",
      "Reliable performance",
      "Durable construction",
      "Energy efficient",
      "Proven track record"
    ],
    specifications: {
      "Brand": "Bushman",
      "Model": "Original",
      "Capacity": "35-52 Liters",
      "Power": "12V/24V DC",
      "Weight": "15kg",
      "Features": "Classic design, reliable cooling"
    },
    dimensions: {
      length: 45,
      width: 35,
      height: 40
    },
    weight: 15.0,
    compatibility: ["All vehicles", "Traditional fitouts"],
    installationRequired: false,
    warranty: "2 years",
    assemblyTime: "N/A",
    sku: "BUSHMAN-ORIG-001",
    slug: "bushman-original-35-52l",
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 156,
    badges: ["Classic Design", "Reliable"],
    shipClass: "oversized",
    upsells: ["bushman-dc65x"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "bushman-dc65x",
    name: "Bushman DC65-X",
    description: "65L Bushman DC65-X fridge with modern features and reliable performance. Perfect balance of capacity and efficiency.",
    shortDescription: "65L Bushman DC65-X fridge",
    price: 950.00,
    images: ["/products/bushman-dc65x-1.jpg", "/products/bushman-dc65x-2.jpg"],
    category: "Fridges",
    subcategory: "Portable Fridges",
    tags: ["Bushman", "65L", "DC65-X", "Modern", "Balanced"],
    features: [
      "65L balanced capacity",
      "Modern design features",
      "Energy efficient operation",
      "Digital temperature control",
      "Reliable performance",
      "Perfect for most adventures"
    ],
    specifications: {
      "Brand": "Bushman",
      "Model": "DC65-X",
      "Capacity": "65 Liters",
      "Power": "12V/24V DC",
      "Weight": "20kg",
      "Features": "Digital control, LED lighting"
    },
    dimensions: {
      length: 55,
      width: 40,
      height: 45
    },
    weight: 20.0,
    compatibility: ["All vehicles", "Most fitouts"],
    installationRequired: false,
    warranty: "3 years",
    assemblyTime: "N/A",
    sku: "BUSHMAN-DC65X-001",
    slug: "bushman-dc65x",
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 98,
    badges: ["Balanced Capacity", "Modern Features"],
    shipClass: "oversized",
    upsells: ["bushman-dc50x", "bushman-dc85x"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "bushman-original-35l",
    name: "Original Bushman 35L",
    description: "Compact 35L Original Bushman fridge. Perfect for smaller vehicles and short trips with reliable Bushman quality.",
    shortDescription: "Original Bushman 35L compact fridge",
    price: 480.00,
    images: ["/products/bushman-35l-1.jpg", "/products/bushman-35l-2.jpg"],
    category: "Fridges",
    subcategory: "Portable Fridges",
    tags: ["Bushman", "35L", "Original", "Compact", "Small Vehicle"],
    features: [
      "35L compact capacity",
      "Original Bushman design",
      "Reliable cooling",
      "Compact footprint",
      "Perfect for small vehicles",
      "Energy efficient"
    ],
    specifications: {
      "Brand": "Bushman",
      "Model": "Original 35L",
      "Capacity": "35 Liters",
      "Power": "12V/24V DC",
      "Weight": "12kg",
      "Features": "Compact design, reliable cooling"
    },
    dimensions: {
      length: 40,
      width: 30,
      height: 35
    },
    weight: 12.0,
    compatibility: ["Small vehicles", "Compact fitouts"],
    installationRequired: false,
    warranty: "2 years",
    assemblyTime: "N/A",
    sku: "BUSHMAN-35L-001",
    slug: "bushman-original-35l",
    inStock: true,
    stockQuantity: 22,
    rating: 4.5,
    reviewCount: 67,
    badges: ["Compact", "Small Vehicle"],
    shipClass: "standard",
    upsells: ["bushman-roadie-15l"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Plumbing Fitting Products
export const plumbingFittingProducts: ComponentProduct[] = [
  {
    id: "john-guest-red-pipe",
    name: "John Guest 12mm Red Pipe",
    description: "High-quality 12mm red pipe for water systems. John Guest fittings provide reliable connections for plumbing installations.",
    shortDescription: "12mm red pipe for water systems",
    price: 25.00,
    images: ["/products/jg-red-pipe-1.jpg", "/products/jg-red-pipe-2.jpg"],
    category: "Plumbing",
    subcategory: "Pipe Fittings",
    tags: ["John Guest", "12mm", "Red Pipe", "Water System", "Fittings"],
    features: [
      "12mm diameter",
      "Red color coding",
      "John Guest quality",
      "Easy installation",
      "Reliable connections",
      "Water system compatible"
    ],
    specifications: {
      "Brand": "John Guest",
      "Diameter": "12mm",
      "Color": "Red",
      "Material": "Food-grade plastic",
      "Length": "3 meters",
      "Compatibility": "Water systems"
    },
    dimensions: {
      length: 300,
      width: 1.2,
      height: 1.2
    },
    weight: 0.5,
    compatibility: ["Water systems", "All vehicles"],
    installationRequired: true,
    warranty: "1 year",
    assemblyTime: "15 minutes",
    sku: "JG-RED-12MM-001",
    slug: "john-guest-red-pipe",
    inStock: true,
    stockQuantity: 50,
    rating: 4.4,
    reviewCount: 23,
    badges: ["John Guest Quality"],
    shipClass: "standard",
    upsells: ["john-guest-blue-pipe"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "john-guest-blue-pipe",
    name: "John Guest 12mm Blue Pipe",
    description: "High-quality 12mm blue pipe for water systems. John Guest fittings provide reliable connections for plumbing installations.",
    shortDescription: "12mm blue pipe for water systems",
    price: 25.00,
    images: ["/products/jg-blue-pipe-1.jpg", "/products/jg-blue-pipe-2.jpg"],
    category: "Plumbing",
    subcategory: "Pipe Fittings",
    tags: ["John Guest", "12mm", "Blue Pipe", "Water System", "Fittings"],
    features: [
      "12mm diameter",
      "Blue color coding",
      "John Guest quality",
      "Easy installation",
      "Reliable connections",
      "Water system compatible"
    ],
    specifications: {
      "Brand": "John Guest",
      "Diameter": "12mm",
      "Color": "Blue",
      "Material": "Food-grade plastic",
      "Length": "3 meters",
      "Compatibility": "Water systems"
    },
    dimensions: {
      length: 300,
      width: 1.2,
      height: 1.2
    },
    weight: 0.5,
    compatibility: ["Water systems", "All vehicles"],
    installationRequired: true,
    warranty: "1 year",
    assemblyTime: "15 minutes",
    sku: "JG-BLUE-12MM-001",
    slug: "john-guest-blue-pipe",
    inStock: true,
    stockQuantity: 50,
    rating: 4.4,
    reviewCount: 23,
    badges: ["John Guest Quality"],
    shipClass: "standard",
    upsells: ["john-guest-red-pipe"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Water Heater Products
export const waterHeaterProducts: ComponentProduct[] = [
  {
    id: "duoetto-mk2-10l",
    name: "Duoetto MK2 10L Water Heater",
    description: "Compact 10L Duoetto water heater with dual power options. Perfect for hot water needs in campervans and caravans.",
    shortDescription: "10L Duoetto dual power water heater",
    price: 450.00,
    images: ["/products/duoetto-mk2-1.jpg", "/products/duoetto-mk2-2.jpg"],
    category: "Water Heaters",
    subcategory: "Portable Heaters",
    tags: ["Duoetto", "10L", "Water Heater", "Dual Power", "Compact"],
    features: [
      "10L capacity",
      "Dual power options",
      "Compact design",
      "Easy installation",
      "Reliable heating",
      "Perfect for campervans"
    ],
    specifications: {
      "Brand": "Duoetto",
      "Model": "MK2",
      "Capacity": "10 Liters",
      "Power": "12V/240V dual",
      "Weight": "3.5kg",
      "Features": "Dual power, compact design"
    },
    dimensions: {
      length: 25,
      width: 20,
      height: 30
    },
    weight: 3.5,
    compatibility: ["Campervans", "Caravans", "All vehicles"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "1 hour",
    sku: "DUOETTO-MK2-001",
    slug: "duoetto-mk2-10l",
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviewCount: 45,
    badges: ["Dual Power", "Compact"],
    shipClass: "standard",
    upsells: ["duoetto-remote-control"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "aqueous-mk2-10l-240v",
    name: "Aqueous MK2 10L 240V Water Heater",
    description: "10L Aqueous water heater with 240V power. Reliable hot water solution for mains power applications.",
    shortDescription: "10L Aqueous 240V water heater",
    price: 380.00,
    images: ["/products/aqueous-mk2-240v-1.jpg", "/products/aqueous-mk2-240v-2.jpg"],
    category: "Water Heaters",
    subcategory: "240V Heaters",
    tags: ["Aqueous", "10L", "240V", "Water Heater", "Mains Power"],
    features: [
      "10L capacity",
      "240V mains power",
      "Reliable heating",
      "Easy installation",
      "Energy efficient",
      "Perfect for mains power"
    ],
    specifications: {
      "Brand": "Aqueous",
      "Model": "MK2",
      "Capacity": "10 Liters",
      "Power": "240V AC",
      "Weight": "3.2kg",
      "Features": "Mains power, reliable heating"
    },
    dimensions: {
      length: 25,
      width: 20,
      height: 30
    },
    weight: 3.2,
    compatibility: ["Mains power applications", "All vehicles"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "1 hour",
    sku: "AQUEOUS-MK2-240V-001",
    slug: "aqueous-mk2-10l-240v",
    inStock: true,
    stockQuantity: 12,
    rating: 4.5,
    reviewCount: 32,
    badges: ["240V", "Mains Power"],
    shipClass: "standard",
    upsells: ["aqueous-6l-heater"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "aqueous-6l-heater",
    name: "Aqueous 6L Water Heater",
    description: "Compact 6L Aqueous water heater. Perfect for smaller applications where space is limited.",
    shortDescription: "6L Aqueous compact water heater",
    price: 280.00,
    images: ["/products/aqueous-6l-1.jpg", "/products/aqueous-6l-2.jpg"],
    category: "Water Heaters",
    subcategory: "Compact Heaters",
    tags: ["Aqueous", "6L", "Compact", "Water Heater", "Small Space"],
    features: [
      "6L compact capacity",
      "Space-saving design",
      "Reliable heating",
      "Easy installation",
      "Perfect for small spaces",
      "Energy efficient"
    ],
    specifications: {
      "Brand": "Aqueous",
      "Model": "6L",
      "Capacity": "6 Liters",
      "Power": "12V/240V",
      "Weight": "2.5kg",
      "Features": "Compact design, dual power"
    },
    dimensions: {
      length: 20,
      width: 15,
      height: 25
    },
    weight: 2.5,
    compatibility: ["Small spaces", "All vehicles"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "45 minutes",
    sku: "AQUEOUS-6L-001",
    slug: "aqueous-6l-heater",
    inStock: true,
    stockQuantity: 18,
    rating: 4.4,
    reviewCount: 28,
    badges: ["Compact", "Small Space"],
    shipClass: "standard",
    upsells: ["duoetto-mk2-10l"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "duoetto-remote-control",
    name: "Remote Control for Duoetto Water Heaters",
    description: "Remote control for Duoetto water heaters. Provides convenient operation and temperature control from a distance.",
    shortDescription: "Remote control for Duoetto heaters",
    price: 85.00,
    images: ["/products/duoetto-remote-1.jpg", "/products/duoetto-remote-2.jpg"],
    category: "Water Heaters",
    subcategory: "Accessories",
    tags: ["Duoetto", "Remote Control", "Accessory", "Convenience"],
    features: [
      "Remote operation",
      "Temperature control",
      "Convenient use",
      "Easy installation",
      "Battery powered",
      "Long range"
    ],
    specifications: {
      "Brand": "Duoetto",
      "Type": "Remote Control",
      "Range": "10 meters",
      "Power": "Battery powered",
      "Compatibility": "Duoetto heaters",
      "Features": "Temperature control, timer"
    },
    dimensions: {
      length: 15,
      width: 8,
      height: 3
    },
    weight: 0.3,
    compatibility: ["Duoetto water heaters"],
    installationRequired: false,
    warranty: "1 year",
    assemblyTime: "N/A",
    sku: "DUOETTO-REMOTE-001",
    slug: "duoetto-remote-control",
    inStock: true,
    stockQuantity: 25,
    rating: 4.3,
    reviewCount: 19,
    badges: ["Remote Control", "Convenience"],
    shipClass: "standard",
    upsells: ["duoetto-mk2-10l"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Shower and Bathroom Products
export const showerProducts: ComponentProduct[] = [
  {
    id: "stainless-shower-tray",
    name: "Stainless Steel Campervan Shower Tray",
    description: "Professional stainless steel shower tray designed for campervans and caravans. Durable construction with proper drainage.",
    shortDescription: "Stainless steel campervan shower tray",
    price: 320.00,
    images: ["/products/shower-tray-1.jpg", "/products/shower-tray-2.jpg"],
    category: "Bathroom",
    subcategory: "Shower Trays",
    tags: ["Shower Tray", "Stainless Steel", "Campervan", "Professional"],
    features: [
      "Stainless steel construction",
      "Professional drainage",
      "Durable design",
      "Easy installation",
      "Waterproof",
      "Perfect for campervans"
    ],
    specifications: {
      "Material": "Stainless Steel",
      "Size": "600mm x 600mm",
      "Weight": "8kg",
      "Drainage": "Professional grade",
      "Installation": "Screw-down mounting",
      "Compatibility": "Campervans, caravans"
    },
    dimensions: {
      length: 60,
      width: 60,
      height: 5
    },
    weight: 8.0,
    compatibility: ["Campervans", "Caravans"],
    installationRequired: true,
    warranty: "3 years",
    assemblyTime: "2 hours",
    sku: "SHOWER-TRAY-001",
    slug: "stainless-shower-tray",
    inStock: true,
    stockQuantity: 8,
    rating: 4.7,
    reviewCount: 15,
    badges: ["Professional Grade", "Stainless Steel"],
    shipClass: "oversized",
    upsells: ["shower-outlet"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Water Pump Products
export const waterPumpProducts: ComponentProduct[] = [
  {
    id: "seaflo-water-pump-40psi",
    name: "Seaflo Water Pump 40PSI",
    description: "Reliable 40PSI Seaflo water pump for water systems. Provides consistent water pressure for showers and taps.",
    shortDescription: "40PSI Seaflo water pump",
    price: 95.00,
    images: ["/products/seaflo-pump-1.jpg", "/products/seaflo-pump-2.jpg"],
    category: "Water Systems",
    subcategory: "Water Pumps",
    tags: ["Seaflo", "40PSI", "Water Pump", "Pressure", "Reliable"],
    features: [
      "40PSI pressure rating",
      "Reliable operation",
      "Quiet operation",
      "Easy installation",
      "Consistent pressure",
      "Perfect for water systems"
    ],
    specifications: {
      "Brand": "Seaflo",
      "Pressure": "40 PSI",
      "Flow Rate": "12L/min",
      "Power": "12V DC",
      "Weight": "1.2kg",
      "Features": "Pressure switch, quiet operation"
    },
    dimensions: {
      length: 15,
      width: 10,
      height: 12
    },
    weight: 1.2,
    compatibility: ["Water systems", "All vehicles"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "30 minutes",
    sku: "SEAFLO-40PSI-001",
    slug: "seaflo-water-pump-40psi",
    inStock: true,
    stockQuantity: 30,
    rating: 4.6,
    reviewCount: 67,
    badges: ["40PSI", "Reliable"],
    shipClass: "standard",
    upsells: ["62l-stainless-water-tank", "shower-outlet"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Plumbing Kit Products
export const plumbingKitProducts: ComponentProduct[] = [
  {
    id: "tank-utility-vent-plumbing-kit",
    name: "Tank to Utility Vent Plumbing Kit",
    description: "Complete plumbing kit for connecting water tanks to utility vents. Includes all necessary fittings and pipework.",
    shortDescription: "Tank to utility vent plumbing kit",
    price: 65.00,
    images: ["/products/tank-vent-kit-1.jpg", "/products/tank-vent-kit-2.jpg"],
    category: "Plumbing",
    subcategory: "Plumbing Kits",
    tags: ["Plumbing Kit", "Tank", "Utility Vent", "Complete", "Fittings"],
    features: [
      "Complete plumbing kit",
      "All fittings included",
      "Easy installation",
      "Professional grade",
      "Tank to vent connection",
      "Everything you need"
    ],
    specifications: {
      "Contents": "Fittings, pipework, connectors",
      "Connection": "Tank to utility vent",
      "Materials": "Professional grade",
      "Installation": "DIY friendly",
      "Compatibility": "Standard tanks and vents"
    },
    dimensions: {
      length: 30,
      width: 20,
      height: 8
    },
    weight: 1.5,
    compatibility: ["Water tanks", "Utility vents"],
    installationRequired: true,
    warranty: "1 year",
    assemblyTime: "1 hour",
    sku: "TANK-VENT-KIT-001",
    slug: "tank-utility-vent-plumbing-kit",
    inStock: true,
    stockQuantity: 20,
    rating: 4.5,
    reviewCount: 34,
    badges: ["Complete Kit", "Professional"],
    shipClass: "standard",
    upsells: ["90l-plumbing-kit"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "90l-plumbing-kit",
    name: "90L Water Tank Plumbing Kit",
    description: "Complete plumbing kit for 90L water tanks. Includes all necessary fittings, pipework, and installation hardware.",
    shortDescription: "90L water tank plumbing kit",
    price: 120.00,
    images: ["/products/90l-plumbing-kit-1.jpg", "/products/90l-plumbing-kit-2.jpg"],
    category: "Plumbing",
    subcategory: "Plumbing Kits",
    tags: ["Plumbing Kit", "90L", "Water Tank", "Complete", "Professional"],
    features: [
      "Complete 90L tank kit",
      "All fittings included",
      "Professional installation",
      "Quality materials",
      "Easy installation",
      "Everything you need"
    ],
    specifications: {
      "Contents": "Fittings, pipework, hardware",
      "Tank Size": "90L compatible",
      "Materials": "Professional grade",
      "Installation": "Professional guide included",
      "Compatibility": "90L water tanks"
    },
    dimensions: {
      length: 40,
      width: 25,
      height: 10
    },
    weight: 2.5,
    compatibility: ["90L water tanks"],
    installationRequired: true,
    warranty: "1 year",
    assemblyTime: "2 hours",
    sku: "90L-PLUMBING-KIT-001",
    slug: "90l-plumbing-kit",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 28,
    badges: ["Complete Kit", "90L Compatible"],
    shipClass: "standard",
    upsells: ["90l-troopy-water-tank"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Hardware Products
export const hardwareProducts: ComponentProduct[] = [
  {
    id: "everlock-latches",
    name: "Everlock Latches",
    description: "High-quality Everlock latches for secure cabinet and door closures. Professional grade hardware for reliable operation.",
    shortDescription: "Professional Everlock latches",
    price: 45.00,
    images: ["/products/everlock-latches-1.jpg", "/products/everlock-latches-2.jpg"],
    category: "Hardware",
    subcategory: "Latches",
    tags: ["Everlock", "Latches", "Hardware", "Professional", "Secure"],
    features: [
      "Professional grade",
      "Secure closure",
      "Durable construction",
      "Easy installation",
      "Reliable operation",
      "Perfect for cabinets"
    ],
    specifications: {
      "Brand": "Everlock",
      "Type": "Cabinet Latches",
      "Material": "Stainless steel",
      "Finish": "Brushed stainless",
      "Installation": "Screw mounting",
      "Compatibility": "Standard cabinets"
    },
    dimensions: {
      length: 8,
      width: 4,
      height: 2
    },
    weight: 0.2,
    compatibility: ["Cabinets", "Doors", "All applications"],
    installationRequired: true,
    warranty: "2 years",
    assemblyTime: "15 minutes",
    sku: "EVERLOCK-LATCH-001",
    slug: "everlock-latches",
    inStock: true,
    stockQuantity: 40,
    rating: 4.8,
    reviewCount: 52,
    badges: ["Professional Grade", "Secure"],
    shipClass: "standard",
    upsells: ["troopy-side-panels"],
    isTroopyPack: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15")
  }
];

// Combined additional products
export const allAdditionalProducts: ComponentProduct[] = [
  ...utilityPanelProducts,
  ...diyBuildProducts,
  ...bushmanProducts,
  ...plumbingFittingProducts,
  ...waterHeaterProducts,
  ...showerProducts,
  ...waterPumpProducts,
  ...plumbingKitProducts,
  ...hardwareProducts
];

// Helper functions for additional products
export function getAdditionalProductsByCategory(category: ComponentProduct['category']): ComponentProduct[] {
  return allAdditionalProducts.filter(product => product.category === category);
}

export function getAdditionalProductById(id: string): ComponentProduct | undefined {
  return allAdditionalProducts.find(product => product.id === id);
}

export function getAdditionalProductBySlug(slug: string): ComponentProduct | undefined {
  return allAdditionalProducts.find(product => product.slug === slug);
}
