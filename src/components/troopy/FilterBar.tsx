"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, X } from "lucide-react";
import { FlatPackProduct } from "@/data/products";
import { BaseKitConfig } from "@/lib/troopy/baseKits";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface FilterBarProps {
  configurations: FlatPackProduct[];
  config: BaseKitConfig;
  onFilterChange: (filtered: FlatPackProduct[]) => void;
}

export function FilterBar({ configurations, config, onFilterChange }: FilterBarProps) {
  const { isDisabled } = useReducedMotionSafe();
  const [selectedFridgeType, setSelectedFridgeType] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSticky, setIsSticky] = useState(false);

  // Get unique filter options
  const fridgeTypes = Array.from(new Set(configurations.map(config => config.fridgeType)));
  const finishes = Array.from(new Set(configurations.map(config => config.finish)));

  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 400; // Adjust based on hero height
      setIsSticky(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter configurations
  useEffect(() => {
    const filtered = configurations.filter(config => {
      const fridgeMatch = selectedFridgeType === 'all' || config.fridgeType === selectedFridgeType;
      const finishMatch = selectedFinish === 'all' || config.finish === selectedFinish;
      const searchMatch = searchQuery === '' || 
        config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        config.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return fridgeMatch && finishMatch && searchMatch;
    });

    onFilterChange(filtered);
  }, [selectedFridgeType, selectedFinish, searchQuery, configurations, onFilterChange]);

  const clearFilters = () => {
    setSelectedFridgeType('all');
    setSelectedFinish('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedFridgeType !== 'all' || selectedFinish !== 'all' || searchQuery !== '';

  const filteredCount = configurations.filter(config => {
    const fridgeMatch = selectedFridgeType === 'all' || config.fridgeType === selectedFridgeType;
    const finishMatch = selectedFinish === 'all' || config.finish === selectedFinish;
    const searchMatch = searchQuery === '' || 
      config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return fridgeMatch && finishMatch && searchMatch;
  }).length;

  return (
    <m.div
      initial={isDisabled ? {} : { opacity: 0, y: -20 }}
      animate={isDisabled ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        sticky top-20 z-30 transition-all duration-300
        ${isSticky ? 'py-4' : 'py-6'}
      `}
      style={{ top: 'calc(var(--nav-height, 80px) + 8px)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Card className={`
          p-4 md:p-6 bg-white/95 backdrop-blur-sm border-0 rounded-2xl
          ${isSticky ? 'shadow-lg' : 'shadow-sm'}
          transition-all duration-300
        `}>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Filter header */}
            <div className="flex items-center gap-2 text-sm font-medium text-textPrimary">
              <Filter className="w-4 h-4" />
              Filter Configurations
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Fridge Type */}
              <div className="flex-1 min-w-[140px]">
                <Select value={selectedFridgeType} onValueChange={setSelectedFridgeType}>
                  <SelectTrigger className="bg-white border-borderNeutral">
                    <SelectValue placeholder="Fridge Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fridge Types</SelectItem>
                    {fridgeTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Finish */}
              <div className="flex-1 min-w-[140px]">
                <Select value={selectedFinish} onValueChange={setSelectedFinish}>
                  <SelectTrigger className="bg-white border-borderNeutral">
                    <SelectValue placeholder="Finish" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Finishes</SelectItem>
                    {finishes.map(finish => (
                      <SelectItem key={finish} value={finish}>
                        {finish}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
                <Input
                  placeholder="Search configurations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-borderNeutral"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-textSecondary hover:text-textPrimary"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Results count and clear */}
            <div className="flex items-center gap-3">
              <div 
                className="text-sm text-textSecondary whitespace-nowrap"
                aria-live="polite"
              >
                Showing <span className="font-medium text-textPrimary">{filteredCount}</span> of{' '}
                <span className="font-medium">{configurations.length}</span> configurations
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-textSecondary hover:text-textPrimary"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Active filter badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-borderNeutral">
              {selectedFridgeType !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="bg-green-100 text-green-600 border-green-200"
                  style={{
                    backgroundColor: config.id === 'wander' ? '#dcfce7' : config.id === 'roam' ? '#dbeafe' : '#e9d5ff',
                    color: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed',
                    borderColor: config.id === 'wander' ? '#bbf7d0' : config.id === 'roam' ? '#bfdbfe' : '#ddd6fe'
                  }}
                >
                  Fridge: {selectedFridgeType === 'chest' ? 'Chest' : 
                           selectedFridgeType === 'upright' ? 'Upright' : 
                           selectedFridgeType === 'none' ? 'None' : selectedFridgeType}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFridgeType('all')}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              
              {selectedFinish !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="bg-green-100 text-green-600 border-green-200"
                  style={{
                    backgroundColor: config.id === 'wander' ? '#dcfce7' : config.id === 'roam' ? '#dbeafe' : '#e9d5ff',
                    color: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed',
                    borderColor: config.id === 'wander' ? '#bbf7d0' : config.id === 'roam' ? '#bfdbfe' : '#ddd6fe'
                  }}
                >
                  Finish: {selectedFinish === 'black-hex' ? 'Black Hex' :
                           selectedFinish === 'white' ? 'White' :
                           selectedFinish === 'birch' ? 'Birch' : selectedFinish}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFinish('all')}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              
              {searchQuery && (
                <Badge 
                  variant="secondary" 
                  className="bg-green-100 text-green-600 border-green-200"
                  style={{
                    backgroundColor: config.id === 'wander' ? '#dcfce7' : config.id === 'roam' ? '#dbeafe' : '#e9d5ff',
                    color: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed',
                    borderColor: config.id === 'wander' ? '#bbf7d0' : config.id === 'roam' ? '#bfdbfe' : '#ddd6fe'
                  }}
                >
                  Search: &quot;{searchQuery}&quot;
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </Card>
      </div>
    </m.div>
  );
}
