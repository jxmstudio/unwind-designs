import { useState, useEffect, useCallback, useRef } from 'react';
import { AUSTRALIAN_SUBURBS } from '@/data/australian-addresses';

interface AddressSearchResult {
  value: string;
  label: string;
  description?: string;
  suburb: string;
  postcode: string;
  state: string;
  localityId?: number;
}

interface UseAddressAutocompleteOptions {
  debounceMs?: number;
  minQueryLength?: number;
  type?: 'street' | 'suburb' | 'city' | 'postcode';
  state?: string;
}

export function useAddressAutocomplete({
  debounceMs = 150, // Reduced from 300ms since we're searching locally
  minQueryLength = 2,
  type = 'suburb',
  state
}: UseAddressAutocompleteOptions = {}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchAddresses = useCallback((searchQuery: string) => {
    if (searchQuery.length < minQueryLength) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Search local Australian suburbs data (instant, no API call!)
      const normalizedQuery = searchQuery.toLowerCase().trim();
      
      const filteredResults = AUSTRALIAN_SUBURBS
        .filter(suburb => {
          // Match suburb name or postcode
          const matchesName = suburb.suburb.toLowerCase().includes(normalizedQuery);
          const matchesPostcode = suburb.postcode.includes(normalizedQuery);
          const matchesState = !state || suburb.state === state;
          
          return (matchesName || matchesPostcode) && matchesState;
        })
        .slice(0, 10) // Limit to 10 results for performance
        .map(suburb => ({
          value: `${suburb.suburb}, ${suburb.state} ${suburb.postcode}`,
          label: `${suburb.suburb}, ${suburb.state} ${suburb.postcode}`,
          description: suburb.state,
          suburb: suburb.suburb,
          postcode: suburb.postcode,
          state: suburb.state,
        }));

      setResults(filteredResults);
      setError(null);
    } catch (err) {
      console.error('Local address search error:', err);
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [minQueryLength, state]);

  // Debounced search effect
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      searchAddresses(query);
    }, debounceMs);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, searchAddresses, debounceMs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearResults
  };
}
