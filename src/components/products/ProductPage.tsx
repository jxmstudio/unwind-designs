"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductDescription } from "@/components/products/ProductDescription";
import { FrequentlyBoughtTogether } from "@/components/products/FrequentlyBoughtTogether";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus, Plus, ShoppingCart, CheckCircle, Star, ArrowLeft } from "lucide-react";
import { Product, formatPrice, isProductPurchasable, getProductAvailabilityStatus, getRelatedProducts, getUpsellProducts } from "@/lib/product-utils";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductVariantSection, normalizeProductForVariants } from "./ProductVariantSection";

interface ProductPageProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductPage({ product, relatedProducts = [] }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const { addItem } = useCart();

  const isPurchasable = isProductPurchasable(product);
  const availabilityStatus = getProductAvailabilityStatus(product);
  
  // Get upsell products for frequently bought together
  const upsellProducts = getUpsellProducts(product);

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
      image: product.images[0] || '',
      category: product.category,
      shortDescription: product.shortDescription || product.description
    };

    addItem(cartItem);
  };

  const handleBundleAddToCart = async (items: { productId: string; variantId?: string; quantity: number }[]) => {
    for (const item of items) {
      const productToAdd = upsellProducts.find(p => p.id === item.productId);
      if (productToAdd) {
        const cartItem = {
          id: item.variantId || productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          image: productToAdd.images[0] || '',
          category: productToAdd.category,
          shortDescription: productToAdd.shortDescription || productToAdd.description
        };
        await addItem(cartItem, item.quantity);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!isPurchasable) return;
    
    setIsAddingToCart(true);
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0] || '',
        category: product.category,
        shortDescription: product.shortDescription
      });
      
      // Show success feedback (you could add a toast here)
      console.log(`Added ${quantity} x ${product.name} to cart`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const increaseQuantity = () => {
    const maxQuantity = product.inventory || 99;
    setQuantity(prev => Math.min(prev + 1, maxQuantity));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  // Get related products if not provided
  const related = (relatedProducts && relatedProducts.length > 0) ? relatedProducts : getRelatedProducts(product, 4);

  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      
      <main className="pt-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div className="space-y-4">
              <ProductGallery 
                images={product.images} 
                name={product.name}
                videoUrl={product.videoUrl}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Back Button */}
              <Link 
                href="/shop" 
                className="inline-flex items-center text-accent-600 hover:text-accent-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>

              {/* Product Name */}
              <div>
                <h1 className="text-3xl font-bold text-textPrimary mb-2">
                  {product.name}
                </h1>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.comingSoon && (
                    <Badge className="bg-amber-500 text-white">Coming Soon</Badge>
                  )}
                  {product.isOnSale && product.salePercentage && (
                    <Badge className="bg-red-500 text-white">
                      -{product.salePercentage}% OFF
                    </Badge>
                  )}
                  {product.badges?.map((badge, index) => (
                    <Badge key={index} variant="outline" className="border-accent-300 text-accent-700">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating!)
                            ? "text-yellow-400 fill-current"
                            : "text-cream-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-body-small text-textPrimary/80">
                    {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-accent-600">
                    {formatPrice(selectedVariant?.price || product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > (selectedVariant?.price || product.price) && (
                    <span className="text-lg text-textPrimary/60 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                {/* Availability Status */}
                <div className="flex items-center gap-2">
                  <CheckCircle className={`w-5 h-5 ${
                    availabilityStatus === 'In Stock' ? 'text-green-500' :
                    availabilityStatus === 'Low Stock' ? 'text-yellow-500' :
                    availabilityStatus === 'Coming Soon' ? 'text-amber-500' :
                    'text-red-500'
                  }`} />
                  <span className={`font-medium ${
                    availabilityStatus === 'In Stock' ? 'text-green-600' :
                    availabilityStatus === 'Low Stock' ? 'text-yellow-600' :
                    availabilityStatus === 'Coming Soon' ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    {availabilityStatus}
                  </span>
                </div>
              </div>

              {/* Universal Variant Section */}
              {product.variantOptions && product.variantOptions.length > 0 && (
                <div className="mt-6">
                  <ProductVariantSection
                    product={normalizeProductForVariants(product)}
                    onVariantChange={handleVariantChange}
                    onAddToCart={handleAddToCartVariant}
                    showPrice={false}
                    showSKU={true}
                    showStockStatus={true}
                    showSelectedSummary={true}
                    showAddToCart={false}
                  />
                </div>
              )}


              {/* Quantity Selector */}
              {isPurchasable && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-textPrimary">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-borderNeutral rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="h-10 w-10 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 text-textPrimary font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={increaseQuantity}
                        disabled={product.inventory ? quantity >= product.inventory : false}
                        className="h-10 w-10 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {product.inventory && (
                      <span className="text-body-small text-textPrimary/70">
                        {product.inventory} in stock
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="space-y-4">
                {product.comingSoon ? (
                  <div className="w-full bg-amber-500 text-white font-semibold py-4 text-lg rounded-xl text-center">
                    Coming Soon
                  </div>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!isPurchasable || isAddingToCart}
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isAddingToCart ? (
                      "Adding to Cart..."
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Frequently Bought Together */}
              {upsellProducts.length > 0 && (
                <div className="mt-6">
                  <FrequentlyBoughtTogether 
                    addOns={upsellProducts.map(p => ({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: p.images[0] || '',
                      variants: p.variants?.map(v => ({
                        id: v.id,
                        name: Object.entries(v.options).map(([key, value]) => `${key}: ${value}`).join(', '),
                        price: v.price
                      })),
                      defaultVariant: p.variants?.[0]?.id
                    }))}
                    onAddToCart={handleBundleAddToCart}
                  />
                </div>
              )}

              {/* Product Details */}
              <Accordion type="single" collapsible className="w-full">
                {product.features && product.features.length > 0 && (
                  <AccordionItem value="features">
                    <AccordionTrigger className="text-left">
                      Key Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {product.features?.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-textPrimary">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <AccordionItem value="specifications">
                    <AccordionTrigger className="text-left">
                      Specifications
                    </AccordionTrigger>
                    <AccordionContent>
                      <dl className="space-y-2">
                        {Object.entries(product.specifications || {}).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-1 border-b border-borderNeutral/30">
                            <dt className="font-medium text-textPrimary">{key}</dt>
                            <dd className="text-textPrimary/80">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.dimensions && (
                  <AccordionItem value="dimensions">
                    <AccordionTrigger className="text-left">
                      Dimensions & Weight
                    </AccordionTrigger>
                    <AccordionContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-borderNeutral/30">
                          <dt className="font-medium text-textPrimary">Length</dt>
                          <dd className="text-textPrimary/80">{product.dimensions.length}cm</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b border-borderNeutral/30">
                          <dt className="font-medium text-textPrimary">Width</dt>
                          <dd className="text-textPrimary/80">{product.dimensions.width}cm</dd>
                        </div>
                        <div className="flex justify-between py-1 border-b border-borderNeutral/30">
                          <dt className="font-medium text-textPrimary">Height</dt>
                          <dd className="text-textPrimary/80">{product.dimensions.height}cm</dd>
                        </div>
                        {product.weight && (
                          <div className="flex justify-between py-1 border-b border-borderNeutral/30">
                            <dt className="font-medium text-textPrimary">Weight</dt>
                            <dd className="text-textPrimary/80">{product.weight}kg</dd>
                          </div>
                        )}
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.warranty && (
                  <AccordionItem value="warranty">
                    <AccordionTrigger className="text-left">
                      Warranty & Support
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-borderNeutral/30">
                          <dt className="font-medium text-textPrimary">Warranty</dt>
                          <dd className="text-textPrimary/80">{product.warranty}</dd>
                        </div>
                        {product.installationRequired && (
                          <div className="flex justify-between py-1 border-b border-borderNeutral/30">
                            <dt className="font-medium text-textPrimary">Installation</dt>
                            <dd className="text-textPrimary/80">Professional installation required</dd>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="mt-16">
              <ProductDescription 
                description={product.description}
                features={product.features || []}
                specifications={product.specifications || {}}
              />
            </div>
          )}

          {/* Related Products - Temporarily disabled for build */}
          {false && related && related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-textPrimary mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    className="bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
                    whileHover={{ y: -4 }}
                  >
                    <Link href={`/products/${relatedProduct.slug}`}>
                      <div className="aspect-square bg-cream-200 relative">
                        {relatedProduct.images[0] && (
                          <img
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {relatedProduct.comingSoon && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-amber-500 text-white">Coming Soon</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-textPrimary mb-2 line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-lg font-bold text-accent-600">
                          {formatPrice(relatedProduct.price)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
