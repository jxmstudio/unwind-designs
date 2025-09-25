// Order management interfaces and utilities
// This will be expanded when a proper database is implemented

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string;
  // BigPost integration fields
  bigPostJobId?: number;
  bigPostCarrierConsignmentNumber?: string;
  bigPostTrackingUrl?: string;
  selectedShippingQuote?: {
    service: string;
    price: number;
    deliveryDays: number;
    carrier: string;
    carrierId: number;
    serviceCode?: string;
    authorityToLeave: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shipClass?: 'standard' | 'oversized' | 'freight';
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// In-memory storage for development (replace with database in production)
const orders: Map<string, Order> = new Map();

export class OrderService {
  /**
   * Create a new order
   */
  static createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const id = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderNumber = `UD-${Date.now().toString().slice(-8)}`;
    
    const order: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    orders.set(id, order);
    return order;
  }

  /**
   * Get order by ID
   */
  static getOrder(id: string): Order | undefined {
    return orders.get(id);
  }

  /**
   * Get order by order number
   */
  static getOrderByNumber(orderNumber: string): Order | undefined {
    for (const order of orders.values()) {
      if (order.orderNumber === orderNumber) {
        return order;
      }
    }
    return undefined;
  }

  /**
   * Update order status
   */
  static updateOrderStatus(id: string, status: OrderStatus): boolean {
    const order = orders.get(id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      return true;
    }
    return false;
  }

  /**
   * Update BigPost tracking information
   */
  static updateBigPostTracking(
    id: string, 
    jobId: number, 
    carrierConsignmentNumber?: string,
    trackingUrl?: string
  ): boolean {
    const order = orders.get(id);
    if (order) {
      order.bigPostJobId = jobId;
      order.bigPostCarrierConsignmentNumber = carrierConsignmentNumber;
      order.bigPostTrackingUrl = trackingUrl;
      order.updatedAt = new Date();
      return true;
    }
    return false;
  }

  /**
   * Get all orders (for admin purposes)
   */
  static getAllOrders(): Order[] {
    return Array.from(orders.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  /**
   * Get orders by customer email
   */
  static getOrdersByCustomer(email: string): Order[] {
    return Array.from(orders.values())
      .filter(order => order.customerEmail === email)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

// Utility functions
export function formatOrderNumber(orderNumber: string): string {
  return orderNumber.replace('UD-', '');
}

export function getOrderStatusDisplay(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'Pending',
    [OrderStatus.CONFIRMED]: 'Confirmed',
    [OrderStatus.PROCESSING]: 'Processing',
    [OrderStatus.SHIPPED]: 'Shipped',
    [OrderStatus.DELIVERED]: 'Delivered',
    [OrderStatus.CANCELLED]: 'Cancelled',
    [OrderStatus.REFUNDED]: 'Refunded'
  };
  return statusMap[status] || 'Unknown';
}

export function getPaymentStatusDisplay(status: PaymentStatus): string {
  const statusMap: Record<PaymentStatus, string> = {
    [PaymentStatus.PENDING]: 'Pending',
    [PaymentStatus.PROCESSING]: 'Processing',
    [PaymentStatus.COMPLETED]: 'Completed',
    [PaymentStatus.FAILED]: 'Failed',
    [PaymentStatus.REFUNDED]: 'Refunded'
  };
  return statusMap[status] || 'Unknown';
}
