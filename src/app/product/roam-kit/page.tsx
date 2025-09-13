import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TroopyPackDetail } from "@/components/products/TroopyPackDetail";

export default function RoamKitPage() {
  const kitData = {
    kitSlug: "roam-kit",
    kitName: "Roam Kit",
    kitDescription: "Our most popular mid-range flat pack featuring enhanced hardware, LED lighting, and premium finishes. Perfect balance of features and value for extended adventures.",
    kitFeatures: [
      "Enhanced soft-close drawer systems",
      "Integrated LED lighting included",
      "Premium finishes available", 
      "Advanced cable management",
      "Heavy-duty mounting hardware",
      "Quick-connect electrical system"
    ],
    kitSpecifications: {
      "Material": "Premium marine-grade plywood",
      "Configurations": "Chest or upright fridge options",
      "Finishes": "Black Hex, White, Plain Birch",
      "Assembly": "6-8 hours typical",
      "Compatibility": "Toyota Troopcarrier",
      "Warranty": "3 years",
      "Weight": "55-58kg",
      "Storage Volume": "200-220L total internal storage"
    },
    kitImage: "/products/roam-general-1.jpg"
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
