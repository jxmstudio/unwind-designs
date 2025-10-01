import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/lib/orders';

export async function GET() {
  try {
    const orders = orderService.getAllOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}