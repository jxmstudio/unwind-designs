import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BaseKitPage } from "@/components/troopy/BaseKitPage";
import { getFlatPacksByBaseKit } from "@/data/products";
import { getBaseKitConfig } from "@/lib/troopy/baseKits";

export default function PremiumKitPage() {
  const configurations = getFlatPacksByBaseKit('Premium');
  const config = getBaseKitConfig('premium')!; // We know this exists

  return (
    <>
      <Navigation />
      <main>
        <BaseKitPage config={config} configurations={configurations} />
      </main>
      <Footer />
    </>
  );
}
