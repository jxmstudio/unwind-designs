import { NextRequest, NextResponse } from 'next/server';
import { stripe, DEFAULT_CURRENCY } from '@/lib/stripe';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Validation schema for checkout session request
const CheckoutSessionSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    shortDescription: z.string().optional(),
    images: z.array(z.string()).optional(),
  })).min(1, 'At least one item is required'),
  customerEmail: z.string().email().optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
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
    const validationResult = CheckoutSessionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const { items, customerEmail, successUrl, cancelUrl } = validationResult.data;

    // Convert cart items to Stripe line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: DEFAULT_CURRENCY,
        product_data: {
          name: item.name,
          description: item.shortDescription || '',
          images: item.images?.slice(0, 1) || [], // Stripe allows up to 8 images, but we'll use 1
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/cancelled`,
      metadata: {
        source: 'unwind-designs-website',
      },
      shipping_address_collection: {
        allowed_countries: ['AU'], // Australia only for now
      },
      billing_address_collection: 'required',
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.warn('Error creating checkout session:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
