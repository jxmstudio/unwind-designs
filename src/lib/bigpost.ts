// BigPost API Server-side Helpers
// Handles all communication with BigPost API from server-side only

import { 
  GetQuoteRequest, 
  GetQuoteResponse, 
  CreateJobRequest, 
  CreateJobResponse,
  SuburbSearchRequest,
  SuburbSearchResponse,
  DepotSearchRequest,
  DepotSearchResponse,
  JobStatusRequest,
  JobStatusResponse,
  BigPostErrorResponse
} from '@/types/bigpost';

// Configuration
const BIGPOST_CONFIG = {
  baseUrl: process.env.BIGPOST_BASE_URL || process.env.BIGPOST_API_URL || 'https://app.bigpost.com.au',
  apiKey: process.env.BIGPOST_API_KEY || process.env.BIG_POST_API_KEY || process.env.BIG_POST_API_TOKEN || '',
  timeout: 30000, // 30 seconds
  retries: 2
};

// Validate configuration (only at runtime, not build time)
if (!BIGPOST_CONFIG.apiKey && process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
  console.warn('BIGPOST_API_KEY, BIG_POST_API_KEY, or BIG_POST_API_TOKEN environment variable is not set. BigPost features will not be available.');
}

// Error classes
export class BigPostAPIError extends Error {
  constructor(
    message: string, 
    public statusCode?: number, 
    public response?: any
  ) {
    super(message);
    this.name = 'BigPostAPIError';
  }
}

export class BigPostValidationError extends Error {
  constructor(
    message: string, 
    public validationErrors: string[]
  ) {
    super(message);
    this.name = 'BigPostValidationError';
  }
}

// Rate limiting
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests = 100; // requests per minute
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

// Core API client
class BigPostAPIClient {
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: any
  ): Promise<T> {
    // Check rate limiting
    if (!rateLimiter.canMakeRequest()) {
      throw new BigPostAPIError('Rate limit exceeded. Please try again later.', 429);
    }

    const url = `${BIGPOST_CONFIG.baseUrl}${endpoint}`;
    
    let lastError: Error = new Error('Unknown error');
    
    // Retry logic
    for (let attempt = 1; attempt <= BIGPOST_CONFIG.retries + 1; attempt++) {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${BIGPOST_CONFIG.apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Unwind-Designs/1.0',
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: AbortSignal.timeout(BIGPOST_CONFIG.timeout),
        });

        // Handle HTTP errors
        if (!response.ok) {
          const errorText = await response.text();
          let errorData: any;
          
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { message: errorText };
          }

          if (response.status === 401) {
            throw new BigPostAPIError('Invalid API key', 401, errorData);
          }
          
          if (response.status === 422) {
            throw new BigPostValidationError(
              'Validation failed',
              errorData.ValidationErrors || [errorData.message || 'Validation error']
            );
          }
          
          if (response.status === 429) {
            throw new BigPostAPIError('Rate limit exceeded', 429, errorData);
          }
          
          throw new BigPostAPIError(
            `API request failed: ${response.status} ${response.statusText}`,
            response.status,
            errorData
          );
        }

        const data = await response.json();
        return data;
        
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on validation or auth errors
        if (error instanceof BigPostValidationError || 
            (error instanceof BigPostAPIError && error.statusCode === 401)) {
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

    throw new BigPostAPIError(
      `Request failed after ${BIGPOST_CONFIG.retries + 1} attempts: ${lastError.message}`,
      500
    );
  }

  // Get shipping quotes
  async getQuote(request: GetQuoteRequest): Promise<GetQuoteResponse> {
    try {
      console.log('BigPost getQuote request:', JSON.stringify(request, null, 2));
      
      const response = await this.makeRequest<GetQuoteResponse>('/api/getquote', 'POST', request);
      
      console.log('BigPost getQuote response:', JSON.stringify(response, null, 2));
      
      return response;
    } catch (error) {
      console.error('BigPost getQuote error:', error);
      throw error;
    }
  }

  // Create a job
  async createJob(request: CreateJobRequest): Promise<CreateJobResponse> {
    try {
      console.log('BigPost createJob request:', JSON.stringify(request, null, 2));
      
      const response = await this.makeRequest<CreateJobResponse>('/api/createjob', 'POST', request);
      
      console.log('BigPost createJob response:', JSON.stringify(response, null, 2));
      
      return response;
    } catch (error) {
      console.error('BigPost createJob error:', error);
      throw error;
    }
  }

  // Search suburbs
  async searchSuburbs(request: SuburbSearchRequest): Promise<SuburbSearchResponse> {
    try {
      const queryParams = new URLSearchParams({
        query: request.Query,
        ...(request.State && { state: request.State })
      });
      
      const response = await this.makeRequest<SuburbSearchResponse>(
        `/api/searchsuburbs?${queryParams}`,
        'GET'
      );
      
      return response;
    } catch (error) {
      console.error('BigPost searchSuburbs error:', error);
      throw error;
    }
  }

  // Find closest depots
  async findClosestDepots(request: DepotSearchRequest): Promise<DepotSearchResponse> {
    try {
      const response = await this.makeRequest<DepotSearchResponse>('/api/closestdepots', 'POST', request);
      
      return response;
    } catch (error) {
      console.error('BigPost findClosestDepots error:', error);
      throw error;
    }
  }

  // Get job status history
  async getJobStatusHistory(request: JobStatusRequest): Promise<JobStatusResponse> {
    try {
      const response = await this.makeRequest<JobStatusResponse>('/api/jobstatushistory', 'POST', request);
      
      return response;
    } catch (error) {
      console.error('BigPost getJobStatusHistory error:', error);
      throw error;
    }
  }

  // Get current job status
  async getCurrentJobStatus(request: JobStatusRequest): Promise<JobStatusResponse> {
    try {
      const response = await this.makeRequest<JobStatusResponse>('/api/currentjobstatus', 'POST', request);
      
      return response;
    } catch (error) {
      console.error('BigPost getCurrentJobStatus error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const bigPostAPI = new BigPostAPIClient();

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
  return /^\d{4}$/.test(postcode);
}

export function isValidStateCode(state: string): boolean {
  return ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'].includes(state);
}

// Default pickup location for Unwind Designs
export const DEFAULT_PICKUP_LOCATION = {
  Name: 'Unwind Designs',
  Address: '123 Workshop Street',
  AddressLineTwo: '',
  Locality: {
    Suburb: 'Melbourne',
    Postcode: '3000',
    State: 'VIC' as const
  }
};

// Error handling utilities
export function handleBigPostError(error: unknown): {
  statusCode: number;
  message: string;
  validationErrors?: string[];
} {
  if (error instanceof BigPostValidationError) {
    return {
      statusCode: 422,
      message: error.message,
      validationErrors: error.validationErrors
    };
  }
  
  if (error instanceof BigPostAPIError) {
    return {
      statusCode: error.statusCode || 500,
      message: error.message
    };
  }
  
  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message
    };
  }
  
  return {
    statusCode: 500,
    message: 'An unknown error occurred'
  };
}
