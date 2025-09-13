import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WanderKitPageEnhanced } from "@/components/troopy/WanderKitPageEnhanced";
import { getFlatPacksByBaseKit } from "@/data/products";
import { getBaseKitConfig } from "@/lib/troopy/baseKits";

export default function WanderKitPage() {
  const configurations = getFlatPacksByBaseKit('Wander');
  const config = getBaseKitConfig('wander')!; // We know this exists

  return (
    <>
      <Navigation />
      <main>
        <WanderKitPageEnhanced config={config} configurations={configurations} />
      </main>
      <Footer />
    </>
  );
}
