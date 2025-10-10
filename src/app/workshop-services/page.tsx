import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/sections/ComingSoonPage";
import { Wrench } from "lucide-react";

export default function WorkshopServicesPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <ComingSoonPage
          title="Workshop Services"
          description="We're developing a comprehensive workshop services page featuring professional installation, custom modifications, and expert maintenance for your van or 4x4. Check back soon for more details on how we can help transform your vehicle."
          icon={<Wrench size={64} className="text-brown-500" />}
        />
      </main>
      <Footer />
    </div>
  );
}


