// Server-side API route for Big Post shipping quotes
// This route handles shipping calculations with proper error handling and feature flagging

import { NextRequest, NextResponse } from 'next/server';
import { bigPostClient, convertShippingAddressToBigPost, BigPostAddress } from '@/lib/bigpost-shipping';
import { getFeatureFlag } from '@/lib/server-feature-flags';
import { shippingCalculator, ShippingAddress, PackageDetails } from '@/lib/shipping';
import { z } from 'zod';

// Validation schema for shipping quote request
const ShippingQuoteRequestSchema = z.object({
  deliveryAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postcode: z.string().min(1, 'Postcode is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    weight: z.number().positive().optional(),
    dimensions: z.object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    }).optional(),
    shipClass: z.enum(['standard', 'oversized', 'freight']).optional(),
    price: z.number().positive(),
  })).min(1, 'At least one item is required'),
  totalValue: z.number().positive(),
});

type ShippingQuoteRequest = z.infer<typeof ShippingQuoteRequestSchema>;

interface ShippingQuoteResponse {
  success: boolean;
  quotes?: Array<{
    service: string;
    price: number;
    deliveryDays: number;
    description: string;
    carrier?: string;
    restrictions?: string[];
    source: 'bigpost' | 'fallback';
  }>;
  error?: string;
  fallbackUsed?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = ShippingQuoteRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: validationResult.error.issues,
      }, { status: 400 });
    }

    const { deliveryAddress, items, totalValue } = validationResult.data;

    // Check if Big Post integration is enabled
    const bigPostEnabled = getFeatureFlag('FEATURE_BIG_POST_SHIPPING');
    
    if (bigPostEnabled && process.env.BIG_POST_API_TOKEN) {
      try {
        // Try Big Post API first
        const bigPostAddress = convertShippingAddressToBigPost(deliveryAddress);
        const result = await bigPostClient.getQuotesForCart(bigPostAddress, items, totalValue);
        
        if (result.success && result.quotes && result.quotes.length > 0) {
          const quotes = result.quotes.map(quote => ({
            service: quote.service_name,
            price: quote.total_price,
            deliveryDays: quote.estimated_delivery_days,
            description: quote.description,
            carrier: quote.carrier,
            restrictions: quote.restrictions,
            source: 'bigpost' as const,
          }));

          return NextResponse.json({
            success: true,
            quotes,
            fallbackUsed: false,
          });
        } else {
          console.warn('Big Post API returned no quotes:', result.error);
          // Fall through to fallback
        }
      } catch (error) {
        console.error('Big Post API error:', error);
        // Fall through to fallback
      }
    }

    // Fallback to local shipping calculator
    const fallbackQuotes = calculateFallbackShipping(deliveryAddress, items, totalValue);
    
    return NextResponse.json({
      success: true,
      quotes: fallbackQuotes,
      fallbackUsed: true,
    });

  } catch (error) {
    console.error('Shipping quote API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error occurred while calculating shipping',
    }, { status: 500 });
  }
}

/**
 * Fallback shipping calculation using local calculator
 */
function calculateFallbackShipping(
  deliveryAddress: ShippingAddress,
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    weight?: number;
    dimensions?: { length: number; width: number; height: number };
    price: number;
  }>,
  totalValue: number
) {
  try {
    // Calculate total package details
    const totalWeight = items.reduce((sum, item) => 
      sum + (item.weight || 1) * item.quantity, 0
    );
    
    // Use largest dimensions from items
    const maxLength = Math.max(...items.map(item => item.dimensions?.length || 30));
    const maxWidth = Math.max(...items.map(item => item.dimensions?.width || 20));
    const totalHeight = items.reduce((sum, item) => 
      sum + (item.dimensions?.height || 10) * item.quantity, 0
    );

    const packageDetails: PackageDetails = {
      weight: totalWeight,
      length: maxLength,
      width: maxWidth,
      height: Math.min(totalHeight, 200), // Cap height at 200cm
      value: totalValue,
    };

    // Get standard and express rates
    const standardRates = shippingCalculator.calculateShipping(
      packageDetails,
      deliveryAddress,
      'standard'
    );
    
    const expressRates = shippingCalculator.calculateShipping(
      packageDetails,
      deliveryAddress,
      'express'
    );

    // Combine and format rates
    const allRates = [...standardRates, ...expressRates];
    
    return allRates.map(rate => ({
      service: rate.service,
      price: rate.price,
      deliveryDays: rate.deliveryDays,
      description: rate.description,
      restrictions: rate.restrictions,
      source: 'fallback' as const,
    }));

  } catch (error) {
    console.error('Fallback shipping calculation error:', error);
    
    // Emergency fallback - basic flat rates
    return [
      {
        service: 'Standard Shipping',
        price: 25.00,
        deliveryDays: 5,
        description: 'Standard delivery (estimated)',
        source: 'fallback' as const,
      },
      {
        service: 'Express Shipping',
        price: 45.00,
        deliveryDays: 2,
        description: 'Express delivery (estimated)',
        source: 'fallback' as const,
      }
    ];
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to get shipping quotes.',
  }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to get shipping quotes.',
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to get shipping quotes.',
  }, { status: 405 });
}
