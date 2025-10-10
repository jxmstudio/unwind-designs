"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Package, Shield, Phone, Mail } from "lucide-react";
import { sectionReveal, staggerItem } from "@/lib/motion";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <motion.h1 
              className="text-3xl font-bold text-textPrimary mb-4"
              variants={staggerItem}
            >
              Shipping Policy
            </motion.h1>
            <motion.p 
              className="text-body text-textSecondary"
              variants={staggerItem}
            >
              Fast, reliable shipping across Australia and worldwide
            </motion.p>
          </motion.div>

          {/* Shipping Calculator Notice */}
          <Card className="bg-gradient-to-r from-brown-100 to-cream-300 border-brown-300 mb-12">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-brown-500 rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-3">
                Real-Time Shipping Calculation
              </h3>
              <p className="text-lg text-textPrimary/80 max-w-3xl mx-auto leading-relaxed">
                Shipping costs are calculated automatically at checkout based on your delivery address, 
                item weight, dimensions, and chosen carrier. We use <strong>BigPost API</strong> to provide 
                you with the most accurate and competitive shipping rates from trusted Australian carriers.
              </p>
            </CardContent>
          </Card>

          {/* Shipping Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-cream-300 border-borderNeutral">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-brown-500" />
                </div>
                <CardTitle className="text-lg text-textPrimary">Standard Shipping</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-body font-bold text-brown-500 mb-2">3-7 Business Days</p>
                <p className="text-textSecondary text-body-small mb-4">
                  Reliable delivery across Australia
                </p>
                <p className="text-textPrimary font-medium text-body-small">
                  Calculated at checkout
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cream-300 border-borderNeutral">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-brown-500" />
                </div>
                <CardTitle className="text-lg text-textPrimary">Express Shipping</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-body font-bold text-brown-500 mb-2">1-3 Business Days</p>
                <p className="text-textSecondary text-body-small mb-4">
                  Priority delivery for urgent orders
                </p>
                <p className="text-textPrimary font-medium text-body-small">
                  Calculated at checkout
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cream-300 border-borderNeutral">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-brown-500" />
                </div>
                <CardTitle className="text-lg text-textPrimary">International</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-body font-bold text-brown-500 mb-2">7-21 Days</p>
                <p className="text-textSecondary text-body-small mb-4">
                  Worldwide shipping available
                </p>
                <p className="text-textPrimary font-medium text-body-small">
                  Calculated at checkout
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Factors Affecting Shipping Cost */}
          <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary">What Affects Your Shipping Cost?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-brown-500" />
                  </div>
                  <div>
                    <h3 className="text-body font-medium text-textPrimary mb-2">Weight & Dimensions</h3>
                    <p className="text-textSecondary text-body-small">
                      Heavier and larger items cost more to ship. Our flat packs are carefully packaged 
                      to minimize shipping costs while ensuring safe delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brown-500" />
                  </div>
                  <div>
                    <h3 className="text-body font-medium text-textPrimary mb-2">Delivery Location</h3>
                    <p className="text-textSecondary text-body-small">
                      Metro areas generally have lower rates than regional or remote locations. 
                      Distance from our warehouse also affects the final cost.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-brown-500" />
                  </div>
                  <div>
                    <h3 className="text-body font-medium text-textPrimary mb-2">Carrier Selection</h3>
                    <p className="text-textSecondary text-body-small">
                      We partner with multiple carriers including Australia Post, StarTrack, and specialty 
                      freight services to offer you the best rates and service levels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brown-500" />
                  </div>
                  <div>
                    <h3 className="text-body font-medium text-textPrimary mb-2">Service Speed</h3>
                    <p className="text-textSecondary text-body-small">
                      Express delivery costs more than standard shipping. You'll see all available 
                      options with real-time pricing during checkout.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">How Shipping Works</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Order Confirmation</h3>
                    <p className="text-textSecondary text-body-small">
                      Once your order is placed, you&apos;ll receive an email confirmation with order details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Processing</h3>
                    <p className="text-textSecondary text-body-small">
                      We&apos;ll process your order within 24 hours and prepare it for shipping.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Shipping</h3>
                    <p className="text-textSecondary text-body-small">
                      Your order will be shipped and you&apos;ll receive tracking information via email.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Delivery</h3>
                    <p className="text-textSecondary text-body-small">
                      Your order will be delivered to your specified address during business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">Shipping Policies</h2>
              <div className="space-y-4">
                <div className="bg-cream-300 p-4 rounded-lg border border-borderNeutral">
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Dynamic Pricing</h3>
                  <p className="text-textSecondary text-body-small">
                    All shipping costs are calculated in real-time based on your exact delivery address, 
                    package weight, dimensions, and selected carrier.
                  </p>
                </div>
                <div className="bg-cream-300 p-4 rounded-lg border border-borderNeutral">
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Delivery Times</h3>
                  <p className="text-textSecondary text-body-small">
                    Delivery times are estimates and may vary due to weather, holidays, or remote locations. 
                    You'll see estimated delivery dates during checkout.
                  </p>
                </div>
                <div className="bg-cream-300 p-4 rounded-lg border border-borderNeutral">
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Signature & Insurance</h3>
                  <p className="text-textSecondary text-body-small">
                    High-value orders may require signature upon delivery. Insurance options are available 
                    for added protection of your items.
                  </p>
                </div>
                <div className="bg-cream-300 p-4 rounded-lg border border-borderNeutral">
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">International Shipping</h3>
                  <p className="text-textSecondary text-body-small">
                    International orders may be subject to customs duties and import taxes. 
                    Rates calculated based on destination and package specifications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking & Support */}
          <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary">Order Tracking & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-body font-medium text-textPrimary mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-brown-500" />
                    Track Your Order
                  </h3>
                  <p className="text-textSecondary text-body-small mb-4">
                    All orders include tracking information. You&apos;ll receive tracking details via email once your order ships.
                  </p>
                  <Button variant="outline" className="border-borderNeutral text-textPrimary hover:bg-brown-100">
                    Track Order
                  </Button>
                </div>
                <div>
                  <h3 className="text-body font-medium text-textPrimary mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brown-500" />
                    Shipping Support
                  </h3>
                  <p className="text-textSecondary text-body-small mb-4">
                    Need help with shipping? Our customer service team is here to assist you.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-body-small text-textSecondary">
                      <Phone className="w-4 h-4" />
                      0417 362 209
                    </div>
                    <div className="flex items-center gap-2 text-body-small text-textSecondary">
                      <Mail className="w-4 h-4" />
                      shipping@unwinddesigns.com.au
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-textPrimary mb-4">
              Ready to get started?
            </h2>
            <p className="text-textSecondary text-body-small mb-6">
              Browse our products and enjoy fast, reliable shipping to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="!bg-brown-500 hover:!bg-darkBrown !text-white !font-semibold !border-0">
                <a href="/shop">Shop Now</a>
              </Button>
              <Button asChild variant="outline" className="!border-2 !border-brown-500 !text-brown-500 hover:!bg-brown-500 hover:!text-white !font-semibold">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
