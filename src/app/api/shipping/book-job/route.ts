// API route for booking BigPost jobs after payment success
// This route handles job creation with BigPost after Stripe payment is confirmed

import { NextRequest, NextResponse } from 'next/server';
import { bigPostClient, ApiJobModel, SourceType, DeliveryType } from '@/lib/bigpost-shipping';
import { getFeatureFlag } from '@/lib/server-feature-flags';
import { z } from 'zod';

// Validation schema for job booking request
const BookJobRequestSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  buyerEmail: z.string().email().optional(),
  buyerMobilePhone: z.string().optional(),
  buyerOtherPhone: z.string().optional(),
  selectedQuote: z.object({
    carrierId: z.number(),
    serviceCode: z.string().optional(),
    authorityToLeave: z.boolean(),
    originalQuote: z.any().optional()
  }),
  deliveryAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postcode: z.string().min(1, 'Postcode is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    weight: z.number().positive().optional(),
    dimensions: z.object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    }).optional(),
    shipClass: z.enum(['standard', 'oversized', 'freight']).optional(),
    price: z.number().positive(),
  })).min(1, 'At least one item is required'),
  specialInstructions: z.string().optional(),
  containsDangerousGoods: z.boolean().default(false),
  hasDeclaredCarParts: z.boolean().default(false),
});

type BookJobRequest = z.infer<typeof BookJobRequestSchema>;

interface BookJobResponse {
  success: boolean;
  jobId?: number;
  carrierConsignmentNumber?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = BookJobRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: validationResult.error.issues,
      }, { status: 400 });
    }

    const {
      orderId,
      contactName,
      buyerEmail,
      buyerMobilePhone,
      buyerOtherPhone,
      selectedQuote,
      deliveryAddress,
      items,
      specialInstructions,
      containsDangerousGoods,
      hasDeclaredCarParts
    } = validationResult.data;

    // Check if Big Post integration is enabled
    const bigPostEnabled = getFeatureFlag('FEATURE_BIG_POST_SHIPPING');
    
    if (!bigPostEnabled || (!process.env.BIGPOST_API_KEY && !process.env.BIG_POST_API_KEY)) {
      return NextResponse.json({
        success: false,
        error: 'BigPost shipping is not enabled or configured',
      }, { status: 400 });
    }

    try {
      // Convert items to API format
      const apiItems = items.map(item => ({
        itemType: getApiItemType(item.shipClass || 'standard'),
        description: item.name,
        quantity: item.quantity,
        height: item.dimensions?.height || 10,
        width: item.dimensions?.width || 20,
        length: item.dimensions?.length || 30,
        weight: item.weight || 1,
        consolidatable: true,
        isMhp: item.shipClass === 'oversized' || item.shipClass === 'freight'
      }));

      // Convert delivery address to API location
      const buyerLocation = {
        name: `${deliveryAddress.street}, ${deliveryAddress.city}`,
        address: deliveryAddress.street,
        locality: {
          suburb: deliveryAddress.city,
          postcode: deliveryAddress.postcode,
          state: deliveryAddress.state
        }
      };

      // Create job data
      const jobData: ApiJobModel = {
        contactName,
        buyerEmail,
        buyerMobilePhone,
        buyerOtherPhone,
        carrierId: selectedQuote.carrierId,
        reference: orderId,
        jobType: [DeliveryType.DELIVERY],
        containsDangerousGoods,
        buyerHasForklift: false, // Default to no forklift
        hasDeclaredCarParts,
        specialInstructions,
        pickupLocation: {
          name: "Unwind Designs",
          address: "123 Workshop Street",
          locality: {
            suburb: "Melbourne",
            postcode: "3000",
            state: "VIC"
          }
        },
        buyerLocation,
        items: apiItems,
        authorityToLeave: selectedQuote.authorityToLeave,
        serviceCode: selectedQuote.serviceCode,
        sourceType: SourceType.CUSTOM_INTEGRATION_SYSTEM
      };

      // Book the job with BigPost
      const result = await bigPostClient.bookJob(jobData);

      if (result.success) {
        return NextResponse.json({
          success: true,
          jobId: result.jobId,
          carrierConsignmentNumber: result.carrierConsignmentNumber,
        });
      } else {
        return NextResponse.json({
          success: false,
          error: result.error || 'Failed to book job with BigPost',
        }, { status: 500 });
      }

    } catch (error) {
      console.error('BigPost job booking error:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to book job with BigPost',
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Job booking API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error occurred while booking job',
    }, { status: 500 });
  }
}

// Helper function to get API item type
function getApiItemType(shipClass: string): number {
  switch (shipClass) {
    case 'oversized':
    case 'freight':
      return 0; // PALLET
    case 'standard':
    default:
      return 1; // CARTON
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to book jobs.',
  }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to book jobs.',
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to book jobs.',
  }, { status: 405 });
}
