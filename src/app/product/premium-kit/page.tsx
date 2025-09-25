import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedKitPage } from "@/components/products/EnhancedKitPage";

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
    kitImage: "/brand/Roam1.webp", // Using Roam1 as placeholder - replace with actual Premium images when available
    kitTagline: "Ultimate Luxury Adventure Kit",
    kitPrice: 8950,
    kitRating: 4.9,
    kitReviewCount: 89
  };

  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main>
        <EnhancedKitPage {...kitData} />
      </main>
      <Footer />
    </div>
  );
}
