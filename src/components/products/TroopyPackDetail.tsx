"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, CheckCircle, Wrench, Shield, Truck } from "lucide-react";
import { getTroopyPackBySlug, FlatPackProduct, ComponentProduct } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

interface TroopyPackDetailProps {
  kitSlug: string;
  kitName: string;
  kitDescription: string;
  kitFeatures: string[];
  kitSpecifications: Record<string, string>;
}

export function TroopyPackDetail({ 
  kitSlug, 
  kitName, 
  kitDescription, 
  kitFeatures, 
  kitSpecifications
}: TroopyPackDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<FlatPackProduct | ComponentProduct | null>(null);
  const { addItem } = useCart();
  const products = getTroopyPackBySlug(kitSlug);
  
  // Set default selected variant to the first product
  if (!selectedVariant && products.length > 0) {
    setSelectedVariant(products[0]);
  }

  const handleVariantSelect = (product: FlatPackProduct | ComponentProduct) => {
    setSelectedVariant(product);
  };

  const handleAddToCart = () => {
    if (selectedVariant && !selectedVariant.comingSoon) {
      addItem({
        id: selectedVariant.id,
        name: selectedVariant.name,
        price: selectedVariant.price,
        image: selectedVariant.images[0] || '',
        category: selectedVariant.category,
        shortDescription: selectedVariant.shortDescription
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-cream-200 to-cream-300 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-8xl opacity-20">🚐</div>
            </div>
          </div>
          
          {/* Thumbnail images */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-cream-200 rounded-lg cursor-pointer hover:ring-2 hover:ring-accent-500 transition-all">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-2xl opacity-20">📷</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4">
              {kitName}
            </h1>
            <p className="text-lg text-textPrimary/80 leading-relaxed mb-6">
              {kitDescription}
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-textPrimary/60">
                {selectedVariant?.rating || 4.7} rating ({selectedVariant?.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          {/* Variant Selection */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Choose Configuration:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <Card 
                  key={product.id}
                  className={`cursor-pointer transition-all ${
                    selectedVariant?.id === product.id 
                      ? 'ring-2 ring-accent-500 bg-accent-50' 
                      : 'hover:ring-1 hover:ring-accent-300'
                  }`}
                  onClick={() => handleVariantSelect(product)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-textPrimary text-body-small">
                        {'finish' in product ? product.finish : ''} {'fridgeType' in product ? product.fridgeType : ''}
                      </h4>
                      <Badge variant="outline" className="text-caption">
                        {'kitType' in product ? product.kitType : 'Kit'}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-textPrimary">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="text-caption text-textPrimary/60 mt-1">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Price and CTA */}
          {selectedVariant && (
            <div className="bg-cream-100 rounded-xl p-6">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-textPrimary">
                    ${selectedVariant.price.toLocaleString()}
                  </div>
                  <div className="text-textPrimary/60 text-body-small">
                    {'finish' in selectedVariant ? selectedVariant.finish : ''} {'fridgeType' in selectedVariant ? selectedVariant.fridgeType : ''}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {selectedVariant.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {selectedVariant.comingSoon ? (
                  <div className="w-full bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 text-yellow-900 font-semibold py-4 rounded-xl text-center">
                    <div className="text-lg">🚀 Coming Soon</div>
                    <div className="text-sm mt-1">We're putting the finishing touches on this kit</div>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 rounded-xl"
                    disabled={!selectedVariant.inStock}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white font-semibold py-3 rounded-xl"
                  disabled={selectedVariant.comingSoon}
                >
                  {selectedVariant.comingSoon ? 'Coming Soon' : 'Configure & Buy'}
                </Button>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Key Features:</h3>
            <ul className="space-y-2">
              {kitFeatures.map((feature, i) => (
                <li key={i} className="flex items-start text-textPrimary/80">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Wrench className="w-6 h-6 text-accent-600" />
                  <h3 className="text-lg font-semibold text-textPrimary">Easy Assembly</h3>
                </div>
                <p className="text-textPrimary/80 text-body-small">
                  Tool-free assembly system with detailed instructions. Most kits can be assembled in 4-8 hours.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-accent-600" />
                  <h3 className="text-lg font-semibold text-textPrimary">Warranty</h3>
                </div>
                <p className="text-textPrimary/80 text-body-small">
                  {selectedVariant?.warranty || '2-5 years'} warranty depending on kit type. Professional installation included with Premium kits.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-accent-600" />
                  <h3 className="text-lg font-semibold text-textPrimary">Shipping</h3>
                </div>
                <p className="text-textPrimary/80 text-body-small">
                  Free shipping on all Troopy Packs. Professional installation available in select areas.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-8">
            <div className="bg-cream-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-textPrimary mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(kitSpecifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-borderNeutral/30">
                    <span className="font-medium text-textPrimary">{key}:</span>
                    <span className="text-textPrimary/80">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-8">
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Free Shipping</h3>
                <p className="text-green-700">
                  All Troopy Packs include free shipping Australia-wide. Delivery typically takes 5-10 business days.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-textPrimary mb-2">Standard Delivery</h4>
                  <p className="text-textPrimary/80 text-body-small">5-10 business days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-textPrimary mb-2">Express Delivery</h4>
                  <p className="text-textPrimary/80 text-body-small">2-3 business days (+$50)</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-textPrimary mb-2">4.8</div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-textPrimary/60">Based on 127 reviews</p>
              </div>
              
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-4">
                    <span className="text-body-small font-medium text-textPrimary w-8">{rating}</span>
                    <div className="flex-1 bg-cream-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="text-body-small text-textPrimary/60 w-8">{(Math.random() * 50).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
