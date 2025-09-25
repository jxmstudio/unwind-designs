'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAddressAutocomplete } from '@/hooks/useAddressAutocomplete';
import { StateCode } from '@/types/bigpost';

interface BigPostAddressFormProps {
  onQuoteSelect: (quotes: any[]) => void;
  className?: string;
}

interface FormData {
  street: string;
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

export function BigPostAddressForm({ onQuoteSelect, className }: BigPostAddressFormProps) {
  const [formData, setFormData] = useState<FormData>({
    street: '',
    suburb: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<any[]>([]);

  // Autocomplete hooks for each field
  const suburbAutocomplete = useAddressAutocomplete({
    type: 'suburb',
    state: formData.state
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSuburbSelect = (result: any) => {
    setFormData(prev => ({
      ...prev,
      suburb: result.suburb,
      postcode: result.postcode,
      state: result.state,
      city: result.suburb // Use suburb as city for BigPost
    }));
    suburbAutocomplete.clearResults();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate street address (max 30 chars)
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    } else if (formData.street.length > 30) {
      newErrors.street = 'Street address must be 30 characters or less';
    }
    
    // Validate suburb
    if (!formData.suburb.trim()) {
      newErrors.suburb = 'Suburb is required';
    } else if (formData.suburb.length > 30) {
      newErrors.suburb = 'Suburb must be 30 characters or less';
    }
    
    // Validate state
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    // Validate postcode (4 digits)
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    } else if (!/^\d{4}$/.test(formData.postcode.replace(/\s/g, ''))) {
      newErrors.postcode = 'Postcode must be 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetQuotes = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setQuotes([]);

    try {
      // Mock items for testing - in real app, get from cart context
      const mockItems = [
        {
          id: 'test-product-1',
          name: 'Test Product',
          quantity: 1,
          weight: 1,
          dimensions: { length: 30, width: 20, height: 10 },
          price: 100
        }
      ];

      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryAddress: {
            street: formData.street,
            city: formData.suburb, // Use suburb as city for BigPost
            state: formData.state,
            postcode: formData.postcode,
            country: formData.country
          },
          items: mockItems,
          totalValue: 100
        }),
      });

      const data = await response.json();

      if (data.success && data.quotes) {
        setQuotes(data.quotes);
        onQuoteSelect(data.quotes);
      } else {
        console.error('Shipping quote failed:', data.error);
      }
    } catch (error) {
      console.error('Error getting shipping quotes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📍</span>
          Shipping Address & Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Street Address */}
        <div className="space-y-2">
          <Label htmlFor="street">Street Address *</Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            placeholder="123 Main Street"
            maxLength={30}
            className={errors.street ? 'border-red-500' : ''}
          />
          {errors.street && (
            <Alert variant="destructive">
              <AlertDescription>{errors.street}</AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-gray-500">
            {formData.street.length}/30 characters
          </p>
        </div>

        {/* Suburb with BigPost Autocomplete */}
        <div className="space-y-2">
          <Label htmlFor="suburb">Suburb *</Label>
          <div className="relative">
            <Input
              id="suburb"
              value={suburbAutocomplete.query}
              onChange={(e) => suburbAutocomplete.setQuery(e.target.value)}
              placeholder="Start typing suburb name..."
              maxLength={30}
              className={errors.suburb ? 'border-red-500' : ''}
            />
            
            {/* Autocomplete dropdown */}
            {suburbAutocomplete.results.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {suburbAutocomplete.results.map((result, index) => (
                  <div
                    key={`${result.value}-${index}`}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuburbSelect(result)}
                  >
                    <div className="font-medium">{result.label}</div>
                    <div className="text-sm text-gray-500">{result.description}</div>
                  </div>
                ))}
              </div>
            )}
            
            {suburbAutocomplete.isLoading && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
          
          {errors.suburb && (
            <Alert variant="destructive">
              <AlertDescription>{errors.suburb}</AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-gray-500">
            {formData.suburb.length}/30 characters
          </p>
        </div>

        {/* State (read-only, populated from suburb selection) */}
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            disabled
            className="bg-gray-100"
          />
          <p className="text-xs text-gray-500">
            Auto-populated from suburb selection
          </p>
        </div>

        {/* Postcode (read-only, populated from suburb selection) */}
        <div className="space-y-2">
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            id="postcode"
            value={formData.postcode}
            disabled
            className="bg-gray-100"
          />
          <p className="text-xs text-gray-500">
            Auto-populated from suburb selection
          </p>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.country}
            disabled
            className="bg-gray-100"
          />
          <p className="text-xs text-gray-500">
            Only Australian addresses are supported
          </p>
        </div>

        {/* Get Quotes Button */}
        <Button 
          onClick={handleGetQuotes} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Getting Quotes...' : 'Get Shipping Quotes'}
        </Button>

        {/* Display Quotes */}
        {quotes.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Select Shipping Method:</h3>
            {quotes.map((quote, index) => (
              <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{quote.service}</h4>
                    <p className="text-sm text-gray-600">
                      {quote.deliveryDays} business days • {quote.carrier || 'Standard carrier'}
                    </p>
                  </div>
                  <div className="text-lg font-semibold">
                    ${quote.price.toFixed(2)}
                  </div>
                </div>
                {quote.description && (
                  <p className="text-xs text-gray-500 mt-1">{quote.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
