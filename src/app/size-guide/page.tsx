import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/sections/ComingSoonPage";
import { Ruler } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <ComingSoonPage
          title="Size Guide"
          description="Finding the perfect fit for your vehicle is crucial. We're developing detailed sizing charts, measurement guides, and compatibility information for all our products. This comprehensive guide will help you choose the right fitout components for your specific vehicle model."
          icon={<Ruler size={64} className="text-brown-500" />}
        />
      </main>
      <Footer />
    </div>
  );
}
