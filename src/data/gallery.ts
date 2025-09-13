// Gallery Data for Past Builds and Fitout Examples

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'Storage' | 'Kitchen' | 'Sleeping' | 'Electrical' | 'Water' | 'Exterior' | 'Complete Fitout';
  subcategory: string;
  images: string[];
  featuredImage: string;
  vehicle: string;
  kit?: 'Wander' | 'Roam' | 'Premium' | 'Custom';
  completionDate: Date;
  features: string[];
  tags: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  buildTime: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  estimatedCost: {
    min: number;
    max: number;
  };
}

// Storage Solutions Gallery
export const storageBuilds: GalleryItem[] = [
  {
    id: "storage-roam-kit-1",
    title: "Roam Kit with Extended Storage",
    description: "Complete Roam Kit installation featuring additional storage drawers, overhead compartments, and custom tool organization system. Perfect for extended adventures.",
    category: "Storage",
    subcategory: "Complete Kits",
    images: [
      "/gallery/storage-roam-1-1.jpg",
      "/gallery/storage-roam-1-2.jpg",
      "/gallery/storage-roam-1-3.jpg",
      "/gallery/storage-roam-1-4.jpg"
    ],
    featuredImage: "/gallery/storage-roam-1-featured.jpg",
    vehicle: "Toyota Troopcarrier 2019",
    kit: "Roam",
    completionDate: new Date("2024-01-10"),
    features: [
      "Roam Kit base system",
      "Extended drawer system",
      "Overhead storage compartments",
      "Tool organization panels",
      "LED strip lighting",
      "12V power outlets"
    ],
    tags: ["Roam Kit", "Extended Storage", "LED Lighting", "Tool Organization"],
    isPopular: true,
    isFeatured: true,
    buildTime: "2 days professional installation",
    difficulty: "Moderate",
    estimatedCost: {
      min: 8500,
      max: 9200
    }
  },
  {
    id: "storage-custom-drawers",
    title: "Custom Drawer System Build",
    description: "Bespoke drawer system with premium soft-close mechanisms, aluminum extrusion guides, and custom compartment inserts for specific gear storage.",
    category: "Storage",
    subcategory: "Custom Solutions",
    images: [
      "/gallery/custom-drawers-1.jpg",
      "/gallery/custom-drawers-2.jpg",
      "/gallery/custom-drawers-3.jpg"
    ],
    featuredImage: "/gallery/custom-drawers-featured.jpg",
    vehicle: "Toyota Troopcarrier 2021",
    kit: "Custom",
    completionDate: new Date("2023-12-15"),
    features: [
      "Premium soft-close drawer slides",
      "Aluminum extrusion frame",
      "Custom compartment inserts",
      "Security locking system",
      "Modular organization",
      "Heavy-duty construction"
    ],
    tags: ["Custom Build", "Premium Hardware", "Security", "Modular"],
    buildTime: "3 days custom fabrication",
    difficulty: "Advanced",
    estimatedCost: {
      min: 3500,
      max: 4800
    }
  }
];

// Kitchen Setup Gallery
export const kitchenBuilds: GalleryItem[] = [
  {
    id: "kitchen-premium-setup",
    title: "Premium Kit Kitchen Integration",
    description: "Complete Premium Kit with integrated kitchen featuring induction cooktop, 80L fridge, water system, and luxury finishes throughout.",
    category: "Kitchen",
    subcategory: "Complete Systems",
    images: [
      "/gallery/kitchen-premium-1.jpg",
      "/gallery/kitchen-premium-2.jpg",
      "/gallery/kitchen-premium-3.jpg",
      "/gallery/kitchen-premium-4.jpg"
    ],
    featuredImage: "/gallery/kitchen-premium-featured.jpg",
    vehicle: "Toyota Troopcarrier 2020",
    kit: "Premium",
    completionDate: new Date("2024-01-05"),
    features: [
      "Premium Kit base system",
      "Induction cooktop integration",
      "80L upright fridge space",
      "30L water system with pump",
      "Luxury multi-tone veneer",
      "Smart lighting controls",
      "Inverter and electrical system"
    ],
    tags: ["Premium Kit", "Kitchen", "Induction Cooking", "Water System", "Luxury"],
    isPopular: true,
    isFeatured: true,
    buildTime: "3 days professional installation",
    difficulty: "Advanced",
    estimatedCost: {
      min: 12500,
      max: 15000
    }
  },
  {
    id: "kitchen-compact-efficient",
    title: "Compact Kitchen Setup",
    description: "Efficient kitchen design for weekend warriors featuring compact cooking solution, 40L fridge, and smart storage integration.",
    category: "Kitchen",
    subcategory: "Compact Solutions",
    images: [
      "/gallery/kitchen-compact-1.jpg",
      "/gallery/kitchen-compact-2.jpg",
      "/gallery/kitchen-compact-3.jpg"
    ],
    featuredImage: "/gallery/kitchen-compact-featured.jpg",
    vehicle: "Toyota Troopcarrier 2022",
    kit: "Wander",
    completionDate: new Date("2023-11-20"),
    features: [
      "Wander Kit integration",
      "Compact gas cooktop",
      "40L chest fridge space",
      "20L water tank system",
      "Fold-out prep surface",
      "Utensil organization"
    ],
    tags: ["Wander Kit", "Compact", "Gas Cooking", "Weekend Trips"],
    buildTime: "1 day installation",
    difficulty: "Easy",
    estimatedCost: {
      min: 5500,
      max: 7000
    }
  }
];

// Sleeping Area Gallery
export const sleepingBuilds: GalleryItem[] = [
  {
    id: "sleeping-convertible-lounge",
    title: "Convertible Lounge to Bed",
    description: "Innovative convertible seating that transforms into a comfortable sleeping area for two adults. Features memory foam cushions and premium fabrics.",
    category: "Sleeping",
    subcategory: "Convertible Systems",
    images: [
      "/gallery/sleeping-convertible-1.jpg",
      "/gallery/sleeping-convertible-2.jpg",
      "/gallery/sleeping-convertible-3.jpg"
    ],
    featuredImage: "/gallery/sleeping-convertible-featured.jpg",
    vehicle: "Toyota Troopcarrier 2021",
    kit: "Roam",
    completionDate: new Date("2023-12-08"),
    features: [
      "Roam Kit base system",
      "Convertible seating mechanism",
      "Memory foam cushions",
      "Premium fabric covering",
      "Easy conversion system",
      "Storage underneath"
    ],
    tags: ["Roam Kit", "Convertible", "Memory Foam", "Dual Purpose"],
    isPopular: true,
    buildTime: "1.5 days installation",
    difficulty: "Moderate",
    estimatedCost: {
      min: 8200,
      max: 9500
    }
  }
];

// Electrical Systems Gallery
export const electricalBuilds: GalleryItem[] = [
  {
    id: "electrical-solar-system",
    title: "Complete Solar Electrical System",
    description: "Comprehensive 12V electrical system with solar charging, lithium battery bank, inverter, and monitoring system. Powers all onboard systems.",
    category: "Electrical",
    subcategory: "Solar Systems",
    images: [
      "/gallery/electrical-solar-1.jpg",
      "/gallery/electrical-solar-2.jpg",
      "/gallery/electrical-solar-3.jpg",
      "/gallery/electrical-solar-4.jpg"
    ],
    featuredImage: "/gallery/electrical-solar-featured.jpg",
    vehicle: "Toyota Troopcarrier 2020",
    completionDate: new Date("2024-01-12"),
    features: [
      "400W solar panel array",
      "200Ah lithium battery bank",
      "2000W pure sine wave inverter",
      "MPPT charge controller",
      "12V distribution panel",
      "Monitoring and controls",
      "USB charging outlets"
    ],
    tags: ["Solar Power", "Lithium Batteries", "Inverter", "Off-Grid"],
    isFeatured: true,
    buildTime: "2 days professional installation",
    difficulty: "Advanced",
    estimatedCost: {
      min: 4500,
      max: 6500
    }
  }
];

// Water Systems Gallery
export const waterBuilds: GalleryItem[] = [
  {
    id: "water-complete-system",
    title: "Complete Fresh & Grey Water System",
    description: "Full water management system with 50L fresh tank, 40L grey tank, pressurized delivery, hot water heater, and outside shower.",
    category: "Water",
    subcategory: "Complete Systems",
    images: [
      "/gallery/water-complete-1.jpg",
      "/gallery/water-complete-2.jpg",
      "/gallery/water-complete-3.jpg"
    ],
    featuredImage: "/gallery/water-complete-featured.jpg",
    vehicle: "Toyota Troopcarrier 2019",
    completionDate: new Date("2023-12-20"),
    features: [
      "50L fresh water tank",
      "40L grey water tank",
      "Pressure pump system",
      "Hot water heater (10L)",
      "Inside/outside taps",
      "Level monitoring",
      "Winterization valves"
    ],
    tags: ["Water System", "Hot Water", "Grey Water", "Outside Shower"],
    buildTime: "2 days installation",
    difficulty: "Advanced",
    estimatedCost: {
      min: 2800,
      max: 3800
    }
  }
];

// Exterior Modifications Gallery
export const exteriorBuilds: GalleryItem[] = [
  {
    id: "exterior-adventure-ready",
    title: "Adventure-Ready Exterior Setup",
    description: "Complete exterior preparation including roof rack system, awning, lighting, recovery gear, and storage solutions for serious adventuring.",
    category: "Exterior",
    subcategory: "Adventure Packages",
    images: [
      "/gallery/exterior-adventure-1.jpg",
      "/gallery/exterior-adventure-2.jpg",
      "/gallery/exterior-adventure-3.jpg",
      "/gallery/exterior-adventure-4.jpg"
    ],
    featuredImage: "/gallery/exterior-adventure-featured.jpg",
    vehicle: "Toyota Troopcarrier 2021",
    completionDate: new Date("2024-01-08"),
    features: [
      "Heavy-duty roof rack system",
      "270° awning with sides",
      "LED light bar and spots",
      "Recovery gear mounting",
      "External storage boxes",
      "Ladder and access",
      "Solar panel mounting"
    ],
    tags: ["Roof Rack", "Awning", "LED Lighting", "Recovery", "Storage"],
    isPopular: true,
    buildTime: "1 day installation",
    difficulty: "Moderate",
    estimatedCost: {
      min: 3200,
      max: 4500
    }
  }
];

// Complete Fitout Gallery
export const completeFitouts: GalleryItem[] = [
  {
    id: "complete-ultimate-adventure",
    title: "Ultimate Adventure Troopy",
    description: "No-compromise complete fitout featuring Premium Kit, full kitchen, sleeping, electrical, water, and exterior systems. Ready for anything.",
    category: "Complete Fitout",
    subcategory: "Ultimate Builds",
    images: [
      "/gallery/complete-ultimate-1.jpg",
      "/gallery/complete-ultimate-2.jpg",
      "/gallery/complete-ultimate-3.jpg",
      "/gallery/complete-ultimate-4.jpg",
      "/gallery/complete-ultimate-5.jpg",
      "/gallery/complete-ultimate-6.jpg"
    ],
    featuredImage: "/gallery/complete-ultimate-featured.jpg",
    vehicle: "Toyota Troopcarrier 2022",
    kit: "Premium",
    completionDate: new Date("2024-01-15"),
    features: [
      "Premium Kit with luxury finishes",
      "Complete kitchen with induction",
      "Convertible sleeping for 2",
      "400W solar electrical system",
      "50L fresh + 40L grey water",
      "Hot water system",
      "Roof rack and awning",
      "LED lighting throughout",
      "Smart controls and monitoring"
    ],
    tags: ["Premium Kit", "Complete Build", "Solar", "Kitchen", "Sleeping", "Ultimate"],
    isFeatured: true,
    isPopular: true,
    buildTime: "5 days professional installation",
    difficulty: "Advanced",
    estimatedCost: {
      min: 25000,
      max: 32000
    }
  }
];

// All gallery items combined
export const allGalleryItems: GalleryItem[] = [
  ...storageBuilds,
  ...kitchenBuilds,
  ...sleepingBuilds,
  ...electricalBuilds,
  ...waterBuilds,
  ...exteriorBuilds,
  ...completeFitouts
];

// Helper functions
export function getGalleryByCategory(category: GalleryItem['category']): GalleryItem[] {
  return allGalleryItems.filter(item => item.category === category);
}

export function getFeaturedGalleryItems(): GalleryItem[] {
  return allGalleryItems.filter(item => item.isFeatured);
}

export function getPopularGalleryItems(): GalleryItem[] {
  return allGalleryItems.filter(item => item.isPopular);
}

export function getGalleryByKit(kit: 'Wander' | 'Roam' | 'Premium' | 'Custom'): GalleryItem[] {
  return allGalleryItems.filter(item => item.kit === kit);
}

export function getGalleryById(id: string): GalleryItem | undefined {
  return allGalleryItems.find(item => item.id === id);
}

export function getGalleryCategories(): string[] {
  return Array.from(new Set(allGalleryItems.map(item => item.category)));
}

export function getRecentGalleryItems(limit: number = 6): GalleryItem[] {
  return allGalleryItems
    .sort((a, b) => b.completionDate.getTime() - a.completionDate.getTime())
    .slice(0, limit);
}

// Normalizer function to convert product images to GalleryItem format
// Usage: const galleryItems = toGalleryItems(product?.images);
export function toGalleryItems(images: string[] | undefined): GalleryItem[] {
  if (!images || images.length === 0) {
    return [{
      id: 'placeholder',
      title: 'No Images Available',
      description: 'Images will be available soon',
      category: 'Complete Fitout',
      subcategory: 'Placeholder',
      images: ['/images/placeholder.svg'],
      featuredImage: '/images/placeholder.svg',
      vehicle: 'Toyota Troopcarrier',
      completionDate: new Date(),
      features: [],
      tags: ['Placeholder'],
      buildTime: 'TBD',
      difficulty: 'Easy',
      estimatedCost: { min: 0, max: 0 },
      isPopular: false,
      isFeatured: false
    }];
  }

  return images.map((image, index) => ({
    id: `gallery-item-${index}`,
    title: `Gallery Image ${index + 1}`,
    description: `Product image ${index + 1}`,
    category: 'Complete Fitout' as GalleryItem['category'],
    subcategory: 'Product Images',
    images: [image],
    featuredImage: image,
    vehicle: 'Toyota Troopcarrier',
    completionDate: new Date(),
    features: [],
    tags: ['Product Image'],
    buildTime: 'N/A',
    difficulty: 'Easy' as GalleryItem['difficulty'],
    estimatedCost: { min: 0, max: 0 },
    isPopular: false,
    isFeatured: false
  }));
}