import { Product, ProductFilter, ProductSort } from './products';

export interface SearchQuery {
  query: string;
  category?: string;
  subcategory?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  onSale?: boolean;
  rating?: number;
  tags?: string[];
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  filters: ProductFilter;
  suggestions: string[];
  relatedCategories: string[];
}

export interface SearchSuggestion {
  text: string;
  type: 'product' | 'category' | 'tag';
  relevance: number;
}

export class ProductSearchEngine {
  private static instance: ProductSearchEngine;
  private searchIndex: Map<string, Set<string>> = new Map();
  private categoryIndex: Map<string, Set<string>> = new Map();
  private tagIndex: Map<string, Set<string>> = new Map();

  private constructor() {
    this.buildSearchIndex();
  }

  static getInstance(): ProductSearchEngine {
    if (!ProductSearchEngine.instance) {
      ProductSearchEngine.instance = new ProductSearchEngine();
    }
    return ProductSearchEngine.instance;
  }

  /**
   * Perform a search with the given query
   */
  search(query: SearchQuery, products: Product[]): SearchResult {
    let results = [...products];

    // Apply text search
    if (query.query.trim()) {
      results = this.performTextSearch(results, query.query);
    }

    // Apply filters
    results = this.applyFilters(results, query);

    // Apply sorting
    if (query.sortBy && query.sortOrder) {
      results = this.sortProducts(results, {
        field: query.sortBy,
        direction: query.sortOrder
      });
    }

    // Apply pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    // Generate suggestions and related categories
    const suggestions = this.generateSuggestions(query.query, products);
    const relatedCategories = this.getRelatedCategories(results);

    return {
      products: paginatedResults,
      total: results.length,
      page,
      totalPages: Math.ceil(results.length / limit),
      hasNext: endIndex < results.length,
      hasPrev: page > 1,
      filters: this.extractFilters(query),
      suggestions,
      relatedCategories
    };
  }

  /**
   * Perform text-based search
   */
  private performTextSearch(products: Product[], query: string): Product[] {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return products.filter(product => {
      const searchableText = [
        product.name.toLowerCase(),
        product.description.toLowerCase(),
        product.category.toLowerCase(),
        product.subcategory?.toLowerCase() || '',
        ...product.tags.map(tag => tag.toLowerCase()),
        product.sku.toLowerCase()
      ].join(' ');

      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  /**
   * Apply filters to search results
   */
  private applyFilters(products: Product[], query: SearchQuery): Product[] {
    let filtered = [...products];

    if (query.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === query.category!.toLowerCase()
      );
    }

    if (query.subcategory) {
      filtered = filtered.filter(product => 
        product.subcategory?.toLowerCase() === query.subcategory!.toLowerCase()
      );
    }

    if (query.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= query.priceRange!.min && product.price <= query.priceRange!.max
      );
    }

    if (query.inStock !== undefined) {
      filtered = filtered.filter(product => product.inStock === query.inStock);
    }

    if (query.onSale !== undefined) {
      filtered = filtered.filter(product => product.isOnSale === query.onSale);
    }

    if (query.rating) {
      filtered = filtered.filter(product => product.rating >= query.rating!);
    }

    if (query.tags && query.tags.length > 0) {
      filtered = filtered.filter(product => 
        query.tags!.some(tag => product.tags.includes(tag))
      );
    }

    return filtered;
  }

  /**
   * Sort products
   */
  private sortProducts(products: Product[], sort: ProductSort): Product[] {
    const sorted = [...products];
    
    sorted.sort((a, b) => {
      let aValue: string | number, bValue: string | number;
      
      switch (sort.field) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'createdAt':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'popularity':
          aValue = a.reviewCount;
          bValue = b.reviewCount;
          break;
        default:
          return 0;
      }
      
      if (sort.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return sorted;
  }

  /**
   * Generate search suggestions
   */
  private generateSuggestions(query: string, products: Product[]): string[] {
    if (!query.trim()) return [];

    const suggestions: SearchSuggestion[] = [];
    const queryLower = query.toLowerCase();

    // Product name suggestions
    products.forEach(product => {
      if (product.name.toLowerCase().includes(queryLower)) {
        suggestions.push({
          text: product.name,
          type: 'product',
          relevance: this.calculateRelevance(queryLower, product.name.toLowerCase())
        });
      }
    });

    // Category suggestions
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(queryLower)) {
        suggestions.push({
          text: category,
          type: 'category',
          relevance: this.calculateRelevance(queryLower, category.toLowerCase())
        });
      }
    });

    // Tag suggestions
    const allTags = products.flatMap(p => p.tags);
    const uniqueTags = [...new Set(allTags)];
    uniqueTags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.push({
          text: tag,
          type: 'tag',
          relevance: this.calculateRelevance(queryLower, tag.toLowerCase())
        });
      }
    });

    // Sort by relevance and return top suggestions
    return suggestions
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8)
      .map(s => s.text);
  }

  /**
   * Get related categories based on search results
   */
  private getRelatedCategories(products: Product[]): string[] {
    const categoryCounts = new Map<string, number>();
    
    products.forEach(product => {
      const count = categoryCounts.get(product.category) || 0;
      categoryCounts.set(product.category, count + 1);
    });

    return Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category]) => category);
  }

  /**
   * Calculate relevance score for suggestions
   */
  private calculateRelevance(query: string, text: string): number {
    if (text.startsWith(query)) return 100;
    if (text.includes(query)) return 50;
    return 25;
  }

  /**
   * Extract filters from search query
   */
  private extractFilters(query: SearchQuery): ProductFilter {
    return {
      category: query.category,
      subcategory: query.subcategory,
      priceRange: query.priceRange,
      inStock: query.inStock,
      onSale: query.onSale,
      rating: query.rating,
      tags: query.tags
    };
  }

  /**
   * Build search index for better performance
   */
  private buildSearchIndex(): void {
    // This would typically be built from a database
    // For now, it's a placeholder for the search index structure
  }

  /**
   * Get popular search terms
   */
  getPopularSearches(): string[] {
    return [
      'troopcarrier',
      'storage',
      'lighting',
      'water heater',
      'ventilation',
      'drawer system',
      'kitchen',
      'electrical'
    ];
  }

  /**
   * Get search analytics
   */
  getSearchAnalytics(): {
    totalSearches: number;
    popularTerms: string[];
    noResultsQueries: string[];
  } {
    // This would typically come from analytics data
    return {
      totalSearches: 0,
      popularTerms: [],
      noResultsQueries: []
    };
  }
}

// Export singleton instance
export const productSearchEngine = ProductSearchEngine.getInstance();

// Utility functions for search
export function createSearchQuery(params: URLSearchParams): SearchQuery {
  return {
    query: params.get('q') || '',
    category: params.get('category') || undefined,
    subcategory: params.get('subcategory') || undefined,
    priceRange: params.get('min') && params.get('max') ? {
      min: parseFloat(params.get('min')!),
      max: parseFloat(params.get('max')!)
    } : undefined,
    inStock: params.get('inStock') === 'true' ? true : 
              params.get('inStock') === 'false' ? false : undefined,
    onSale: params.get('onSale') === 'true' ? true : 
            params.get('onSale') === 'false' ? false : undefined,
    rating: params.get('rating') ? parseFloat(params.get('rating')!) : undefined,
    tags: params.getAll('tag'),
    sortBy: (params.get('sortBy') as 'price' | 'name' | 'rating' | 'createdAt' | 'popularity') || undefined,
    sortOrder: (params.get('sortOrder') as 'asc' | 'desc') || undefined,
    page: params.get('page') ? parseInt(params.get('page')!) : 1,
    limit: params.get('limit') ? parseInt(params.get('limit')!) : 20
  };
}

export function buildSearchURL(query: SearchQuery): string {
  const params = new URLSearchParams();
  
  if (query.query) params.set('q', query.query);
  if (query.category) params.set('category', query.category);
  if (query.subcategory) params.set('subcategory', query.subcategory);
  if (query.priceRange) {
    params.set('min', query.priceRange.min.toString());
    params.set('max', query.priceRange.max.toString());
  }
  if (query.inStock !== undefined) params.set('inStock', query.inStock.toString());
  if (query.onSale !== undefined) params.set('onSale', query.onSale.toString());
  if (query.rating) params.set('rating', query.rating.toString());
  if (query.tags) query.tags.forEach(tag => params.append('tag', tag));
  if (query.sortBy) params.set('sortBy', query.sortBy);
  if (query.sortOrder) params.set('sortOrder', query.sortOrder);
  if (query.page && query.page > 1) params.set('page', query.page.toString());
  if (query.limit && query.limit !== 20) params.set('limit', query.limit.toString());

  return params.toString() ? `?${params.toString()}` : '';
}

export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return [];
  
  // Simple suggestion logic - in a real app, this would use the search engine
  const suggestions = [
    'troopcarrier storage',
    'van lighting',
    'water systems',
    'ventilation fans',
    'drawer systems',
    'kitchen fitouts',
    'electrical components',
    'sound deadening'
  ];

  return suggestions
    .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
}

export function highlightSearchTerm(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
