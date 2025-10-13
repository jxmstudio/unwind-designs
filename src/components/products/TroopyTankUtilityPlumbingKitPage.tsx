"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { ProductVariantSection, useProductVariants, normalizeProductForVariants } from "./ProductVariantSection";

interface TroopyTankUtilityPlumbingKitPageProps {
  product: ComponentProduct;
}

export function TroopyTankUtilityPlumbingKitPage({ product }: TroopyTankUtilityPlumbingKitPageProps) {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = async (variant: any, quantity: number) => {
    const cartItem = {
      id: variant.id,
      name: `${product.name}${Object.entries(variant.selectedOptions).map(([key, value]) => {
        const option = product.variantOptions?.find(opt => opt.name === key);
        const optionValue = option?.values.find(v => v.value === value);
        return optionValue ? ` - ${optionValue.label}` : '';
      }).join('')}`,
      price: variant.price,
      image: product.images[selectedImageIndex],
      category: product.category,
      shortDescription: product.shortDescription,
      // Include shipping data for accurate quotes
      weight: product.weight || 1,
      dimensions: product.dimensions,
      shipClass: product.shipClass || 'standard'
    };

    addItem(cartItem);
  };

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
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
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
            <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current'
                        : i < product.rating
                        ? 'fill-current text-yellow-200'
                        : ''
                    }`}
                  />
                ))}
              </div>
              <span>({product.reviewCount} Reviews)</span>
            </div>

            {/* Badges and Stock */}
            <div className="flex items-center gap-3">
              {product.badges?.map((badge, index) => (
                <Badge key={index} className="bg-brown-100 text-brown-800 border-brown-200">
                  {badge}
                </Badge>
              ))}
              <div
                className={`text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            {/* Universal Variant Section */}
            <ProductVariantSection
              product={normalizeProductForVariants(product)}
              onVariantChange={handleVariantChange}
              onAddToCart={handleAddToCart}
              showPrice={true}
              showSKU={true}
              showStockStatus={true}
              showSelectedSummary={true}
              showAddToCart={true}
            />

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
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2 text-gray-400" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Wrench className="w-4 h-4 mr-2 text-gray-400" />
                <span>Easy Installation</span>
              </div>
            </div>

            {/* Product Tabs */}
            <Tabs defaultValue="description" className="w-full mt-8">
              <TabsList className="grid w-full grid-cols-3 h-auto bg-gray-100 rounded-xl p-1">
                <TabsTrigger value="description" className="py-2 text-sm font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-brown-600 data-[state=active]:shadow-sm data-[state=active]:rounded-lg transition-all duration-200">Description</TabsTrigger>
                <TabsTrigger value="features" className="py-2 text-sm font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-brown-600 data-[state=active]:shadow-sm data-[state=active]:rounded-lg transition-all duration-200">Features</TabsTrigger>
                <TabsTrigger value="specs" className="py-2 text-sm font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-brown-600 data-[state=active]:shadow-sm data-[state=active]:rounded-lg transition-all duration-200">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 text-gray-700 leading-relaxed">
                {product.description.split('\n\n').map((paragraph, index) => {
                  // Handle bullet points
                  if (paragraph.includes('•')) {
                    const lines = paragraph.split('\n');
                    const title = lines[0].replace('**', '').replace('**', '');
                    const bulletPoints = lines.slice(1).filter(line => line.trim().startsWith('•'));
                    
                    return (
                      <div key={index} className="mb-4">
                        {title && (
                          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                        )}
                        <ul className="list-disc pl-6 space-y-1">
                          {bulletPoints.map((point, bulletIndex) => (
                            <li key={bulletIndex} className="text-gray-700">
                              {point.replace('•', '').trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  
                  // Handle bold text
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h4 key={index} className="font-semibold text-gray-900 mb-2">
                        {paragraph.replace(/\*\*/g, '')}
                      </h4>
                    );
                  }
                  
                  // Regular paragraph
                  return (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph}
                    </p>
                  );
                })}
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specs" className="mt-4">
                <ul className="space-y-2 text-gray-700">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-medium">{key}:</span> {value}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>

            {/* Installation Guide */}
            <Card className="mt-8 bg-white shadow-sm rounded-xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Download className="w-6 h-6 text-brown-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Installation Guide</h4>
                    <p className="text-sm text-gray-600">Download the complete guide for easy setup.</p>
                  </div>
                </div>
                <Button variant="outline" className="border-brown-600 text-brown-600 hover:bg-brown-50">
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="mt-4 bg-white shadow-sm rounded-xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 text-brown-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Need Help?</h4>
                    <p className="text-sm text-gray-600">Our support team is ready to assist you.</p>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="bg-brown-600 hover:bg-brown-700 text-white">
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
