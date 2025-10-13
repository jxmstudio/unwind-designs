"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  CheckCircle, 
  Wrench, 
  Shield, 
  Truck, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle
} from "lucide-react";
import { getTroopyPackBySlug, FlatPackProduct, ComponentProduct } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";

interface EnhancedKitPageProps {
  kitSlug: string;
  kitName: string;
  kitDescription: string;
  kitFeatures: string[];
  kitSpecifications: Record<string, string>;
  kitImage?: string;
  kitTagline?: string;
  kitPrice?: number;
  kitRating?: number;
  kitReviewCount?: number;
}

export function EnhancedKitPage({ 
  kitSlug, 
  kitName, 
  kitDescription, 
  kitFeatures, 
  kitSpecifications,
  kitImage = "/products/roam-general-1.jpg",
  kitTagline = "Premium DIY Flat Pack Solution",
  kitPrice = 5950,
  kitRating = 4.8,
  kitReviewCount = 127
}: EnhancedKitPageProps) {
  const [selectedVariant, setSelectedVariant] = useState<FlatPackProduct | ComponentProduct | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const products = getTroopyPackBySlug(kitSlug);
  const galleryRef = useRef<HTMLDivElement | null>(null);

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
        shortDescription: selectedVariant.shortDescription,
        // Include shipping data for accurate quotes
        weight: selectedVariant.weight || 1,
        dimensions: selectedVariant.dimensions,
        shipClass: selectedVariant.shipClass || 'standard'
      });
    }
  };

  // Gallery images - use actual product photos
  const getGalleryImages = () => {
    if (kitSlug === "roam-kit") {
      return [
        kitImage,
        "/brand/Roam2.jpg",
        "/brand/Roam3.jpg", 
        "/brand/Roam4.jpg"
      ];
    } else if (kitSlug === "wander-kit") {
      return [
        kitImage,
        "/brand/wandertroop2.webp",
        "/brand/wandertroop3.webp"
      ];
    } else {
      // Premium kit - using Roam images as placeholder
      return [
        kitImage,
        "/brand/Roam2.jpg",
        "/brand/Roam3.jpg", 
        "/brand/Roam4.jpg"
      ];
    }
  };

  const galleryImages = getGalleryImages();

  // Debug logging (kept minimal)
  // console.log('Kit Slug:', kitSlug, 'Kit Image:', kitImage, 'Gallery:', galleryImages);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-cream-400">
      {/* Hero Section with Background Image */}
      <div className="relative h-[70vh] bg-gradient-to-br from-cream-200 to-cream-300 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <SmartImage 
            src={kitImage}
            alt={`${kitName} Hero`}
            width={1920}
            height={1080}
            cacheBustKey={String(typeof window !== 'undefined' ? window.location.pathname : '')}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20"></div>
        </div>
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Info */}
              <div className="text-white">
                <div className="mb-6">
                  <Link href="/flat-packs" className="inline-flex items-center text-white/80 hover:text-white text-sm mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Flat Packs
                  </Link>
                  <Badge className="mb-4 bg-white/20 text-white border-white/30">
                    {kitTagline}
                  </Badge>
                  <h1 className="text-5xl sm:text-6xl font-bold mb-4">
                    {kitName}
                  </h1>
                  <p className="text-xl text-white/90 leading-relaxed mb-6">
                    {kitDescription}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex text-yellow-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-white/80">
                      {kitRating} rating ({kitReviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Quick Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">⭐</div>
                    <div className="text-sm font-semibold">Premium Features</div>
                    <div className="text-xs text-white/80">Enhanced storage & quality</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="text-sm font-semibold">Most Popular</div>
                    <div className="text-xs text-white/80">Trusted by thousands</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🛡️</div>
                    <div className="text-sm font-semibold">Extended Warranty</div>
                    <div className="text-xs text-white/80">Up to 3 years coverage</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="border-white/40 text-white hover:bg-white/10"
                    onClick={() => galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  >
                    View Photos
                  </Button>
                </div>
              </div>

              {/* Right: Product Image */}
              <div className="relative">
                <div className="relative aspect-square bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
                  <SmartImage
                    src={galleryImages[selectedImageIndex]}
                    alt={`${kitName} - Image ${selectedImageIndex + 1}`}
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover"
                    cacheBustKey={String(selectedImageIndex)}
                  />
                </div>
                
                {/* Floating Price Card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm">
                  <div className="text-3xl font-bold text-textPrimary mb-2">
                    From ${kitPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-textPrimary/60 mb-4">
                    Starting price for base configuration
                  </div>
                  <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 rounded-xl">
                    View Configurations
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="space-y-6" ref={galleryRef}>
            {/* Main Image */}
            <div className="relative group">
              <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                <SmartImage
                  src={galleryImages[selectedImageIndex]}
                  alt={`${kitName} - Image ${selectedImageIndex + 1}`}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                  cacheBustKey={String(selectedImageIndex)}
                />
              </div>
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-accent-500 ring-2 ring-accent-200' 
                        : 'border-gray-200 hover:border-accent-300'
                    }`}
                  >
                    <SmartImage 
                      src={image}
                      alt={`${kitName} - Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover"
                      cacheBustKey={`${index}`}
                    />
                  </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Configuration */}
          <div className="space-y-8">
            {/* Configuration Options */}
            <div>
              <h2 className="text-2xl font-bold text-textPrimary mb-6">
                Finish <span className="text-error-500">*Required</span>
              </h2>
              <div className="space-y-4">
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
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-textPrimary">
                            {'finish' in product ? product.finish : ''} {'fridgeType' in product ? product.fridgeType : ''}
                          </h3>
                          <p className="text-sm text-textPrimary/60 mt-1">
                            {'kitType' in product ? product.kitType : 'Kit'} Configuration
                          </p>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-textPrimary">
                          ${product.price.toLocaleString()}
                        </div>
                        {product.comingSoon && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Selected Variant Details */}
            {!selectedVariant && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl shadow-lg p-6">
                <div className="text-center">
                  <div className="text-xl font-semibold text-amber-900 mb-2">
                    ⚠️ Please Select a Configuration
                  </div>
                  <p className="text-amber-700">
                    Choose a finish and fridge type from the options above to continue
                  </p>
                </div>
              </div>
            )}

            {selectedVariant && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-textPrimary">
                      {'finish' in selectedVariant ? selectedVariant.finish : ''} {'fridgeType' in selectedVariant ? selectedVariant.fridgeType : ''}
                    </h3>
                    <p className="text-textPrimary/60 mt-1">
                      {'kitType' in selectedVariant ? selectedVariant.kitType : 'Kit'} Configuration
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {selectedVariant.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
                
                <div className="text-3xl font-bold text-textPrimary mb-6">
                  ${selectedVariant.price.toLocaleString()}
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm font-medium text-textPrimary">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {selectedVariant.comingSoon ? (
                    <div className="w-full bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 text-yellow-900 font-semibold py-4 rounded-xl text-center">
                      <div className="text-lg">🚀 Coming Soon</div>
                      <div className="text-sm mt-1">We're putting the finishing touches on this kit</div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 rounded-xl text-lg"
                      disabled={!selectedVariant.inStock}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white font-semibold py-4 rounded-xl"
                    disabled={selectedVariant.comingSoon}
                  >
                    {selectedVariant.comingSoon ? 'Coming Soon' : 'Configure & Buy'}
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
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
                <p className="text-textPrimary/80">
                  Tool-free assembly system with detailed instructions. Most kits can be assembled in 4-8 hours.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-accent-600" />
                  <h3 className="text-lg font-semibold text-textPrimary">Warranty</h3>
                </div>
                <p className="text-textPrimary/80">
                  {selectedVariant?.warranty || '2-5 years'} warranty depending on kit type. Professional installation included with Premium kits.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-accent-600" />
                  <h3 className="text-lg font-semibold text-textPrimary">Shipping</h3>
                </div>
                <p className="text-textPrimary/80">
                  Free shipping on all Troopy Packs. Professional installation available in select areas.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-textPrimary mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kitFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-textPrimary/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-textPrimary mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(kitSpecifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-textPrimary">{key}:</span>
                    <span className="text-textPrimary/80">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-8">
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Free Shipping</h3>
                <p className="text-green-700">
                  All Troopy Packs include free shipping Australia-wide. Delivery typically takes 5-10 business days.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-textPrimary mb-2">Standard Delivery</h4>
                  <p className="text-textPrimary/80">5-10 business days</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-textPrimary mb-2">Express Delivery</h4>
                  <p className="text-textPrimary/80">2-3 business days (+$50)</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-textPrimary mb-2">{kitRating}</div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <p className="text-textPrimary/60">Based on {kitReviewCount} reviews</p>
              </div>
              
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-textPrimary w-8">{rating}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-yellow-400 h-3 rounded-full" 
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-textPrimary/60 w-8">{(Math.random() * 50).toFixed(0)}</span>
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
