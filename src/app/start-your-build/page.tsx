import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BuildWizard } from "@/components/build-wizard/BuildWizard";
import { Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-brown-500 mx-auto mb-4" />
        <p className="text-textSecondary">Loading build wizard...</p>
      </div>
    </div>
  );
}

export default function StartYourBuildPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-textPrimary mb-4">
              Start Your Build
            </h1>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto">
              Ready to transform your vehicle? Our build wizard will guide you through 
              creating the perfect fitout for your adventure needs.
            </p>
          </div>
          
          {/* Build Wizard */}
          <Suspense fallback={<LoadingSpinner />}>
            <BuildWizard />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
