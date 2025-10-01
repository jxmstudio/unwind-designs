import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BaseKitPage } from "@/components/troopy/BaseKitPage";
import { getFlatPacksByBaseKit } from "@/data/products";
import { getBaseKitConfig } from "@/lib/troopy/baseKits";

export default function RoamKitPage() {
  const configurations = getFlatPacksByBaseKit('Roam');
  const config = getBaseKitConfig('roam');
  
  if (!config) {
    return (
      <>
        <Navigation />
        <main>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Roam Kit Not Found</h1>
            <p>The Roam Kit configuration could not be loaded.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
