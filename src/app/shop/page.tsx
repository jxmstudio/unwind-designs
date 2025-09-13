import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedProductGrid } from "@/components/EnhancedProductGrid";

function ProductGridLoader() {
  return (
    <div className="py-16 bg-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4">
            Loading Products...
          </h2>
          <div className="animate-pulse">
            <div className="h-4 bg-brown-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <Suspense fallback={<ProductGridLoader />}>
          <EnhancedProductGrid />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
