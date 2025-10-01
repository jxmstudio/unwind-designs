import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EverlockLatchesPage } from "@/components/products/EverlockLatchesPage";
import { allAdditionalProducts } from "@/data/additional-products";

export default function EverlockLatchesProductPage() {
  const product = allAdditionalProducts.find(p => p.slug === "everlock-latches");
  
  // Debug logging
  console.log("Product found:", product);
  console.log("Faceplate size options:", product?.faceplateSizeOptions);
  console.log("Variant options:", product?.variantOptions);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-cream-400 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-textPrimary mb-4">Product Not Found</h1>
          <p className="text-textSecondary">The requested product could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main>
        <EverlockLatchesPage product={product} />
      </main>
      <Footer />
    </div>
  );
}
