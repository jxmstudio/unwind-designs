import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { XCircle, ArrowLeft, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Cancelled Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary mb-4">
              Payment Cancelled
            </h1>
            <p className="text-xl text-textSecondary max-w-2xl mx-auto">
              Your payment was cancelled and no charges were made. Your cart items are still saved if you&apos;d like to try again.
            </p>
          </div>

          {/* Information Card */}
          <div className="bg-cream-300 rounded-xl p-8 border border-borderNeutral shadow-soft mb-8">
            <h2 className="text-2xl font-semibold text-textPrimary mb-6">What Would You Like To Do?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Return to Cart */}
              <div className="p-6 bg-cream-400 rounded-lg border border-borderNeutral">
                <h3 className="font-semibold text-textPrimary mb-3">Return to Your Cart</h3>
                <p className="text-textSecondary text-sm mb-4">
                  Your items are still in your cart. You can review your order and try the checkout process again.
                </p>
                <Link href="/cart">
                  <Button className="w-full bg-brown-500 hover:bg-darkBrown text-cream-400">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Cart
                  </Button>
                </Link>
              </div>

              {/* Continue Shopping */}
              <div className="p-6 bg-cream-400 rounded-lg border border-borderNeutral">
                <h3 className="font-semibold text-textPrimary mb-3">Continue Shopping</h3>
                <p className="text-textSecondary text-sm mb-4">
                  Browse our complete range of Toyota Troopcarrier flat pack solutions and accessories.
                </p>
                <Link href="/flat-packs">
                  <Button variant="outline" className="w-full border-brown-500 text-brown-600 hover:bg-brown-500 hover:text-white">
                    Browse Flat Packs
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Common Payment Issues</h3>
            <div className="space-y-3 text-sm text-textSecondary">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Card Declined:</strong> Check with your bank or try a different payment method
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Incorrect Details:</strong> Verify your billing address matches your card
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Browser Issues:</strong> Try clearing cache or using a different browser
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">Need Help?</h3>
            <p className="text-textSecondary mb-6">
              If you&apos;re experiencing technical difficulties or have questions about your order, our support team is ready to assist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" className="border-brown-500 text-brown-600 hover:bg-brown-500 hover:text-white">
                  <Headphones className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="ghost" className="text-brown-600 hover:bg-brown-200">
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
