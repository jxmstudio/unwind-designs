import { NextRequest, NextResponse } from 'next/server';
import { stripe, DEFAULT_CURRENCY } from '@/lib/stripe';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Validation schema for payment intent request
const PaymentIntentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters').optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export async function POST(request: NextRequest) {
  // Early environment checks
  if (!stripe) {
    return NextResponse.json(
      { error: 'Payment system is not configured. Please contact support.' },
      { status: 503 }
    );
  }

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_SITE_URL environment variable is required' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = PaymentIntentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const { amount, currency = DEFAULT_CURRENCY, metadata } = validationResult.data;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        source: 'unwind-designs-website',
        ...metadata,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      currency,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.warn('Error creating payment intent:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
