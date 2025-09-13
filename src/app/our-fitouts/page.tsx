import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function OurFitoutsPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">Our Fitouts</h1>
          <p className="text-lg text-textSecondary mb-8">
            See examples of our custom van and 4x4 fitout work.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-cream-400 rounded-2xl p-6 shadow-soft border border-borderNeutral">
              <div className="w-full h-48 bg-cream-300 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">Troopy Storage System</h3>
              <p className="text-textSecondary">Custom storage solution for Toyota Troopcarrier</p>
            </div>
            
            <div className="bg-cream-400 rounded-2xl p-6 shadow-soft border border-borderNeutral">
              <div className="w-full h-48 bg-cream-300 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">Van Kitchen Setup</h3>
              <p className="text-textSecondary">Complete kitchen installation for campervan</p>
            </div>
            
            <div className="bg-cream-400 rounded-2xl p-6 shadow-soft border border-borderNeutral">
              <div className="w-full h-48 bg-cream-300 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">4x4 Drawer System</h3>
              <p className="text-textSecondary">Heavy-duty drawer system for off-road vehicles</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
