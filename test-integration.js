#!/usr/bin/env node

/**
 * Integration Test Script for Stripe & BigPost
 * Run with: node test-integration.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Test data
const testItems = [
  {
    id: 'test-item-1',
    name: 'Test Flat Pack',
    price: 299.99,
    quantity: 1,
    shortDescription: 'Test product for integration testing',
    weight: 5,
    dimensions: { length: 30, width: 20, height: 10 }
  }
];

const testAddress = {
  street: '123 Test Street',
  city: 'Melbourne',
  state: 'VIC',
  postcode: '3000',
  country: 'Australia'
};

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Test functions
async function testShippingQuotes() {
  console.log('🚚 Testing shipping quotes...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/shipping/quote`, {
      method: 'POST',
      body: {
        deliveryAddress: testAddress,
        items: testItems,
        totalValue: 299.99
      }
    });

    if (response.status === 200 && response.data.success) {
      console.log('✅ Shipping quotes working');
      console.log(`   Found ${response.data.quotes?.length || 0} shipping options`);
      if (response.data.fallbackUsed) {
        console.log('   Using fallback shipping rates');
      } else {
        console.log('   Using BigPost API');
      }
    } else {
      console.log('❌ Shipping quotes failed:', response.data.error);
    }
  } catch (error) {
    console.log('❌ Shipping quotes error:', error.message);
  }
}

async function testPaymentIntent() {
  console.log('💳 Testing payment intent creation...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/create-payment-intent`, {
      method: 'POST',
      body: {
        amount: 299.99,
        currency: 'aud'
      }
    });

    if (response.status === 200 && response.data.clientSecret) {
      console.log('✅ Payment intent creation working');
      console.log(`   Currency: ${response.data.currency}`);
    } else {
      console.log('❌ Payment intent creation failed:', response.data.error);
    }
  } catch (error) {
    console.log('❌ Payment intent error:', error.message);
  }
}

async function testCheckoutSession() {
  console.log('🛒 Testing checkout session creation...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/create-checkout-session`, {
      method: 'POST',
      body: {
        items: testItems,
        customerEmail: 'test@example.com'
      }
    });

    if (response.status === 200 && response.data.sessionId) {
      console.log('✅ Checkout session creation working');
      console.log(`   Session ID: ${response.data.sessionId}`);
    } else {
      console.log('❌ Checkout session creation failed:', response.data.error);
    }
  } catch (error) {
    console.log('❌ Checkout session error:', error.message);
  }
}

async function testServerHealth() {
  console.log('🏥 Testing server health...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/shipping/quote`, {
      method: 'GET'
    });

    if (response.status === 405) {
      console.log('✅ Server is running (correctly rejected GET request)');
    } else {
      console.log('⚠️  Server responded with unexpected status:', response.status);
    }
  } catch (error) {
    console.log('❌ Server not responding:', error.message);
    console.log('   Make sure to run: npm run dev');
    return false;
  }
  
  return true;
}

// Main test runner
async function runTests() {
  console.log('🧪 Starting Integration Tests for Unwind Designs\n');
  
  const serverHealthy = await testServerHealth();
  if (!serverHealthy) {
    process.exit(1);
  }
  
  console.log('');
  await testShippingQuotes();
  console.log('');
  await testPaymentIntent();
  console.log('');
  await testCheckoutSession();
  
  console.log('\n✨ Integration tests completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Check your .env.local file has the correct API keys');
  console.log('2. Test the full checkout flow in your browser');
  console.log('3. Verify payments appear in your Stripe dashboard');
}

// Run tests
runTests().catch(console.error);
