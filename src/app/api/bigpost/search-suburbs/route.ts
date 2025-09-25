// BigPost Search Suburbs API Route
// Validates request and calls BigPost API

import { NextRequest, NextResponse } from 'next/server';
import { suburbSearchRequestSchema } from '@/lib/validation/bigpost';
import { bigPostAPI, handleBigPostError } from '@/lib/bigpost';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const state = searchParams.get('state');
    
    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Query parameter is required'
        },
        { status: 400 }
      );
    }

    const requestData = {
      Query: query,
      ...(state && { State: state as any })
    };

    const validationResult = suburbSearchRequestSchema.safeParse(requestData);
    
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
    const response = await bigPostAPI.searchSuburbs(validatedRequest);
    
    if (!response.Success) {
      return NextResponse.json(
        {
          success: false,
          error: response.ErrorMessage || 'Failed to search suburbs'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      results: response.Results || []
    });

  } catch (error) {
    console.error('Search suburbs API error:', error);
    
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
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use GET to search suburbs.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use GET to search suburbs.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use GET to search suburbs.' },
    { status: 405 }
  );
}
