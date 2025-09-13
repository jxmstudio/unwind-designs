import { Suspense } from 'react';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessContent() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-textSecondary max-w-2xl mx-auto">
              Thank you for your order! We&apos;ve received your payment and will begin processing your flat pack kit immediately.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-cream-300 rounded-xl p-8 border border-borderNeutral shadow-soft mb-8">
            <h2 className="text-2xl font-semibold text-textPrimary mb-6">What Happens Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brown-500 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-textPrimary mb-2">Order Confirmation</h3>
                <p className="text-textSecondary text-sm">
                  You&apos;ll receive an email confirmation with your order details and tracking information within 10 minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brown-500 rounded-full mb-4">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-textPrimary mb-2">Order Processing</h3>
                <p className="text-textSecondary text-sm">
                  Your flat pack kit will be carefully prepared and packaged within 2-3 business days.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brown-500 rounded-full mb-4">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-textPrimary mb-2">Shipping</h3>
                <p className="text-textSecondary text-sm">
                  Your order will be shipped via our trusted carriers with full tracking provided.
                </p>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-brown-100 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">Need Help?</h3>
            <p className="text-textSecondary mb-4">
              If you have any questions about your order or need assistance with installation, our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="outline" className="border-brown-500 text-brown-600 hover:bg-brown-500 hover:text-white">
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

          {/* Continue Shopping */}
          <div className="text-center">
            <Link href="/flat-packs">
              <Button className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-4 text-lg rounded-xl">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-500 mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading order confirmation...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
