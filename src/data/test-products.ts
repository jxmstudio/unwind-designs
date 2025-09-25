// Test products for development and testing
// These are simple, low-cost products for testing the purchase flow

export interface TestProduct {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  slug: string;
  sku: string;
}

export const testProducts: TestProduct[] = [
  {
    id: 'test-product-1',
    name: 'Test Product - $1',
    description: 'A simple test product for development and testing purposes. This product is designed to make testing the purchase flow easy and affordable.',
    shortDescription: 'Simple test product for development',
    price: 1.00,
    images: ['/images/placeholder.svg'],
    category: 'Test',
    inStock: true,
    stockQuantity: 100,
    slug: 'test-product-1',
    sku: 'TEST-001'
  },
  {
    id: 'test-product-5',
    name: 'Test Product - $5',
    description: 'Another test product with a slightly higher price for testing different price points.',
    shortDescription: 'Test product for $5 testing',
    price: 5.00,
    images: ['/images/placeholder.svg'],
    category: 'Test',
    inStock: true,
    stockQuantity: 50,
    slug: 'test-product-5',
    sku: 'TEST-005'
  }
];

export function getTestProductBySlug(slug: string): TestProduct | undefined {
  return testProducts.find(product => product.slug === slug);
}

export function getTestProductById(id: string): TestProduct | undefined {
  return testProducts.find(product => product.id === id);
}
