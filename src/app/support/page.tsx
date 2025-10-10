import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/sections/ComingSoonPage";
import { Headphones } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <ComingSoonPage
          title="Technical Support"
          description="Our dedicated technical support team is here to help. We're building a comprehensive support portal with troubleshooting guides, video tutorials, and live chat assistance. For immediate support, please contact us directly using the options below."
          icon={<Headphones size={64} className="text-brown-500" />}
        />
      </main>
      <Footer />
    </div>
  );
}
