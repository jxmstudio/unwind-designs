// Test script to verify shipping prices across different Australian states
// Run with: node test-shipping-addresses.js

const testAddresses = [
  {
    name: 'Melbourne, VIC (Same State - Should be cheapest)',
    address: {
      street: '123 Collins Street',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'Australia'
    },
    expectedBehavior: 'Cheapest - same state as pickup location'
  },
  {
    name: 'Sydney, NSW',
    address: {
      street: '456 George Street',
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia'
    },
    expectedBehavior: 'Moderate - interstate'
  },
  {
    name: 'Brisbane, QLD',
    address: {
      street: '789 Queen Street',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia'
    },
    expectedBehavior: 'Moderate - interstate'
  },
  {
    name: 'Perth, WA (Remote)',
    address: {
      street: '321 William Street',
      city: 'Perth',
      state: 'WA',
      postcode: '6000',
      country: 'Australia'
    },
    expectedBehavior: 'Expensive - remote/far interstate'
  },
  {
    name: 'Adelaide, SA',
    address: {
      street: '654 North Terrace',
      city: 'Adelaide',
      state: 'SA',
      postcode: '5000',
      country: 'Australia'
    },
    expectedBehavior: 'Moderate - interstate'
  },
  {
    name: 'Hobart, TAS',
    address: {
      street: '987 Elizabeth Street',
      city: 'Hobart',
      state: 'TAS',
      postcode: '7000',
      country: 'Australia'
    },
    expectedBehavior: 'Moderate - interstate'
  },
  {
    name: 'Darwin, NT (Remote)',
    address: {
      street: '147 Mitchell Street',
      city: 'Darwin',
      state: 'NT',
      postcode: '0800',
      country: 'Australia'
    },
    expectedBehavior: 'Expensive - remote/far interstate'
  },
  {
    name: 'Canberra, ACT',
    address: {
      street: '258 London Circuit',
      city: 'Canberra',
      state: 'ACT',
      postcode: '2600',
      country: 'Australia'
    },
    expectedBehavior: 'Moderate - interstate'
  }
];

// Sample cart item (typical flat pack)
const sampleItems = [
  {
    id: 'flat-pack-1',
    name: 'Wander Flat Pack',
    quantity: 1,
    weight: 120, // 120kg
    dimensions: {
      length: 180, // cm
      width: 120,
      height: 30
    },
    price: 2500,
    shipClass: 'freight'
  }
];

const totalValue = 2500;

async function testShippingAddress(testCase) {
  console.log('\n' + '='.repeat(80));
  console.log(`Testing: ${testCase.name}`);
  console.log(`Expected: ${testCase.expectedBehavior}`);
  console.log('='.repeat(80));
  
  try {
    const response = await fetch('http://localhost:3000/api/shipping/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deliveryAddress: testCase.address,
        items: sampleItems,
        totalValue: totalValue
      })
    });

    const data = await response.json();
    
    if (data.success && data.quotes) {
      console.log(`\n✅ SUCCESS - Got ${data.quotes.length} quote(s):`);
      data.quotes.forEach((quote, index) => {
        console.log(`\n  Quote ${index + 1}:`);
        console.log(`    Service: ${quote.service}`);
        console.log(`    Price: $${quote.price.toFixed(2)}`);
        console.log(`    Delivery: ${quote.deliveryDays} days`);
        console.log(`    Description: ${quote.description}`);
        console.log(`    Carrier: ${quote.carrier || 'N/A'}`);
        console.log(`    Source: ${quote.source || 'unknown'}`);
      });
      
      if (data.fallbackUsed) {
        console.log(`\n  ⚠️  Using fallback calculation`);
      }
    } else {
      console.log(`\n❌ FAILED: ${data.error || 'No quotes returned'}`);
    }
    
  } catch (error) {
    console.log(`\n❌ ERROR: ${error.message}`);
  }
}

async function runAllTests() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                  SHIPPING PRICE CALCULATION TEST SUITE                       ║');
  console.log('║                                                                               ║');
  console.log('║  Testing shipping prices from Melbourne, VIC to various Australian states    ║');
  console.log('║  Expected Result: Prices should vary based on destination state              ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════════╝');
  
  for (const testCase of testAddresses) {
    await testShippingAddress(testCase);
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n');
  console.log('='.repeat(80));
  console.log('TEST SUITE COMPLETED');
  console.log('='.repeat(80));
  console.log('\nExpected price order (cheapest to most expensive):');
  console.log('1. Melbourne, VIC (same state)');
  console.log('2. Adelaide, SA / Sydney, NSW / Canberra, ACT (moderate interstate)');
  console.log('3. Brisbane, QLD / Hobart, TAS (moderate interstate)');
  console.log('4. Perth, WA / Darwin, NT (remote/far interstate - most expensive)');
  console.log('\n');
}

// Run the tests
runAllTests().catch(console.error);

