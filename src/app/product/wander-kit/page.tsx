import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TroopyPackDetail } from "@/components/products/TroopyPackDetail";

export default function WanderKitPage() {
  const kitData = {
    kitSlug: "wander-kit",
    kitName: "Wander Kit",
    kitDescription: "Our budget-friendly flat pack solution for Toyota Troopcarriers. Perfect for weekend adventures with reliable storage and basic amenities. Multiple finish options available.",
    kitFeatures: [
      "Multiple fridge configuration options",
      "Three finish choices available", 
      "Marine-grade plywood construction",
      "Tool-free assembly system",
      "Slide-out storage drawers",
      "Built-in power management"
    ],
    kitSpecifications: {
      "Material": "Marine-grade plywood",
      "Configurations": "Chest or upright fridge options",
      "Finishes": "Plain hardwood, Eucalyptus Black Hex, Birch Black Hex",
      "Assembly": "4-6 hours typical",
      "Compatibility": "Toyota Troopcarrier",
      "Warranty": "2-3 years depending on finish",
      "Weight": "45-48kg",
      "Storage Volume": "160-180L total internal storage"
    },
    kitImage: "/products/wander-general-1.jpg"
  };

  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <TroopyPackDetail {...kitData} />
      </main>
      <Footer />
    </div>
  );
}
