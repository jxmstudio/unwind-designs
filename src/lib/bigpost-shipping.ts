// Big Post API Integration for Real-time Shipping Quotes
// Official Big Post shipping API client for Australia-wide delivery

export interface BigPostAddress {
  address_line: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string; // Default: "AU"
}

export interface BigPostItem {
  length: number; // cm
  width: number;  // cm
  height: number; // cm
  weight: number; // kg
  quantity: number;
  product_id?: string;
  description?: string;
}

export interface BigPostQuoteRequest {
  pickup_address: BigPostAddress;
  delivery_address: BigPostAddress;
  items: BigPostItem[];
  service_types?: string[]; // e.g., ["standard", "express"]
  insurance_value?: number;
  dangerous_goods?: boolean;
  fragile?: boolean;
}

export interface BigPostQuoteResponse {
  success: boolean;
  quotes?: BigPostQuote[];
  error?: string;
  request_id?: string;
}

export interface BigPostQuote {
  service_type: string;
  service_name: string;
  price: number;
  gst: number;
  total_price: number;
  estimated_delivery_days: number;
  estimated_delivery_date: string;
  carrier: string;
  description: string;
  restrictions?: string[];
  tracking_available: boolean;
  insurance_included: boolean;
  signature_required: boolean;
}

export interface BigPostTrackingResponse {
  success: boolean;
  tracking_info?: {
    status: string;
    description: string;
    events: Array<{
      timestamp: string;
      status: string;
      location: string;
      description: string;
    }>;
  };
  error?: string;
}

// Configuration
const BIGPOST_CONFIG = {
  baseUrl: process.env.BIGPOST_API_URL || 'https://api.bigpost.com.au',
  apiToken: process.env.BIG_POST_API_TOKEN || '',
  timeout: 15000, // 15 seconds for shipping quotes
  retries: 2,
};

// Log configuration for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('🚚 BigPost Config:', {
    baseUrl: BIGPOST_CONFIG.baseUrl,
    hasToken: !!BIGPOST_CONFIG.apiToken,
    tokenLength: BIGPOST_CONFIG.apiToken.length,
  });
}

// Validate BigPost configuration
if (!process.env.BIG_POST_API_TOKEN && process.env.NODE_ENV === 'production') {
  console.warn('BIG_POST_API_TOKEN is not set. BigPost shipping will not be available.');
}

// Unwind Designs pickup address (default)
const UNWIND_PICKUP_ADDRESS: BigPostAddress = {
  address_line: "123 Workshop Street", // Replace with actual address
  suburb: "Melbourne", // Replace with actual suburb
  state: "VIC", // Replace with actual state
  postcode: "3000", // Replace with actual postcode
  country: "AU"
};

// Error classes
export class BigPostError extends Error {
  constructor(message: string, public code?: string, public statusCode?: number) {
    super(message);
    this.name = 'BigPostError';
  }
}

export class BigPostRateLimitError extends BigPostError {
  constructor() {
    super('Rate limit exceeded. Please try again later.', 'RATE_LIMIT', 429);
  }
}

export class BigPostApiKeyError extends BigPostError {
  constructor() {
    super('Invalid API key. Please check your Big Post API token.', 'INVALID_API_KEY', 401);
  }
}

// Rate limiting
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests = 60; // requests per minute
  private readonly windowMs = 60000; // 1 minute

  canMakeRequest(key: string = 'default'): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove requests outside the time window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

const rateLimiter = new RateLimiter();

// API client class
export class BigPostClient {
  private static instance: BigPostClient;

  private constructor() {}

  static getInstance(): BigPostClient {
    if (!BigPostClient.instance) {
      BigPostClient.instance = new BigPostClient();
    }
    return BigPostClient.instance;
  }

  /**
   * Make authenticated API request
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Check rate limiting
    if (!rateLimiter.canMakeRequest()) {
      throw new BigPostRateLimitError();
    }

    const url = `${BIGPOST_CONFIG.baseUrl}${endpoint}`;
    
    let lastError: Error = new Error('Unknown error');
    
    // Retry logic
    for (let attempt = 1; attempt <= BIGPOST_CONFIG.retries + 1; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Authorization': `Bearer ${BIGPOST_CONFIG.apiToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Unwind-Designs/1.0',
            ...options.headers,
          },
          signal: AbortSignal.timeout(BIGPOST_CONFIG.timeout),
        });

        // Handle HTTP errors
        if (!response.ok) {
          if (response.status === 401) {
            throw new BigPostApiKeyError();
          }
          if (response.status === 429) {
            throw new BigPostRateLimitError();
          }
          
          const errorText = await response.text();
          throw new BigPostError(
            `API request failed: ${response.status} ${response.statusText}. ${errorText}`,
            'HTTP_ERROR',
            response.status
          );
        }

        const data = await response.json();
        return data;
        
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on authentication or rate limit errors
        if (error instanceof BigPostApiKeyError || error instanceof BigPostRateLimitError) {
          throw error;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === BIGPOST_CONFIG.retries + 1) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    throw new BigPostError(
      `Request failed after ${BIGPOST_CONFIG.retries + 1} attempts: ${lastError.message}`,
      'REQUEST_FAILED'
    );
  }

  /**
   * Get shipping quotes for items to a destination
   */
  async getShippingQuotes(
    deliveryAddress: BigPostAddress,
    items: BigPostItem[],
    options: {
      pickupAddress?: BigPostAddress;
      serviceTypes?: string[];
      insuranceValue?: number;
      fragile?: boolean;
    } = {}
  ): Promise<BigPostQuoteResponse> {
    // Return fallback rates if API token is missing
    if (!BIGPOST_CONFIG.apiToken) {
      console.warn('BigPost API token not configured, returning fallback shipping rates');
      return this.getFallbackShippingRates(deliveryAddress, items);
    }

    try {
      const request: BigPostQuoteRequest = {
        pickup_address: options.pickupAddress || UNWIND_PICKUP_ADDRESS,
        delivery_address: deliveryAddress,
        items: items,
        service_types: options.serviceTypes || ['standard', 'express'],
        insurance_value: options.insuranceValue,
        fragile: options.fragile,
      };

      const response = await this.makeRequest<BigPostQuoteResponse>('/v1/quotes', {
        method: 'POST',
        body: JSON.stringify(request),
      });

      return response;
      
    } catch (error) {
      console.error('Big Post quote request failed:', error);
      
      if (error instanceof BigPostError) {
        return {
          success: false,
          error: error.message,
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get fallback shipping rates when API is not available
   */
  private getFallbackShippingRates(
    deliveryAddress: BigPostAddress,
    items: BigPostItem[]
  ): BigPostQuoteResponse {
    // Use basic fallback rates without external dependencies
    
    // Calculate total weight
    const totalWeight = items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    
    // Determine shipping zone based on state
    const isRemoteArea = ['NT', 'TAS', 'WA'].includes(deliveryAddress.state.toUpperCase());
    const isInternational = deliveryAddress.country !== 'AU';
    
    const quotes: BigPostQuote[] = [];
    
    if (isInternational) {
      // Basic international rate
      const baseRate = 35.00;
      const weightSurcharge = Math.max(0, (totalWeight - 5) * 2);
      const finalPrice = baseRate + weightSurcharge;
      
      quotes.push({
        service_type: 'standard',
        service_name: 'International Standard',
        price: finalPrice,
        gst: 0, // No GST on international
        total_price: finalPrice,
        estimated_delivery_days: 14,
        estimated_delivery_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        carrier: 'Australia Post',
        description: 'Standard international shipping',
        restrictions: ['Subject to customs duties', 'Delivery times may vary'],
        tracking_available: true,
        insurance_included: false,
        signature_required: true
      });
    } else {
      // Australian domestic rates
      const standardBaseRate = isRemoteArea ? 25.00 : 12.00;
      const expressBaseRate = isRemoteArea ? 40.00 : 27.00;
      const standardDays = isRemoteArea ? 7 : 3;
      const expressDays = isRemoteArea ? 3 : 1;
      
      // Weight adjustments
      const weightSurcharge = totalWeight > 5 ? Math.min((totalWeight - 5) * 1.5, 20) : 0;
      
      // Standard shipping
      const standardPrice = standardBaseRate + weightSurcharge;
      quotes.push({
        service_type: 'standard',
        service_name: 'Standard Shipping',
        price: standardPrice,
        gst: standardPrice * 0.1,
        total_price: standardPrice * 1.1,
        estimated_delivery_days: standardDays,
        estimated_delivery_date: new Date(Date.now() + standardDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        carrier: 'Australia Post',
        description: `Standard delivery to ${deliveryAddress.state}`,
        restrictions: totalWeight > 30 ? ['Heavy items may require special handling'] : undefined,
        tracking_available: true,
        insurance_included: false,
        signature_required: false
      });
      
      // Express shipping
      const expressPrice = expressBaseRate + weightSurcharge;
      quotes.push({
        service_type: 'express',
        service_name: 'Express Shipping',
        price: expressPrice,
        gst: expressPrice * 0.1,
        total_price: expressPrice * 1.1,
        estimated_delivery_days: expressDays,
        estimated_delivery_date: new Date(Date.now() + expressDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        carrier: 'Australia Post',
        description: `Express delivery to ${deliveryAddress.state}`,
        restrictions: totalWeight > 30 ? ['Heavy items may require special handling'] : undefined,
        tracking_available: true,
        insurance_included: false,
        signature_required: true
      });
    }
    
    return {
      success: true,
      quotes: quotes,
      request_id: `fallback-${Date.now()}`
    };
  }

  /**
   * Get shipping quotes for cart items
   */
  async getQuotesForCart(
    deliveryAddress: BigPostAddress,
    cartItems: Array<{
      id: string;
      name: string;
      quantity: number;
      weight?: number;
      dimensions?: { length: number; width: number; height: number };
      shipClass?: 'standard' | 'oversized' | 'freight';
    }>,
    totalValue: number
  ): Promise<BigPostQuoteResponse> {
    try {
      // Convert cart items to Big Post items
      const bigPostItems: BigPostItem[] = cartItems.map(item => ({
        length: item.dimensions?.length || 30, // Default dimensions if not provided
        width: item.dimensions?.width || 20,
        height: item.dimensions?.height || 10,
        weight: item.weight || 1, // Default 1kg if not provided
        quantity: item.quantity,
        product_id: item.id,
        description: item.name,
      }));

      // Determine if items are fragile (flat packs are fragile)
      const hasFragileItems = cartItems.some(item => 
        item.name.toLowerCase().includes('flat pack') || 
        item.shipClass === 'oversized'
      );

      // Use fallback if API token is missing
      if (!BIGPOST_CONFIG.apiToken) {
        return this.getFallbackShippingRates(deliveryAddress, bigPostItems);
      }

      return await this.getShippingQuotes(deliveryAddress, bigPostItems, {
        insuranceValue: totalValue,
        fragile: hasFragileItems,
      });
      
    } catch (error) {
      console.error('Cart shipping quote failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get shipping quotes',
      };
    }
  }

  /**
   * Track a shipment
   */
  async trackShipment(trackingNumber: string): Promise<BigPostTrackingResponse> {
    try {
      const response = await this.makeRequest<BigPostTrackingResponse>(`/v1/tracking/${trackingNumber}`);
      return response;
      
    } catch (error) {
      console.error('Big Post tracking request failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to track shipment',
      };
    }
  }

  /**
   * Validate an Australian address
   */
  async validateAddress(address: BigPostAddress): Promise<{
    success: boolean;
    valid?: boolean;
    suggestions?: BigPostAddress[];
    error?: string;
  }> {
    try {
      const response = await this.makeRequest<{
        success: boolean;
        valid?: boolean;
        suggestions?: BigPostAddress[];
      }>('/v1/address/validate', {
        method: 'POST',
        body: JSON.stringify(address),
      });

      return response;
      
    } catch (error) {
      console.error('Address validation failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to validate address',
      };
    }
  }

  /**
   * Get available service types
   */
  async getServiceTypes(): Promise<{
    success: boolean;
    services?: Array<{
      code: string;
      name: string;
      description: string;
      max_weight: number;
      max_dimensions: { length: number; width: number; height: number };
    }>;
    error?: string;
  }> {
    try {
      const response = await this.makeRequest<{
        success: boolean;
        services?: Array<{
          code: string;
          name: string;
          description: string;
          estimatedDays: number;
          cost: number;
        }>;
      }>('/v1/services');

      // Transform the response to match the expected interface
      return {
        success: response.success,
        services: response.services?.map(service => ({
          code: service.code,
          name: service.name,
          description: service.description,
          max_weight: 50, // Default max weight
          max_dimensions: {
            length: 100,
            width: 100,
            height: 100
          }
        })),
        error: undefined
      };
      
    } catch (error) {
      console.error('Failed to get service types:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get service types',
      };
    }
  }
}

// Export singleton instance
export const bigPostClient = BigPostClient.getInstance();

// Utility functions
export function formatBigPostPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatDeliveryDays(days: number): string {
  if (days === 1) return '1 business day';
  if (days === 0) return 'Same day';
  return `${days} business days`;
}

export function isValidAustralianPostcode(postcode: string): boolean {
  return /^[0-9]{4}$/.test(postcode);
}

export function convertShippingAddressToBigPost(address: {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}): BigPostAddress {
  return {
    address_line: address.street,
    suburb: address.city,
    state: address.state,
    postcode: address.postcode,
    country: address.country.toUpperCase(),
  };
}

// Development helper
export function logBigPostConfig(): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('🚚 Big Post Config:', {
      baseUrl: BIGPOST_CONFIG.baseUrl,
      hasToken: !!BIGPOST_CONFIG.apiToken,
      tokenLength: BIGPOST_CONFIG.apiToken.length,
    });
  }
}
