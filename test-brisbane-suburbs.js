// Test script for Brisbane suburb shipping quotes
// Run with: node test-brisbane-suburbs.js

const brisbaneSuburbs = [
  {
    name: 'Brisbane City (CBD)',
    address: {
      street: '100 Queen Street',
      city: 'Brisbane City',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia'
    }
  },
  {
    name: 'South Brisbane',
    address: {
      street: '123 Grey Street',
      city: 'South Brisbane',
      state: 'QLD',
      postcode: '4101',
      country: 'Australia'
    }
  },
  {
    name: 'Fortitude Valley',
    address: {
      street: '456 Brunswick Street',
      city: 'Fortitude Valley',
      state: 'QLD',
      postcode: '4006',
      country: 'Australia'
    }
  },
  {
    name: 'West End',
    address: {
      street: '789 Montague Road',
      city: 'West End',
      state: 'QLD',
      postcode: '4101',
      country: 'Australia'
    }
  },
  {
    name: 'New Farm',
    address: {
      street: '321 Brunswick Street',
      city: 'New Farm',
      state: 'QLD',
      postcode: '4005',
      country: 'Australia'
    }
  },
  {
    name: 'Woolloongabba',
    address: {
      street: '654 Stanley Street',
      city: 'Woolloongabba',
      state: 'QLD',
      postcode: '4102',
      country: 'Australia'
    }
  }
];

const sampleItem = {
  id: 'flat-pack-1',
  name: 'Wander Flat Pack',
  quantity: 1,
  weight: 120,
  dimensions: {
    length: 180,
    width: 120,
    height: 30
  },
  price: 2500,
  shipClass: 'freight'
};

async function testSuburb(suburbData) {
  console.log('\n' + '='.repeat(80));
  console.log(`Testing: ${suburbData.name}`);
  console.log(`Address: ${suburbData.address.street}, ${suburbData.address.city}, ${suburbData.address.state} ${suburbData.address.postcode}`);
  console.log('='.repeat(80));
  
  try {
    const response = await fetch('http://localhost:3000/api/shipping/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deliveryAddress: suburbData.address,
        items: [sampleItem],
        totalValue: 2500
      })
    });

    const data = await response.json();
    
    if (data.success && data.quotes) {
      console.log(`\n✅ SUCCESS - Got ${data.quotes.length} quote(s)\n`);
      
      if (data.fallbackUsed) {
        console.log(`⚠️  WARNING: Using fallback calculation`);
        console.log(`   Reason: ${data.fallbackReason || 'Unknown'}\n`);
      } else {
        console.log(`✅ Real BigPost API quotes received!\n`);
      }
      
      // Show first 3 quotes
      data.quotes.slice(0, 3).forEach((quote, index) => {
        console.log(`  Quote ${index + 1}:`);
        console.log(`    Service: ${quote.service}`);
        console.log(`    Price: $${quote.price.toFixed(2)}`);
        console.log(`    Delivery: ${quote.deliveryDays} days`);
        console.log(`    Carrier: ${quote.carrier || 'N/A'}`);
        console.log(`    Source: ${quote.source}`);
        console.log();
      });
      
      if (data.quotes.length > 3) {
        console.log(`  ... and ${data.quotes.length - 3} more quotes`);
      }
      
      // Check if we got real quotes
      const hasRealQuotes = data.quotes.some(q => q.source === 'bigpost');
      if (hasRealQuotes) {
        console.log(`\n🎉 SUCCESS: BigPost returned real quotes for ${suburbData.name}!`);
      } else {
        console.log(`\n❌ ISSUE: All quotes are fallback for ${suburbData.name}`);
      }
      
    } else {
      console.log(`\n❌ FAILED: ${data.error || 'No quotes returned'}`);
    }
    
  } catch (error) {
    console.log(`\n❌ ERROR: ${error.message}`);
  }
}

async function runBrisbaneTests() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                     BRISBANE SUBURB SHIPPING TEST                             ║');
  console.log('║                                                                               ║');
  console.log('║  Testing different Brisbane suburbs to verify BigPost API integration         ║');
  console.log('║  Item: 120kg Wander Flat Pack (180x120x30cm)                                 ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════════╝');
  
  for (const suburb of brisbaneSuburbs) {
    await testSuburb(suburb);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n');
  console.log('='.repeat(80));
  console.log('BRISBANE SUBURB TESTS COMPLETED');
  console.log('='.repeat(80));
  console.log('\n📊 Summary:');
  console.log('If all suburbs show "Real BigPost API quotes", the issue is fixed!');
  console.log('If suburbs still use fallback, the issue may be with BigPost coverage or API.');
  console.log('\n');
}

runBrisbaneTests().catch(console.error);

