"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ProductGrid } from '@/components/product-grid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { 
  listAllProducts, 
  getPurchasableProducts, 
  getComingSoonProducts,
  getFlatPackProducts,
  getNonFlatPackProducts,
  getPurchasableFlatPacks,
  getComingSoonFlatPacks
} from '@/lib/product-utils';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'flat-packs' | 'accessories' | 'coming-soon'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Update category filter when URL parameter changes
  useEffect(() => {
    setCategoryFilter(categoryParam);
  }, [categoryParam]);
  
  const allProducts = listAllProducts();
  const purchasableProducts = getPurchasableProducts();
  const comingSoonProducts = getComingSoonProducts();
  
  // Separate flat packs from other products
  const flatPacks = getFlatPackProducts();
  const nonFlatPacks = getNonFlatPackProducts();
  const purchasableFlatPacks = getPurchasableFlatPacks();
  const comingSoonFlatPacks = getComingSoonFlatPacks();

  // Get products based on active filter and search
  const getFilteredProducts = () => {
    let products;
    switch (activeFilter) {
      case 'flat-packs':
        products = flatPacks;
        break;
      case 'accessories':
        products = nonFlatPacks;
        break;
      case 'coming-soon':
        products = comingSoonProducts;
        break;
      default:
        products = allProducts;
    }

    // Apply category filter from URL
    if (categoryFilter) {
      products = products.filter(product => {
        const productCategory = 'category' in product ? product.category.toLowerCase() : '';
        const categoryMatch = categoryFilter.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/-systems?$/, ''); // Handle "water-systems" -> "water"
        
        // Match category or tags
        return (
          productCategory.includes(categoryMatch) ||
          productCategory.replace(/\s+/g, '-').includes(categoryMatch) ||
          product.tags?.some(tag => tag.toLowerCase().includes(categoryMatch))
        );
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      return products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return products;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <>
      <Head>
        <title>Shop All Products | Unwind Designs</title>
        <meta name="description" content="Browse our complete range of Toyota Troopcarrier flat packs, accessories, and components. Professional quality products for your next adventure." />
        <meta property="og:title" content="Shop All Products | Unwind Designs" />
        <meta property="og:description" content="Browse our complete range of Toyota Troopcarrier flat packs, accessories, and components." />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-cream-400">
        <Navigation />
        <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">
            Shop All Products
          </h1>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            Discover our complete range of Toyota Troopcarrier flat packs, accessories, and components. 
            Professional quality products designed for your next adventure.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              className="flex items-center gap-2"
            >
              <span>🏪</span>
              All Products
              <Badge variant="secondary" className="ml-2">
                {allProducts.length}
              </Badge>
            </Button>
            
            <Button
              variant={activeFilter === 'flat-packs' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('flat-packs')}
              className="flex items-center gap-2"
            >
              <span>🚐</span>
              Flat Packs
              <Badge variant="secondary" className="ml-2">
                {flatPacks.length}
              </Badge>
            </Button>
            
            <Button
              variant={activeFilter === 'accessories' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('accessories')}
              className="flex items-center gap-2"
            >
              <span>🔧</span>
              Accessories
              <Badge variant="secondary" className="ml-2">
                {nonFlatPacks.length}
              </Badge>
            </Button>
            
            <Button
              variant={activeFilter === 'coming-soon' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('coming-soon')}
              className="flex items-center gap-2"
            >
              <span>🚀</span>
              Coming Soon
              <Badge variant="secondary" className="ml-2">
                {comingSoonProducts.length}
              </Badge>
            </Button>
          </div>

          {/* Active Filter Description */}
          <div className="text-center mb-8">
            {activeFilter === 'all' && (
              <p className="text-lg text-textSecondary">
                Browse our complete product range - flat packs, accessories, and components
              </p>
            )}
            {activeFilter === 'flat-packs' && (
              <p className="text-lg text-textSecondary">
                Complete Toyota Troopcarrier fitout solutions. Choose from our Wander, Roam, and Premium kits.
              </p>
            )}
            {activeFilter === 'accessories' && (
              <p className="text-lg text-textSecondary">
                Individual components, accessories, and add-ons to customize your setup.
              </p>
            )}
            {activeFilter === 'coming-soon' && (
              <p className="text-lg text-textSecondary">
                Exciting new products coming soon! Get notified when they're available.
              </p>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-textPrimary">
              {activeFilter === 'all' && 'All Products'}
              {activeFilter === 'flat-packs' && 'Flat Packs'}
              {activeFilter === 'accessories' && 'Accessories & Components'}
              {activeFilter === 'coming-soon' && 'Coming Soon'}
              <span className="text-lg font-normal text-textSecondary ml-2">
                ({filteredProducts.length} products)
              </span>
            </h2>
          </div>
          
          <ProductGrid products={filteredProducts} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {allProducts.length}
              </div>
              <div className="text-sm text-textSecondary">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {flatPacks.length}
              </div>
              <div className="text-sm text-textSecondary">Flat Packs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {nonFlatPacks.length}
              </div>
              <div className="text-sm text-textSecondary">Accessories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">
                {comingSoonProducts.length}
              </div>
              <div className="text-sm text-textSecondary">Coming Soon</div>
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-500 mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading shop...</p>
        </div>
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}