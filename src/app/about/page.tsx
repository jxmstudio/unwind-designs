"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, MapPin, Phone, Mail, Clock } from "lucide-react";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              About Us
            </motion.h1>
            <motion.p 
              className="text-body text-textSecondary max-w-3xl mx-auto"
              variants={staggerItem}
            >
              We&apos;re passionate about creating quality, personalized van and 4x4 fitouts that transform your vehicle into the ultimate adventure companion.
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">Our Story</h2>
              <div className="space-y-4 text-textSecondary leading-relaxed text-body-small">
                <p>
                  Founded with a passion for adventure and quality craftsmanship, Unwind Designs has been helping 
                  outdoor enthusiasts transform their vehicles for over a decade.
                </p>
                <p>
                  We understand that every vehicle and every adventure is unique, which is why we specialize 
                  in custom solutions tailored to your specific needs.
                </p>
                <p>
                  Our team of experienced craftsmen and designers work closely with you to create fitouts that 
                  not only look great but also stand up to the rigors of life on the road.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={staggerItem}>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">What We Do</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Custom Storage Systems</h3>
                    <p className="text-textSecondary text-caption">
                      Tailored storage solutions that maximize your vehicle&apos;s space efficiently
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Kitchen and Living Area Fitouts</h3>
                    <p className="text-textSecondary text-caption">
                      Complete living spaces with kitchens, seating, and sleeping areas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Power and Electrical Systems</h3>
                    <p className="text-textSecondary text-caption">
                      Solar panels, batteries, and electrical systems for off-grid living
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-brown-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Professional Installation Services</h3>
                    <p className="text-textSecondary text-caption">
                      Expert installation by certified technicians
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-16">
              <CardHeader>
                <CardTitle className="text-xl text-textPrimary text-center">Our Values</CardTitle>
              </CardHeader>
            <CardContent>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <motion.div className="text-center" variants={staggerItem}>
                  <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-brown-500" />
                  </div>
                  <h3 className="text-body font-semibold text-textPrimary mb-2">Quality Craftsmanship</h3>
                  <p className="text-textSecondary text-caption">
                    We never compromise on quality, using only the finest materials and construction techniques.
                  </p>
                </motion.div>
                <motion.div className="text-center" variants={staggerItem}>
                  <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-brown-500" />
                  </div>
                  <h3 className="text-body font-semibold text-textPrimary mb-2">Customer Focus</h3>
                  <p className="text-textSecondary text-caption">
                    Your satisfaction is our priority. We work closely with you to bring your vision to life.
                  </p>
                </motion.div>
                <motion.div className="text-center" variants={staggerItem}>
                  <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-brown-500" />
                  </div>
                  <h3 className="text-body font-semibold text-textPrimary mb-2">Adventure Ready</h3>
                  <p className="text-textSecondary text-caption">
                    We understand the demands of outdoor adventures and build accordingly.
                  </p>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <motion.h2 
              className="text-xl font-semibold text-textPrimary mb-8 text-center"
              variants={staggerItem}
            >
              Meet Our Team
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem}>
                <Card className="bg-cream-300 border-borderNeutral text-center">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-brown-200 rounded-full mx-auto mb-4"></div>
                    <h3 className="text-body font-semibold text-textPrimary mb-2">John Smith</h3>
                    <p className="text-brown-600 text-body-small font-medium mb-2">Founder & Lead Designer</p>
                    <p className="text-textSecondary text-caption">
                      Passionate about creating functional and beautiful vehicle fitouts for over 15 years.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                <Card className="bg-cream-300 border-borderNeutral text-center">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-brown-200 rounded-full mx-auto mb-4"></div>
                    <h3 className="text-body font-semibold text-textPrimary mb-2">Sarah Johnson</h3>
                    <p className="text-brown-600 text-body-small font-medium mb-2">Head of Operations</p>
                    <p className="text-textSecondary text-caption">
                      Ensures every project runs smoothly and meets our high standards of quality.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                <Card className="bg-cream-300 border-borderNeutral text-center">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-brown-200 rounded-full mx-auto mb-4"></div>
                    <h3 className="text-body font-semibold text-textPrimary mb-2">Mike Chen</h3>
                    <p className="text-brown-600 text-body-small font-medium mb-2">Master Craftsman</p>
                    <p className="text-textSecondary text-caption">
                      Expert in woodworking and metal fabrication with 20+ years of experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <Card className="bg-cream-300 border-borderNeutral mb-16">
              <CardHeader>
                <CardTitle className="text-lg text-textPrimary text-center">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true }}
                >
                  <motion.div variants={staggerItem}>
                    <h3 className="text-body font-medium text-textPrimary mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-textSecondary">
                        <MapPin className="w-5 h-5 text-brown-500" />
                        <span>Export Drive, Brooklyn, VIC, Australia, Victoria</span>
                      </div>
                      <div className="flex items-center gap-3 text-textSecondary">
                        <Phone className="w-5 h-5 text-brown-500" />
                        <span>0417 362 209</span>
                      </div>
                      <div className="flex items-center gap-3 text-textSecondary">
                        <Mail className="w-5 h-5 text-brown-500" />
                        <span>hello@unwinddesigns.com.au</span>
                      </div>
                      <div className="flex items-center gap-3 text-textSecondary">
                        <Clock className="w-5 h-5 text-brown-500" />
                        <span>Mon-Fri: 9:00 AM - 5:00 PM AEST</span>
                      </div>
                    </div>
                  </motion.div>
                
                <motion.div variants={staggerItem}>
                  <h3 className="text-body font-medium text-textPrimary mb-4">Ready to Start Your Project?</h3>
                  <p className="text-textSecondary text-body-small mb-4">
                    Let&apos;s discuss your vehicle fitout needs and create something amazing together.
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-brown-500 hover:bg-darkBrown text-cream-400">
                      <a href="/contact">Contact Us</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-borderNeutral text-textPrimary hover:bg-brown-100">
                      <a href="/start-your-build">Start Your Build</a>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            variants={sectionReveal}
          >
            <motion.h2 
              className="text-xl font-semibold text-textPrimary mb-4"
              variants={staggerItem}
            >
              Ready to transform your vehicle?
            </motion.h2>
            <motion.p 
              className="text-textSecondary text-body-small mb-6"
              variants={staggerItem}
            >
              Browse our products or start a custom project today.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerItem}
            >
              <Button asChild className="!bg-brown-500 hover:!bg-darkBrown !text-white !font-semibold !border-0">
                <a href="/shop">Shop Now</a>
              </Button>
              <Button asChild variant="outline" className="!border-2 !border-brown-500 !text-brown-500 hover:!bg-brown-500 hover:!text-white !font-semibold">
                <a href="/start-your-build">Start Your Build</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
