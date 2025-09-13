"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, User, Database, Globe, Mail, Phone } from "lucide-react";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";

export default function PrivacyPage() {
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
              Privacy Policy
            </motion.h1>
            <motion.p 
              className="text-base text-textSecondary"
              variants={staggerItem}
            >
              How we collect, use, and protect your personal information
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
                At Unwind Designs, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                make purchases, or interact with our services.
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
              <CardHeader>
                <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                  <Database className="w-5 h-5 text-brown-500" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
            <CardContent className="space-y-6">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={staggerItem}>
                  <h3 className="text-base font-medium text-textPrimary mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Name, email address, phone number, and shipping address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Payment information (processed securely through Stripe)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Vehicle information for custom fitout consultations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Communication preferences and marketing consent</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <h3 className="text-base font-medium text-textPrimary mb-3">Automatically Collected Information</h3>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>IP address, browser type, and device information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Website usage data, pages visited, and time spent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Cookies and similar tracking technologies</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
          </motion.div>

          {/* How We Use Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <Eye className="w-5 h-5 text-brown-500" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-3">Order Processing</h3>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li>• Process and fulfill your orders</li>
                    <li>• Send order confirmations and updates</li>
                    <li>• Handle shipping and delivery</li>
                    <li>• Process returns and refunds</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-3">Customer Service</h3>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li>• Respond to your inquiries</li>
                    <li>• Provide technical support</li>
                    <li>• Handle warranty claims</li>
                    <li>• Improve our services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-3">Marketing & Communication</h3>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li>• Send product updates and offers</li>
                    <li>• Newsletter and promotional content</li>
                    <li>• Customer feedback surveys</li>
                    <li>• Special event notifications</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-3">Website Improvement</h3>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li>• Analyze website usage patterns</li>
                    <li>• Improve user experience</li>
                    <li>• Fix technical issues</li>
                    <li>• Develop new features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Information Sharing */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <Globe className="w-5 h-5 text-brown-500" />
                Information Sharing & Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-cream-400 p-4 rounded-lg">
                  <h3 className="font-medium text-textPrimary mb-2">We Do Not Sell Your Information</h3>
                  <p className="text-textSecondary text-sm">
                    We will never sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-textPrimary mb-3">Limited Sharing for Business Operations</h3>
                  <ul className="space-y-2 text-textSecondary text-xs">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Payment Processors:</strong> Stripe for secure payment processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Shipping Partners:</strong> Australia Post and other carriers for order delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Service Providers:</strong> IT support, analytics, and customer service tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Legal Requirements:</strong> When required by law or to protect our rights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <Lock className="w-5 h-5 text-brown-500" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-textSecondary text-sm">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Encryption</h4>
                    <p className="text-textSecondary text-xs">
                      SSL encryption for all data transmission and secure storage
                    </p>
                  </div>
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Access Control</h4>
                    <p className="text-textSecondary text-xs">
                      Limited access to personal data on a need-to-know basis
                    </p>
                  </div>
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Regular Audits</h4>
                    <p className="text-textSecondary text-xs">
                      Security assessments and vulnerability testing
                    </p>
                  </div>
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Employee Training</h4>
                    <p className="text-textSecondary text-xs">
                      Privacy and security training for all staff members
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary flex items-center gap-2">
                <User className="w-5 h-5 text-brown-500" />
                Your Rights & Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                              <p className="text-textSecondary text-sm">
                You have the following rights regarding your personal information:
              </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Access & Update</h4>
                    <p className="text-textSecondary text-xs">
                      View and update your personal information in your account
                    </p>
                  </div>
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Opt-Out</h4>
                    <p className="text-textSecondary text-xs">
                      Unsubscribe from marketing communications at any time
                    </p>
                  </div>
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Data Portability</h4>
                    <p className="text-textSecondary text-xs">
                      Request a copy of your data in a portable format
                    </p>
                  </div>
                  <div className="bg-cream-400 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-textPrimary mb-2">Deletion</h4>
                    <p className="text-textSecondary text-xs">
                      Request deletion of your personal information
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Cookies */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Cookies & Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-textSecondary">
                  We use cookies and similar technologies to enhance your browsing experience:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-medium text-textPrimary">Essential Cookies</h4>
                      <p className="text-textSecondary text-xs">
                        Required for website functionality, shopping cart, and security
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-medium text-textPrimary">Analytics Cookies</h4>
                      <p className="text-textSecondary text-xs">
                        Help us understand how visitors use our website
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-medium text-textPrimary">Marketing Cookies</h4>
                      <p className="text-textSecondary text-xs">
                        Remember your preferences and show relevant content
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-textSecondary text-sm">
                  You can control cookie preferences through your browser settings. 
                  Note that disabling certain cookies may affect website functionality.
                </p>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Children's Privacy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-textSecondary">
                Our website is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* International Transfers */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-textSecondary">
                Your personal information is primarily stored and processed in Australia. Some of our service 
                providers may be located in other countries. We ensure that any international transfers comply 
                with applicable data protection laws and implement appropriate safeguards.
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-textPrimary">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-textSecondary">
                We may update this Privacy Policy from time to time to reflect changes in our practices or 
                applicable laws.                 We will notify you of any material changes by posting the updated policy on 
                our website and updating the &ldquo;Last updated&rdquo; date. Your continued use of our services after 
                such changes constitutes acceptance of the updated policy.
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
                <Shield className="w-5 h-5 text-brown-500" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-textSecondary text-sm mb-6">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-textSecondary">
                    <Mail className="w-4 h-4" />
                    <span>privacy@unwinddesigns.com.au</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-textSecondary">
                    <Phone className="w-4 h-4" />
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
