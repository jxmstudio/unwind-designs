import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/sections/ComingSoonPage";
import { Hammer } from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <ComingSoonPage
          title="Professional Installation"
          description="Our professional installation service ensures your flat pack or custom fitout is installed perfectly. We're working on detailed installation guides, booking systems, and service area information. Stay tuned for updates!"
          icon={<Hammer size={64} className="text-brown-500" />}
        />
      </main>
      <Footer />
    </div>
  );
}


