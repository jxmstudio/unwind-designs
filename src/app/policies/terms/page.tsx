"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingCart, CreditCard, Truck, User, AlertCircle } from "lucide-react";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";

export default function TermsPage() {
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
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-base text-textSecondary"
              variants={staggerItem}
            >
              Please read these terms carefully before using our services
            </motion.p>
            <motion.p 
              className="text-xs text-textSecondary mt-2"
              variants={staggerItem}
            >
              Last updated: {new Date().toLocaleDateString('en-AU', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </motion.p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
              <CardContent className="pt-6">
                <p className="text-textSecondary leading-relaxed text-sm">
                  These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Unwind Designs website and services. 
                  By accessing or using our website, you agree to be bound by these Terms. If you disagree with 
                  any part of these terms, you may not access our services.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Acceptance of Terms */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
              <CardHeader>
                <CardTitle className="text-lg text-textPrimary">Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-textSecondary text-sm">
                  By using our website and services, you confirm that you have read, understood, and agree to 
                  these Terms of Service. You also agree to comply with all applicable laws and regulations. 
                  If you are using our services on behalf of a company or organization, you represent that you 
                  have the authority to bind that entity to these Terms.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services Description */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
              <CardHeader>
                <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-brown-500" />
                  Services Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-textSecondary text-xs">
                    Unwind Designs provides the following services:
                  </p>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Online retail of van and 4x4 fitout products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Custom fitout design and consultation services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Professional installation services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Technical support and customer service</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Accounts */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
              <CardHeader>
                <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                  <User className="w-5 h-5 text-brown-500" />
                  User Accounts & Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true }}
                >
                  <motion.div variants={staggerItem}>
                    <h3 className="text-sm font-medium text-textPrimary mb-2">Account Creation</h3>
                    <p className="text-textSecondary text-xs">
                      To access certain features, you may need to create an account. You must provide accurate, 
                      current, and complete information during registration and keep your account information updated.
                    </p>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <h3 className="text-sm font-medium text-textPrimary mb-2">Account Security</h3>
                    <p className="text-textSecondary text-xs">
                      You are responsible for maintaining the confidentiality of your account credentials and 
                      for all activities that occur under your account. Notify us immediately of any unauthorized use.
                    </p>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <h3 className="text-sm font-medium text-textPrimary mb-2">Account Termination</h3>
                    <p className="text-textSecondary text-xs">
                      We reserve the right to terminate or suspend your account at any time for violations of 
                      these Terms or for any other reason at our sole discretion.
                    </p>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ordering & Payment */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brown-500" />
                Ordering & Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Order Acceptance</h3>
                  <p className="text-textSecondary text-xs">
                    All orders are subject to acceptance by Unwind Designs. We reserve the right to refuse 
                    any order for any reason, including but not limited to product availability, pricing errors, 
                    or suspected fraud.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Pricing & Payment</h3>
                  <p className="text-textSecondary text-xs">
                    All prices are in Australian Dollars (AUD) and include GST where applicable. Payment is 
                    required at the time of order placement. We accept major credit cards and other payment 
                    methods as indicated on our website.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Order Confirmation</h3>
                  <p className="text-textSecondary text-xs">
                    You will receive an order confirmation email once your order is successfully placed. 
                    This confirmation serves as proof of your order and should be retained for your records.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Shipping & Delivery */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
          <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <Truck className="w-5 h-5 text-brown-500" />
                Shipping & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Delivery Times</h3>
                  <p className="text-textSecondary text-xs">
                    Delivery times are estimates and may vary due to factors beyond our control, including 
                    weather, holidays, and remote locations. We will communicate any significant delays.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Shipping Costs</h3>
                  <p className="text-textSecondary text-xs">
                    Shipping costs are calculated based on package weight, size, and destination. Free shipping 
                    is available on orders over $500 within Australia. International shipping costs are calculated at checkout.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Risk of Loss</h3>
                  <p className="text-textSecondary text-xs">
                    Risk of loss and title for items purchased pass to you upon delivery to the carrier. 
                    We are not responsible for items lost or damaged during transit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Returns & Refunds */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
          <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Returns & Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                              <p className="text-textSecondary text-sm">
                Our return and refund policies are detailed in our Returns Policy, which is incorporated 
                into these Terms by reference. Please review our Returns Policy for complete information 
                about returning products and receiving refunds.
              </p>
                <div className="bg-cream-400 p-4 rounded-lg">
                  <p className="text-textSecondary text-xs">
                    <strong>Note:</strong> Custom or installed items may have different return conditions. 
                    Please contact us before making a purchase if you have concerns about fitment or compatibility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
          <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Product Information & Warranties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Product Descriptions</h3>
                  <p className="text-textSecondary text-xs">
                    We strive to provide accurate product descriptions and images. However, we do not warrant 
                    that product descriptions, colors, information, or other content is accurate, complete, 
                    reliable, current, or error-free.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Warranties</h3>
                  <p className="text-textSecondary text-xs">
                    Products come with manufacturer warranties as specified in our Warranty Policy. These 
                    warranties are in addition to your rights under Australian Consumer Law.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Installation & Use</h3>
                  <p className="text-textSecondary text-xs">
                    Some products require professional installation. You are responsible for ensuring proper 
                    installation and use according to manufacturer instructions. Improper installation may void warranties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Prohibited Uses */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
          <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brown-500" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-textSecondary">
                  You agree not to use our services for any unlawful purpose or in any way that could damage, 
                  disable, overburden, or impair our website or interfere with other users&apos; enjoyment of our services.
                </p>
                <div className="bg-cream-400 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-textPrimary mb-2">Specifically Prohibited:</h3>
                  <ul className="space-y-1 text-textSecondary text-sm">
                    <li>• Attempting to gain unauthorized access to our systems</li>
                    <li>• Using automated tools to scrape or collect data</li>
                    <li>• Transmitting viruses, malware, or harmful code</li>
                    <li>• Impersonating others or providing false information</li>
                    <li>• Violating intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-textSecondary">
                  All content on our website, including text, graphics, logos, images, software, and other 
                  materials, is owned by Unwind Designs or our licensors and is protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                <p className="text-textSecondary">
                  You may not reproduce, distribute, modify, or create derivative works from our content 
                  without our express written permission. You may use our website for personal, non-commercial 
                  purposes in accordance with these Terms.
                </p>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-textSecondary text-sm">
                  To the maximum extent permitted by law, Unwind Designs shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited to loss of 
                  profits, data, or use, arising from your use of our services.
                </p>
                <p className="text-textSecondary text-sm">
                  Our total liability to you for any claims arising from these Terms or your use of our services 
                  shall not exceed the amount you paid to us in the 12 months preceding the claim.
                </p>
                <div className="bg-cream-400 p-4 rounded-lg">
                  <p className="text-textSecondary text-xs">
                    <strong>Important:</strong> These limitations do not apply to liability that cannot be 
                    excluded or limited under Australian Consumer Law.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Indemnification */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Indemnification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-textSecondary text-sm">
                You agree to indemnify and hold harmless Unwind Designs, its officers, directors, employees, 
                and agents from and against any claims, damages, obligations, losses, liabilities, costs, or 
                debt arising from your use of our services or violation of these Terms.
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Governing Law & Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-textSecondary text-sm">
                  These Terms are governed by and construed in accordance with the laws of Victoria, Australia. 
                  Any disputes arising from these Terms or your use of our services shall be resolved in the 
                  courts of Victoria, Australia.
                </p>
                <p className="text-textSecondary text-sm">
                  We encourage you to contact us first to resolve any disputes amicably before pursuing legal action.
                </p>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-textSecondary text-sm">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                upon posting on our website. Your continued use of our services after such changes constitutes 
                acceptance of the modified Terms. We will notify you of material changes via email or website notice.
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <FileText className="w-5 h-5 text-brown-500" />
                Questions About These Terms?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-textSecondary text-sm mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-textSecondary">
                    <span>📧</span>
                    <span>legal@unwinddesigns.com.au</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-textSecondary">
                    <span>📞</span>
                    <span>0417 362 209</span>
                  </div>
                  <div className="text-textSecondary">
                    <p>Unwind Designs</p>
                    <p>Export Drive, Brooklyn, VIC, Australia, Victoria</p>
                    <p>Melbourne VIC 3000, Australia</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
