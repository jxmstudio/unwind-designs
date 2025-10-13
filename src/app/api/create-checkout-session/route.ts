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
  shippingCost: z.number().min(0).optional(),
  shippingMethod: z.string().optional(),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  // Early environment checks
  console.log('Stripe instance:', !!stripe);
  console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
  
  if (!stripe) {
    console.error('Stripe is not initialized. Check STRIPE_SECRET_KEY environment variable.');
    return NextResponse.json(
      { error: 'Payment system is not configured. Please contact support.' },
      { status: 503 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unwind-designs.vercel.app';

  try {
    const body = await request.json();
    
    console.log('Checkout session request body:', JSON.stringify(body, null, 2));
    
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

    const { items, customerEmail, successUrl, cancelUrl, shippingCost, shippingMethod, shippingAddress } = validationResult.data;

    // Convert cart items to Stripe line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: DEFAULT_CURRENCY,
        product_data: {
          name: item.name,
          description: item.shortDescription || item.name || 'Product from Unwind Designs',
          images: item.images?.map(img => {
            // Convert relative URLs to absolute URLs
            if (img.startsWith('/')) {
              return `${siteUrl}${img}`;
            }
            return img;
          }).slice(0, 1) || [], // Stripe allows up to 8 images, but we'll use 1
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if provided
    if (shippingCost && shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: DEFAULT_CURRENCY,
          product_data: {
            name: shippingMethod || 'Shipping',
            description: 'Shipping cost',
            images: [], // Add empty images array
          },
          unit_amount: Math.round(shippingCost * 100), // Convert to cents
        },
        quantity: 1,
      });
    }

    // Prepare shipping options based on whether we have a pre-calculated address
    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: successUrl || `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${siteUrl}/checkout/cancelled`,
      metadata: {
        source: 'unwind-designs-website',
        items: JSON.stringify(items.map(item => ({
          ...item,
          price: Math.round(item.price * 100), // Store price in cents
        }))),
        shippingCost: Math.round((shippingCost || 0) * 100).toString(), // Store in cents
        shippingMethod: shippingMethod || 'Standard Shipping',
      },
      billing_address_collection: 'required',
    };

    // If shipping address provided from cart, store it and use it for validation
    if (shippingAddress) {
      // Store the calculated shipping address in metadata for validation
      sessionConfig.metadata.calculatedShippingAddress = JSON.stringify(shippingAddress);
      sessionConfig.metadata.shippingAddressLocked = 'true';
      
      // Still collect shipping address for delivery, but we'll validate it matches
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['AU'],
      };
      
      console.log('⚠️ Shipping calculated for:', shippingAddress);
      console.log('   Stripe will collect address - webhook will validate it matches');
    } else {
      // No pre-calculated address, collect it normally
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['AU'],
      };
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('=== ERROR CREATING CHECKOUT SESSION ===');
    console.error('Error:', error);
    console.error('Error message:', errorMessage);
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error stack:', error instanceof Error ? error.stack : undefined);
    console.error('Request body that caused error:', body);
    console.error('==========================================');
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: errorMessage,
        type: error instanceof Error ? error.constructor.name : typeof error,
        message: 'Check server logs for details'
      },
      { status: 500 }
    );
  }
}
