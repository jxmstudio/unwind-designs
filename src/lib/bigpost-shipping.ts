// Big Post API Integration for Real-time Shipping Quotes
// Official Big Post shipping API client for Australia-wide delivery
// Based on Swagger API: https://api.bigpost.com.au/swagger/index.html

// Enums from Swagger
export enum JobType {
  DELIVERY = 0,
  PICKUP = 1
}

export enum DeliveryType {
  DELIVERY = 0,
  PICKUP = 1,
  RETURN = 2
}

export enum ApiItemType {
  PALLET = 0,
  CARTON = 1,
  ENVELOPE = 2,
  TUBE = 3,
  SATCHEL = 4,
  BAG = 5,
  ROLL = 6,
  BUNDLE = 7,
  SKID = 8,
  OTHER = 9
}

export enum SourceType {
  BIGPOST_API = 0,
  WORDPRESS = 2,
  SHOPIFY = 3,
  CUSTOM_INTEGRATION_SYSTEM = 4,
  PRESTASHOP = 5
}

// Location model matching Swagger schema
export interface ApiLocationModel {
  name: string; // required
  address: string; // required
  addressLineTwo?: string; // nullable
  localityId?: number; // int32, nullable
  locality?: {
    suburb: string;
    postcode: string;
    state: string;
  };
}

// Item model matching Swagger schema
export interface ApiItemModel {
  itemType: ApiItemType; // int enum with 10 values
  description: string; // required
  quantity: number;
  height: number; // cm
  width: number; // cm
  length: number; // cm
  weight: number; // kg
  consolidatable: boolean;
  isMhp?: boolean; // default false; meaning fragile/liquid/uneven/etc.
}

// Quote request matching Swagger schema
export interface QuoteRequest {
  jobType: JobType[]; // enum, Array [2]
  buyerIsBusiness: boolean;
  buyerHasForklift: boolean;
  returnAuthorityToLeaveOptions: boolean;
  jobDate: string; // ISO datetime
  depotId?: number; // int64, nullable
  pickupLocation: ApiLocationModel; // required
  buyerLocation: ApiLocationModel; // required
  items?: ApiItemModel[]; // array, nullable
}

// Job booking model for after payment
export interface ApiJobModel {
  contactName: string; // required
  buyerEmail?: string; // nullable
  buyerMobilePhone?: string; // nullable
  buyerOtherPhone?: string; // nullable
  carrierId: number; // int, required — Big Post's carrier ID
  reference?: string; // nullable — use our order id
  jobType: DeliveryType[]; // enum, Array [3]
  depotId?: number; // nullable
  containsDangerousGoods: boolean;
  buyerHasForklift: boolean;
  hasDeclaredCarParts: boolean;
  specialInstructions?: string; // nullable
  pickupLocation: ApiLocationModel; // required
  buyerLocation: ApiLocationModel; // required
  items: ApiItemModel[]; // required
  authorityToLeave: boolean; // only true if the chosen quote shows ATL is applicable
  serviceCode?: string; // nullable — pass from chosen quote (if provided)
  sourceType: SourceType; // int enum
}

// Response models
export interface JobCreatedModel {
  jobId: number; // int64
  carrierConsignmentNumber?: string;
}

export interface JobCreatedModelTransferModel {
  object?: JobCreatedModel;
  errors?: any[]; // array of validation results
}

// Legacy interfaces for backward compatibility
export interface BigPostAddress {
  address_line: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export interface BigPostItem {
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  product_id?: string;
  description?: string;
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
  apiToken: process.env.BIGPOST_API_KEY || process.env.BIG_POST_API_KEY || '',
  timeout: 15000, // 15 seconds for shipping quotes
  retries: 2,
  // Default pickup location for Unwind Designs
  defaultPickupLocation: {
    name: "Unwind Designs",
    address: "123 Workshop Street",
    addressLineTwo: "",
    locality: {
      suburb: "Melbourne",
      postcode: "3000",
      state: "VIC"
    }
  }
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
if (!process.env.BIGPOST_API_KEY && !process.env.BIG_POST_API_KEY && process.env.NODE_ENV === 'production') {
  console.warn('BIGPOST_API_KEY or BIG_POST_API_KEY is not set. BigPost shipping will not be available.');
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
   * Get shipping quotes using the new Swagger API
   */
  async getSwaggerQuotes(
    buyerLocation: ApiLocationModel,
    items: ApiItemModel[],
    options: {
      pickupLocation?: ApiLocationModel;
      jobDate?: string;
      buyerIsBusiness?: boolean;
      buyerHasForklift?: boolean;
      returnAuthorityToLeaveOptions?: boolean;
    } = {}
  ): Promise<{
    success: boolean;
    quotes?: any[];
    error?: string;
  }> {
    // Return fallback rates if API token is missing
    if (!BIGPOST_CONFIG.apiToken) {
      console.warn('BigPost API token not configured, returning fallback shipping rates');
      return this.getFallbackShippingRates(
        this.convertApiLocationToBigPostAddress(buyerLocation),
        this.convertApiItemsToBigPostItems(items)
      );
    }

    try {
      // Quote request structure based on BigPost Swagger API documentation
      const quoteRequest: QuoteRequest = {
        jobType: [1, 2], // Depot and Direct
        buyerIsBusiness: options.buyerIsBusiness || false,
        buyerHasForklift: options.buyerHasForklift || false,
        returnAuthorityToLeaveOptions: options.returnAuthorityToLeaveOptions || true,
        jobDate: options.jobDate || new Date().toISOString(),
        pickupLocation: options.pickupLocation || BIGPOST_CONFIG.defaultPickupLocation,
        buyerLocation: buyerLocation,
        items: items
      };

      console.log('BigPost API request:', JSON.stringify(quoteRequest, null, 2));

      const response = await this.makeRequest<any>('/api/quote', {
        method: 'POST',
        body: JSON.stringify(quoteRequest),
      });

      console.log('BigPost API response:', response);

      // Transform response to our format
      if (response && response.quotes) {
        const transformedQuotes = response.quotes.map((quote: any) => ({
          service: quote.serviceName || quote.service || 'Standard Shipping',
          price: quote.price || quote.totalPrice || 0,
          deliveryDays: quote.estimatedDeliveryDays || quote.deliveryDays || 3,
          description: quote.description || 'BigPost delivery',
          carrier: quote.carrierName || quote.carrier || 'BigPost',
          restrictions: quote.restrictions || [],
          source: 'bigpost',
          carrierId: quote.carrierId,
          serviceCode: quote.serviceCode,
          authorityToLeave: quote.authorityToLeave || false,
          originalQuote: quote
        }));

        return {
          success: true,
          quotes: transformedQuotes,
        };
      } else {
        return {
          success: false,
          error: 'No quotes returned from BigPost API',
        };
      }
      
    } catch (error) {
      console.error('Big Post Swagger quote request failed:', error);
      
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
   * Book a job after payment success
   */
  async bookJob(
    jobData: ApiJobModel
  ): Promise<{
    success: boolean;
    jobId?: number;
    carrierConsignmentNumber?: string;
    error?: string;
  }> {
    if (!BIGPOST_CONFIG.apiToken) {
      return {
        success: false,
        error: 'BigPost API token not configured',
      };
    }

    try {
      // Job booking structure based on search results
      const jobRequest = {
        orderDetails: {
          contactName: jobData.contactName,
          buyerEmail: jobData.buyerEmail,
          buyerMobilePhone: jobData.buyerMobilePhone,
          reference: jobData.reference,
          items: jobData.items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            weight: item.weight,
            length: item.length,
            width: item.width,
            height: item.height,
            itemType: item.itemType
          })),
          pickupLocation: {
            name: jobData.pickupLocation.name,
            address: jobData.pickupLocation.address,
            suburb: jobData.pickupLocation.locality?.suburb,
            postcode: jobData.pickupLocation.locality?.postcode,
            state: jobData.pickupLocation.locality?.state
          },
          deliveryLocation: {
            name: jobData.buyerLocation.name,
            address: jobData.buyerLocation.address,
            suburb: jobData.buyerLocation.locality?.suburb,
            postcode: jobData.buyerLocation.locality?.postcode,
            state: jobData.buyerLocation.locality?.state
          },
          jobType: 'delivery',
          authorityToLeave: jobData.authorityToLeave,
          specialInstructions: jobData.specialInstructions
        }
      };

      const response = await this.makeRequest<any>('/book-job', {
        method: 'POST',
        body: JSON.stringify(jobRequest),
      });

      if (response.jobId || response.id) {
        return {
          success: true,
          jobId: response.jobId || response.id,
          carrierConsignmentNumber: response.trackingNumber || response.consignmentNumber,
        };
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to create job',
        };
      }
      
    } catch (error) {
      console.error('Big Post job booking failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to book job',
      };
    }
  }

  /**
   * Get shipping quotes for items to a destination (legacy method)
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
      const request = {
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
   * Convert API location to legacy BigPost address
   */
  private convertApiLocationToBigPostAddress(location: ApiLocationModel): BigPostAddress {
    return {
      address_line: location.address,
      suburb: location.locality?.suburb || '',
      state: location.locality?.state || '',
      postcode: location.locality?.postcode || '',
      country: 'AU'
    };
  }

  /**
   * Convert API items to legacy BigPost items
   */
  private convertApiItemsToBigPostItems(items: ApiItemModel[]): BigPostItem[] {
    return items.map(item => ({
      length: item.length,
      width: item.width,
      height: item.height,
      weight: item.weight,
      quantity: item.quantity,
      description: item.description
    }));
  }

  /**
   * Convert cart items to API items
   */
  private convertCartItemsToApiItems(cartItems: Array<{
    id: string;
    name: string;
    quantity: number;
    weight?: number;
    dimensions?: { length: number; width: number; height: number };
    shipClass?: 'standard' | 'oversized' | 'freight';
  }>): ApiItemModel[] {
    return cartItems.map(item => ({
      itemType: this.getApiItemType(item.shipClass || 'standard'),
      description: item.name,
      quantity: item.quantity,
      height: item.dimensions?.height || 10,
      width: item.dimensions?.width || 20,
      length: item.dimensions?.length || 30,
      weight: item.weight || 1,
      consolidatable: true,
      isMhp: item.shipClass === 'oversized' || item.shipClass === 'freight'
    }));
  }

  /**
   * Get API item type based on ship class
   */
  private getApiItemType(shipClass: string): ApiItemType {
    switch (shipClass) {
      case 'oversized':
      case 'freight':
        return ApiItemType.PALLET;
      case 'standard':
      default:
        return ApiItemType.CARTON;
    }
  }

  /**
   * Convert shipping address to API location
   */
  convertShippingAddressToApiLocation(address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  }): ApiLocationModel {
    // Ensure address is properly formatted for BigPost API
    const formattedAddress = address.street.substring(0, 30); // Max 30 characters
    const formattedSuburb = address.city.substring(0, 30); // Max 30 characters
    
    return {
      name: `${formattedSuburb} ${address.postcode}`, // Max 255 characters
      address: formattedAddress,
      locality: {
        suburb: formattedSuburb,
        postcode: address.postcode,
        state: address.state.toUpperCase() // Ensure state is uppercase
      }
    };
  }

  /**
   * Get shipping quotes for cart items using new Swagger API
   */
  async getSwaggerQuotesForCart(
    deliveryAddress: {
      street: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
    },
    cartItems: Array<{
      id: string;
      name: string;
      quantity: number;
      weight?: number;
      dimensions?: { length: number; width: number; height: number };
      shipClass?: 'standard' | 'oversized' | 'freight';
    }>,
    totalValue: number,
    options: {
      buyerIsBusiness?: boolean;
      buyerHasForklift?: boolean;
      returnAuthorityToLeaveOptions?: boolean;
    } = {}
  ): Promise<{
    success: boolean;
    quotes?: any[];
    error?: string;
  }> {
    try {
      const buyerLocation = this.convertShippingAddressToApiLocation(deliveryAddress);
      const apiItems = this.convertCartItemsToApiItems(cartItems);

      return await this.getSwaggerQuotes(buyerLocation, apiItems, {
        ...options,
        returnAuthorityToLeaveOptions: options.returnAuthorityToLeaveOptions ?? true
      });
      
    } catch (error) {
      console.error('Cart Swagger shipping quote failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get shipping quotes',
      };
    }
  }

  /**
   * Get shipping quotes for cart items (legacy method)
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
   * Get job status
   */
  async getJobStatus(jobId: number): Promise<{
    success: boolean;
    status?: string;
    trackingNumber?: string;
    error?: string;
  }> {
    if (!BIGPOST_CONFIG.apiToken) {
      return {
        success: false,
        error: 'BigPost API token not configured',
      };
    }

    try {
      const response = await this.makeRequest<any>(`/job-status/${jobId}`, {
        method: 'GET',
      });

      return {
        success: true,
        status: response.status,
        trackingNumber: response.trackingNumber,
      };
      
    } catch (error) {
      console.error('Big Post job status request failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get job status',
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
