"use client";

import { motion } from "framer-motion";
import { CheckCircle, Wrench, Shield } from "lucide-react";

interface ProductDescriptionProps {
  descriptionHtml?: string;
  description?: string;
  productName?: string;
  features?: string[];
  specifications?: Record<string, string>;
}

// Helper function to convert plain text description to HTML
function formatDescriptionToHtml(description: string): string {
  if (!description) return '';
  
  // If it already looks like HTML, return as-is
  if (description.includes('<p>') || description.includes('<h')) {
    return description;
  }
  
  // Convert plain text to HTML
  // Split by double newlines for paragraphs
  const paragraphs = description.split(/\n\n+/);
  
  let html = '';
  
  paragraphs.forEach(para => {
    para = para.trim();
    if (!para) return;
    
    // Check if it's a header (starts with ##, **, or all caps followed by colon)
    if (para.startsWith('##')) {
      html += `<h3>${para.replace(/^##\s*/, '')}</h3>\n`;
    } else if (para.match(/^\*\*[^*]+\*\*:?$/)) {
      html += `<h3>${para.replace(/\*\*/g, '')}</h3>\n`;
    } else if (para.match(/^[A-Z][A-Z\s&]+:$/)) {
      html += `<h3>${para.replace(/:$/, '')}</h3>\n`;
    }
    // Check if it's a bulleted list
    else if (para.includes('\n•') || para.includes('\n-') || para.includes('\n*')) {
      const items = para.split(/\n[•\-*]\s*/);
      html += '<ul>\n';
      items.forEach(item => {
        item = item.trim();
        if (item) {
          // Convert **text** to <strong>text</strong>
          item = item.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
          html += `<li>${item}</li>\n`;
        }
      });
      html += '</ul>\n';
    }
    // Regular paragraph
    else {
      // Convert **text** to <strong>text</strong>
      para = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      // Convert newlines to <br>
      para = para.replace(/\n/g, '<br>');
      html += `<p>${para}</p>\n`;
    }
  });
  
  return html;
}

export function ProductDescription({ descriptionHtml, description, productName, features, specifications }: ProductDescriptionProps) {
  // Use either descriptionHtml or description
  const rawContent = descriptionHtml || description || '';
  
  // Convert description to HTML if it's plain text
  const content = formatDescriptionToHtml(rawContent);

  // Don't render if there's no content
  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-soft border border-borderNeutral"
    >
      <h2 className="text-2xl font-bold text-textPrimary mb-6">Product Description</h2>
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
