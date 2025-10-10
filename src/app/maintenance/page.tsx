import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/sections/ComingSoonPage";
import { Settings } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <ComingSoonPage
          title="Maintenance & Care"
          description="Proper maintenance keeps your van fitout in top condition for years to come. We're creating comprehensive maintenance guides, care instructions, and troubleshooting tips. Check back soon for expert advice on keeping your setup in perfect shape."
          icon={<Settings size={64} className="text-brown-500" />}
        />
      </main>
      <Footer />
    </div>
  );
}


