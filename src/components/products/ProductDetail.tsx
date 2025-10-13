"use client";

import { useState } from "react";
import { Star, Heart, ShoppingCart, Truck, Shield, Clock, Package, Ruler, Weight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { type Product } from "@/lib/products";
import { RecommendedItems } from "@/components/products/RecommendedItems";
import { VideoPlayer } from "@/components/products/VideoPlayer";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0] || '',
      category: product.category,
      shortDescription: product.shortDescription,
      // Include shipping data for accurate quotes
      weight: product.weight || 1,
      dimensions: product.dimensions,
      shipClass: product.shipClass || 'standard'
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-cream-300 rounded-2xl overflow-hidden border border-borderNeutral">
            {product.images[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-textPrimary/80">
                {product.category} Image
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-brown-500'
                      : 'border-borderNeutral hover:border-brown-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {product.isOnSale && (
                <Badge className="bg-red-500 text-white border-0">
                  {product.salePercentage}% OFF
                </Badge>
              )}
              <Badge variant="outline" className="border-brown-300 text-brown-600">
                {product.category}
              </Badge>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-textPrimary mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-cream-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-textPrimary/80">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-brown-500">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-textPrimary/80 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.isOnSale && (
              <p className="text-green-600 font-medium">
                Save ${((product.originalPrice || 0) - product.price).toFixed(2)}!
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-2">Description</h3>
            <p className="text-textPrimary/80 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-3">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.slice(0, 6).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-body-small text-textPrimary/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-4 text-body-small">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            {product.inStock && (
              <span className="text-textPrimary/80">
                {product.stockQuantity} available
              </span>
            )}
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-4 p-6 bg-cream-300 rounded-xl border border-borderNeutral">
            <div className="flex items-center gap-4">
              <label className="text-body-small font-medium text-textPrimary">Quantity:</label>
              <div className="flex items-center border border-borderNeutral rounded-lg bg-cream-400">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 hover:bg-brown-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-center min-w-[3rem]">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 hover:bg-brown-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-brown-500 hover:bg-darkBrown text-cream-400 py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="px-4 border-borderNeutral text-textPrimary hover:bg-brown-100"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Info Icons */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-borderNeutral">
              <div className="text-center">
                <Truck className="w-6 h-6 text-brown-500 mx-auto mb-2" />
                <p className="text-caption text-textPrimary/80">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-brown-500 mx-auto mb-2" />
                <p className="text-caption text-textPrimary/80">{product.warranty} Warranty</p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 text-brown-500 mx-auto mb-2" />
                <p className="text-caption text-textPrimary/80">Fast Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-borderNeutral">
          <div className="flex gap-8">
            <button className="py-3 px-1 border-b-2 border-brown-500 text-brown-500 font-medium">
              Specifications
            </button>
            <button className="py-3 px-1 border-b-2 border-transparent text-textPrimary/80 hover:text-textPrimary font-medium">
              Installation
            </button>
            <button className="py-3 px-1 border-b-2 border-transparent text-textPrimary/80 hover:text-textPrimary font-medium">
              Reviews
            </button>
          </div>
        </div>

        <div className="py-8">
          {/* Specifications Tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-textPrimary mb-4">Product Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-cream-200">
                    <span className="font-medium text-textPrimary">{key}</span>
                    <span className="text-textPrimary/80">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-textPrimary mb-4">Physical Details</h3>
              <div className="space-y-3">
                {product.weight && (
                  <div className="flex justify-between py-2 border-b border-cream-200">
                    <span className="font-medium text-textPrimary flex items-center gap-2">
                      <Weight className="w-4 h-4" />
                      Weight
                    </span>
                    <span className="text-textPrimary/80">{product.weight}kg</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between py-2 border-b border-cream-200">
                    <span className="font-medium text-textPrimary flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      Dimensions
                    </span>
                    <span className="text-textPrimary/80">
                      {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height}cm
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-cream-200">
                  <span className="font-medium text-textPrimary flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    SKU
                  </span>
                  <span className="text-textPrimary/80">{product.sku}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-cream-200">
                  <span className="font-medium text-textPrimary">Installation Required</span>
                  <span className="text-textPrimary/80">
                    {product.installationRequired ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {product.videoUrl && (
          <div className="py-16 border-t border-cream-200">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-textPrimary mb-4">
                  Product Walkthrough
                </h2>
                <p className="text-lg text-textPrimary/80">
                  See this product in action with our detailed walkthrough video
                </p>
              </div>
              
              <VideoPlayer
                videoUrl={product.videoUrl}
                title={`${product.name} Walkthrough`}
                description="Detailed product overview and installation guide"
                className="rounded-xl overflow-hidden shadow-large"
                height={400}
              />
            </div>
          </div>
        )}

        {/* Upsells Section */}
        {product.upsells && product.upsells.length > 0 && (
          <div className="py-16 border-t border-cream-200 bg-cream-300">
            <div className="max-w-6xl mx-auto">
              <RecommendedItems
                upsellIds={product.upsells}
                title="Complete Your Setup"
                subtitle="These accessories are frequently bought together with this product"
                maxItems={4}
                showAddToCart={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
