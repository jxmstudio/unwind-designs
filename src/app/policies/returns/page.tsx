"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Shield, Package, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { sectionReveal, staggerItem } from "@/lib/motion";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              Return Policy
            </motion.h1>
            <motion.p 
              className="text-body text-textSecondary"
              variants={staggerItem}
            >
              We stand behind our products and want you to be completely satisfied
            </motion.p>
          </motion.div>

          {/* Return Policy Overview */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-brown-500" />
                Return Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">30-Day Returns</h3>
                  <p className="text-textSecondary text-caption">
                    Return unused items in original packaging within 30 days
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Warranty Coverage</h3>
                  <p className="text-textSecondary text-caption">
                    1-5 year warranties depending on product type
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Easy Process</h3>
                  <p className="text-textSecondary text-caption">
                    Simple return process with prepaid shipping labels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Return Conditions */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">What Can Be Returned</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Unused Products</h3>
                    <p className="text-textSecondary text-caption">
                      Items in original, unopened packaging with all components included
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Defective Items</h3>
                    <p className="text-textSecondary text-caption">
                      Products with manufacturing defects or material failures
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Wrong Items</h3>
                    <p className="text-textSecondary text-caption">
                      Items that don&apos;t match your order or are damaged in transit
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Size/Model Issues</h3>
                    <p className="text-textSecondary text-caption">
                      Products that don&apos;t fit your vehicle or requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">What Cannot Be Returned</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Used or Installed Items</h3>
                    <p className="text-textSecondary text-caption">
                      Products that have been installed, used, or modified
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Custom Products</h3>
                    <p className="text-textSecondary text-caption">
                      Items made specifically for your vehicle or requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Missing Components</h3>
                    <p className="text-textSecondary text-caption">
                      Products returned without original packaging or parts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Damaged by Customer</h3>
                    <p className="text-textSecondary text-caption">
                      Items damaged due to improper use or installation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Return Process */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary">How to Return an Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Contact Customer Service</h3>
                    <p className="text-textSecondary text-caption">
                      Email us at returns@unwinddesigns.com.au or call 0417 362 209 within 30 days of purchase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Get Return Authorization</h3>
                    <p className="text-textSecondary text-caption">
                      We&apos;ll provide you with a return authorization number and prepaid shipping label.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Package and Ship</h3>
                    <p className="text-textSecondary text-caption">
                      Securely package the item in its original packaging and use the provided shipping label.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brown-500 text-cream-400 rounded-full flex items-center justify-center flex-shrink-0 text-body-small font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary mb-1">Refund Processing</h3>
                    <p className="text-textSecondary text-caption">
                      Once we receive and inspect the item, we&apos;ll process your refund within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Warranty Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary flex items-center gap-2">
                <Shield className="w-5 h-5 text-brown-500" />
                Warranty Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-body font-medium text-textPrimary mb-3">Warranty Coverage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-cream-400 p-4 rounded-lg">
                      <h4 className="text-body-small font-medium text-textPrimary mb-2">Hardware & Fasteners</h4>
                      <p className="text-textSecondary text-caption">1 year warranty</p>
                    </div>
                    <div className="bg-cream-400 p-4 rounded-lg">
                      <h4 className="text-body-small font-medium text-textPrimary mb-2">Storage Systems</h4>
                      <p className="text-textSecondary text-caption">2 year warranty</p>
                    </div>
                    <div className="bg-cream-400 p-4 rounded-lg">
                      <h4 className="text-body-small font-medium text-textPrimary mb-2">Electrical Components</h4>
                      <p className="text-textSecondary text-caption">3 year warranty</p>
                    </div>
                    <div className="bg-cream-400 p-4 rounded-lg">
                      <h4 className="text-body-small font-medium text-textPrimary mb-2">Complete Fitouts</h4>
                      <p className="text-textSecondary text-caption">5 year warranty</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-body font-medium text-textPrimary mb-3">What&apos;s Covered</h3>
                  <ul className="space-y-2 text-textSecondary text-caption">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Manufacturing defects and material failures
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Structural integrity issues under normal use
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Component failures due to design flaws
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-body font-medium text-textPrimary mb-3">What&apos;s Not Covered</h3>
                  <ul className="space-y-2 text-textSecondary text-caption">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      Damage from improper installation or use
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      Normal wear and tear over time
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      Damage from accidents or extreme conditions
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Refund Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary">Refund Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-cream-400 p-4 rounded-lg">
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Refund Timeline</h3>
                  <p className="text-textSecondary text-caption">
                    Refunds are processed within 5-7 business days after we receive and inspect your return. 
                    The refund will appear on your original payment method within 3-10 business days, 
                    depending on your bank or credit card provider.
                  </p>
                </div>
                <div className="bg-cream-400 p-4 rounded-lg">
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Shipping Costs</h3>
                  <p className="text-textSecondary text-caption">
                    Return shipping is free for defective items or our mistakes. For change-of-mind returns, 
                    return shipping costs are deducted from your refund. We provide prepaid shipping labels 
                    for all returns.
                  </p>
                </div>
                <div className="bg-cream-400 p-4 rounded-lg">
                  <h3 className="text-body-small font-medium text-textPrimary mb-2">Partial Refunds</h3>
                  <p className="text-textSecondary text-caption">
                    If an item is returned in less-than-perfect condition, we may issue a partial refund 
                                          based on the item&apos;s current value. We&apos;ll always communicate this with you before processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Contact & Support */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-textPrimary flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brown-500" />
                Need Help with Returns?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-textSecondary text-body-small mb-6">
                  Our customer service team is here to help with any questions about returns, 
                  warranties, or product issues.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-textSecondary">
                    <span>📧</span>
                    <span>returns@unwinddesigns.com.au</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-textSecondary">
                    <span>📞</span>
                    <span>0417 362 209</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-textSecondary">
                    <span>⏰</span>
                    <span>Monday - Friday, 9:00 AM - 5:00 PM AEST</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <h2 className="text-xl font-semibold text-textPrimary mb-4">
              Ready to shop with confidence?
            </h2>
            <p className="text-textSecondary text-body-small mb-6">
              Our quality products and customer service ensure you&apos;ll love your purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-brown-500 hover:bg-darkBrown text-cream-400">
                <a href="/shop">Shop Now</a>
              </Button>
              <Button asChild variant="outline" className="border-borderNeutral text-textPrimary hover:bg-brown-100">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
