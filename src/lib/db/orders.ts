import { supabaseAdmin } from '@/lib/supabase/server'

type OrderItem = {
  product_id: string
  product_name: string
  product_handle: string
  quantity: number
  price: number
}

type CreateOrderParams = {
  userId?: string | null
  email: string
  addresses: {
    billing: any
    shipping: any
  }
  totals: {
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
  items: OrderItem[]
  stripePaymentIntentId?: string
}

export async function createOrder({
  userId,
  email,
  addresses,
  totals,
  items,
  stripePaymentIntentId
}: CreateOrderParams) {
  try {
    // Convert prices to cents for your schema
    const subtotalCents = Math.round(totals.subtotal * 100)
    const shippingCents = Math.round(totals.shipping * 100)
    const totalCents = Math.round(totals.total * 100)

    // Create the order using your schema structure
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        email,
        subtotal_cents: subtotalCents,
        shipping_cents: shippingCents,
        total_cents: totalCents,
        currency: 'AUD',
        order_status: 'pending',
        payment_status: 'requires_payment',
        fulfillment_status: 'unfulfilled',
        stripe_payment_intent_id: stripePaymentIntentId,
        notes: `Order created via Stripe webhook`
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      throw new Error(`Failed to create order: ${orderError.message}`)
    }

    // Create order items using your schema structure
    // Note: We'll need to map to product_variants, but for now we'll store basic info
    const orderItems = items.map(item => ({
      order_id: order.id,
      variant_id: null, // We'll need to map this to actual variants later
      title: item.product_name,
      sku: `SKU-${item.product_id}`, // Generate a SKU from product_id
      quantity: item.quantity,
      unit_price_cents: Math.round(item.price * 100),
      weight_kg: 1.0, // Default weight
      length_cm: 10.0, // Default dimensions
      width_cm: 10.0,
      height_cm: 10.0
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      throw new Error(`Failed to create order items: ${itemsError.message}`)
    }

    return { orderId: order.id, order }
  } catch (error) {
    console.error('Error in createOrder:', error)
    throw error
  }
}

export async function updateOrderPaymentStatus(
  orderId: string, 
  paymentStatus: 'requires_payment' | 'succeeded' | 'refunded' | 'failed',
  orderStatus?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
) {
  try {
    const updateData: any = { payment_status: paymentStatus }
    if (orderStatus) {
      updateData.order_status = orderStatus
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('Error updating order payment status:', error)
      throw new Error(`Failed to update order: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in updateOrderPaymentStatus:', error)
    throw error
  }
}

export async function getOrderByPaymentIntentId(paymentIntentId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (*),
        shipments (*)
      `)
      .eq('stripe_payment_intent_id', paymentIntentId)
      .single()

    if (error) {
      console.error('Error fetching order by payment intent:', error)
      throw new Error(`Failed to fetch order: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in getOrderByPaymentIntentId:', error)
    throw error
  }
}

export async function getUserOrders(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (*),
        shipments (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user orders:', error)
      throw new Error(`Failed to fetch user orders: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in getUserOrders:', error)
    throw error
  }
}

// Helper function to convert cents back to dollars for display
export function formatPrice(cents: number): string {
  return (cents / 100).toFixed(2)
}

// Helper function to get order totals in dollars
export function getOrderTotals(order: any) {
  return {
    subtotal: formatPrice(order.subtotal_cents),
    shipping: formatPrice(order.shipping_cents),
    total: formatPrice(order.total_cents),
    currency: order.currency || 'AUD'
  }
}