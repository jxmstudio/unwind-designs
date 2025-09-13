export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface ShippingRate {
  service: string;
  price: number;
  deliveryDays: number;
  description: string;
  restrictions?: string[];
}

export interface PackageDetails {
  weight: number; // in kg
  length: number; // in cm
  width: number; // in cm
  height: number; // in cm
  value: number; // in AUD
}

export interface ShippingZone {
  name: string;
  states: string[];
  baseRate: number;
  expressRate: number;
  deliveryDays: {
    standard: number;
    express: number;
  };
}

// Australian shipping zones
export const shippingZones: ShippingZone[] = [
  {
    name: "Metro Areas",
    states: ["VIC", "NSW", "QLD", "SA", "WA"],
    baseRate: 12.00,
    expressRate: 27.00,
    deliveryDays: {
      standard: 3,
      express: 1
    }
  },
  {
    name: "Regional Areas",
    states: ["NT", "TAS"],
    baseRate: 18.00,
    expressRate: 33.00,
    deliveryDays: {
      standard: 5,
      express: 2
    }
  },
  {
    name: "Remote Areas",
    states: ["WA", "NT", "SA", "QLD"], // Some areas in these states
    baseRate: 25.00,
    expressRate: 40.00,
    deliveryDays: {
      standard: 7,
      express: 3
    }
  }
];

// International shipping rates (basic structure)
export const internationalRates: Record<string, ShippingRate> = {
  "New Zealand": {
    service: "Standard International",
    price: 35.00,
    deliveryDays: 7,
    description: "Standard shipping to New Zealand"
  },
  "United States": {
    service: "Standard International",
    price: 45.00,
    deliveryDays: 14,
    description: "Standard shipping to United States"
  },
  "United Kingdom": {
    service: "Standard International",
    price: 50.00,
    deliveryDays: 18,
    description: "Standard shipping to United Kingdom"
  },
  "Canada": {
    service: "Standard International",
    price: 48.00,
    deliveryDays: 16,
    description: "Standard shipping to Canada"
  }
};

export class ShippingCalculator {
  private static instance: ShippingCalculator;
  private rateLimiter: Map<string, { count: number; resetTime: number }> = new Map();

  private constructor() {}

  static getInstance(): ShippingCalculator {
    if (!ShippingCalculator.instance) {
      ShippingCalculator.instance = new ShippingCalculator();
    }
    return ShippingCalculator.instance;
  }

  /**
   * Calculate shipping rates for a package to a destination
   */
  calculateShipping(
    packageDetails: PackageDetails,
    destination: ShippingAddress,
    service: 'standard' | 'express' = 'standard'
  ): ShippingRate[] {
    const rates: ShippingRate[] = [];

    // Check if destination is in Australia
    if (destination.country.toLowerCase() === 'australia') {
      const zone = this.getShippingZone(destination.state);
      if (zone) {
        const baseRate = service === 'express' ? zone.expressRate : zone.baseRate;
        const deliveryDays = service === 'express' ? zone.deliveryDays.express : zone.deliveryDays.standard;
        
        // Add weight-based adjustments
        const weightAdjustment = this.calculateWeightAdjustment(packageDetails.weight);
        const finalRate = baseRate + weightAdjustment;

        rates.push({
          service: service === 'express' ? 'Express Shipping' : 'Standard Shipping',
          price: Math.max(finalRate, 0),
          deliveryDays,
          description: `${service === 'express' ? 'Express' : 'Standard'} delivery to ${destination.state}`,
          restrictions: this.getRestrictions(packageDetails)
        });

        // Add free shipping option for orders over $500
        if (packageDetails.value >= 500) {
          rates.push({
            service: 'Free Shipping',
            price: 0,
            deliveryDays: zone.deliveryDays.standard,
            description: 'Free shipping on orders over $500',
            restrictions: ['Minimum order value: $500']
          });
        }
      }
    } else {
      // International shipping
      const internationalRate = internationalRates[destination.country];
      if (internationalRate) {
        // Add weight and value adjustments for international
        const adjustedRate = this.calculateInternationalRate(
          internationalRate.price,
          packageDetails.weight,
          packageDetails.value
        );

        rates.push({
          ...internationalRate,
          price: adjustedRate,
          restrictions: this.getInternationalRestrictions(packageDetails)
        });
      }
    }

    return rates;
  }

  /**
   * Get shipping zone for a state
   */
  private getShippingZone(state: string): ShippingZone | undefined {
    return shippingZones.find(zone => 
      zone.states.includes(state.toUpperCase())
    );
  }

  /**
   * Calculate weight-based adjustments
   */
  private calculateWeightAdjustment(weight: number): number {
    if (weight <= 5) return 0;
    if (weight <= 10) return 5;
    if (weight <= 20) return 12;
    if (weight <= 30) return 20;
    return 30; // For weights over 30kg
  }

  /**
   * Calculate international shipping rate adjustments
   */
  private calculateInternationalRate(
    baseRate: number,
    weight: number,
    value: number
  ): number {
    let adjustedRate = baseRate;

    // Weight adjustments
    if (weight > 5) {
      adjustedRate += (weight - 5) * 2; // $2 per kg over 5kg
    }

    // Value adjustments for high-value items
    if (value > 1000) {
      adjustedRate += (value - 1000) * 0.02; // 2% of value over $1000
    }

    return Math.round(adjustedRate * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Get package restrictions
   */
  private getRestrictions(packageDetails: PackageDetails): string[] {
    const restrictions: string[] = [];

    if (packageDetails.weight > 50) {
      restrictions.push('Heavy items may require special handling');
    }

    if (packageDetails.length > 150 || packageDetails.width > 150 || packageDetails.height > 150) {
      restrictions.push('Oversized items may incur additional charges');
    }

    if (packageDetails.value > 2000) {
      restrictions.push('Signature required for high-value items');
    }

    return restrictions;
  }

  /**
   * Get international package restrictions
   */
  private getInternationalRestrictions(packageDetails: PackageDetails): string[] {
    const restrictions = this.getRestrictions(packageDetails);
    
    restrictions.push('Subject to customs duties and import taxes');
    restrictions.push('Delivery times may vary due to customs processing');
    
    if (packageDetails.weight > 20) {
      restrictions.push('Heavy items may require freight shipping');
    }

    return restrictions;
  }

  /**
   * Estimate delivery date
   */
  estimateDeliveryDate(
    shippingDays: number,
    excludeWeekends: boolean = true
  ): Date {
    const deliveryDate = new Date();
    let daysToAdd = shippingDays;

    while (daysToAdd > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      
      if (excludeWeekends) {
        const dayOfWeek = deliveryDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          continue; // Skip weekends
        }
      }
      
      daysToAdd--;
    }

    return deliveryDate;
  }

  /**
   * Check if address is eligible for free shipping
   */
  isEligibleForFreeShipping(
    orderValue: number,
    destination: ShippingAddress
  ): boolean {
    if (orderValue < 500) return false;
    if (destination.country.toLowerCase() !== 'australia') return false;
    
    // Check if it's a remote area (may have restrictions)
    const zone = this.getShippingZone(destination.state);
    if (zone?.name === 'Remote Areas') {
      return orderValue >= 750; // Higher threshold for remote areas
    }
    
    return true;
  }

  /**
   * Get shipping options for a destination
   */
  getShippingOptions(destination: ShippingAddress): string[] {
    const options = ['Standard Shipping'];
    
    if (destination.country.toLowerCase() === 'australia') {
      options.push('Express Shipping');
      
      // Check if express is available for the state
      const zone = this.getShippingZone(destination.state);
      if (zone && zone.deliveryDays.express <= 2) {
        options.push('Next Day Delivery (if ordered before 2 PM)');
      }
    }
    
    return options;
  }

  /**
   * Validate shipping address
   */
  validateShippingAddress(address: ShippingAddress): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!address.street.trim()) {
      errors.push('Street address is required');
    }

    if (!address.city.trim()) {
      errors.push('City is required');
    }

    if (!address.state.trim()) {
      errors.push('State is required');
    }

    if (!address.postcode.trim()) {
      errors.push('Postcode is required');
    }

    if (!address.country.trim()) {
      errors.push('Country is required');
    }

    // Validate Australian postcode format
    if (address.country.toLowerCase() === 'australia' && address.postcode) {
      const postcodeRegex = /^[0-9]{4}$/;
      if (!postcodeRegex.test(address.postcode)) {
        errors.push('Invalid Australian postcode format');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get shipping zone information
   */
  getShippingZoneInfo(state: string): ShippingZone | null {
    return shippingZones.find(zone => 
      zone.states.includes(state.toUpperCase())
    ) || null;
  }

  /**
   * Calculate bulk shipping discount
   */
  calculateBulkDiscount(itemCount: number): number {
    if (itemCount >= 10) return 0.15; // 15% discount
    if (itemCount >= 5) return 0.10;  // 10% discount
    if (itemCount >= 3) return 0.05;  // 5% discount
    return 0;
  }
}

// Export singleton instance
export const shippingCalculator = ShippingCalculator.getInstance();

// Utility functions
export function formatShippingPrice(price: number): string {
  return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
}

export function formatDeliveryDays(days: number): string {
  if (days === 1) return '1 business day';
  if (days === 0) return 'Same day';
  return `${days} business days`;
}

export function isRemoteArea(state: string): boolean {
  const zone = shippingZones.find(z => z.states.includes(state.toUpperCase()));
  return zone?.name === 'Remote Areas';
}
