import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { orderService } from '@/lib/orders';
import { emailService } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    if (!webhookSecret) {
      console.error('No webhook secret configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('Webhook event received:', event.type);

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          shipping: paymentIntent.shipping,
        });
        
        // Create order record for fulfillment
        if (paymentIntent.shipping) {
          try {
            const order = orderService.createOrder({
              customerEmail: 'customer@example.com', // You'll get this from checkout session
              customerName: paymentIntent.shipping.name || 'Customer',
              shippingAddress: {
                name: paymentIntent.shipping.name || 'Customer',
                line1: paymentIntent.shipping.address.line1,
                line2: paymentIntent.shipping.address.line2 || undefined,
                city: paymentIntent.shipping.address.city,
                state: paymentIntent.shipping.address.state,
                postal_code: paymentIntent.shipping.address.postal_code,
                country: paymentIntent.shipping.address.country,
              },
              items: [], // You'll populate this from checkout session metadata
              shipping: {
                method: 'Standard Shipping', // You'll get this from checkout session
                cost: 0, // You'll calculate this
              },
              payment: {
                amount: paymentIntent.amount / 100, // Convert from cents
                currency: paymentIntent.currency,
                stripePaymentIntentId: paymentIntent.id,
                status: 'paid',
              },
            });
            
            console.log('📦 Order created for fulfillment:', order.id);
          } catch (error) {
            console.error('Failed to create order:', error);
          }
        }
        
        break;
        
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', {
          id: session.id,
          paymentStatus: session.payment_status,
          customerEmail: session.customer_email,
        });
        
        // Create order record with full checkout session data
        if (session.payment_status === 'paid' && session.customer_details) {
          try {
            const items = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
            const shippingCost = session.metadata?.shippingCost ? parseFloat(session.metadata.shippingCost) : 0;
            const shippingMethod = session.metadata?.shippingMethod || 'Standard Shipping';
            
            const order = await orderService.createOrder({
              customerEmail: session.customer_details.email || 'unknown@example.com',
              customerName: session.customer_details.name || 'Customer',
              shippingAddress: {
                name: session.shipping_details?.name || session.customer_details.name || 'Customer',
                line1: session.shipping_details?.address?.line1 || '',
                line2: session.shipping_details?.address?.line2 || undefined,
                city: session.shipping_details?.address?.city || '',
                state: session.shipping_details?.address?.state || '',
                postal_code: session.shipping_details?.address?.postal_code || '',
                country: session.shipping_details?.address?.country || 'AU',
              },
              items: items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price / 100, // Convert from cents
                quantity: item.quantity,
                image: item.images?.[0],
              })),
              shipping: {
                method: shippingMethod,
                cost: shippingCost / 100, // Convert from cents
              },
              payment: {
                amount: (session.amount_total || 0) / 100, // Convert from cents
                currency: session.currency || 'aud',
                stripePaymentIntentId: session.payment_intent as string,
                stripeSessionId: session.id,
                status: 'paid',
              },
            });
            
            console.log('📦 Order created from checkout session:', order.id);
            
            // Send confirmation email
            const emailSent = await emailService.sendOrderConfirmation({
              orderId: order.id,
              customerName: order.customerName,
              customerEmail: order.customerEmail,
              items: order.items,
              subtotal: order.payment.amount - order.shipping.cost,
              shipping: order.shipping,
              total: order.payment.amount,
              shippingAddress: order.shippingAddress,
            });
            
            if (emailSent) {
              console.log('✅ Confirmation email sent to:', order.customerEmail);
            } else {
              console.warn('⚠️ Failed to send confirmation email');
            }
          } catch (error) {
            console.error('Failed to create order from checkout session:', error);
          }
        }
        
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
