// Big Post API Test Endpoint
// Test the updated Big Post integration

import { NextRequest, NextResponse } from 'next/server';
import { bigPostAPI } from '@/lib/bigpost';
import { JobType, ItemType } from '@/types/bigpost';

export async function GET(request: NextRequest) {
  try {
    const results: any = {
      timestamp: new Date().toISOString(),
      tests: {}
    };

    // Test 1: Environment Configuration
    results.tests.environment = {
      hasApiKey: !!(process.env.BIGPOST_API_KEY || process.env.BIG_POST_API_KEY || process.env.BIG_POST_API_TOKEN),
      apiUrl: process.env.BIGPOST_API_URL || process.env.BIGPOST_BASE_URL || 'https://api.bigpost.com.au',
      apiKeyLength: (process.env.BIGPOST_API_KEY || process.env.BIG_POST_API_KEY || process.env.BIG_POST_API_TOKEN || '').length
    };

    // Test 2: Quote API
    const quoteRequest = {
      JobType: undefined, // Test all job types
      BuyerIsBusiness: false,
      BuyerHasForklift: false,
      ReturnAuthorityToLeaveOptions: true,
      JobDate: new Date().toISOString(),
      DepotId: undefined,
      PickupLocation: {
        Name: "Unwind Designs",
        Address: "123 Workshop Street",
        AddressLineTwo: "",
        Locality: {
          Suburb: "Melbourne",
          Postcode: "3000",
          State: "VIC"
        }
      },
      BuyerLocation: {
        Name: "Test Customer",
        Address: "456 Test Street",
        AddressLineTwo: "",
        Locality: {
          Suburb: "Sydney",
          Postcode: "2000",
          State: "NSW"
        }
      },
      Items: [
        {
          ItemType: ItemType.CARTON,
          Description: "Test Product",
          Quantity: 1,
          Height: 10,
          Width: 20,
          Length: 30,
          Weight: 2.5,
          Consolidatable: true
        }
      ]
    };

    try {
      const quoteResponse = await bigPostAPI.getQuote(quoteRequest);
      
      results.tests.quoteAPI = {
        success: quoteResponse.Success,
        quotesCount: quoteResponse.Quotes?.length || 0,
        errorMessage: quoteResponse.ErrorMessage,
        requestId: quoteResponse.RequestId,
        quotes: quoteResponse.Quotes?.slice(0, 5).map(quote => ({
          serviceName: quote.ServiceName,
          price: quote.Price,
          deliveryDays: quote.EstimatedDeliveryDays,
          carrierName: quote.CarrierName,
          serviceCode: quote.ServiceCode,
          authorityToLeave: quote.AuthorityToLeave,
          jobType: quote.JobType,
          depotId: quote.DepotId
        }))
      };
    } catch (error) {
      results.tests.quoteAPI = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : 'Unknown'
      };
    }

    // Test 3: Create Job API (if quotes are available)
    if (results.tests.quoteAPI?.success && results.tests.quoteAPI?.quotesCount > 0) {
      const createJobRequest = {
        ContactName: "Test Customer",
        BuyerEmail: "test@example.com",
        BuyerMobilePhone: "0412345678",
        BuyerOtherPhone: "",
        CarrierId: "1",
        Reference: `TEST-${Date.now()}`,
        JobType: JobType.DIRECT,
        DepotId: undefined,
        ContainsDangerousGoods: false,
        BuyerHasForklift: false,
        HasDeclaredCarParts: false,
        SpecialInstructions: "Test order - please handle with care",
        PickupLocation: quoteRequest.PickupLocation,
        BuyerLocation: quoteRequest.BuyerLocation,
        Items: quoteRequest.Items,
        AuthorityToLeave: false,
        ServiceCode: results.tests.quoteAPI.quotes[0]?.serviceCode,
        SourceType: 4 // Custom integration system
      };

      try {
        const createJobResponse = await bigPostAPI.createJob(createJobRequest);
        results.tests.createJobAPI = {
          success: createJobResponse.Success,
          jobId: createJobResponse.JobId,
          carrierConsignmentNumber: createJobResponse.CarrierConsignmentNumber,
          errorMessage: createJobResponse.ErrorMessage,
          validationErrors: createJobResponse.ValidationErrors
        };
      } catch (error) {
        results.tests.createJobAPI = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          errorType: error instanceof Error ? error.constructor.name : 'Unknown'
        };
      }
    } else {
      results.tests.createJobAPI = {
        skipped: true,
        reason: 'No quotes available for create job test'
      };
    }

    // Test 4: Suburb Search
    try {
      const suburbSearchResponse = await bigPostAPI.searchSuburbs({
        Query: "Melbourne",
        State: "VIC"
      });
      results.tests.suburbSearch = {
        success: suburbSearchResponse.Success,
        resultsCount: suburbSearchResponse.Results?.length || 0,
        errorMessage: suburbSearchResponse.ErrorMessage,
        results: suburbSearchResponse.Results?.slice(0, 3) // First 3 results
      };
    } catch (error) {
      results.tests.suburbSearch = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : 'Unknown'
      };
    }

    // Test 5: Depot Search
    try {
      const depotSearchResponse = await bigPostAPI.findClosestDepots({
        BuyerLocation: quoteRequest.BuyerLocation,
        RadiusKm: 50
      });
      results.tests.depotSearch = {
        success: depotSearchResponse.Success,
        resultsCount: depotSearchResponse.Results?.length || 0,
        errorMessage: depotSearchResponse.ErrorMessage,
        results: depotSearchResponse.Results?.slice(0, 3) // First 3 results
      };
    } catch (error) {
      results.tests.depotSearch = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : 'Unknown'
      };
    }

    // Summary
    const totalTests = Object.keys(results.tests).length;
    const passedTests = Object.values(results.tests).filter((test: any) => 
      test.success === true
    ).length;
    const skippedTests = Object.values(results.tests).filter((test: any) => 
      test.skipped === true
    ).length;

    results.summary = {
      totalTests,
      passedTests,
      skippedTests,
      failedTests: totalTests - passedTests - skippedTests,
      successRate: `${Math.round((passedTests / (totalTests - skippedTests)) * 100)}%`
    };

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('Big Post API test error:', error);
    return NextResponse.json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
