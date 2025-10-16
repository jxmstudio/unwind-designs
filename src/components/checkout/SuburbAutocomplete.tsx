'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SuburbSearchResult, StateCode } from '@/types/bigpost';
import { useSuburbSearch } from '@/hooks/useSuburbSearch';
import { Loader2, MapPin, AlertCircle } from 'lucide-react';

interface SuburbAutocompleteProps {
  state?: StateCode;
  value: string;
  onChange: (value: string) => void;
  onSuburbSelect: (suburb: SuburbSearchResult) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export function SuburbAutocomplete({
  state,
  value,
  onChange,
  onSuburbSelect,
  placeholder = 'Start typing suburb name...',
  className = '',
  error,
  disabled = false
}: SuburbAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { results, isLoading, error: searchError, search, clearResults } = useSuburbSearch({ state });

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    
    if (newValue.length >= 2) {
      search(newValue);
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      clearResults();
      setIsOpen(false);
    }
  };

  const handleSuburbSelect = (suburb: SuburbSearchResult) => {
    setInputValue(suburb.Suburb);
    onChange(suburb.Suburb);
    onSuburbSelect(suburb);
    setIsOpen(false);
    clearResults();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSuburbSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <strong key={index} className="font-semibold text-accent-600">{part}</strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-12 pr-4 py-3 bg-surface-50 border ${
            error ? 'border-error-500' : 'border-borderNeutral'
          } rounded-xl text-textPrimary placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all duration-200 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        />
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-500 animate-spin" />
        )}
      </div>

      {/* Error message */}
      {(error || searchError) && (
        <div className="mt-2 flex items-start gap-2 text-error-600 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error || searchError}</span>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-surface-50 border border-borderNeutral rounded-xl shadow-large max-h-64 overflow-y-auto"
        >
          {results.map((suburb, index) => (
            <button
              key={`${suburb.Id}-${index}`}
              type="button"
              onClick={() => handleSuburbSelect(suburb)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full text-left px-4 py-3 transition-colors duration-150 ${
                index === selectedIndex
                  ? 'bg-accent-50 text-accent-700'
                  : 'hover:bg-surface-100'
              } ${index === 0 ? 'rounded-t-xl' : ''} ${
                index === results.length - 1 ? 'rounded-b-xl' : 'border-b border-borderNeutral'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-body font-medium">
                    {highlightMatch(suburb.Suburb, inputValue)}
                  </div>
                  <div className="text-body-small text-textSecondary mt-0.5">
                    {suburb.Postcode}, {suburb.State}
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-textSecondary ml-2 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && !isLoading && inputValue.length >= 2 && results.length === 0 && !searchError && (
        <div className="absolute z-50 w-full mt-2 bg-surface-50 border border-borderNeutral rounded-xl shadow-large p-4 text-center text-textSecondary">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-textSecondary/60" />
          <p className="text-body-small">No suburbs found matching "{inputValue}"</p>
          <p className="text-caption mt-1">Try a different spelling or check your state selection</p>
        </div>
      )}
    </div>
  );
}

