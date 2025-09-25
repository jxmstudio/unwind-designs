import { allProducts, Product as DataProduct } from '@/data/products';
import { FlatPackProduct, UpsellProduct, ComponentProduct, TestProduct } from '@/data/products';

// Normalized Product type for consistent usage across the app
export type Product = {
  id: string;
  slug: string;              // unique
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  images: string[];
  sku?: string;
  inventory?: number;        // optional
  comingSoon?: boolean;      // optional - treat as NOT purchasable
  active?: boolean;          // optional - treat false as hidden
  category?: string;
  subcategory?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  stockQuantity?: number;
  tags?: string[];
  specifications?: Record<string, string>;
  features?: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  warranty?: string;
  installationRequired?: boolean;
  shipClass?: 'standard' | 'oversized' | 'freight';
  upsells?: string[];
  videoUrl?: string;
  originalPrice?: number;
  isOnSale?: boolean;
  salePercentage?: number;
  badges?: string[];
  // Additional fields for specific product types
  kitType?: 'Wander' | 'Roam' | 'Premium';
  fridgeType?: 'Chest Fridge' | 'Upright Fridge';
  finish?: string;
  assemblyTime?: string;
  isTroopyPack?: boolean;
  troopyPackSlug?: string;
  isPopular?: boolean;
  compatibility?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
};

// Convert any product type to normalized Product
function normalizeProduct(product: DataProduct): Product {
  const baseProduct: Product = {
    id: product.id,
    slug: 'slug' in product ? product.slug : ensureSlug(product.name),
    name: product.name,
    description: 'description' in product ? product.description : undefined,
    shortDescription: 'shortDescription' in product ? product.shortDescription : undefined,
    price: product.price,
    images: product.images || [],
    sku: 'sku' in product ? product.sku : undefined,
    inventory: 'stockQuantity' in product ? product.stockQuantity : undefined,
    comingSoon: 'comingSoon' in product ? product.comingSoon : false,
    active: 'inStock' in product ? product.inStock : true,
    category: 'category' in product ? product.category : undefined,
    subcategory: 'subcategory' in product ? product.subcategory : undefined,
    rating: 'rating' in product ? product.rating : undefined,
    reviewCount: 'reviewCount' in product ? product.reviewCount : undefined,
    inStock: 'inStock' in product ? product.inStock : true,
    stockQuantity: 'stockQuantity' in product ? product.stockQuantity : undefined,
    tags: 'tags' in product ? (product.tags || []) : [],
    specifications: 'specifications' in product ? product.specifications : {},
    features: 'features' in product ? (product.features || []) : [],
    weight: 'weight' in product ? product.weight : undefined,
    dimensions: 'dimensions' in product ? product.dimensions : undefined,
    warranty: 'warranty' in product ? product.warranty : undefined,
    installationRequired: 'installationRequired' in product ? product.installationRequired : false,
    shipClass: 'shipClass' in product ? product.shipClass : undefined,
    upsells: 'upsells' in product ? (product.upsells || []) : [],
    videoUrl: 'videoUrl' in product ? product.videoUrl : undefined,
    originalPrice: 'originalPrice' in product ? product.originalPrice : undefined,
    isOnSale: 'isOnSale' in product ? product.isOnSale : false,
    salePercentage: 'salePercentage' in product ? product.salePercentage : undefined,
    badges: 'badges' in product ? (product.badges || []) : [],
    createdAt: 'createdAt' in product ? product.createdAt : undefined,
    updatedAt: 'updatedAt' in product ? product.updatedAt : undefined,
  };

  // Add type-specific fields
  if ('kitType' in product) {
    baseProduct.kitType = product.kitType;
  }
  if ('fridgeType' in product) {
    baseProduct.fridgeType = product.fridgeType;
  }
  if ('finish' in product) {
    baseProduct.finish = product.finish;
  }
  if ('assemblyTime' in product) {
    baseProduct.assemblyTime = product.assemblyTime;
  }
  if ('isTroopyPack' in product) {
    baseProduct.isTroopyPack = product.isTroopyPack;
  }
  if ('troopyPackSlug' in product) {
    baseProduct.troopyPackSlug = product.troopyPackSlug;
  }
  if ('isPopular' in product) {
    baseProduct.isPopular = product.isPopular;
  }
  if ('compatibility' in product) {
    baseProduct.compatibility = product.compatibility;
  }

  return baseProduct;
}

// Generate URL-safe slug from product name
export function ensureSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Get all products as normalized Product array
export function listAllProducts(): Product[] {
  return allProducts
    .map(normalizeProduct)
    .filter(product => product.active !== false); // Filter out inactive products
}

// Get product by slug
export function getProductBySlug(slug: string): Product | null {
  const product = allProducts.find(p => {
    if ('slug' in p) {
      return p.slug === slug;
    }
    return ensureSlug(p.name) === slug;
  });
  
  if (!product) return null;
  
  const normalized = normalizeProduct(product);
  return normalized.active === false ? null : normalized;
}

// Get product by ID
export function getProductById(id: string): Product | null {
  const product = allProducts.find(p => p.id === id);
  
  if (!product) return null;
  
  const normalized = normalizeProduct(product);
  return normalized.active === false ? null : normalized;
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return listAllProducts().filter(product => 
    product.category?.toLowerCase() === category.toLowerCase()
  );
}

// Get purchasable products (not coming soon)
export function getPurchasableProducts(): Product[] {
  return listAllProducts().filter(product => !product.comingSoon);
}

// Get coming soon products
export function getComingSoonProducts(): Product[] {
  return listAllProducts().filter(product => product.comingSoon === true);
}

// Search products by name or description
export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.toLowerCase();
  return listAllProducts().filter(product => 
    product.name.toLowerCase().includes(normalizedQuery) ||
    product.description?.toLowerCase().includes(normalizedQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );
}

// Get related products (by category or tags)
export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  const related: Product[] = [];
  
  // Add products from same category
  if (product.category) {
    const categoryProducts = getProductsByCategory(product.category)
      .filter(p => p.id !== product.id);
    related.push(...categoryProducts);
  }
  
  // Add products with similar tags
  if (product.tags && product.tags.length > 0) {
    const tagProducts = listAllProducts()
      .filter(p => p.id !== product.id && 
        p.tags && p.tags.some(tag => product.tags?.includes(tag)))
      .filter(p => !related.some(r => r.id === p.id));
    related.push(...tagProducts);
  }
  
  return related.slice(0, limit);
}

// Format price for display
export function formatPrice(price: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

// Check if product is purchasable
export function isProductPurchasable(product: Product): boolean {
  return !product.comingSoon && 
         product.active !== false && 
         (product.inventory === undefined || product.inventory > 0);
}

// Get product availability status
export function getProductAvailabilityStatus(product: Product): string {
  if (product.comingSoon) return 'Coming Soon';
  if (product.active === false) return 'Unavailable';
  if (product.inventory !== undefined && product.inventory <= 0) return 'Out of Stock';
  if (product.inventory !== undefined && product.inventory < 5) return 'Low Stock';
  return 'In Stock';
}

// Get only flat pack products
export function getFlatPackProducts(): Product[] {
  return allProducts
    .filter(product => product.isTroopyPack === true)
    .map(normalizeProduct)
    .filter(product => product.active !== false);
}

// Get non-flat pack products (accessories, components, etc.)
export function getNonFlatPackProducts(): Product[] {
  return allProducts
    .filter(product => product.isTroopyPack !== true)
    .map(normalizeProduct)
    .filter(product => product.active !== false);
}

// Get purchasable flat packs (not coming soon)
export function getPurchasableFlatPacks(): Product[] {
  return getFlatPackProducts()
    .filter(product => !product.comingSoon && product.inStock !== false);
}

// Get coming soon flat packs
export function getComingSoonFlatPacks(): Product[] {
  return getFlatPackProducts()
    .filter(product => product.comingSoon === true);
}