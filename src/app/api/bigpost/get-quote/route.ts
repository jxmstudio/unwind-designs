// BigPost Get Quote API Route
// Validates request and calls BigPost API

import { NextRequest, NextResponse } from 'next/server';
import { getQuoteRequestSchema } from '@/lib/validation/bigpost';
import { bigPostAPI, handleBigPostError } from '@/lib/bigpost';

export async function POST(request: NextRequest) {
  try {
    // Check if BigPost API key is configured
    if (!process.env.BIGPOST_API_KEY && !process.env.BIG_POST_API_KEY) {
      // Return fallback shipping rates
      return NextResponse.json({
        success: true,
        quotes: [
          {
            ServiceCode: 'STANDARD',
            ServiceName: 'Standard Shipping',
            Price: 25.00,
            EstimatedDeliveryDays: 3,
            CarrierId: 1,
            CarrierName: 'Australia Post',
            Description: 'Standard delivery within 3-5 business days'
          },
          {
            ServiceCode: 'EXPRESS',
            ServiceName: 'Express Shipping',
            Price: 45.00,
            EstimatedDeliveryDays: 1,
            CarrierId: 1,
            CarrierName: 'Australia Post',
            Description: 'Express delivery within 1-2 business days'
          }
        ],
        fallback: true
      });
    }

    // Parse and validate request body
    const body = await request.json();
    console.log('Received quote request:', JSON.stringify(body, null, 2));
    
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
    
    if (!response.Success) {
      return NextResponse.json(
        {
          success: false,
          error: response.ErrorMessage || 'Failed to get quotes',
          requestId: response.RequestId
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      quotes: response.Quotes || [],
      requestId: response.RequestId
    });

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
