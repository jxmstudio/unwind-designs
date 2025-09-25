// BigPost Create Job API Route
// Validates request and calls BigPost API

import { NextRequest, NextResponse } from 'next/server';
import { createJobRequestSchema } from '@/lib/validation/bigpost';
import { bigPostAPI, handleBigPostError } from '@/lib/bigpost';

export async function POST(request: NextRequest) {
  try {
    // Check if BigPost API key is configured
    if (!process.env.BIGPOST_API_KEY && !process.env.BIG_POST_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'BigPost API key not configured. Please contact support.',
          fallback: true
        },
        { status: 503 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    console.log('Received create job request:', JSON.stringify(body, null, 2));
    
    const validationResult = createJobRequestSchema.safeParse(body);
    
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
    const response = await bigPostAPI.createJob(validatedRequest);
    
    if (!response.Success) {
      return NextResponse.json(
        {
          success: false,
          error: response.ErrorMessage || 'Failed to create job',
          validationErrors: response.ValidationErrors
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      jobId: response.JobId,
      carrierConsignmentNumber: response.CarrierConsignmentNumber
    });

  } catch (error) {
    console.error('Create job API error:', error);
    
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
    { success: false, error: 'Method not allowed. Use POST to create jobs.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to create jobs.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to create jobs.' },
    { status: 405 }
  );
}
