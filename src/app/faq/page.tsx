"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Product & Installation
  {
    question: "What vehicles do your fitouts work with?",
    answer: "Our fitouts are designed for Toyota Troopcarriers, campervans, 4x4 vehicles, and most adventure vehicles. We can customize solutions for specific makes and models.",
    category: "Products"
  },
  {
    question: "Do you offer installation services?",
    answer: "Yes, we provide professional installation services across Australia. Our team can install complete fitouts or individual components. We also offer DIY installation guides for those who prefer to install themselves.",
    category: "Products"
  },
  {
    question: "How long does installation take?",
    answer: "Installation time varies by project complexity. Simple storage systems take 1-2 days, while complete fitouts can take 1-2 weeks. We'll provide a detailed timeline during consultation.",
    category: "Products"
  },
  {
    question: "Are your products weather-resistant?",
    answer: "Yes, all our products are designed for outdoor and vehicle use. We use marine-grade materials and weather-resistant finishes to ensure durability in various conditions.",
    category: "Products"
  },
  // Shipping & Delivery
  {
    question: "How long does shipping take?",
    answer: "Standard shipping within Australia takes 3-7 business days. Express shipping is available for 1-2 business days. International shipping varies by location and can take 7-21 business days.",
    category: "Shipping"
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries. International shipping costs and delivery times vary by location. Contact us for specific rates to your country.",
    category: "Shipping"
  },
  {
    question: "How much does shipping cost?",
    answer: "Shipping costs depend on package weight, size, and destination. We offer free shipping on orders over $500 within Australia. International shipping is calculated at checkout.",
    category: "Shipping"
  },
  {
    question: "Can I track my order?",
    answer: "Yes, all orders include tracking information. You'll receive tracking details via email once your order ships.",
    category: "Shipping"
  },
  // Returns & Warranty
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day return policy for unused items in original packaging. Custom or installed items may have different return conditions. Contact us within 30 days to initiate a return.",
    category: "Returns"
  },
  {
    question: "What warranty do you provide?",
    answer: "Our products come with warranties ranging from 1-5 years depending on the item. All warranties cover manufacturing defects and material failures under normal use.",
    category: "Returns"
  },
  {
    question: "How do I make a warranty claim?",
    answer: "Contact our customer service team with your order number and details of the issue. We'll guide you through the warranty claim process and arrange repairs or replacements as needed.",
    category: "Returns"
  },
  // Payment & Orders
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All online payments are processed securely through Stripe.",
    category: "Payment"
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard SSL encryption and Stripe for secure payment processing. We never store your full payment details on our servers.",
    category: "Payment"
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled within 24 hours of placement if they haven't shipped yet. Contact our customer service team immediately to request cancellation.",
    category: "Payment"
  },
  // Custom & Consultation
  {
    question: "Do you offer custom fitouts?",
    answer: "Yes, we specialize in custom fitouts tailored to your specific vehicle and needs. Contact us for a consultation to discuss your requirements and get a custom quote.",
    category: "Custom"
  },
  {
    question: "How do I get a quote for a custom project?",
    answer: "Use our 'Start Your Build' form or contact us directly. Include details about your vehicle, requirements, and budget. We'll schedule a consultation and provide a detailed quote.",
    category: "Custom"
  },
  {
    question: "Do you offer design consultation?",
    answer: "Yes, we provide design consultation services to help plan your perfect fitout. Our team can visit your location or work remotely to design the ideal solution.",
    category: "Custom"
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-textPrimary mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-textSecondary">
              Find answers to common questions about our products, services, and policies.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {['All', 'Products', 'Shipping', 'Returns', 'Payment', 'Custom'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-brown-100 text-brown-700 hover:bg-brown-200 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <FAQItem key={index} item={item} />
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">
              Still have questions?
            </h2>
            <p className="text-textSecondary mb-6">
              Can&apos;t find what you&apos;re looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-brown-500 hover:bg-darkBrown text-cream-400">
                <a href="/contact">Contact Us</a>
              </Button>
              <Button asChild variant="outline" className="border-borderNeutral text-textPrimary hover:bg-brown-100">
                <a href="/start-your-build">Start Your Build</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FAQItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-cream-300 rounded-lg border border-borderNeutral">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-cream-200 transition-colors rounded-lg"
      >
        <span className="font-medium text-textPrimary">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-brown-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brown-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-textSecondary leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}
