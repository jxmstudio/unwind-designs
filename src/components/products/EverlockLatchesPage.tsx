"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  ShoppingCart, 
  CheckCircle, 
  Truck, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  Play,
  Plus,
  Minus
} from "lucide-react";
import { Product } from "@/lib/product-utils";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/product-utils";
import { ProductVariantSection, normalizeProductForVariants } from "./ProductVariantSection";

interface EverlockLatchesPageProps {
  product: Product;
}

export function EverlockLatchesPage({ product }: EverlockLatchesPageProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(null);
  const [selectedFaceplateSize, setSelectedFaceplateSize] = useState("12mm");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [showGuaranteeDetails, setShowGuaranteeDetails] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  
  // Check if both required variants are selected
  const isVariantComplete = selectedColor !== null && selectedThickness !== null;
  
  // Update image based on selected color
  const getVariantImage = () => {
    if (!selectedColor) return product.images[0];
    
    // Map colors to specific images (if variant images exist)
    const colorImageMap: Record<string, number> = {
      'black': 0,      // Default black image
      'white': 1,      // White variant image
      'gold': 2,       // Gold variant image
      'sandy-beige': 1, // Use white image as fallback
      'aluminum': 2    // Use gold image as fallback
    };
    
    const imageIndex = colorImageMap[selectedColor] || 0;
    return product.images[imageIndex] || product.images[0];
  };
  
  // Debug logging
  console.log("EverlockLatchesPage - Product:", product);
  console.log("EverlockLatchesPage - Faceplate size options:", product.faceplateSizeOptions);
  console.log("EverlockLatchesPage - Variant options:", product.variantOptions);
  console.log("Selected variants:", { selectedColor, selectedThickness, isVariantComplete });
  
  const { addItem } = useCart();

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
  };

  const handleAddToCartVariant = async (variant: any, quantity: number) => {
    const cartItem = {
      id: variant.id,
      name: `${product.name}${Object.entries(variant.selectedOptions).map(([key, value]) => {
        const option = product.variantOptions?.find((opt: any) => opt.name === key);
        const optionValue = option?.values.find((v: any) => v.value === value);
        return optionValue ? ` - ${optionValue.label}` : '';
      }).join('')}`,
      price: variant.price,
      image: product.images[selectedImageIndex],
      category: product.category,
      shortDescription: product.shortDescription || product.description
    };

    addItem(cartItem);
  };

  const handleAddToCart = async () => {
    if (!isVariantComplete) return;
    
    setIsAddingToCart(true);
    try {
      const selectedColorLabel = product.colorOptions?.find(c => c.value === selectedColor)?.label || selectedColor;
      const selectedThicknessLabel = product.thicknessOptions?.find(t => t.value === selectedThickness)?.label || selectedThickness;
      
      addItem({
        id: `${product.id}-${selectedColor}-${selectedThickness}`,
        name: `${product.name} - ${selectedColorLabel} (${selectedThicknessLabel})`,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[selectedImageIndex] || product.images[0] || '',
        category: product.category,
        shortDescription: product.shortDescription
      });
      
      console.log(`Added ${quantity} x ${product.name} (${selectedColorLabel}, ${selectedThicknessLabel}) to cart`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleColorSelection = (colorValue: string) => {
    setSelectedColor(colorValue);
    // Update image index based on color selection
    const colorImageMap: Record<string, number> = {
      'black': 0,
      'white': 1,
      'gold': 2,
      'sandy-beige': 1,
      'aluminum': 2
    };
    const newImageIndex = colorImageMap[colorValue] || 0;
    setSelectedImageIndex(newImageIndex);
  };

  const selectedColorData = product.colorOptions?.find(c => c.value === selectedColor);
  const selectedThicknessData = product.thicknessOptions?.find(t => t.value === selectedThickness);

  return (
    <div className="min-h-screen bg-cream-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-soft relative">
              {showVideo ? (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    onEnded={() => setShowVideo(false)}
                  >
                    <source src={product.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={getVariantImage()}
                    alt={`${product.name} - ${selectedColor ? product.colorOptions?.find(c => c.value === selectedColor)?.label : 'Default'}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video Play Button */}
                  {product.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => setShowVideo(true)}
                        className="bg-white/90 hover:bg-white text-black rounded-full p-4"
                        size="lg"
                      >
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setShowVideo(false);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-brown-500' 
                      : 'border-gray-200 hover:border-brown-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              
              {/* Video Thumbnail */}
              {product.videoUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    showVideo 
                      ? 'border-brown-500' 
                      : 'border-gray-200 hover:border-brown-300'
                  }`}
                >
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </button>
              )}
            </div>
            
            {/* Image Counter */}
            <div className="text-right text-sm text-textSecondary">
              {showVideo ? 'Video' : `${selectedImageIndex + 1}/${product.images.length}`}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Back Button */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 text-textSecondary hover:text-textPrimary transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
              </button>
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-textSecondary">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isOnSale && (
                <Badge className="bg-red-500 text-white">
                  -{product.salePercentage}% OFF
                </Badge>
              )}
              {product.badges?.map((badge, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4 mb-2">
              <span className="text-3xl font-bold text-textPrimary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-textPrimary/60 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">In Stock</span>
            </div>
            
            <p className="text-textPrimary/70 text-sm mb-4">
              Tax included. Shipping calculated at checkout.
            </p>

            {/* Selected Variants Summary */}
            {isVariantComplete && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-800 mb-2">Selected Configuration:</h4>
                <div className="flex flex-wrap gap-4 text-sm text-green-700">
                  <div>
                    <span className="font-medium">Color:</span> {product.colorOptions?.find(c => c.value === selectedColor)?.label}
                  </div>
                  <div>
                    <span className="font-medium">Thickness:</span> {product.thicknessOptions?.find(t => t.value === selectedThickness)?.label}
                  </div>
                  <div>
                    <span className="font-medium">Faceplate:</span> {selectedFaceplateSize}
                  </div>
                </div>
              </div>
            )}


            {/* Faceplate Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-textPrimary mb-3">Faceplate Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.faceplateSizeOptions ? (
                  product.faceplateSizeOptions.map((faceplate) => (
                    <button
                      key={faceplate.value}
                      onClick={() => setSelectedFaceplateSize(faceplate.value)}
                      disabled={!faceplate.available}
                      className={`px-6 py-2 rounded-full border-2 transition-all duration-200 ${
                        selectedFaceplateSize === faceplate.value
                          ? "border-brown-500 bg-brown-500 text-white"
                          : faceplate.available
                          ? "border-gray-300 text-textPrimary hover:border-brown-300"
                          : "border-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {faceplate.label}
                    </button>
                  ))
                ) : (
                  // Fallback options if faceplateSizeOptions is not available
                  <>
                    <button
                      onClick={() => setSelectedFaceplateSize("12mm")}
                      className={`px-6 py-2 rounded-full border-2 transition-all duration-200 ${
                        selectedFaceplateSize === "12mm"
                          ? "border-brown-500 bg-brown-500 text-white"
                          : "border-gray-300 text-textPrimary hover:border-brown-300"
                      }`}
                    >
                      12mm
                    </button>
                    <button
                      onClick={() => setSelectedFaceplateSize("15mm")}
                      className={`px-6 py-2 rounded-full border-2 transition-all duration-200 ${
                        selectedFaceplateSize === "15mm"
                          ? "border-brown-500 bg-brown-500 text-white"
                          : "border-gray-300 text-textPrimary hover:border-brown-300"
                      }`}
                    >
                      15mm
                    </button>
                  </>
                )}
              </div>
              <div className="w-full h-0.5 bg-red-500 mt-3"></div>
            </div>

            {/* Universal Variant Section */}
            {product.variantOptions && product.variantOptions.length > 0 && (
              <div className="mt-6">
                <ProductVariantSection
                  product={normalizeProductForVariants(product)}
                  onVariantChange={handleVariantChange}
                  onAddToCart={handleAddToCartVariant}
                  showPrice={true}
                  showSKU={true}
                  showStockStatus={true}
                  showSelectedSummary={true}
                  showAddToCart={true}
                />
              </div>
            )}


            {/* Add to Cart Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !isVariantComplete}
                className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                  isVariantComplete
                    ? "bg-brown-500 hover:bg-brown-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                size="lg"
              >
                {isAddingToCart ? (
                  "Adding to Cart..."
                ) : !isVariantComplete ? (
                  "Please select color and thickness"
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to cart
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-3 text-lg font-semibold rounded-xl"
                size="lg"
              >
                Buy with shop
              </Button>
              
              <p className="text-center text-sm text-textSecondary">
                <a href="#" className="underline hover:text-brown-500">
                  More payment options
                </a>
              </p>
            </div>

            {/* Pickup Option */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium text-green-800">Pickup available at Export Drive</div>
                <div className="text-sm text-green-600">Usually ready in 2-4 days</div>
                <a href="#" className="text-sm text-green-600 underline hover:text-green-800">
                  View store information
                </a>
              </div>
            </div>

            {/* Shipping Information */}
            {product.shippingInfo && (
              <div className="border border-gray-200 rounded-lg p-4">
                <button
                  onClick={() => setShowShippingDetails(!showShippingDetails)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-brown-500" />
                    <span className="font-medium text-textPrimary">
                      {product.shippingInfo.freeShippingText}
                    </span>
                  </div>
                  {showShippingDetails ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {showShippingDetails && (
                  <div className="mt-3 text-sm text-textSecondary whitespace-pre-line">
                    {product.shippingInfo.freeShippingDetails}
                  </div>
                )}
              </div>
            )}

            {/* Guarantee Information */}
            {product.guaranteeInfo && (
              <div className="border border-gray-200 rounded-lg p-4">
                <button
                  onClick={() => setShowGuaranteeDetails(!showGuaranteeDetails)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-brown-500" />
                    <span className="font-medium text-textPrimary">
                      {product.guaranteeInfo.title}
                    </span>
                  </div>
                  {showGuaranteeDetails ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {showGuaranteeDetails && (
                  <div className="mt-3 text-sm text-textSecondary whitespace-pre-line">
                    {product.guaranteeInfo.details}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Highlights */}
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-6">Product Highlights</h2>
            <ul className="space-y-3">
              {product.features?.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-textPrimary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Description */}
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-6">Product Description</h2>
            <div className="prose prose-sm max-w-none">
              <div className="text-textPrimary leading-relaxed space-y-4">
                <p>
                  These German designed latches are a simple and effective way to keep your drawers and cupboards securely locked. Paired with a coloured faceplate and you have a stylish and effective door latch.
                </p>
                <p>
                  Another great benefit is that they sit flush with your cabinet/drawer front so there's no need to worry about getting caught on your door handles in your narrow corridors of your van.
                </p>
                <p>
                  Currently we stock matt black, white and pearl gold.
                </p>
                <p>
                  The faceplate comes in either 12 or 15mm depth.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>If your drawer front is 12mm use a 12mm faceplate.</li>
                  <li>If your drawer front is 15mm or larger use a 15mm faceplate. (You can still use a 12mm faceplate)</li>
                  <li>If your drawer front is less than 12mm send us a message after checkout with your drawer face thickness and we will send spacers to suit. A 9mm front will require 1 spacer.</li>
                </ul>
                <p>
                  If you are interested in other colours, please get in touch.
                </p>
                <p>
                  Videos and instructions are coming soon.
                </p>
                <p>
                  There is a template which is used to accurately align the latch and catch provided with every purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
