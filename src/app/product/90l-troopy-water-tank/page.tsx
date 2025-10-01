import { WaterTank90LPage } from "@/components/products/WaterTank90LPage";
import { waterTankProducts } from "@/data/products";

export default function WaterTank90LPageRoute() {
  const product = waterTankProducts.find(p => p.slug === "90l-troopy-water-tank");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The requested water tank product could not be found.</p>
        </div>
      </div>
    );
  }

  return <WaterTank90LPage product={product} />;
}
