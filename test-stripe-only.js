#!/usr/bin/env node

/**
 * Test Stripe checkout session creation only
 */

const fetch = require('node-fetch');

async function testStripeOnly() {
  console.log('💳 Testing Stripe Checkout Session Creation...');
  console.log('');

  const stripeData = {
    items: [{
      id: "test-product",
      name: "Test Flat Pack Kit",
      quantity: 1,
      price: 450, // $450 in dollars
      shortDescription: "Test product for integration testing",
      images: ["/images/placeholder.svg"]
    }],
    customerEmail: "test@example.com"
  };

  try {
    console.log('📦 Sending Stripe request...');
    console.log('Request data:', JSON.stringify(stripeData, null, 2));
    console.log('');

    const response = await fetch('http://localhost:3001/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stripeData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (response.ok) {
      console.log('✅ Stripe checkout session created successfully!');
      try {
        const result = JSON.parse(responseText);
        console.log('Session ID:', result.sessionId);
        console.log('Checkout URL:', result.url);
      } catch (e) {
        console.log('Response is not JSON, but request succeeded');
      }
    } else {
      console.log('❌ Stripe checkout session creation failed');
    }

  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }

  console.log('');
  console.log('🏁 Stripe test completed');
}

testStripeOnly().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('💥 Test failed:', error);
  process.exit(1);
});
