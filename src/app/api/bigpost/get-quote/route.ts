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
    // Debug: Log environment variables (commented out for production)
    // console.log('Environment check:');
    // console.log('BIGPOST_API_KEY:', process.env.BIGPOST_API_KEY ? 'SET' : 'NOT SET');
    // console.log('BIG_POST_API_KEY:', process.env.BIG_POST_API_KEY ? 'SET' : 'NOT SET');
    // console.log('BIG_POST_API_TOKEN:', process.env.BIG_POST_API_TOKEN ? 'SET' : 'NOT SET');
    
    // Parse request body first
    const body = await request.json();
    console.log('Received quote request:', JSON.stringify(body, null, 2));
    
    // Check if BigPost API key is configured
    const apiKey = process.env.BIGPOST_API_KEY || process.env.BIG_POST_API_KEY || process.env.BIG_POST_API_TOKEN;
    if (!apiKey || apiKey === 'disabled' || apiKey === 'your_bigpost_api_token_here') {
      // Use fallback system - no validation needed
      const quotes = calculateFallbackShippingRates(body);
      
      return NextResponse.json({
        success: true,
        quotes,
        fallback: true
      });
    }

    // Validate request body for BigPost API
    const validationResult = getQuoteRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.issues);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          validationErrors: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 422 }
      );
    }

    const validatedRequest = validationResult.data;
    
    // Call BigPost API
    const response = await bigPostAPI.getQuote(validatedRequest);
    
    console.log('BigPost API response:', JSON.stringify(response, null, 2));
    console.log('Response.Success:', response.Success);
    console.log('Response.Quotes:', response.Quotes);
    console.log('Quotes length:', response.Quotes?.length || 0);
    
    if (!response.Success) {
      console.error('BigPost API returned error:', response.ErrorMessage);
      // Use fallback on API error
      const fallbackQuotes = calculateFallbackShippingRates(body);
      return NextResponse.json({
        success: true,
        quotes: fallbackQuotes,
        fallback: true,
        apiError: response.ErrorMessage
      });
    }

    // If API succeeded but returned no quotes, use fallback
    if (!response.Quotes || response.Quotes.length === 0) {
      console.log('BigPost API returned no quotes, using fallback');
      const fallbackQuotes = calculateFallbackShippingRates(body);
      
      const fallbackResponse = {
        success: true,
        quotes: fallbackQuotes,
        fallback: true,
        requestId: response.RequestId
      };
      
      console.log('Sending fallback response:', JSON.stringify(fallbackResponse, null, 2));
      return NextResponse.json(fallbackResponse);
    }

    const quotesResponse = {
      success: true,
      quotes: response.Quotes,
      requestId: response.RequestId,
      fallback: false
    };
    
    console.log('Sending response:', JSON.stringify(quotesResponse, null, 2));

    return NextResponse.json(quotesResponse);

  } catch (error) {
    console.error('Get quote API error:', error);
    
    const { statusCode, message, validationErrors } = handleBigPostError(error);
    
    return NextResponse.json(
      {
        success: false,
        error: message,
        ...(validationErrors && { validationErrors })
      },
      { status: statusCode }
    );
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
