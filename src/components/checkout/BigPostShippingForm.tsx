'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Autocomplete } from '@/components/ui/autocomplete';
import { AUSTRALIAN_STATES, AUSTRALIAN_CITIES, AUSTRALIAN_POSTCODES, STREET_TYPES } from '@/data/australian-addresses';
import { validateBigPostFormData } from '@/lib/bigpost-validation';

interface BigPostShippingFormProps {
  onQuoteSelect: (quotes: any[]) => void;
  className?: string;
}

interface FormData {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

export function BigPostShippingForm({ onQuoteSelect, className }: BigPostShippingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia'
  });

  // Get filtered options based on current state
  const getCityOptions = () => {
    if (!formData.state) return AUSTRALIAN_CITIES;
    return AUSTRALIAN_CITIES.filter(city => city.description === formData.state);
  };

  const getPostcodeOptions = () => {
    if (!formData.state) return [];
    return AUSTRALIAN_POSTCODES[formData.state as keyof typeof AUSTRALIAN_POSTCODES] || [];
  };
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<any[]>([]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate street address (max 30 chars)
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    } else if (formData.street.length > 30) {
      newErrors.street = 'Street address must be 30 characters or less';
    }
    
    // Validate city (max 30 chars)
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.length > 30) {
      newErrors.city = 'City must be 30 characters or less';
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
          deliveryAddress: formData,
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
        <Autocomplete
          label="Street Address *"
          value={formData.street}
          onChange={(value) => handleInputChange('street', value)}
          options={STREET_TYPES.map(type => ({
            value: `123 Main ${type}`,
            label: `123 Main ${type}`,
            description: `Example: Main ${type}`
          }))}
          placeholder="123 Main Street"
          maxLength={30}
          error={errors.street}
        />

        {/* State */}
        <Autocomplete
          label="State *"
          value={formData.state}
          onChange={(value) => {
            handleInputChange('state', value);
            // Clear city and postcode when state changes
            setFormData(prev => ({ ...prev, city: '', postcode: '' }));
          }}
          options={AUSTRALIAN_STATES}
          placeholder="Select state"
          error={errors.state}
        />

        {/* City */}
        <Autocomplete
          label="City *"
          value={formData.city}
          onChange={(value) => {
            handleInputChange('city', value);
            // Clear postcode when city changes
            setFormData(prev => ({ ...prev, postcode: '' }));
          }}
          options={getCityOptions()}
          placeholder="Select city"
          maxLength={30}
          error={errors.city}
        />

        {/* Postcode */}
        <Autocomplete
          label="Postcode *"
          value={formData.postcode}
          onChange={(value) => handleInputChange('postcode', value)}
          options={getPostcodeOptions()}
          placeholder="3000"
          error={errors.postcode}
        />

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
