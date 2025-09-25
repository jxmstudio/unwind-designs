'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressFormDataSchema, AddressFormData, StateCode } from '@/lib/validation/bigpost';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search, Loader2 } from 'lucide-react';

interface SuburbSearchResult {
  Id: number;
  Suburb: string;
  Postcode: string;
  State: StateCode;
}

interface AddressFormProps {
  title: string;
  defaultValues?: Partial<AddressFormData>;
  onAddressChange: (address: AddressFormData) => void;
  showSuburbSearch?: boolean;
  className?: string;
}

export function AddressForm({ 
  title, 
  defaultValues, 
  onAddressChange, 
  showSuburbSearch = true,
  className 
}: AddressFormProps) {
  const [suburbSearchQuery, setSuburbSearchQuery] = useState('');
  const [suburbSearchResults, setSuburbSearchResults] = useState<SuburbSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormDataSchema),
    defaultValues: {
      name: '',
      address: '',
      addressLineTwo: '',
      suburb: '',
      postcode: '',
      state: 'VIC' as StateCode,
      localityId: undefined,
      ...defaultValues
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Notify parent of address changes
  useEffect(() => {
    if (isValid) {
      onAddressChange(watchedValues);
    }
  }, [watchedValues, isValid, onAddressChange]);

  // Search suburbs
  const searchSuburbs = async (query: string) => {
    if (query.length < 2) {
      setSuburbSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/bigpost/search-suburbs?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSuburbSearchResults(data.results || []);
        setShowSearchResults(true);
      } else {
        console.error('Suburb search failed:', data.error);
        setSuburbSearchResults([]);
      }
    } catch (error) {
      console.error('Suburb search error:', error);
      setSuburbSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle suburb search input change
  const handleSuburbSearchChange = (value: string) => {
    setSuburbSearchQuery(value);
    searchSuburbs(value);
  };

  // Handle suburb selection
  const handleSuburbSelect = (suburb: SuburbSearchResult) => {
    setValue('suburb', suburb.Suburb);
    setValue('postcode', suburb.Postcode);
    setValue('state', suburb.State);
    setValue('localityId', suburb.Id);
    setSuburbSearchQuery(suburb.Suburb);
    setShowSearchResults(false);
  };

  // State options
  const stateOptions: { value: StateCode; label: string }[] = [
    { value: 'ACT', label: 'Australian Capital Territory' },
    { value: 'NSW', label: 'New South Wales' },
    { value: 'NT', label: 'Northern Territory' },
    { value: 'QLD', label: 'Queensland' },
    { value: 'SA', label: 'South Australia' },
    { value: 'TAS', label: 'Tasmania' },
    { value: 'VIC', label: 'Victoria' },
    { value: 'WA', label: 'Western Australia' }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter name or business name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Street address (max 30 characters)"
              maxLength={30}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Address Line Two */}
          <div className="space-y-2">
            <Label htmlFor="addressLineTwo">Address Line Two</Label>
            <Input
              id="addressLineTwo"
              {...register('addressLineTwo')}
              placeholder="Unit, suite, etc. (max 30 characters)"
              maxLength={30}
              className={errors.addressLineTwo ? 'border-red-500' : ''}
            />
            {errors.addressLineTwo && (
              <p className="text-sm text-red-500">{errors.addressLineTwo.message}</p>
            )}
          </div>

          {/* Suburb Search */}
          {showSuburbSearch && (
            <div className="space-y-2">
              <Label htmlFor="suburb">Suburb *</Label>
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="suburb"
                    value={suburbSearchQuery}
                    onChange={(e) => handleSuburbSearchChange(e.target.value)}
                    placeholder="Search for suburb..."
                    className={`pl-10 ${errors.suburb ? 'border-red-500' : ''}`}
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
                  )}
                </div>
                
                {/* Search Results Dropdown */}
                {showSearchResults && suburbSearchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suburbSearchResults.map((suburb) => (
                      <button
                        key={suburb.Id}
                        type="button"
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        onClick={() => handleSuburbSelect(suburb)}
                      >
                        <div className="font-medium">{suburb.Suburb}</div>
                        <div className="text-sm text-gray-500">
                          {suburb.Postcode} {suburb.State}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.suburb && (
                <p className="text-sm text-red-500">{errors.suburb.message}</p>
              )}
            </div>
          )}

          {/* Manual Suburb Input (fallback) */}
          {!showSuburbSearch && (
            <div className="space-y-2">
              <Label htmlFor="suburb">Suburb *</Label>
              <Input
                id="suburb"
                {...register('suburb')}
                placeholder="Enter suburb"
                maxLength={30}
                className={errors.suburb ? 'border-red-500' : ''}
              />
              {errors.suburb && (
                <p className="text-sm text-red-500">{errors.suburb.message}</p>
              )}
            </div>
          )}

          {/* Postcode */}
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode *</Label>
            <Input
              id="postcode"
              {...register('postcode')}
              placeholder="1234"
              maxLength={4}
              pattern="[0-9]{4}"
              className={errors.postcode ? 'border-red-500' : ''}
            />
            {errors.postcode && (
              <p className="text-sm text-red-500">{errors.postcode.message}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <select
              id="state"
              {...register('state')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
