import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/lib/orders';

export async function POST() {
  try {
    // Create a test order
    const testOrder = orderService.createOrder({
      customerEmail: 'test@example.com',
      customerName: 'Test Customer',
      shippingAddress: {
        name: 'Test Customer',
        line1: '123 Test Street',
        line2: 'Unit 1',
        city: 'Melbourne',
        state: 'VIC',
        postal_code: '3000',
        country: 'AU',
      },
      items: [
        {
          id: 'everlock-latches',
          name: 'Everlock Latches',
          price: 22.5,
          quantity: 1,
          image: '/brand/everlock-latches-1.jpg',
        },
      ],
      shipping: {
        method: 'Express Shipping',
        cost: 27,
      },
      payment: {
        amount: 49.5, // $22.50 + $27.00
        currency: 'aud',
        stripePaymentIntentId: 'pi_test_' + Date.now(),
        status: 'paid',
      },
    });

    return NextResponse.json({ 
      success: true, 
      order: testOrder,
      message: 'Test order created successfully' 
    });
  } catch (error) {
    console.error('Failed to create test order:', error);
    return NextResponse.json({ error: 'Failed to create test order' }, { status: 500 });
  }
}
