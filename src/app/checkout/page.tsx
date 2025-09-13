import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-16">
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  );
}
