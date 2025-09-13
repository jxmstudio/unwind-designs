export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  currentStock: number;
  reservedStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  supplier: string;
  leadTime: number; // in days
  cost: number;
  lastUpdated: Date;
  lastRestocked: Date;
  category: string;
  location: string;
  status: 'active' | 'discontinued' | 'out_of_stock';
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out' | 'adjustment' | 'reservation' | 'release';
  quantity: number;
  reason: string;
  reference: string; // order number, PO number, etc.
  timestamp: Date;
  userId: string;
  notes?: string;
}

export interface LowStockAlert {
  id: string;
  itemId: string;
  itemName: string;
  currentStock: number;
  minimumStock: number;
  daysUntilOutOfStock: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface ReorderRecommendation {
  itemId: string;
  itemName: string;
  sku: string;
  currentStock: number;
  recommendedOrder: number;
  estimatedCost: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
}

export class InventoryManager {
  private static instance: InventoryManager;
  private items: Map<string, InventoryItem> = new Map();
  private movements: StockMovement[] = [];
  private alerts: LowStockAlert[] = [];

  private constructor() {
    this.loadSampleData();
  }

  static getInstance(): InventoryManager {
    if (!InventoryManager.instance) {
      InventoryManager.instance = new InventoryManager();
    }
    return InventoryManager.instance;
  }

  /**
   * Get current stock level for an item
   */
  getCurrentStock(itemId: string): number {
    const item = this.items.get(itemId);
    return item ? item.currentStock : 0;
  }

  /**
   * Get available stock (current - reserved)
   */
  getAvailableStock(itemId: string): number {
    const item = this.items.get(itemId);
    if (!item) return 0;
    return Math.max(0, item.currentStock - item.reservedStock);
  }

  /**
   * Check if item is in stock
   */
  isInStock(itemId: string, quantity: number = 1): boolean {
    return this.getAvailableStock(itemId) >= quantity;
  }

  /**
   * Reserve stock for an order
   */
  reserveStock(itemId: string, quantity: number, orderId: string, userId: string): boolean {
    const item = this.items.get(itemId);
    if (!item || this.getAvailableStock(itemId) < quantity) {
      return false;
    }

    item.reservedStock += quantity;
    this.recordMovement({
      id: this.generateId(),
      itemId,
      type: 'reservation',
      quantity,
      reason: 'Order reservation',
      reference: orderId,
      timestamp: new Date(),
      userId,
      notes: `Reserved for order ${orderId}`
    });

    this.checkLowStock(item);
    return true;
  }

  /**
   * Release reserved stock
   */
  releaseStock(itemId: string, quantity: number, orderId: string, userId: string): boolean {
    const item = this.items.get(itemId);
    if (!item || item.reservedStock < quantity) {
      return false;
    }

    item.reservedStock -= quantity;
    this.recordMovement({
      id: this.generateId(),
      itemId,
      type: 'release',
      quantity,
      reason: 'Order cancellation/modification',
      reference: orderId,
      timestamp: new Date(),
      userId,
      notes: `Released from order ${orderId}`
    });

    return true;
  }

  /**
   * Process stock out (fulfillment)
   */
  processStockOut(itemId: string, quantity: number, orderId: string, userId: string): boolean {
    const item = this.items.get(itemId);
    if (!item || this.getAvailableStock(itemId) < quantity) {
      return false;
    }

    item.currentStock -= quantity;
    item.reservedStock -= quantity;
    
    this.recordMovement({
      id: this.generateId(),
      itemId,
      type: 'out',
      quantity,
      reason: 'Order fulfillment',
      reference: orderId,
      timestamp: new Date(),
      userId,
      notes: `Fulfilled order ${orderId}`
    });

    this.checkLowStock(item);
    return true;
  }

  /**
   * Process stock in (restocking)
   */
  processStockIn(itemId: string, quantity: number, poNumber: string, userId: string): boolean {
    const item = this.items.get(itemId);
    if (!item) {
      return false;
    }

    item.currentStock += quantity;
    item.lastRestocked = new Date();
    
    this.recordMovement({
      id: this.generateId(),
      itemId,
      type: 'in',
      quantity,
      reason: 'Restocking',
      reference: poNumber,
      timestamp: new Date(),
      userId,
      notes: `Restocked via PO ${poNumber}`
    });

    // Clear low stock alerts if stock is now above minimum
    if (item.currentStock > item.minimumStock) {
      this.clearLowStockAlerts(itemId);
    }

    return true;
  }

  /**
   * Adjust stock (for corrections, damages, etc.)
   */
  adjustStock(itemId: string, quantity: number, reason: string, userId: string): boolean {
    const item = this.items.get(itemId);
    if (!item) {
      return false;
    }

    item.currentStock += quantity;
    
    this.recordMovement({
      id: this.generateId(),
      itemId,
      type: 'adjustment',
      quantity,
      reason,
      reference: 'ADJUSTMENT',
      timestamp: new Date(),
      userId,
      notes: reason
    });

    this.checkLowStock(item);
    return true;
  }

  /**
   * Check if item needs reordering
   */
  needsReorder(itemId: string): boolean {
    const item = this.items.get(itemId);
    if (!item) return false;
    
    return item.currentStock <= item.reorderPoint;
  }

  /**
   * Get reorder recommendations
   */
  getReorderRecommendations(): ReorderRecommendation[] {
    const recommendations: ReorderRecommendation[] = [];

    for (const item of this.items.values()) {
      if (this.needsReorder(item.id)) {
        const urgency = this.calculateUrgency(item);
        const recommendedOrder = Math.max(
          item.reorderQuantity,
          item.minimumStock - item.currentStock + item.reorderQuantity
        );

        recommendations.push({
          itemId: item.id,
          itemName: item.name,
          sku: item.sku,
          currentStock: item.currentStock,
          recommendedOrder,
          estimatedCost: recommendedOrder * item.cost,
          urgency,
          reason: this.getReorderReason(item, urgency)
        });
      }
    }

    return recommendations.sort((a, b) => {
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });
  }

  /**
   * Get low stock alerts
   */
  getLowStockAlerts(): LowStockAlert[] {
    return this.alerts.filter(alert => !alert.acknowledged);
  }

  /**
   * Acknowledge low stock alert
   */
  acknowledgeAlert(alertId: string, userId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (!alert) return false;

    alert.acknowledged = true;
    alert.acknowledgedBy = userId;
    alert.acknowledgedAt = new Date();
    return true;
  }

  /**
   * Get stock movements for an item
   */
  getStockMovements(itemId: string, limit: number = 50): StockMovement[] {
    return this.movements
      .filter(m => m.itemId === itemId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Get inventory summary
   */
  getInventorySummary() {
    let totalItems = 0;
    let lowStockItems = 0;
    let outOfStockItems = 0;
    let totalValue = 0;

    for (const item of this.items.values()) {
      totalItems++;
      if (item.currentStock <= item.minimumStock) lowStockItems++;
      if (item.currentStock === 0) outOfStockItems++;
      totalValue += item.currentStock * item.cost;
    }

    return {
      totalItems,
      lowStockItems,
      outOfStockItems,
      totalValue: Math.round(totalValue * 100) / 100,
      alerts: this.getLowStockAlerts().length
    };
  }

  /**
   * Search inventory items
   */
  searchItems(query: string, category?: string): InventoryItem[] {
    const results: InventoryItem[] = [];
    const searchTerm = query.toLowerCase();

    for (const item of this.items.values()) {
      if (category && item.category !== category) continue;
      
      if (item.name.toLowerCase().includes(searchTerm) ||
          item.sku.toLowerCase().includes(searchTerm)) {
        results.push(item);
      }
    }

    return results;
  }

  /**
   * Private helper methods
   */
  private checkLowStock(item: InventoryItem): void {
    if (item.currentStock <= item.minimumStock) {
      const existingAlert = this.alerts.find(a => a.itemId === item.id && !a.acknowledged);
      if (!existingAlert) {
        const alert: LowStockAlert = {
          id: this.generateId(),
          itemId: item.id,
          itemName: item.name,
          currentStock: item.currentStock,
          minimumStock: item.minimumStock,
          daysUntilOutOfStock: this.calculateDaysUntilOutOfStock(item),
          priority: this.calculatePriority(item),
          createdAt: new Date(),
          acknowledged: false
        };
        this.alerts.push(alert);
      }
    }
  }

  private clearLowStockAlerts(itemId: string): void {
    this.alerts = this.alerts.filter(alert => 
      !(alert.itemId === itemId && !alert.acknowledged)
    );
  }

  private calculateUrgency(item: InventoryItem): 'low' | 'medium' | 'high' | 'critical' {
    const daysUntilOutOfStock = this.calculateDaysUntilOutOfStock(item);
    
    if (daysUntilOutOfStock <= 1) return 'critical';
    if (daysUntilOutOfStock <= 3) return 'high';
    if (daysUntilOutOfStock <= 7) return 'medium';
    return 'low';
  }

  private calculatePriority(item: InventoryItem): 'low' | 'medium' | 'high' | 'critical' {
    const urgency = this.calculateUrgency(item);
    return urgency;
  }

  private calculateDaysUntilOutOfStock(item: InventoryItem): number {
    // This is a simplified calculation - in reality, you'd use historical sales data
    const averageDailyUsage = 1; // Placeholder
    return Math.floor(item.currentStock / averageDailyUsage);
  }

  private getReorderReason(item: InventoryItem, urgency: string): string {
    switch (urgency) {
      case 'critical':
        return 'Critical: Item will be out of stock within 1 day';
      case 'high':
        return 'High: Item will be out of stock within 3 days';
      case 'medium':
        return 'Medium: Item will be out of stock within 7 days';
      default:
        return 'Low: Item has reached reorder point';
    }
  }

  private recordMovement(movement: StockMovement): void {
    this.movements.push(movement);
    // In a real system, you'd persist this to a database
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private loadSampleData(): void {
    // Sample inventory items
    const sampleItems: InventoryItem[] = [
      {
        id: '1',
        sku: 'RL-12V-001',
        name: '12V Dimmable Reading Light',
        currentStock: 45,
        reservedStock: 0,
        minimumStock: 10,
        maximumStock: 100,
        reorderPoint: 15,
        reorderQuantity: 50,
        supplier: 'LED Lighting Co',
        leadTime: 7,
        cost: 45.00,
        lastUpdated: new Date(),
        lastRestocked: new Date('2024-01-15'),
        category: 'Lighting',
        location: 'Warehouse A',
        status: 'active'
      },
      {
        id: '2',
        sku: 'WH-DUO-10L',
        name: 'Duoetto MK2 Digital Dual Voltage Water Heater',
        currentStock: 12,
        reservedStock: 2,
        minimumStock: 5,
        maximumStock: 25,
        reorderPoint: 8,
        reorderQuantity: 15,
        supplier: 'Water Systems Ltd',
        leadTime: 14,
        cost: 350.00,
        lastUpdated: new Date(),
        lastRestocked: new Date('2024-01-10'),
        category: 'Water Systems',
        location: 'Warehouse B',
        status: 'active'
      },
      {
        id: '3',
        sku: 'VT-TC-400',
        name: 'Troopcarrier Utility Vent - Ark Earth',
        currentStock: 28,
        reservedStock: 0,
        minimumStock: 8,
        maximumStock: 50,
        reorderPoint: 12,
        reorderQuantity: 25,
        supplier: 'Ventilation Pro',
        leadTime: 10,
        cost: 280.00,
        lastUpdated: new Date(),
        lastRestocked: new Date('2024-01-20'),
        category: 'Ventilation',
        location: 'Warehouse A',
        status: 'active'
      }
    ];

    sampleItems.forEach(item => this.items.set(item.id, item));
  }
}

// Export singleton instance
export const inventoryManager = InventoryManager.getInstance();

// Utility functions
export function formatStockLevel(stock: number): string {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 5) return 'Low Stock';
  if (stock <= 20) return 'Limited Stock';
  return 'In Stock';
}

export function getStockStatusColor(stock: number, minimum: number): string {
  if (stock === 0) return 'text-red-600';
  if (stock <= minimum) return 'text-orange-600';
  if (stock <= minimum * 2) return 'text-yellow-600';
  return 'text-green-600';
}

export function calculateStockPercentage(current: number, maximum: number): number {
  if (maximum === 0) return 0;
  return Math.round((current / maximum) * 100);
}
