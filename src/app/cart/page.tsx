import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartPageContent } from "@/components/cart/CartPageContent";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <CartPageContent />
      </main>
      <Footer />
    </div>
  );
}
