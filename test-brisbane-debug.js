// Debug script specifically for Brisbane shipping issue
// Run with: node test-brisbane-debug.js

const brisbaneTest = {
  deliveryAddress: {
    street: '789 Queen Street',
    city: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    country: 'Australia'
  },
  items: [
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
  ],
  totalValue: 2500
};

async function testBrisbane() {
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('  DEBUGGING BRISBANE SHIPPING QUOTE FAILURE');
  console.log('════════════════════════════════════════════════════════════════\n');
  
  console.log('Sending request:', JSON.stringify(brisbaneTest, null, 2));
  
  try {
    const response = await fetch('http://localhost:3000/api/shipping/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brisbaneTest)
    });

    console.log('\n--- Response Status ---');
    console.log('Status:', response.status, response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    
    console.log('\n--- Response Data ---');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.fallbackUsed) {
      console.log('\n❌ FALLBACK WAS USED!');
      console.log('Reason:', data.fallbackReason || 'Unknown');
      console.log('This means the BigPost API call failed for Brisbane.');
    } else {
      console.log('\n✅ Real BigPost API quotes received');
    }
    
  } catch (error) {
    console.log('\n❌ REQUEST FAILED');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
  
  console.log('\n════════════════════════════════════════════════════════════════\n');
}

testBrisbane().catch(console.error);

