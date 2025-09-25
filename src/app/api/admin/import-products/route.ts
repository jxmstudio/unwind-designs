// API Route for importing scraped products
// POST /api/admin/import-products

import { NextRequest, NextResponse } from 'next/server';
import { generateProductsFromScrapedData } from '@/lib/product-generator';
import { z } from 'zod';

const ScrapedProductSchema = z.object({
  name: z.string().min(1),
  price: z.string(),
  image: z.string().url().optional(),
  description: z.string().optional(),
  url: z.string().url(),
  category: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  materials: z.array(z.string()).optional()
});

const ImportRequestSchema = z.object({
  products: z.array(ScrapedProductSchema),
  sourceUrl: z.string().url(),
  overwrite: z.boolean().default(false)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products, sourceUrl, overwrite } = ImportRequestSchema.parse(body);

    console.log(`Importing ${products.length} products from ${sourceUrl}`);

    // Generate product data
    const generatedProducts = generateProductsFromScrapedData(products);

    // Here you would typically save to your database
    // For now, we'll just return the generated products
    const results = generatedProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      slug: product.slug,
      status: 'generated'
    }));

    return NextResponse.json({
      success: true,
      message: `Successfully generated ${results.length} products`,
      products: results,
      sourceUrl
    });

  } catch (error) {
    console.error('Product import error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to import products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to check import status
export async function GET() {
  return NextResponse.json({
    message: 'Product import API ready',
    endpoints: {
      import: 'POST /api/admin/import-products',
      status: 'GET /api/admin/import-products'
    }
  });
}
