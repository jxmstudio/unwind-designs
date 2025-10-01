import Stripe from 'stripe';

// Validate required environment variables (allow missing for development/preview)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV === 'production') {
  console.warn('STRIPE_SECRET_KEY environment variable is not set. Payment functionality will be disabled.');
}

// Initialize Stripe with AUD as default currency (if key is available)
export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

// Default currency for Australian business
export const DEFAULT_CURRENCY = 'aud' as const;

// Helper function to create a payment intent (default to AUD for Australian business)
export async function createPaymentIntent(amount: number, currency: string = DEFAULT_CURRENCY) {
  if (!stripe) {
    return { success: false, error: 'Payment system is not configured. Please contact support.' };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return { success: true, clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return { success: false, error: 'Failed to create payment intent' };
  }
}

// Helper function to create a checkout session
export async function createCheckoutSession(
  lineItems: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        images?: string[];
      };
      unit_amount: number;
    };
    quantity: number;
  }>,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) {
    return { success: false, error: 'Payment system is not configured. Please contact support.' };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    
    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, error: 'Failed to create checkout session' };
  }
}

// Helper function to retrieve a payment intent
export async function retrievePaymentIntent(paymentIntentId: string) {
  if (!stripe) {
    return { success: false, error: 'Payment system is not configured. Please contact support.' };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return { success: true, paymentIntent };
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    return { success: false, error: 'Failed to retrieve payment intent' };
  }
}

// Helper function to list products
export async function listProducts(limit: number = 10) {
  if (!stripe) {
    return { success: false, error: 'Payment system is not configured. Please contact support.' };
  }

  try {
    const products = await stripe.products.list({
      limit,
      active: true,
    });
    
    return { success: true, products: products.data };
  } catch (error) {
    console.error('Error listing products:', error);
    return { success: false, error: 'Failed to list products' };
  }
}

// Helper function to create a customer
export async function createCustomer(email: string, name?: string) {
  if (!stripe) {
    return { success: false, error: 'Payment system is not configured. Please contact support.' };
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    
    return { success: true, customer };
  } catch (error) {
    console.error('Error creating customer:', error);
    return { success: false, error: 'Failed to create customer' };
  }
}
