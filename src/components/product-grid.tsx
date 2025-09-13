"use client";

import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
import { Filter, Grid, List } from "lucide-react";
import { useState } from "react";
import { sampleProducts, productCategories } from "@/lib/products";

// Use real product data from the products library

export function ProductGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  
  // Filter and search products
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popularity':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  return (
    <section className="py-16 bg-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-textPrimary/80 max-w-2xl mx-auto">
            Discover our range of quality van and 4x4 fitout products designed for 
            adventure and comfort on the road.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-borderNeutral rounded-lg bg-cream-300 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textPrimary/80">
              🔍
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-borderNeutral rounded-lg bg-cream-300 text-textPrimary focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {productCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name} ({category.productCount})
                </option>
              ))}
            </select>
            
            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-borderNeutral text-textPrimary hover:bg-brown-100 hover:border-brown-300"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-brown-500' : 'border-borderNeutral text-textPrimary'}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-brown-500' : 'border-borderNeutral text-textPrimary'}
            >
              <List size={16} />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-borderNeutral rounded-lg bg-cream-400 text-textPrimary focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-cream-300 rounded-lg p-6 mb-8 border border-borderNeutral">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-borderNeutral rounded-lg bg-cream-400 text-textPrimary focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                  <span className="text-textPrimary/80 self-center">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-borderNeutral rounded-lg bg-cream-400 text-textPrimary focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
              </div>
              
              {/* Stock Status */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">Stock Status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-textPrimary">In Stock</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-textPrimary">On Sale</span>
                  </label>
                </div>
              </div>
              
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">Minimum Rating</label>
                <select className="w-full px-3 py-2 border border-borderNeutral rounded-lg bg-cream-400 text-textPrimary focus:outline-none focus:ring-2 focus:ring-brown-500">
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-textPrimary/80 mb-4">
          Showing {sortedProducts.length} of {sampleProducts.length} products
        </div>

        {/* Product Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="!border-2 !border-brown-500 !text-brown-500 hover:!bg-brown-500 hover:!text-white !font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            Load More Products
          </Button>
        </div>

        {/* Categories Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cream-400 rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow border border-borderNeutral">
            <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔋</span>
            </div>
            <h3 className="text-lg font-semibold text-textPrimary mb-2">Power Systems</h3>
            <p className="text-textPrimary/80 text-sm">12V and 240V solutions for your vehicle</p>
          </div>
          
          <div className="bg-cream-400 rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow border border-borderNeutral">
            <div className="w-16 h-16 bg-lightBrown rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="text-lg font-semibold text-textPrimary mb-2">Storage Solutions</h3>
            <p className="text-textPrimary/80 text-sm">Custom storage for every vehicle type</p>
          </div>
          
          <div className="bg-cream-400 rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow border border-borderNeutral">
            <div className="w-16 h-16 bg-brown-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="text-lg font-semibold text-textPrimary mb-2">Installation</h3>
            <p className="text-textPrimary/80 text-sm">Professional fitout services</p>
          </div>
        </div>
      </div>
    </section>
  );
}
