'use client';

import { useState, useEffect, useCallback } from 'react';
import { SuburbSearchResult, StateCode } from '@/types/bigpost';

interface UseSuburbSearchProps {
  state?: StateCode;
  debounceMs?: number;
}

interface UseSuburbSearchReturn {
  results: SuburbSearchResult[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => void;
  clearResults: () => void;
}

export function useSuburbSearch({ 
  state, 
  debounceMs = 300 
}: UseSuburbSearchProps = {}): UseSuburbSearchReturn {
  const [results, setResults] = useState<SuburbSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const search = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setSearchQuery('');
    setError(null);
  }, []);

  useEffect(() => {
    // Don't search if query is too short
    if (searchQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Debounce the search
    const timeoutId = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          query: searchQuery,
          ...(state && { state })
        });

        const response = await fetch(`/api/bigpost/suburb-search?${params}`);
        const data = await response.json();

        if (data.success && data.results) {
          setResults(data.results);
        } else {
          setError(data.error || 'Failed to search suburbs');
          setResults([]);
        }
      } catch (err) {
        console.error('Suburb search error:', err);
        setError('Failed to search suburbs');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, state, debounceMs]);

  return {
    results,
    isLoading,
    error,
    search,
    clearResults
  };
}

