'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  shippingCalculatorFormDataSchema, 
  ShippingCalculatorFormData
} from '@/lib/validation/bigpost';
import { DEFAULT_PICKUP_LOCATION } from '@/lib/bigpost';
import { JobType, StateCode } from '@/types/bigpost';
import { AddressForm } from './AddressForm';
import { ItemsForm } from './ItemsForm';
import { QuoteOptions } from './QuoteOptions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, MapPin, Loader2, AlertCircle } from 'lucide-react';

interface QuoteOption {
  ServiceCode: string;
  ServiceName: string;
  Price: number;
  EstimatedDeliveryDays: number;
  CarrierId: number;
  CarrierName: string;
  Description?: string;
  AuthorityToLeave?: boolean;
  Restrictions?: string[];
}

interface ShippingCalculatorProps {
  onQuoteSelect?: (quote: QuoteOption) => void;
  className?: string;
}

export function ShippingCalculator({ onQuoteSelect, className }: ShippingCalculatorProps) {
  const [quotes, setQuotes] = useState<QuoteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<QuoteOption | null>(null);

  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = useForm<ShippingCalculatorFormData>({
    resolver: zodResolver(shippingCalculatorFormDataSchema),
    defaultValues: {
      pickupLocation: {
        name: DEFAULT_PICKUP_LOCATION.Name,
        address: DEFAULT_PICKUP_LOCATION.Address,
        addressLineTwo: DEFAULT_PICKUP_LOCATION.AddressLineTwo,
        suburb: DEFAULT_PICKUP_LOCATION.Locality.Suburb,
        postcode: DEFAULT_PICKUP_LOCATION.Locality.Postcode,
        state: DEFAULT_PICKUP_LOCATION.Locality.State as StateCode,
        localityId: undefined
      },
      buyerLocation: {
        name: '',
        address: '',
        addressLineTwo: '',
        suburb: '',
        postcode: '',
        state: 'VIC' as StateCode,
        localityId: undefined
      },
      items: [{
        itemType: 0, // CARTON
        description: '',
        quantity: 1,
        height: 10,
        width: 20,
        length: 30,
        weight: 1,
        consolidatable: true
      }],
      jobType: [JobType.DIRECT],
      buyerIsBusiness: false,
      buyerHasForklift: false,
      returnAuthorityToLeaveOptions: true
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Get quotes from BigPost API
  const getQuotes = async (formData: ShippingCalculatorFormData) => {
    setIsLoading(true);
    setError(null);
    setQuotes([]);

    try {
      // Convert form data to BigPost API format
      const requestData = {
        JobType: formData.jobType,
        BuyerIsBusiness: formData.buyerIsBusiness,
        BuyerHasForklift: formData.buyerHasForklift,
        ReturnAuthorityToLeaveOptions: formData.returnAuthorityToLeaveOptions,
        JobDate: formData.jobDate || new Date().toISOString(),
        DepotId: formData.depotId,
        PickupLocation: {
          Name: formData.pickupLocation.name,
          Address: formData.pickupLocation.address,
          AddressLineTwo: formData.pickupLocation.addressLineTwo,
          Locality: {
            Suburb: formData.pickupLocation.suburb,
            Postcode: formData.pickupLocation.postcode,
            State: formData.pickupLocation.state
          }
        },
        BuyerLocation: {
          Name: formData.buyerLocation.name,
          Address: formData.buyerLocation.address,
          AddressLineTwo: formData.buyerLocation.addressLineTwo,
          Locality: {
            Suburb: formData.buyerLocation.suburb,
            Postcode: formData.buyerLocation.postcode,
            State: formData.buyerLocation.state
          }
        },
        Items: formData.items.map(item => ({
          ItemType: item.itemType,
          Description: item.description,
          Quantity: item.quantity,
          Height: item.height,
          Width: item.width,
          Length: item.length,
          Weight: item.weight,
          Consolidatable: item.consolidatable
        }))
      };

      console.log('Sending quote request:', requestData);

      const response = await fetch('/api/bigpost/get-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      if (data.success && data.quotes) {
        setQuotes(data.quotes);
        console.log('Received quotes:', data.quotes);
      } else {
        throw new Error(data.error || 'No quotes available');
      }

    } catch (err) {
      console.error('Quote request failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to get shipping quotes');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = (formData: ShippingCalculatorFormData) => {
    getQuotes(formData);
  };

  // Handle quote selection
  const handleQuoteSelect = (quote: QuoteOption) => {
    setSelectedQuote(quote);
    onQuoteSelect?.(quote);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pickup Location */}
        <AddressForm
          title="Pickup Location"
          defaultValues={watchedValues.pickupLocation}
          onAddressChange={(address) => {
            // Update form values
          }}
          showSuburbSearch={true}
        />

        {/* Buyer Location */}
        <AddressForm
          title="Delivery Address"
          defaultValues={watchedValues.buyerLocation}
          onAddressChange={(address) => {
            // Update form values
          }}
          showSuburbSearch={true}
        />

        {/* Items */}
        <ItemsForm
          onItemsChange={(items) => {
            // Update form values
          }}
        />

        {/* Job Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Shipping Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Type *</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watchedValues.jobType.includes(JobType.DEPOT)}
                      onChange={(e) => {
                        // Handle job type changes
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Depot Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watchedValues.jobType.includes(JobType.DIRECT)}
                      onChange={(e) => {
                        // Handle job type changes
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Direct Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watchedValues.jobType.includes(JobType.HOME_DELIVERY)}
                      onChange={(e) => {
                        // Handle job type changes
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Home Delivery</span>
                  </label>
                </div>
              </div>

              {/* Business Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Options</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watchedValues.buyerIsBusiness || false}
                      onChange={(e) => {
                        // Handle business option changes
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Business Address</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watchedValues.buyerHasForklift || false}
                      onChange={(e) => {
                        // Handle forklift option changes
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Has Forklift</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watchedValues.returnAuthorityToLeaveOptions || false}
                      onChange={(e) => {
                        // Handle authority to leave option changes
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Authority to Leave Options</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Quotes Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Getting Quotes...
              </>
            ) : (
              <>
                <Truck className="w-4 h-4 mr-2" />
                Get Shipping Quotes
              </>
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Error</h4>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quote Options */}
        {quotes.length > 0 && (
          <QuoteOptions
            quotes={quotes}
            selectedQuote={selectedQuote}
            onQuoteSelect={handleQuoteSelect}
          />
        )}
      </form>
    </div>
  );
}
