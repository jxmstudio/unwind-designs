import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TroopyPacksHero } from "@/components/sections/TroopyPacksHero";
import { TroopyPacksGrid } from "@/components/sections/TroopyPacksGrid";

export default function FlatPacksPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <TroopyPacksHero />
        <TroopyPacksGrid />
      </main>
      <Footer />
    </div>
  );
}
