// BigPost Get Quote API Route
// Validates request and calls BigPost API

import { NextRequest, NextResponse } from 'next/server';
import { getQuoteRequestSchema } from '@/lib/validation/bigpost';
import { bigPostAPI, handleBigPostError } from '@/lib/bigpost';

// Dynamic fallback shipping calculation
function calculateFallbackShippingRates(requestData: any) {
  const { PickupLocation, BuyerLocation, Items } = requestData;
  
  // Calculate total weight and dimensions
  const totalWeight = Items.reduce((sum: number, item: any) => sum + (item.Weight * item.Quantity), 0);
  const totalVolume = Items.reduce((sum: number, item: any) => sum + (item.Height * item.Width * item.Length * item.Quantity), 0);
  
  // Calculate distance-based pricing (simplified)
  const pickupState = PickupLocation?.Locality?.State || 'VIC';
  const deliveryState = BuyerLocation?.Locality?.State || 'NSW';
  
  // Base rates by state distance (improved for heavy items)
  const stateRates = {
    'VIC': { standard: 25, express: 45 },
    'NSW': { standard: 30, express: 55 },
    'QLD': { standard: 35, express: 65 },
    'SA': { standard: 28, express: 50 },
    'WA': { standard: 45, express: 80 },
    'TAS': { standard: 32, express: 60 },
    'NT': { standard: 40, express: 75 },
    'ACT': { standard: 30, express: 55 }
  };
  
  // Get base rates
  const pickupRates = stateRates[pickupState as keyof typeof stateRates] || stateRates.VIC;
  const deliveryRates = stateRates[deliveryState as keyof typeof stateRates] || stateRates.NSW;
  
  // Calculate distance multiplier (simplified)
  const isSameState = pickupState === deliveryState;
  const isInterstate = !isSameState;
  
  // Weight-based pricing (improved for heavy items)
  let weightMultiplier = 1;
  if (totalWeight > 5) weightMultiplier = 2;
  if (totalWeight > 10) weightMultiplier = 3;
  if (totalWeight > 20) weightMultiplier = 4;
  if (totalWeight > 50) weightMultiplier = 6;
  if (totalWeight > 100) weightMultiplier = 8;
  
  // Volume-based pricing
  let volumeMultiplier = 1;
  if (totalVolume > 50000) volumeMultiplier = 1.3; // Large items
  if (totalVolume > 100000) volumeMultiplier = 1.6;
  
  // Calculate final rates
  const baseStandard = isSameState ? pickupRates.standard : Math.max(pickupRates.standard, deliveryRates.standard);
  const baseExpress = isSameState ? pickupRates.express : Math.max(pickupRates.express, deliveryRates.express);
  
  const standardPrice = Math.round((baseStandard * weightMultiplier * volumeMultiplier) * 100) / 100;
  const expressPrice = Math.round((baseExpress * weightMultiplier * volumeMultiplier) * 100) / 100;
  
  // Delivery time estimates
  const standardDays = isSameState ? 2 : (isInterstate ? 4 : 3);
  const expressDays = isSameState ? 1 : 2;
  
  return [
    {
      ServiceCode: 'STANDARD',
      ServiceName: 'Standard Shipping',
      Price: standardPrice,
      EstimatedDeliveryDays: standardDays,
      CarrierId: 1,
      CarrierName: 'Australia Post',
      Description: `Standard delivery within ${standardDays}-${standardDays + 1} business days`
    },
    {
      ServiceCode: 'EXPRESS',
      ServiceName: 'Express Shipping', 
      Price: expressPrice,
      EstimatedDeliveryDays: expressDays,
      CarrierId: 1,
      CarrierName: 'Australia Post',
      Description: `Express delivery within ${expressDays} business day${expressDays > 1 ? 's' : ''}`
    },
    {
      ServiceCode: 'PREMIUM',
      ServiceName: 'Premium Shipping',
      Price: Math.round(expressPrice * 1.5 * 100) / 100,
      EstimatedDeliveryDays: 1,
      CarrierId: 2,
      CarrierName: 'Fastway',
      Description: 'Next business day delivery'
    }
  ];
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body first
    const body = await request.json();
    console.log('[BIGPOST API] Received quote request:', JSON.stringify(body, null, 2));
    
    // Validate request body
    const validationResult = getQuoteRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('[BIGPOST API] Validation failed:', validationResult.error.issues);
      // Return fallback on validation error
      const fallbackQuotes = calculateFallbackShippingRates(body);
      return NextResponse.json({
        success: true,
        quotes: fallbackQuotes,
        fallback: true,
        reason: 'validation_failed'
      });
    }

    const validatedRequest = validationResult.data;
    console.log('[BIGPOST API] Calling BigPost API...');
    
    // Call BigPost API
    const response = await bigPostAPI.getQuote(validatedRequest);
    
    console.log('[BIGPOST API] Response Success:', response.Success);
    console.log('[BIGPOST API] Quotes count:', response.Quotes?.length || 0);
    
    if (!response.Success) {
      console.error('[BIGPOST API] API returned error:', response.ErrorMessage);
      // Use fallback on API error
      const fallbackQuotes = calculateFallbackShippingRates(body);
      return NextResponse.json({
        success: true,
        quotes: fallbackQuotes,
        fallback: true,
        reason: 'api_error',
        apiError: response.ErrorMessage
      });
    }

    // If API succeeded but returned no quotes, use fallback
    if (!response.Quotes || response.Quotes.length === 0) {
      console.log('[BIGPOST API] No quotes returned, using fallback');
      const fallbackQuotes = calculateFallbackShippingRates(body);
      
      return NextResponse.json({
        success: true,
        quotes: fallbackQuotes,
        fallback: true,
        reason: 'no_quotes',
        requestId: response.RequestId
      });
    }

    // Success with real quotes!
    console.log('[BIGPOST API] Returning', response.Quotes.length, 'real quotes');
    return NextResponse.json({
      success: true,
      quotes: response.Quotes,
      requestId: response.RequestId,
      fallback: false
    });

  } catch (error) {
    console.error('[BIGPOST API] Error caught:', error);
    
    // On ANY error, return fallback so checkout doesn't break
    try {
      const body = await request.json();
      const fallbackQuotes = calculateFallbackShippingRates(body);
      
      return NextResponse.json({
        success: true,
        quotes: fallbackQuotes,
        fallback: true,
        reason: 'exception',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (fallbackError) {
      // Last resort - return basic shipping rate
      return NextResponse.json({
        success: true,
        quotes: [
          {
            ServiceCode: 'STANDARD',
            ServiceName: 'Standard Shipping',
            Price: 35.00,
            EstimatedDeliveryDays: 5,
            CarrierId: 1,
            CarrierName: 'Australia Post',
            Description: 'Standard delivery within 5-7 business days'
          }
        ],
        fallback: true,
        reason: 'critical_error'
      });
    }
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to get quotes.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to get quotes.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to get quotes.' },
    { status: 405 }
  );
}
