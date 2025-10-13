// BigPost API Form Validation
// Ensures all form data meets BigPost API requirements

export interface BigPostFormData {
  // Address validation
  street: string;        // Max 30 chars
  city: string;          // Max 30 chars  
  state: string;        // Must be valid Australian state
  postcode: string;      // Must be 4 digits
  country: string;       // Must be 'Australia'
  
  // Item validation
  items: Array<{
    name: string;        // Max 50 chars
    weight: number;      // Must be > 0
    dimensions: {
      length: number;    // Must be > 0
      width: number;     // Must be > 0
      height: number;    // Must be > 0
    };
    quantity: number;    // Must be > 0
  }>;
}

// Australian state mapping for BigPost API
export const AUSTRALIAN_STATES = {
  'VIC': 'Victoria',
  'NSW': 'New South Wales', 
  'QLD': 'Queensland',
  'SA': 'South Australia',
  'WA': 'Western Australia',
  'TAS': 'Tasmania',
  'NT': 'Northern Territory',
  'ACT': 'Australian Capital Territory'
} as const;

export const STATE_CODES = Object.keys(AUSTRALIAN_STATES) as Array<keyof typeof AUSTRALIAN_STATES>;

// Validation functions
export function validateStreetAddress(street: string): { isValid: boolean; error?: string } {
  if (!street.trim()) {
    return { isValid: false, error: 'Street address is required' };
  }
  if (street.length > 30) {
    return { isValid: false, error: 'Street address must be 30 characters or less' };
  }
  return { isValid: true };
}

export function validateCity(city: string): { isValid: boolean; error?: string } {
  if (!city.trim()) {
    return { isValid: false, error: 'City is required' };
  }
  if (city.length > 30) {
    return { isValid: false, error: 'City must be 30 characters or less' };
  }
  return { isValid: true };
}

export function validateState(state: string): { isValid: boolean; error?: string; normalizedState?: string } {
  if (!state.trim()) {
    return { isValid: false, error: 'State is required' };
  }
  
  // Check if it's already a state code
  if (STATE_CODES.includes(state.toUpperCase() as keyof typeof AUSTRALIAN_STATES)) {
    return { isValid: true, normalizedState: state.toUpperCase() };
  }
  
  // Check if it's a full state name
  const normalizedState = Object.entries(AUSTRALIAN_STATES).find(
    ([, fullName]) => fullName.toLowerCase() === state.toLowerCase()
  )?.[0];
  
  if (normalizedState) {
    return { isValid: true, normalizedState };
  }
  
  return { isValid: false, error: 'Please select a valid Australian state' };
}

export function validatePostcode(postcode: string): { isValid: boolean; error?: string; normalizedPostcode?: string } {
  if (!postcode.trim()) {
    return { isValid: false, error: 'Postcode is required' };
  }
  
  // Remove spaces and validate format
  const cleanPostcode = postcode.replace(/\s/g, '');
  
  if (!/^\d{4}$/.test(cleanPostcode)) {
    return { isValid: false, error: 'Postcode must be 4 digits' };
  }
  
  return { isValid: true, normalizedPostcode: cleanPostcode };
}

export function validateCountry(country: string): { isValid: boolean; error?: string } {
  if (country.toLowerCase() !== 'australia') {
    return { isValid: false, error: 'Only Australian addresses are supported' };
  }
  return { isValid: true };
}

export function validateItemName(name: string): { isValid: boolean; error?: string; normalizedName?: string } {
  if (!name.trim()) {
    return { isValid: false, error: 'Item name is required' };
  }
  // Auto-truncate instead of failing validation
  const normalizedName = name.substring(0, 50);
  if (name.length > 50) {
    console.warn(`Item name truncated from ${name.length} to 50 characters: "${name}" -> "${normalizedName}"`);
  }
  return { isValid: true, normalizedName };
}

export function validateWeight(weight: number): { isValid: boolean; error?: string } {
  if (weight <= 0) {
    return { isValid: false, error: 'Weight must be greater than 0' };
  }
  if (weight > 1000) {
    return { isValid: false, error: 'Weight cannot exceed 1000kg' };
  }
  return { isValid: true };
}

export function validateDimensions(dimensions: { length: number; width: number; height: number }): { isValid: boolean; error?: string } {
  const { length, width, height } = dimensions;
  
  if (length <= 0 || width <= 0 || height <= 0) {
    return { isValid: false, error: 'All dimensions must be greater than 0' };
  }
  
  if (length > 200 || width > 200 || height > 200) {
    return { isValid: false, error: 'No dimension can exceed 200cm' };
  }
  
  return { isValid: true };
}

export function validateQuantity(quantity: number): { isValid: boolean; error?: string } {
  if (quantity <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }
  if (quantity > 100) {
    return { isValid: false, error: 'Quantity cannot exceed 100' };
  }
  return { isValid: true };
}

// Main validation function
export function validateBigPostFormData(data: BigPostFormData): {
  isValid: boolean;
  errors: Record<string, string>;
  normalizedData?: any;
} {
  const errors: Record<string, string> = {};
  let isValid = true;
  
  // Validate address
  const streetValidation = validateStreetAddress(data.street);
  if (!streetValidation.isValid) {
    errors.street = streetValidation.error!;
    isValid = false;
  }
  
  const cityValidation = validateCity(data.city);
  if (!cityValidation.isValid) {
    errors.city = cityValidation.error!;
    isValid = false;
  }
  
  const stateValidation = validateState(data.state);
  if (!stateValidation.isValid) {
    errors.state = stateValidation.error!;
    isValid = false;
  }
  
  const postcodeValidation = validatePostcode(data.postcode);
  if (!postcodeValidation.isValid) {
    errors.postcode = postcodeValidation.error!;
    isValid = false;
  }
  
  const countryValidation = validateCountry(data.country);
  if (!countryValidation.isValid) {
    errors.country = countryValidation.error!;
    isValid = false;
  }
  
  // Validate items
  if (!data.items || data.items.length === 0) {
    errors.items = 'At least one item is required';
    isValid = false;
  } else {
    data.items.forEach((item, index) => {
      const nameValidation = validateItemName(item.name);
      if (!nameValidation.isValid) {
        errors[`items.${index}.name`] = nameValidation.error!;
        isValid = false;
      }
      // Store normalized name for later use
      if (nameValidation.normalizedName) {
        item.name = nameValidation.normalizedName;
      }
      
      const weightValidation = validateWeight(item.weight);
      if (!weightValidation.isValid) {
        errors[`items.${index}.weight`] = weightValidation.error!;
        isValid = false;
      }
      
      const dimensionsValidation = validateDimensions(item.dimensions);
      if (!dimensionsValidation.isValid) {
        errors[`items.${index}.dimensions`] = dimensionsValidation.error!;
        isValid = false;
      }
      
      const quantityValidation = validateQuantity(item.quantity);
      if (!quantityValidation.isValid) {
        errors[`items.${index}.quantity`] = quantityValidation.error!;
        isValid = false;
      }
    });
  }
  
  if (!isValid) {
    return { isValid: false, errors };
  }
  
  // Return normalized data for BigPost API
  const normalizedData = {
    street: data.street.substring(0, 30),
    city: data.city.substring(0, 30),
    state: stateValidation.normalizedState,
    postcode: postcodeValidation.normalizedPostcode,
    country: 'Australia',
    items: data.items.map(item => ({
      name: item.name.substring(0, 50),
      weight: item.weight,
      dimensions: item.dimensions,
      quantity: item.quantity
    }))
  };
  
  return { isValid: true, errors: {}, normalizedData };
}

// Helper function to format data for BigPost API
export function formatForBigPostAPI(normalizedData: any) {
  // Check if this needs pallet shipping (over 40kg)
  const needsPallet = normalizedData.items.some((item: any) => item.weight > 40);
  
  // JobType: 1=DEPOT, 2=DIRECT, 3=HOME_DELIVERY
  // Use HOME_DELIVERY (3) for regular customers, DIRECT (2) for heavy items
  const jobType = needsPallet ? 2 : 3;

  return {
    JobType: jobType,
    BuyerIsBusiness: needsPallet, // Must be false for HOME_DELIVERY (JobType=3)
    BuyerHasForklift: needsPallet, // Enable forklift for heavy deliveries
    ReturnAuthorityToLeaveOptions: !needsPallet, // Enable for items 40kg or less
    PickupLocation: {
      Name: 'Unwind Designs',
      Address: 'Export Drive',
      AddressLineTwo: '',
      Locality: {
        Suburb: 'Brooklyn',
        Postcode: '3012',
        State: 'VIC'
      }
    },
    BuyerLocation: {
      Name: normalizedData.street.substring(0, 255),
      Address: normalizedData.street.substring(0, 30),
      AddressLineTwo: '',
      Locality: {
        Suburb: normalizedData.city.substring(0, 30),
        Postcode: normalizedData.postcode,
        State: normalizedData.state
      }
    },
    Items: normalizedData.items.map((item: any) => {
      // Check if this needs to be on a pallet (over 40kg)
      const itemNeedsPallet = item.weight > 40;
      
      return {
        ItemType: itemNeedsPallet ? 2 : 0, // 0=CARTON, 2=PALLET
        Description: item.name.substring(0, 50),
        Quantity: item.quantity,
        Height: item.dimensions.height,
        Width: item.dimensions.width,
        Length: item.dimensions.length,
        Weight: item.weight,
        Consolidatable: !itemNeedsPallet // Don't consolidate pallet items
      };
    })
  };
}
