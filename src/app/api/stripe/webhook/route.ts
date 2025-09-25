import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createOrder } from '@/lib/db/orders';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function GET() {
  return NextResponse.json({ 
    message: 'Stripe webhook endpoint is working',
    timestamp: new Date().toISOString(),
    method: 'GET',
    stripeConfigured: !!stripe,
    webhookSecretConfigured: !!webhookSecret
  });
}

export async function POST(request: NextRequest) {
  console.log('Webhook received:', new Date().toISOString());
  
  // Basic validation first
  if (!stripe) {
    console.error('Stripe not configured');
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  if (!webhookSecret) {
    console.error('Stripe webhook secret not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('Webhook event verified:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log('Processing checkout session completed:', session.id);
          await handleCheckoutSessionCompleted(session);
          break;
        }
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          console.log('Payment succeeded:', paymentIntent.id);
          await handlePaymentIntentSucceeded(paymentIntent);
          break;
        }
        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          console.log('Payment failed:', paymentIntent.id);
          await handlePaymentIntentFailed(paymentIntent);
          break;
        }
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Webhook handler error:', error);
      return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing checkout session completed:', session.id);

    // Retrieve the full session with line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'payment_intent']
    });

    if (!fullSession.line_items?.data) {
      console.log('No line items found in session');
      return;
    }

    // Extract order data from session
    const lineItems = fullSession.line_items.data;
    const items = lineItems
      .filter(item => !item.description?.includes('Shipping')) // Filter out shipping
      .map(item => ({
        product_id: item.price?.product as string || `product_${Date.now()}`,
        product_name: item.description || 'Unknown Product',
        product_handle: `product-${item.price?.product || 'unknown'}`,
        quantity: item.quantity || 1,
        price: (item.amount_total || 0) / 100, // Convert from cents
      }));

    // Find shipping cost
    const shippingItem = lineItems.find(item => item.description?.includes('Shipping'));
    const shippingCost = shippingItem ? (shippingItem.amount_total || 0) / 100 : 0;

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;
    const tax = 0; // No tax for now

    console.log('Order data:', {
      email: session.customer_email || session.customer_details?.email,
      items: items.length,
      subtotal,
      shipping: shippingCost,
      total
    });

    // Create order in database
    const orderData = {
      userId: null, // No user system yet
      email: session.customer_email || session.customer_details?.email || '',
      addresses: {
        billing: session.customer_details?.address || {},
        shipping: session.shipping_details?.address || {},
      },
      totals: {
        subtotal,
        shipping: shippingCost,
        tax,
        total,
      },
      items,
      stripePaymentIntentId: typeof fullSession.payment_intent === 'string' 
        ? fullSession.payment_intent 
        : fullSession.payment_intent?.id,
    };

    const { orderId } = await createOrder(orderData);
    console.log('Order created successfully:', orderId);

    // TODO: Send confirmation email
    // TODO: Create BigPost shipment if shipping method is from BigPost

  } catch (error) {
    console.error('Error handling checkout session completed:', error);
    throw error;
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment succeeded:', paymentIntent.id);
    
    // Update order status to confirmed
    // This would typically update the order in the database
    // For now, we'll just log it
    
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
    throw error;
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment failed:', paymentIntent.id);
    
    // Update order status to failed
    // This would typically update the order in the database
    
  } catch (error) {
    console.error('Error handling payment intent failed:', error);
    throw error;
  }
}