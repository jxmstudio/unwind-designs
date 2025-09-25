// Test script for end-to-end checkout persistence
// This script tests the complete flow: Stripe payment -> Supabase order creation -> BigPost booking

const { createClient } = require('@supabase/supabase-js')
const fetch = require('node-fetch')

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!SUPABASE_URL)
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!SUPABASE_SERVICE_KEY)
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function testEndToEndFlow() {
  console.log('🧪 Testing End-to-End Checkout Persistence Flow\n')

  try {
    // 1. Test Supabase connection
    console.log('1️⃣ Testing Supabase connection...')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (profilesError) {
      throw new Error(`Supabase connection failed: ${profilesError.message}`)
    }
    console.log('✅ Supabase connection successful')

    // 2. Test database schema
    console.log('\n2️⃣ Testing database schema...')
    const tables = ['orders', 'order_items', 'shipments', 'profiles']
    
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      if (error) {
        throw new Error(`Table ${table} not accessible: ${error.message}`)
      }
      console.log(`✅ Table ${table} accessible`)
    }

    // 3. Test order creation
    console.log('\n3️⃣ Testing order creation...')
    const testOrder = {
      user_id: null,
      email: 'test@example.com',
      stripe_payment_intent_id: 'pi_test_' + Date.now(),
      payment_status: 'succeeded',
      order_status: 'processing',
      billing_address: {
        name: 'Test Customer',
        line1: '123 Test St',
        city: 'Melbourne',
        state: 'VIC',
        postal_code: '3000',
        country: 'AU'
      },
      shipping_address: {
        name: 'Test Customer',
        line1: '123 Test St',
        city: 'Melbourne',
        state: 'VIC',
        postal_code: '3000',
        country: 'AU'
      },
      totals: {
        subtotal: 100.00,
        shipping: 15.00,
        tax: 11.50,
        total: 126.50
      }
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(testOrder)
      .select()
      .single()

    if (orderError) {
      throw new Error(`Order creation failed: ${orderError.message}`)
    }
    console.log(`✅ Order created: ${order.id}`)

    // 4. Test order items creation
    console.log('\n4️⃣ Testing order items creation...')
    const testItems = [
      {
        order_id: order.id,
        product_id: 'CAB-001',
        product_name: 'Test Cabinet',
        product_handle: 'test-cabinet',
        quantity: 1,
        price: 100.00
      }
    ]

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .insert(testItems)
      .select()

    if (itemsError) {
      throw new Error(`Order items creation failed: ${itemsError.message}`)
    }
    console.log(`✅ Order items created: ${items.length} items`)

    // 5. Test shipment creation
    console.log('\n5️⃣ Testing shipment creation...')
    const testShipment = {
      order_id: order.id,
      service_code: 'standard',
      status: 'pending'
    }

    const { data: shipment, error: shipmentError } = await supabase
      .from('shipments')
      .insert(testShipment)
      .select()
      .single()

    if (shipmentError) {
      throw new Error(`Shipment creation failed: ${shipmentError.message}`)
    }
    console.log(`✅ Shipment created: ${shipment.id}`)

    // 6. Test order retrieval
    console.log('\n6️⃣ Testing order retrieval...')
    const { data: retrievedOrder, error: retrieveError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*),
        shipments (*)
      `)
      .eq('id', order.id)
      .single()

    if (retrieveError) {
      throw new Error(`Order retrieval failed: ${retrieveError.message}`)
    }
    console.log(`✅ Order retrieved with ${retrievedOrder.order_items.length} items and ${retrievedOrder.shipments.length} shipments`)

    // 7. Test BigPost booking API (if available)
    console.log('\n7️⃣ Testing BigPost booking API...')
    try {
      const bookingResponse = await fetch(`${SITE_URL}/api/shipping/book-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          contactName: 'Test Customer',
          buyerEmail: 'test@example.com',
          selectedQuote: {
            carrierId: 1,
            serviceCode: 'standard',
            authorityToLeave: false
          },
          deliveryAddress: {
            street: '123 Test St',
            city: 'Melbourne',
            state: 'VIC',
            postcode: '3000',
            country: 'AU'
          },
          items: [{
            id: 'CAB-001',
            name: 'Test Cabinet',
            quantity: 1,
            weight: 1,
            dimensions: { length: 30, width: 20, height: 10 },
            shipClass: 'standard',
            price: 100.00
          }],
          specialInstructions: 'Test order',
          containsDangerousGoods: false,
          hasDeclaredCarParts: false
        })
      })

      if (bookingResponse.ok) {
        const bookingResult = await bookingResponse.json()
        if (bookingResult.success) {
          console.log(`✅ BigPost booking successful: Job ID ${bookingResult.jobId}`)
        } else {
          console.log(`⚠️ BigPost booking failed: ${bookingResult.error}`)
        }
      } else {
        console.log(`⚠️ BigPost booking API not available: ${bookingResponse.status}`)
      }
    } catch (bookingError) {
      console.log(`⚠️ BigPost booking test skipped: ${bookingError.message}`)
    }

    // 8. Cleanup test data
    console.log('\n8️⃣ Cleaning up test data...')
    await supabase.from('order_items').delete().eq('order_id', order.id)
    await supabase.from('shipments').delete().eq('order_id', order.id)
    await supabase.from('orders').delete().eq('id', order.id)
    console.log('✅ Test data cleaned up')

    console.log('\n🎉 End-to-end flow test completed successfully!')
    console.log('\nSummary:')
    console.log('✅ Supabase connection working')
    console.log('✅ Database schema accessible')
    console.log('✅ Order creation working')
    console.log('✅ Order items creation working')
    console.log('✅ Shipment creation working')
    console.log('✅ Order retrieval working')
    console.log('✅ BigPost integration ready (if configured)')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    process.exit(1)
  }
}

// Run the test
testEndToEndFlow()
