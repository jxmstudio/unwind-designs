import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BaseKitPage } from "@/components/troopy/BaseKitPage";
import { getFlatPacksByBaseKit } from "@/data/products";
import { getBaseKitConfig } from "@/lib/troopy/baseKits";
import { getBaseKitFromSlug } from "@/lib/troopy/utils";

interface BaseKitPageProps {
  params: Promise<{
    base: string;
  }>;
}

export default async function DynamicBaseKitPage({ params }: BaseKitPageProps) {
  const { base } = await params;
  const baseKit = getBaseKitFromSlug(base);
  
  if (!baseKit) {
    notFound();
  }

  const config = getBaseKitConfig(baseKit);
  if (!config) {
    notFound();
  }

  // Convert baseKit to the type expected by getFlatPacksByBaseKit
  const kitType = baseKit === 'wander' ? 'Wander' : 
                  baseKit === 'roam' ? 'Roam' : 
                  baseKit === 'premium' ? 'Premium' : null;

  if (!kitType) {
    notFound();
  }

  const configurations = getFlatPacksByBaseKit(kitType);

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

export function generateStaticParams() {
  return [
    { base: 'wander' },
    { base: 'roam' },
    { base: 'premium' },
  ];
}

export async function generateMetadata({ params }: BaseKitPageProps) {
  const { base } = await params;
  const baseKit = getBaseKitFromSlug(base);
  const config = baseKit ? getBaseKitConfig(baseKit) : null;
  
  if (!config) {
    return {
      title: 'Kit Not Found | Unwind Designs',
    };
  }

  return {
    title: `${config.name} - ${config.tagline} | Unwind Designs`,
    description: config.description,
  };
}
