import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TroopyTankUtilityPlumbingKitPage } from "@/components/products/TroopyTankUtilityPlumbingKitPage";
import { allAdditionalProducts } from "@/data/additional-products";

export default function TroopyTankUtilityPlumbingKitPageRoute() {
  const product = allAdditionalProducts.find(p => p.slug === "troopy-tank-utility-plumbing-kit");

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The requested plumbing kit product could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <TroopyTankUtilityPlumbingKitPage product={product} />
      </main>
      <Footer />
    </div>
  );
}
