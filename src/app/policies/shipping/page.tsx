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
              className="text-base text-textSecondary"
              variants={staggerItem}
            >
              Fast, reliable shipping across Australia and worldwide
            </motion.p>
          </motion.div>

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
                <p className="text-base font-bold text-brown-500 mb-2">3-7 Business Days</p>
                <p className="text-textSecondary text-sm mb-4">
                  Reliable delivery across Australia
                </p>
                <p className="text-textPrimary font-medium text-sm">
                  Free on orders over $500
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
                <p className="text-base font-bold text-brown-500 mb-2">1-2 Business Days</p>
                <p className="text-textSecondary text-sm mb-4">
                  Priority delivery for urgent orders
                </p>
                <p className="text-textPrimary font-medium text-sm">
                  Additional $15.00
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
                <p className="text-base font-bold text-brown-500 mb-2">7-21 Days</p>
                <p className="text-textSecondary text-sm mb-4">
                  Worldwide shipping available
                </p>
                <p className="text-textPrimary font-medium text-sm">
                  Calculated at checkout
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Rates Table */}
          <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary">Shipping Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-borderNeutral">
                      <th className="text-left py-3 px-4 font-medium text-textPrimary text-sm">Destination</th>
                      <th className="text-left py-3 px-4 font-medium text-textPrimary text-sm">Standard</th>
                      <th className="text-left py-3 px-4 font-medium text-textPrimary text-sm">Express</th>
                      <th className="text-left py-3 px-4 font-medium text-textPrimary text-sm">Free Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-borderNeutral/50">
                      <td className="py-3 px-4 text-textPrimary text-sm">Metro Areas (VIC, NSW, QLD, SA, WA)</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">$12.00</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">$27.00</td>
                      <td className="py-3 px-4 text-green-600 font-medium text-sm">Orders $500+</td>
                    </tr>
                    <tr className="border-b border-borderNeutral/50">
                      <td className="py-3 px-4 text-textPrimary text-sm">Regional Areas (NT, TAS)</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">$18.00</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">$33.00</td>
                      <td className="py-3 px-4 text-green-600 font-medium text-sm">Orders $500+</td>
                    </tr>
                    <tr className="border-b border-borderNeutral/50">
                      <td className="py-3 px-4 text-textPrimary text-sm">Remote Areas</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">$25.00</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">$40.00</td>
                      <td className="py-3 px-4 text-green-600 font-medium text-sm">Orders $500+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-textPrimary text-sm">International</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">Calculated</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">Calculated</td>
                      <td className="py-3 px-4 text-textSecondary text-sm">Not available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">How Shipping Works</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-textPrimary mb-1">Order Confirmation</h3>
                    <p className="text-textSecondary text-sm">
                      Once your order is placed, you&apos;ll receive an email confirmation with order details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-textPrimary mb-1">Processing</h3>
                    <p className="text-textSecondary text-sm">
                      We&apos;ll process your order within 24 hours and prepare it for shipping.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-textPrimary mb-1">Shipping</h3>
                    <p className="text-textSecondary text-sm">
                      Your order will be shipped and you&apos;ll receive tracking information via email.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-textPrimary mb-1">Delivery</h3>
                    <p className="text-textSecondary text-sm">
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
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Delivery Times</h3>
                  <p className="text-textSecondary text-sm">
                    Delivery times are estimates and may vary due to weather, holidays, or remote locations.
                  </p>
                </div>
                <div className="bg-cream-300 p-4 rounded-lg border border-borderNeutral">
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Signature Required</h3>
                  <p className="text-textSecondary text-sm">
                    Orders over $200 require a signature upon delivery for security.
                  </p>
                </div>
                <div className="bg-cream-300 p-4 rounded-lg border border-borderNeutral">
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Remote Areas</h3>
                  <p className="text-textSecondary text-sm">
                    Additional delivery charges may apply for remote or hard-to-reach locations.
                  </p>
                </div>
                <div className="bg-cream-300 p-4 rounded-lg border border-borderNeutral">
                  <h3 className="text-sm font-medium text-textPrimary mb-2">International Shipping</h3>
                  <p className="text-textSecondary text-sm">
                    International orders may be subject to customs duties and import taxes.
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
                  <h3 className="text-base font-medium text-textPrimary mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-brown-500" />
                    Track Your Order
                  </h3>
                  <p className="text-textSecondary text-sm mb-4">
                    All orders include tracking information. You&apos;ll receive tracking details via email once your order ships.
                  </p>
                  <Button variant="outline" className="border-borderNeutral text-textPrimary hover:bg-brown-100">
                    Track Order
                  </Button>
                </div>
                <div>
                  <h3 className="text-base font-medium text-textPrimary mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brown-500" />
                    Shipping Support
                  </h3>
                  <p className="text-textSecondary text-sm mb-4">
                    Need help with shipping? Our customer service team is here to assist you.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-textSecondary">
                      <Phone className="w-4 h-4" />
                      0417 362 209
                    </div>
                    <div className="flex items-center gap-2 text-sm text-textSecondary">
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
            <p className="text-textSecondary text-sm mb-6">
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
