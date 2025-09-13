import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TroopyPackDetail } from "@/components/products/TroopyPackDetail";

export default function PremiumKitPage() {
  const kitData = {
    kitSlug: "premium-kit",
    kitName: "Premium Kit",
    kitDescription: "The ultimate in flat pack luxury featuring premium multi-tone finishes, smart lighting controls, and German-engineered hardware. Professional installation included.",
    kitFeatures: [
      "Premium multi-tone timber finish",
      "German-engineered soft-close systems", 
      "Smart lighting with app control",
      "Premium stainless steel hardware",
      "Professional installation included",
      "Advanced power management system"
    ],
    kitSpecifications: {
      "Material": "Premium marine-grade plywood with luxury veneer",
      "Configurations": "Chest or upright fridge options", 
      "Finishes": "Premium multi-tone",
      "Assembly": "Professional installation included",
      "Compatibility": "Toyota Troopcarrier",
      "Warranty": "5 years",
      "Weight": "70-73kg",
      "Storage Volume": "260-280L total internal storage"
    },
    kitImage: "/products/premium-general-1.jpg"
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
