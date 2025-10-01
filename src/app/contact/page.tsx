import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-textPrimary mb-4">Contact Us</h1>
          <p className="text-body text-textSecondary mb-8">
            Get in touch to discuss your van or 4x4 fitout project.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">Get In Touch</h2>
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brown-500">📧</span>
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Email</h3>
                    <p className="text-textSecondary text-body-small">Info@unwinddesigns.com.au</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brown-500">📞</span>
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Phone</h3>
                    <p className="text-textSecondary text-body-small">0417 362 209</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brown-500">🌏</span>
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Service Area</h3>
                    <p className="text-textSecondary text-body-small">Australia Wide</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brown-500">⏰</span>
                  </div>
                  <div>
                    <h3 className="text-body-small font-medium text-textPrimary">Response Time</h3>
                    <p className="text-textSecondary text-body-small">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
