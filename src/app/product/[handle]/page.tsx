"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductDescription } from "@/components/products/ProductDescription";
import { FrequentlyBoughtTogether } from "@/components/products/FrequentlyBoughtTogether";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus, Plus, ShoppingCart, Settings, CheckCircle, MapPin, Clock } from "lucide-react";
import { getAnyProductBySlug, Product } from "@/data/products";
import { sampleProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";


// Sample add-on products for FBT
const sampleAddOns = [
  {
    id: "cushion-set-troopy",
    name: "Cushion Set For Troopy Flat Packs",
    price: 850.00,
    image: "/products/cushion-set-1.jpg",
    variants: [
      { id: "wander-grey", name: "Wander/Roam Kit/Grey", price: 850.00 },
      { id: "wander-blue", name: "Wander/Roam Kit/Blue", price: 850.00 },
      { id: "premium-leather", name: "Premium Kit/Leather", price: 1200.00 }
    ],
    defaultVariant: "wander-grey"
  },
  {
    id: "shower-outlet-kit",
    name: "Troopy Shower Outlet Kit",
    price: 125.00,
    image: "/products/shower-outlet-1.jpg"
  },
  {
    id: "noise-insulation",
    name: "Car builders Mass Noise Liner Insulation",
    price: 129.00,
    image: "/products/insulation-1.jpg",
    variants: [
      { id: "standard", name: "Standard Sheet", price: 129.00 },
      { id: "premium", name: "Premium Sheet", price: 189.00 }
    ],
    defaultVariant: "standard"
  }
];

export default function ProductPage() {
  const [selectedVariant, setSelectedVariant] = useState<string>("black-hex");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const params = useParams();
  const handle = params.handle as string;

  useEffect(() => {
    // Handle both Troopy Pack kit routes and regular product IDs
    let foundProduct;
    
    // First try Troopy Pack kit routes
    if (handle === "wander-kit") {
      foundProduct = getAnyProductBySlug("wander-chest-plain");
    } else if (handle === "roam-kit") {
      foundProduct = getAnyProductBySlug("roam-chest-black");
    } else if (handle === "premium-kit") {
      foundProduct = getAnyProductBySlug("premium-chest");
    } else {
      // Try to find by exact slug match first
      foundProduct = getAnyProductBySlug(handle);
      
      // If not found by slug, try to find by ID in sampleProducts
      if (!foundProduct) {
        foundProduct = sampleProducts.find(p => p.id === handle);
      }
    }
    
    if (foundProduct) {
      setProduct(foundProduct as Product);
    }
    setLoading(false);
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-textPrimary">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const variants = [
    { id: "black-hex", name: "Black Hex", price: product.price },
    { id: "white", name: "White", price: product.price + 250 },
    { id: "plain-birch", name: "Plain Birch", price: product.price + 100 }
  ];

  const selectedVariantData = variants.find(v => v.id === selectedVariant) || variants[0];

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      // Handle cart addition
    }, 1000);
  };

  const handleFBTAddToCart = (items: { productId: string; variantId?: string; quantity: number }[]) => {
    // Handle adding multiple items to cart
    console.log("Adding FBT items:", items);
  };

  const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stockQuantity));
  const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-textPrimary/60">
              <Link href="/flat-packs" className="hover:text-accent-600">Flat Packs</Link>
              <span>/</span>
              <span className="text-textPrimary">{product.name}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div>
              <ProductGallery 
                images={product.images} 
                alt={product.name}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Title and Price */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4">
                  {product.name}
                </h1>
                <div className="flex items-baseline space-x-4 mb-2">
                  <span className="text-3xl font-bold text-textPrimary">
                    ${selectedVariantData.price.toFixed(2)}
                  </span>
                  {selectedVariantData.price !== product.price && (
                    <span className="text-lg text-textPrimary/60 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-textPrimary/70 text-sm">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>

              {/* Variant Selection */}
              <div>
                <h3 className="text-lg font-semibold text-textPrimary mb-4">Finish</h3>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                        selectedVariant === variant.id
                          ? "border-accent-500 bg-accent-500 text-white"
                          : "border-borderNeutral text-textPrimary hover:border-accent-300"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-lg font-semibold text-textPrimary mb-4">Quantity</h3>
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
                      disabled={quantity >= product.stockQuantity}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-textPrimary/70">
                    {product.stockQuantity} in stock
                  </span>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !product.inStock}
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300"
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
                
                <Link href={`/configurator/troopy?base=${'slug' in product ? product.slug : product.id}`}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Complete the kit here!
                  </Button>
                </Link>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">In Stock</span>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div className="mt-16">
            <FrequentlyBoughtTogether 
              addOns={sampleAddOns}
              onAddToCart={handleFBTAddToCart}
            />
          </div>

          {/* Info Blocks */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Store Pickup */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Pickup available at Export Drive</h3>
                  <div className="flex items-center space-x-2 text-green-700 mb-3">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Usually ready in 2-4 days</span>
                  </div>
                  <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium text-sm">
                    View store information
                  </Link>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="shipping" className="border border-borderNeutral rounded-xl">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-semibold text-textPrimary">Bulky Item Shipping Details</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-textPrimary/80">
                    <p>This item requires special shipping due to its size and weight. We&apos;ll contact you within 24 hours to arrange delivery details and provide an accurate shipping quote.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="guarantee" className="border border-borderNeutral rounded-xl">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-semibold text-textPrimary">Unwind Guarantee</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-textPrimary/80">
                    <p>We guarantee the quality of our products and your satisfaction. If you&apos;re not completely happy with your purchase, we&apos;ll work with you to make it right or provide a full refund.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-16">
            <ProductDescription
              descriptionHtml={'descriptionHtml' in product ? product.descriptionHtml : product.description}
              productName={product.name}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
