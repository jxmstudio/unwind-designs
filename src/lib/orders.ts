// Simple in-memory order storage (replace with database in production)
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
    status: 'paid' | 'pending' | 'failed';
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// In-memory storage (replace with database)
const orders: Order[] = [];

export const orderService = {
  // Create a new order
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Order => {
    const order: Order = {
      ...orderData,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    orders.push(order);
    console.log('📦 Order created:', {
      id: order.id,
      customer: order.customerEmail,
      items: order.items.length,
      total: order.payment.amount,
    });
    
    return order;
  },

  // Get all orders
  getAllOrders: (): Order[] => {
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Get order by ID
  getOrderById: (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  },

  // Update order status
  updateOrderStatus: (id: string, status: Order['status']): Order | null => {
    const order = orders.find(order => order.id === id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      console.log(`📦 Order ${id} status updated to: ${status}`);
      return order;
    }
    return null;
  },

  // Get orders by status
  getOrdersByStatus: (status: Order['status']): Order[] => {
    return orders.filter(order => order.status === status);
  },

  // Get pending orders (ready to ship)
  getPendingOrders: (): Order[] => {
    return orders.filter(order => order.status === 'pending');
  },
};

export type { Order };