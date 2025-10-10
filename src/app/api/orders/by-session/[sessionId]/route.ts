import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/lib/orders';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching order for session ID:', sessionId);

    const order = await orderService.getOrderBySessionId(sessionId);

    if (!order) {
      console.log('No order found for session ID:', sessionId);
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    console.log('Order found:', order.id);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order by session ID:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
