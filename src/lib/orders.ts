import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Order interface matching database schema
interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  shipping: {
    method: string;
    cost: number;
  };
  payment: {
    amount: number;
    currency: string;
    stripePaymentIntentId: string;
    stripeSessionId?: string;
    status: 'paid' | 'pending' | 'failed';
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  // Create a new order in Supabase
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Order> => {
    try {
      const subtotalCents = Math.round((orderData.payment.amount - orderData.shipping.cost) * 100);
      const shippingCents = Math.round(orderData.shipping.cost * 100);
      const totalCents = Math.round(orderData.payment.amount * 100);

      // Create shipping address first
      const { data: addressData, error: addressError } = await supabase
        .from('addresses')
        .insert({
          name: orderData.shippingAddress.name,
          address: orderData.shippingAddress.line1,
          address_line_two: orderData.shippingAddress.line2 || null,
          suburb: orderData.shippingAddress.city,
          state: orderData.shippingAddress.state,
          postcode: orderData.shippingAddress.postal_code,
          country: orderData.shippingAddress.country,
        })
        .select()
        .single();

      if (addressError) {
        console.error('Failed to create address:', addressError);
        throw new Error('Failed to create shipping address');
      }

      // Create order
      const { data: orderRow, error: orderError } = await supabase
        .from('orders')
        .insert({
          email: orderData.customerEmail,
          subtotal_cents: subtotalCents,
          shipping_cents: shippingCents,
          total_cents: totalCents,
          currency: orderData.payment.currency.toUpperCase(),
          order_status: 'pending',
          payment_status: orderData.payment.status === 'paid' ? 'succeeded' : 'requires_payment',
          fulfillment_status: 'unfulfilled',
          stripe_payment_intent_id: orderData.payment.stripePaymentIntentId,
          stripe_session_id: orderData.payment.stripeSessionId || null,
          shipping_address_id: addressData.id,
          billing_address_id: addressData.id,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Failed to create order:', orderError);
        throw new Error('Failed to create order');
      }

      // Create order items
      const orderItems = orderData.items.map((item) => ({
        order_id: orderRow.id,
        product_name: item.name,
        quantity: item.quantity,
        price_cents: Math.round(item.price * 100),
        total_cents: Math.round(item.price * item.quantity * 100),
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Failed to create order items:', itemsError);
      }

      const order: Order = {
        id: orderRow.id,
        customerEmail: orderData.customerEmail,
        customerName: orderData.customerName,
        shippingAddress: orderData.shippingAddress,
        items: orderData.items,
        shipping: orderData.shipping,
        payment: orderData.payment,
        status: 'pending',
        createdAt: orderRow.created_at,
        updatedAt: orderRow.created_at,
      };

      console.log('📦 Order created in database:', {
        id: order.id,
        customer: order.customerEmail,
        items: order.items.length,
        total: order.payment.amount,
      });

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get all orders from Supabase
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          shipping_address:addresses!shipping_address_id (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch orders:', error);
        return [];
      }

      return data.map(row => ({
        id: row.id,
        customerEmail: row.email,
        customerName: row.shipping_address?.name || 'Unknown',
        shippingAddress: {
          name: row.shipping_address?.name || '',
          line1: row.shipping_address?.address || '',
          line2: row.shipping_address?.address_line_two || undefined,
          city: row.shipping_address?.suburb || '',
          state: row.shipping_address?.state || '',
          postal_code: row.shipping_address?.postcode || '',
          country: row.shipping_address?.country || 'AU',
        },
        items: row.order_items.map((item: any) => ({
          id: item.id,
          name: item.product_name,
          price: item.price_cents / 100,
          quantity: item.quantity,
        })),
        shipping: {
          method: 'Standard',
          cost: row.shipping_cents / 100,
        },
        payment: {
          amount: row.total_cents / 100,
          currency: row.currency.toLowerCase(),
          stripePaymentIntentId: row.stripe_payment_intent_id || '',
          stripeSessionId: row.stripe_session_id || undefined,
          status: row.payment_status === 'succeeded' ? 'paid' : 'pending',
        },
        status: row.order_status,
        createdAt: row.created_at,
        updatedAt: row.created_at,
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<Order | null> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          shipping_address:addresses!shipping_address_id (*)
        `)
        .eq('id', id)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id,
        customerEmail: data.email,
        customerName: data.shipping_address?.name || 'Unknown',
        shippingAddress: {
          name: data.shipping_address?.name || '',
          line1: data.shipping_address?.address || '',
          line2: data.shipping_address?.address_line_two || undefined,
          city: data.shipping_address?.suburb || '',
          state: data.shipping_address?.state || '',
          postal_code: data.shipping_address?.postcode || '',
          country: data.shipping_address?.country || 'AU',
        },
        items: data.order_items.map((item: any) => ({
          id: item.id,
          name: item.product_name,
          price: item.price_cents / 100,
          quantity: item.quantity,
        })),
        shipping: {
          method: 'Standard',
          cost: data.shipping_cents / 100,
        },
        payment: {
          amount: data.total_cents / 100,
          currency: data.currency.toLowerCase(),
          stripePaymentIntentId: data.stripe_payment_intent_id || '',
          stripeSessionId: data.stripe_session_id || undefined,
          status: data.payment_status === 'succeeded' ? 'paid' : 'pending',
        },
        status: data.order_status,
        createdAt: data.created_at,
        updatedAt: data.created_at,
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  },

  // Get order by Stripe session ID
  getOrderBySessionId: async (sessionId: string): Promise<Order | null> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          shipping_address:addresses!shipping_address_id (*)
        `)
        .eq('stripe_session_id', sessionId)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id,
        customerEmail: data.email,
        customerName: data.shipping_address?.name || 'Unknown',
        shippingAddress: {
          name: data.shipping_address?.name || '',
          line1: data.shipping_address?.address || '',
          line2: data.shipping_address?.address_line_two || undefined,
          city: data.shipping_address?.suburb || '',
          state: data.shipping_address?.state || '',
          postal_code: data.shipping_address?.postcode || '',
          country: data.shipping_address?.country || 'AU',
        },
        items: data.order_items.map((item: any) => ({
          id: item.id,
          name: item.product_name,
          price: item.price_cents / 100,
          quantity: item.quantity,
        })),
        shipping: {
          method: 'Standard',
          cost: data.shipping_cents / 100,
        },
        payment: {
          amount: data.total_cents / 100,
          currency: data.currency.toLowerCase(),
          stripePaymentIntentId: data.stripe_payment_intent_id || '',
          stripeSessionId: data.stripe_session_id || undefined,
          status: data.payment_status === 'succeeded' ? 'paid' : 'pending',
        },
        status: data.order_status,
        createdAt: data.created_at,
        updatedAt: data.created_at,
      };
    } catch (error) {
      console.error('Error fetching order by session ID:', error);
      return null;
    }
  },

  // Update order status
  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order | null> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ order_status: status })
        .eq('id', id)
        .select()
        .single();

      if (error || !data) {
        return null;
      }

      console.log(`📦 Order ${id} status updated to: ${status}`);
      return orderService.getOrderById(id);
    } catch (error) {
      console.error('Error updating order status:', error);
      return null;
    }
  },

  // Get orders by status
  getOrdersByStatus: async (status: Order['status']): Promise<Order[]> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          shipping_address:addresses!shipping_address_id (*)
        `)
        .eq('order_status', status)
        .order('created_at', { ascending: false });

      if (error) {
        return [];
      }

      return data.map(row => ({
        id: row.id,
        customerEmail: row.email,
        customerName: row.shipping_address?.name || 'Unknown',
        shippingAddress: {
          name: row.shipping_address?.name || '',
          line1: row.shipping_address?.address || '',
          line2: row.shipping_address?.address_line_two || undefined,
          city: row.shipping_address?.suburb || '',
          state: row.shipping_address?.state || '',
          postal_code: row.shipping_address?.postcode || '',
          country: row.shipping_address?.country || 'AU',
        },
        items: row.order_items.map((item: any) => ({
          id: item.id,
          name: item.product_name,
          price: item.price_cents / 100,
          quantity: item.quantity,
        })),
        shipping: {
          method: 'Standard',
          cost: row.shipping_cents / 100,
        },
        payment: {
          amount: row.total_cents / 100,
          currency: row.currency.toLowerCase(),
          stripePaymentIntentId: row.stripe_payment_intent_id || '',
          stripeSessionId: row.stripe_session_id || undefined,
          status: row.payment_status === 'succeeded' ? 'paid' : 'pending',
        },
        status: row.order_status,
        createdAt: row.created_at,
        updatedAt: row.created_at,
      }));
    } catch (error) {
      console.error('Error fetching orders by status:', error);
      return [];
    }
  },

  // Get pending orders (ready to ship)
  getPendingOrders: async (): Promise<Order[]> => {
    return orderService.getOrdersByStatus('pending');
  },
};

export type { Order };