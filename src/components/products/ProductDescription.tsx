"use client";

import { motion } from "framer-motion";
import { CheckCircle, Wrench, Shield } from "lucide-react";

interface ProductDescriptionProps {
  descriptionHtml?: string;
  productName: string;
}

export function ProductDescription({ descriptionHtml, productName }: ProductDescriptionProps) {
  const defaultDescription = `
    <p><strong>In Stock</strong> — ready for worldwide shipping or local pickup from Brooklyn VIC</p>
    <p>Upright fridge variant available now.</p>
    
    <p>A flat pack Troopy kit like no other. We proudly present our ${productName} — a premium finish, DIY assembled flat pack with all the features you asked for!</p>
    
    <h3>What to Expect</h3>
    <ul>
      <li>✨ <strong>Easy Assembly:</strong> Setup designed for all skill levels.</li>
      <li>🔧 <strong>Quality Craftsmanship:</strong> Durable materials for long-lasting adventures.</li>
      <li>⚡ <strong>Thoughtful Design:</strong> Maximum storage and convenience.</li>
    </ul>
    
    <h3>About this Flat Pack</h3>
    <p>Our Roam range is the premium option for those seeking ultimate durability and aesthetics. Built from premium Birch plywood, the Roam range is designed to outlive your adventures.</p>
    
    <h3>Benefits</h3>
    <ul>
      <li>Swiss-designed cabinetry connectors — full installation in a weekend, no experience required.</li>
      <li>Maximum functionality with accessible storage inside and outside your Troopy.</li>
      <li>Unique day bed setup for rainy-day comfort, while maintaining access to under-bed storage.</li>
      <li>Shower cabinet access from the driver's side window (sliding or gullwing).</li>
      <li>Built from black hex face plywood (extremely durable flooring material). Also available in White and Plain Birch.</li>
    </ul>
    
    <h3>Key Dimensions</h3>
    <ul>
      <li><strong>Fridge Space:</strong> approx 850×460 mm (larger fridge? Contact us for pre-orders).</li>
      <li><strong>Bed Dimensions:</strong> approx 1900×950 mm.</li>
      <li><strong>Walkway:</strong> approx 360 mm wide (comfortable clearance).</li>
      <li><strong>Weight:</strong> approx 130 kg.</li>
    </ul>
    
    <h3>Manufacturing Partner</h3>
    <p>Produced with No Goat for Jack, a mechanical engineer/industrial designer with a premium manufacturing facility. Using state-of-the-art machinery, we deliver a premium product at an affordable price.</p>
    
    <h3>Installation & Shipping</h3>
    <ul>
      <li>Installation available by request in Brooklyn VIC and Perth.</li>
      <li>Pickup free from Brooklyn VIC.</li>
      <li>Shipping available Australia-wide, to ~200 depot locations or direct to your door.</li>
      <li><strong>Note:</strong> checkout quotes may not always be accurate; contact us for better rates.</li>
    </ul>
    
    <h3>Questions?</h3>
    <p>📞 Call Karim: <a href="tel:0417362209" className="text-accent-600 hover:text-accent-700 font-medium">0417 362 209</a></p>
  `;

  const content = descriptionHtml || defaultDescription;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-soft border border-borderNeutral"
    >
      <div className="prose prose-lg max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: content }}
          className="[&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-textPrimary [&>h3]:mb-4 [&>h3]:mt-8 [&>p]:text-textPrimary/80 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul]:mb-6 [&>li]:text-textPrimary/80 [&>li]:leading-relaxed [&>strong]:text-textPrimary [&>strong]:font-semibold [&>a]:text-accent-600 [&>a]:hover:text-accent-700 [&>a]:font-medium"
        />
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-8 border-t border-borderNeutral">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-textPrimary">In Stock</h4>
              <p className="text-body-small text-textPrimary/70">Ready for immediate shipping</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-textPrimary">Easy Assembly</h4>
              <p className="text-body-small text-textPrimary/70">No experience required</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-textPrimary">Warranty</h4>
              <p className="text-body-small text-textPrimary/70">Up to 5 years coverage</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
