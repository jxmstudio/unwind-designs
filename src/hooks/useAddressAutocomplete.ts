import { useState, useEffect, useCallback, useRef } from 'react';

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
  debounceMs = 300,
  minQueryLength = 2,
  type = 'suburb',
  state
}: UseAddressAutocompleteOptions = {}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchAddresses = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minQueryLength) {
      setResults([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        type,
        ...(state && { state })
      });

      const response = await fetch(`/api/bigpost/address-search?${params}`, {
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        console.warn(`Address search failed with status ${response.status}`);
        // Don't throw error, just return empty results
        setResults([]);
        setError(null);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setError(null);
      } else {
        console.warn('Address search failed:', data.error);
        setResults([]);
        setError(null); // Don't show error to user, just return empty results
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Address search error:', err);
        setError('Search failed. Please try again.');
        setResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [minQueryLength, type, state]);

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
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
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
