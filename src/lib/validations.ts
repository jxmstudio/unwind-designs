import { z } from "zod";

// User registration schema
export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Newsletter signup schema (basic version)
export const basicNewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

// Product review schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(1000, "Comment must be less than 1000 characters"),
  productId: z.string().min(1, "Product ID is required"),
});

// Checkout form schema
export const checkoutSchema = z.object({
  // Billing information
  billingFirstName: z.string().min(2, "First name must be at least 2 characters"),
  billingLastName: z.string().min(2, "Last name must be at least 2 characters"),
  billingEmail: z.string().email("Please enter a valid email address"),
  billingPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  billingAddress: z.string().min(5, "Address must be at least 5 characters"),
  billingCity: z.string().min(2, "City must be at least 2 characters"),
  billingState: z.string().min(2, "State must be at least 2 characters"),
  billingZipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  billingCountry: z.string().min(2, "Country must be at least 2 characters"),

  // Shipping information
  sameAsBilling: z.boolean(),
  shippingFirstName: z.string().optional(),
  shippingLastName: z.string().optional(),
  shippingAddress: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingState: z.string().optional(),
  shippingZipCode: z.string().optional(),
  shippingCountry: z.string().optional(),

  // Payment information
  cardNumber: z.string().min(13, "Card number must be at least 13 characters").max(19, "Card number must be less than 19 characters"),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Please enter a valid expiry date (MM/YY)"),
  cardCvc: z.string().min(3, "CVC must be at least 3 characters").max(4, "CVC must be less than 4 characters"),
  cardName: z.string().min(2, "Cardholder name must be at least 2 characters"),

  // Terms and conditions
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
  marketingEmails: z.boolean().optional(),
}).refine((data) => {
  if (!data.sameAsBilling) {
    return data.shippingFirstName && data.shippingLastName && data.shippingAddress && 
           data.shippingCity && data.shippingState && data.shippingZipCode && data.shippingCountry;
  }
  return true;
}, {
  message: "Please fill in all shipping information",
  path: ["shippingAddress"],
});

// Product search schema
export const productSearchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  category: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  sortBy: z.enum(["price-low", "price-high", "rating", "newest", "featured"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

// User profile update schema
export const profileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  avatar: z.string().optional(),
});

// Address schema
export const addressSchema = z.object({
  type: z.enum(["billing", "shipping"]),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  company: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  isDefault: z.boolean().optional(),
});

// Password change schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match",
  path: ["confirmNewPassword"],
});

// Enhanced validation schemas
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  csrfToken: z.string().min(1, "CSRF token is required"),
});

export const startBuildFormSchema = z.object({
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Please provide more details about your project").max(1000, "Message is too long"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  csrfToken: z.string().min(1, "CSRF token is required"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  preferences: z.array(z.string()).optional(),
  csrfToken: z.string().min(1, "CSRF token is required"),
});

export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required").max(100, "Search query is too long"),
  category: z.string().optional(),
  priceRange: z.object({
    min: z.number().min(0, "Minimum price must be 0 or greater"),
    max: z.number().min(0, "Maximum price must be 0 or greater"),
  }).optional(),
  sortBy: z.enum(["price", "name", "rating", "createdAt", "popularity"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// CSRF Protection
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken;
}

// Rate Limiting
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export class RateLimiter {
  private store: RateLimitStore = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.store[identifier];

    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.config.windowMs,
      };
      return true;
    }

    if (record.count >= this.config.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const record = this.store[identifier];
    if (!record || Date.now() > record.resetTime) {
      return this.config.maxRequests;
    }
    return Math.max(0, this.config.maxRequests - record.count);
  }

  getResetTime(identifier: string): number {
    const record = this.store[identifier];
    return record ? record.resetTime : Date.now();
  }

  cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

// Input Sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\-\(\)\s]/g, '').trim();
}

// Validation Helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export function validatePostcode(postcode: string): boolean {
  // Australian postcode validation (4 digits)
  const postcodeRegex = /^[0-9]{4}$/;
  return postcodeRegex.test(postcode);
}

export function validateABN(abn: string): boolean {
  // Australian Business Number validation (11 digits)
  const abnRegex = /^[0-9]{11}$/;
  return abnRegex.test(abn);
}

// Error Messages
export const validationMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
  invalidFormat: "Invalid format",
  passwordMismatch: "Passwords do not match",
  invalidPhone: "Please enter a valid phone number",
  invalidPostcode: "Please enter a valid postcode",
  invalidABN: "Please enter a valid ABN",
  rateLimitExceeded: "Too many requests. Please try again later.",
  csrfError: "Security validation failed. Please refresh the page and try again.",
} as const;

// Form Validation Results
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
}

// Export types
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type NewsletterFormData = z.infer<typeof basicNewsletterSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type ProductSearchFormData = z.infer<typeof productSearchSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type EnhancedContactFormData = z.infer<typeof contactFormSchema>;
export type StartBuildFormData = z.infer<typeof startBuildFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type SearchData = z.infer<typeof searchSchema>;
