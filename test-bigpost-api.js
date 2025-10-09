// Test script for BigPost API
const fetch = require('node-fetch');

async function testBigPostAPI() {
  const apiKey = process.env.BIG_POST_API_TOKEN;
  
  if (!apiKey || apiKey === 'your_bigpost_api_token_here') {
    console.log('❌ BigPost API token not configured');
    console.log('Please set BIG_POST_API_TOKEN in your .env.local file');
    return;
  }
  
  console.log('🔑 Testing BigPost API with token:', apiKey.substring(0, 10) + '...');
  
  const testRequest = {
    JobType: [2], // DIRECT
    BuyerIsBusiness: false,
    BuyerHasForklift: false,
    ReturnAuthorityToLeaveOptions: true,
    JobDate: new Date().toISOString(),
    DepotId: null,
    PickupLocation: {
      Name: "Unwind Designs",
      Address: "123 Test St",
      AddressLineTwo: "",
      Locality: {
        Suburb: "Melbourne",
        Postcode: "3000",
        State: "VIC"
      }
    },
    BuyerLocation: {
      Name: "Test Customer",
      Address: "456 Customer St", 
      AddressLineTwo: "",
      Locality: {
        Suburb: "Sydney",
        Postcode: "2000",
        State: "NSW"
      }
    },
    Items: [{
      ItemType: 0, // CARTON
      Description: "Van Fitout Kit",
      Quantity: 1,
      Height: 100,
      Width: 150,
      Length: 200,
      Weight: 80,
      Consolidatable: true
    }]
  };
  
  try {
    console.log('📦 Testing with 80kg van fitout kit...');
    
    const response = await fetch('https://app.bigpost.com.au/api/quote', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testRequest)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ BigPost API Error:', response.status, errorText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ BigPost API Response:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.Quotes && data.Quotes.length > 0) {
      console.log('\n💰 Shipping Quotes:');
      data.Quotes.forEach(quote => {
        console.log(`- ${quote.ServiceName}: $${quote.Price} (${quote.EstimatedDeliveryDays} days)`);
      });
    }
    
  } catch (error) {
    console.log('❌ Error testing BigPost API:', error.message);
  }
}

testBigPostAPI();
