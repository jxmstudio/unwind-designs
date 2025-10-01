import { PlumbingKit90LPage } from "@/components/products/PlumbingKit90LPage";
import { plumbingKitProducts } from "@/data/additional-products";

export default function PlumbingKit90LPageRoute() {
  const product = plumbingKitProducts.find(p => p.slug === "90l-plumbing-kit");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The requested plumbing kit product could not be found.</p>
        </div>
      </div>
    );
  }

  return <PlumbingKit90LPage product={product} />;
}
