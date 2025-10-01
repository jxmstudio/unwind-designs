// Server-side API route for Big Post shipping quotes
// This route handles shipping calculations with proper error handling and feature flagging

import { NextRequest, NextResponse } from 'next/server';
import { bigPostAPI } from '@/lib/bigpost';
import { getFeatureFlag } from '@/lib/server-feature-flags';
import { shippingCalculator, ShippingAddress, PackageDetails } from '@/lib/shipping';
import { JobType, ItemType, StateCode } from '@/types/bigpost';
import { validateBigPostFormData, formatForBigPostAPI } from '@/lib/bigpost-validation';
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

    console.log('Shipping quote request:', { deliveryAddress, items, totalValue });

    // Check if Big Post integration is enabled
    const bigPostEnabled = getFeatureFlag('FEATURE_BIG_POST_SHIPPING');
    const hasApiKey = !!(process.env.BIGPOST_API_KEY || process.env.BIG_POST_API_KEY || process.env.BIG_POST_API_TOKEN);
    
    console.log('BigPost Debug Info:', {
      bigPostEnabled,
      hasApiKey,
      apiKeyLength: (process.env.BIGPOST_API_KEY || process.env.BIG_POST_API_KEY || process.env.BIG_POST_API_TOKEN || '').length,
      featureFlag: process.env.NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING,
      allEnvVars: {
        BIGPOST_API_KEY: process.env.BIGPOST_API_KEY ? 'SET' : 'NOT_SET',
        BIG_POST_API_KEY: process.env.BIG_POST_API_KEY ? 'SET' : 'NOT_SET',
        BIG_POST_API_TOKEN: process.env.BIG_POST_API_TOKEN ? 'SET' : 'NOT_SET',
        NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING: process.env.NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING
      }
    });
    
    if (bigPostEnabled && hasApiKey) {
      try {
        // Validate and format data for BigPost API
        const formData = {
          street: deliveryAddress.street,
          city: deliveryAddress.city, // This is actually the suburb from BigPost
          state: deliveryAddress.state,
          postcode: deliveryAddress.postcode,
          country: deliveryAddress.country,
          items: items.map(item => ({
            name: item.name,
            weight: item.weight || 1,
            dimensions: {
              length: item.dimensions?.length || 30,
              width: item.dimensions?.width || 20,
              height: item.dimensions?.height || 10
            },
            quantity: item.quantity
          }))
        };

        const validation = validateBigPostFormData(formData);
        
        if (!validation.isValid) {
          console.error('BigPost form validation failed:', validation.errors);
          return NextResponse.json({
            success: false,
            error: 'Invalid form data',
            details: validation.errors,
            fallbackUsed: true
          }, { status: 400 });
        }

        // Format for BigPost API
        const bigPostRequest = formatForBigPostAPI(validation.normalizedData);

        console.log('BigPost API request:', bigPostRequest);

        // Call BigPost API
        console.log('Calling BigPost API...');
        const response = await bigPostAPI.getQuote(bigPostRequest);
        console.log('BigPost API response:', response);
        
        if (response.Success && response.Quotes && response.Quotes.length > 0) {
          // Transform BigPost quotes to our format
          const quotes = response.Quotes.map(quote => ({
            service: quote.ServiceName || 'Standard Shipping',
            price: quote.Price || 0,
            deliveryDays: quote.EstimatedDeliveryDays || 3,
            description: quote.Description || 'BigPost delivery',
            carrier: quote.CarrierName || 'BigPost',
            restrictions: quote.Restrictions || [],
            source: 'bigpost' as const,
            // Store additional BigPost data for booking
            carrierId: quote.CarrierId,
            serviceCode: quote.ServiceCode,
            authorityToLeave: quote.AuthorityToLeave || false,
            originalQuote: quote // Store full quote for booking
          }));

          console.log('BigPost quotes received:', quotes);

          return NextResponse.json({
            success: true,
            quotes,
            fallbackUsed: false,
          });
        } else {
          console.warn('BigPost API returned no quotes:', response.ErrorMessage);
          console.log('Falling back to local calculator due to no quotes');
          // Fall through to fallback
        }
      } catch (error) {
        console.error('BigPost API error:', error);
        console.log('Falling back to local calculator due to API error');
        // Fall through to fallback
      }
    } else {
      console.log('BigPost not enabled or no API key - using fallback');
    }

      // Fallback to local shipping calculator
      console.log('Using fallback shipping calculator');
      const fallbackQuotes = calculateFallbackShipping(deliveryAddress, items, totalValue);
      console.log('Fallback quotes generated:', fallbackQuotes);

      // Ensure we always return quotes
      const finalQuotes = fallbackQuotes.length > 0 ? fallbackQuotes : [
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

      console.log('Final quotes being returned:', finalQuotes);

      return NextResponse.json({
        success: true,
        quotes: finalQuotes,
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
    console.log('Calculating fallback shipping for:', { packageDetails, deliveryAddress });
    
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

    console.log('Fallback rates calculated:', { standardRates, expressRates });

    // Combine and format rates
    const allRates = [...standardRates, ...expressRates];
    
    // If no rates from calculator, provide basic fallback
    if (allRates.length === 0) {
      console.log('No rates from calculator, using emergency fallback');
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
