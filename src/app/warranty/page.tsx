import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/sections/ComingSoonPage";
import { Shield } from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <ComingSoonPage
          title="Warranty Information"
          description="All our products come with comprehensive warranty coverage. We're preparing detailed warranty terms, claim procedures, and coverage information. This page will be available soon with everything you need to know about protecting your investment."
          icon={<Shield size={64} className="text-brown-500" />}
        />
      </main>
      <Footer />
    </div>
  );
}


