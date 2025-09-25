"use client";

import { m } from "framer-motion";
import { CheckCircle, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function SuccessStep() {
  const { isDisabled } = useReducedMotionSafe();

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, /* ease: "easeOut" as const */ }
    }
  };

  const checkmarkAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.2 
      }
    }
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center p-8">
      <m.div
        initial={isDisabled ? {} : "hidden"}
        animate={isDisabled ? {} : "visible"}
        variants={isDisabled ? {} : staggerContainer}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Success Icon */}
        <m.div
          variants={isDisabled ? {} : checkmarkAnimation}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </m.div>

        {/* Success Message */}
        <m.div variants={isDisabled ? {} : staggerItem} className="mb-8">
          <h2 className="text-4xl font-bold text-textPrimary mb-4">
            Request Submitted Successfully!
          </h2>
          <p className="text-lg text-textSecondary max-w-lg mx-auto">
            Thank you for your interest in Unwind Designs. We&apos;ve received your build request 
            and our team will review it shortly.
          </p>
        </m.div>

        {/* What happens next */}
        <m.div variants={isDisabled ? {} : staggerItem} className="mb-8">
          <Card className="text-left">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-textPrimary mb-4">
                What happens next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-brown-600" />
                  </div>
                  <div>
                    <div className="font-medium text-textPrimary">Email Confirmation</div>
                    <div className="text-body-small text-textSecondary">
                      You&apos;ll receive an email confirmation within a few minutes
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-brown-600" />
                  </div>
                  <div>
                    <div className="font-medium text-textPrimary">Personal Consultation</div>
                    <div className="text-body-small text-textSecondary">
                      Our team will contact you within 24 hours to discuss your project
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-brown-600" />
                  </div>
                  <div>
                    <div className="font-medium text-textPrimary">Custom Quote</div>
                    <div className="text-body-small text-textSecondary">
                      We&apos;ll prepare a detailed quote tailored to your specific requirements
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>

        {/* Contact Information */}
        <m.div variants={isDisabled ? {} : staggerItem} className="mb-8">
          <Card className="bg-brown-50 border-brown-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-textPrimary mb-3">
                Need immediate assistance?
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-body-small text-textSecondary">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brown-500" />
                  <span>0417 362 209</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-brown-500" />
                  <span>Info@unwinddesigns.com.au</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>

        {/* Action Buttons */}
        <m.div variants={isDisabled ? {} : staggerItem}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/flat-packs">
              <Button 
                variant="outline"
                className="border-2 border-brown-500 text-brown-600 hover:bg-brown-50 px-6 py-3"
              >
                View Our Kits
              </Button>
            </Link>
            <Link href="/shop">
              <Button className="bg-brown-500 hover:bg-brown-600 text-white px-6 py-3">
                Browse Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </m.div>

        {/* Additional Note */}
        <m.div variants={isDisabled ? {} : staggerItem} className="mt-8">
          <p className="text-caption text-textSecondary">
            Reference #: {Date.now().toString(36).toUpperCase()}
          </p>
        </m.div>
      </m.div>
    </div>
  );
}
