// BigPost API Validation Schemas using Zod
// Mirrors the BigPost Swagger specification exactly

import { z } from 'zod';
import { JobType, ItemType, StateCode } from '@/types/bigpost';

// State code validation
const stateCodeSchema = z.enum(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']);

// Locality validation
export const localitySchema = z.object({
  Id: z.number().int().optional(),
  Suburb: z.string().max(30, 'Suburb must be 30 characters or less').min(1, 'Suburb is required'),
  Postcode: z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits'),
  State: stateCodeSchema
});

// Location model validation
export const apiLocationModelSchema = z.object({
  Name: z.string().max(255, 'Name must be 255 characters or less').min(1, 'Name is required'),
  Address: z.string().max(30, 'Address must be 30 characters or less').min(1, 'Address is required'),
  AddressLineTwo: z.string().max(30, 'Address line two must be 30 characters or less').optional(),
  LocalityId: z.number().int().optional(),
  Locality: localitySchema.optional()
}).refine(
  (data) => data.LocalityId || data.Locality,
  {
    message: 'Either LocalityId or Locality must be provided',
    path: ['LocalityId']
  }
);

// Item model validation
export const apiItemModelSchema = z.object({
  ItemType: z.nativeEnum(ItemType),
  Description: z.string().max(50, 'Description must be 50 characters or less').min(1, 'Description is required'),
  Quantity: z.number().int().positive('Quantity must be a positive integer'),
  Height: z.number().positive('Height must be positive'),
  Width: z.number().positive('Width must be positive'),
  Length: z.number().positive('Length must be positive'),
  Weight: z.number().positive('Weight must be positive'),
  Consolidatable: z.boolean().optional()
});

// Job type validation
export const jobTypeSchema = z.nativeEnum(JobType);

// Quote request validation - Updated to match API documentation
export const getQuoteRequestSchema = z.object({
  JobType: jobTypeSchema.optional(), // Single integer, not array - if left blank, quotes for all job types will be returned
  BuyerIsBusiness: z.boolean().optional(), // must be false for Home Delivery (JobType=3)
  BuyerHasForklift: z.boolean().optional(),
  ReturnAuthorityToLeaveOptions: z.boolean().optional(), // if true, provides quotes for services where goods can be left without signature (items must be 40kg or less)
  JobDate: z.string().datetime().optional(), // date for job pickup
  DepotId: z.number().int().optional(), // Big Post ID of depot, if blank closest depot to buyer will be used
  PickupLocation: apiLocationModelSchema,
  BuyerLocation: apiLocationModelSchema,
  Items: z.array(apiItemModelSchema).min(1, 'At least one item is required')
}).refine(
  (data) => {
    // If JobType is HOME_DELIVERY (3), BuyerIsBusiness must be false
    if (data.JobType === JobType.HOME_DELIVERY && data.BuyerIsBusiness === true) {
      return false;
    }
    return true;
  },
  {
    message: 'Home delivery jobs require BuyerIsBusiness to be false',
    path: ['BuyerIsBusiness']
  }
);

// Job creation request validation - Updated to match API documentation
export const createJobRequestSchema = z.object({
  ContactName: z.string().max(50, 'Contact name must be 50 characters or less').min(1, 'Contact name is required'),
  BuyerEmail: z.string().regex(
    /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    'Email must match Big Post format: \\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'
  ),
  BuyerMobilePhone: z.string().max(10, 'Mobile phone must be 10 characters or less').optional(),
  BuyerOtherPhone: z.string().max(10, 'Other phone must be 10 characters or less').optional(),
  CarrierId: z.string().min(1, 'Carrier ID is required'),
  Reference: z.string().max(50, 'Reference must be 50 characters or less').optional(),
  JobType: jobTypeSchema, // Single job type, not array
  DepotId: z.number().int().optional(),
  ContainsDangerousGoods: z.boolean(),
  BuyerHasForklift: z.boolean(),
  HasDeclaredCarParts: z.boolean(),
  SpecialInstructions: z.string().optional(),
  PickupLocation: apiLocationModelSchema,
  BuyerLocation: apiLocationModelSchema,
  Items: z.array(apiItemModelSchema).min(1, 'At least one item is required'),
  AuthorityToLeave: z.boolean(),
  ServiceCode: z.string().optional(), // pass from chosen quote if provided
  SourceType: z.number().int()
});

// Suburb search validation
export const suburbSearchRequestSchema = z.object({
  Query: z.string().min(1, 'Search query is required'),
  State: stateCodeSchema.optional()
});

// Depot search validation
export const depotSearchRequestSchema = z.object({
  BuyerLocation: apiLocationModelSchema,
  RadiusKm: z.number().positive().optional()
});

// Job status validation
export const jobStatusRequestSchema = z.object({
  JobIds: z.array(z.number().int().positive()).min(1, 'At least one job ID is required')
});

// Client-side form validation schemas
export const addressFormDataSchema = z.object({
  name: z.string().max(255, 'Name must be 255 characters or less').min(1, 'Name is required'),
  address: z.string().max(30, 'Address must be 30 characters or less').min(1, 'Address is required'),
  addressLineTwo: z.string().max(30, 'Address line two must be 30 characters or less').optional(),
  suburb: z.string().max(30, 'Suburb must be 30 characters or less').min(1, 'Suburb is required'),
  postcode: z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits'),
  state: stateCodeSchema,
  localityId: z.number().int().optional()
});

export const itemFormDataSchema = z.object({
  itemType: z.nativeEnum(ItemType),
  description: z.string().max(50, 'Description must be 50 characters or less').min(1, 'Description is required'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  height: z.number().positive('Height must be positive'),
  width: z.number().positive('Width must be positive'),
  length: z.number().positive('Length must be positive'),
  weight: z.number().positive('Weight must be positive'),
  consolidatable: z.boolean().optional()
});

export const shippingCalculatorFormDataSchema = z.object({
  pickupLocation: addressFormDataSchema,
  buyerLocation: addressFormDataSchema,
  items: z.array(itemFormDataSchema).min(1, 'At least one item is required'),
  jobType: jobTypeSchema.optional(), // Single integer, not array
  buyerIsBusiness: z.boolean().optional(),
  buyerHasForklift: z.boolean().optional(),
  returnAuthorityToLeaveOptions: z.boolean().optional(),
  jobDate: z.string().datetime().optional(),
  depotId: z.number().int().optional()
}).refine(
  (data) => {
    // If JobType is HOME_DELIVERY (3), BuyerIsBusiness must be false
    if (data.jobType === JobType.HOME_DELIVERY && data.buyerIsBusiness === true) {
      return false;
    }
    return true;
  },
  {
    message: 'Home delivery jobs require BuyerIsBusiness to be false',
    path: ['buyerIsBusiness']
  }
);

// Utility functions for validation
export function validateAustralianPostcode(postcode: string): boolean {
  return /^\d{4}$/.test(postcode);
}

export function validateStateCode(state: string): state is StateCode {
  return Object.values(StateCode).includes(state as StateCode);
}

export function sanitizeString(str: string, maxLength: number): string {
  return str.substring(0, maxLength).trim();
}

export function stripEmptyOptionalFields<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const cleaned = stripEmptyOptionalFields(value);
        if (Object.keys(cleaned).length > 0) {
          result[key as keyof T] = cleaned as T[keyof T];
        }
      } else if (Array.isArray(value) && value.length > 0) {
        result[key as keyof T] = value;
      } else if (!Array.isArray(value)) {
        result[key as keyof T] = value;
      }
    }
  }
  
  return result;
}

// Type exports for use in components
export type AddressFormData = z.infer<typeof addressFormDataSchema>;
export type ItemFormData = z.infer<typeof itemFormDataSchema>;
export type ShippingCalculatorFormData = z.infer<typeof shippingCalculatorFormDataSchema>;
export type GetQuoteRequest = z.infer<typeof getQuoteRequestSchema>;
export type CreateJobRequest = z.infer<typeof createJobRequestSchema>;
export type SuburbSearchRequest = z.infer<typeof suburbSearchRequestSchema>;
export type DepotSearchRequest = z.infer<typeof depotSearchRequestSchema>;
export type JobStatusRequest = z.infer<typeof jobStatusRequestSchema>;
