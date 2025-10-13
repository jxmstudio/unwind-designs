"use client";

import { useState } from "react";
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
  MessageCircle,
  Mail,
  Download
} from "lucide-react";
import { ComponentProduct } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";

interface WaterTank90LPageProps {
  product: ComponentProduct;
}

export function WaterTank90LPage({ product }: WaterTank90LPageProps) {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>("black");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (product.requiresEmailOrder) {
      // For email order products, redirect to contact page
      window.location.href = '/contact';
      return;
    }

    setIsAddingToCart(true);
    try {
      const cartItem = {
        id: `${product.id}${selectedColor ? `-${selectedColor}` : ''}`,
        name: `${product.name}${selectedColor ? ` - ${selectedColor}` : ''}`,
        price: product.price,
        image: product.images[selectedImageIndex],
        category: product.category,
        shortDescription: product.shortDescription,
        // Include shipping data for accurate quotes
        weight: product.weight || 1,
        dimensions: product.dimensions,
        shipClass: product.shipClass || 'standard'
      };

      addItem(cartItem);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleColorSelection = (colorValue: string) => {
    setSelectedColor(colorValue);
  };

  const isVariantComplete = selectedColor !== null;

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <SmartImage
                src={product.images[selectedImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-brown-500 ring-2 ring-brown-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <SmartImage
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-brown-100 text-brown-800">
                    {badge}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Email Order Notice */}
            {product.requiresEmailOrder && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">Email Order Required</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      This product requires email confirmation. Please contact us to place an order.
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/contact">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Us to Order
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Color:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-black"></div>
                    <span className="text-sm font-medium text-gray-900">Black</span>
                  </div>
                </div>
              </div>
            )}


            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !isVariantComplete}
                className="w-full bg-brown-600 hover:bg-brown-700 text-white py-3 text-lg font-medium rounded-xl"
                size="lg"
              >
                {isAddingToCart ? (
                  "Adding to Cart..."
                ) : !isVariantComplete ? (
                  "Please select a color"
                ) : product.requiresEmailOrder ? (
                  "Contact Us to Order"
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>

            {/* Share and Help Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Share:</span>
                <div className="flex items-center gap-2">
                  <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800">
                    <span className="text-sm font-bold">f</span>
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800">
                    <span className="text-sm font-bold">X</span>
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800">
                    <span className="text-sm font-bold">P</span>
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-bold">?</span>
                </div>
                <span className="text-sm underline">Need help?</span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="w-4 h-4 mr-2 text-gray-400" />
                Free shipping over $450
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2 text-gray-400" />
                {product.warranty} warranty
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Wrench className="w-4 h-4 mr-2 text-gray-400" />
                Installation required
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageCircle className="w-4 h-4 mr-2 text-gray-400" />
                Expert support
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {product.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="installation" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Installation Guide</h3>
                    <p className="text-gray-600">
                      Download our comprehensive installation guide for step-by-step instructions.
                    </p>
                    <Button variant="outline" className="border-brown-600 text-brown-600 hover:bg-brown-50">
                      <Download className="w-4 h-4 mr-2" />
                      Download Installation Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
                    <p className="text-gray-600">
                      Our expert team is here to help with installation, technical questions, and support.
                    </p>
                    <div className="flex gap-3">
                      <Button asChild className="bg-brown-600 hover:bg-brown-700">
                        <Link href="/contact">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact Support
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/faq">
                          View FAQ
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
