"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitContactForm } from "@/app/actions/submit-contact-form";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const result = await submitContactForm(formData);
      setSubmitMessage(result.message);
      
      if (result.success) {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-body-small font-medium text-textPrimary mb-2">
          Name *
        </label>
        <Input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="border-borderNeutral focus:ring-brown-500 focus:border-brown-500 bg-cream-300 text-textPrimary placeholder-textSecondary"
        />
      </div>
      
      <div>
        <label className="block text-body-small font-medium text-textPrimary mb-2">
          Email *
        </label>
        <Input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          className="border-borderNeutral focus:ring-brown-500 focus:border-brown-500 bg-cream-300 text-textPrimary placeholder-textSecondary"
        />
      </div>
      
      <div>
        <label className="block text-body-small font-medium text-textPrimary mb-2">
          Message *
        </label>
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-4 py-2 border border-borderNeutral rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-cream-300 text-textPrimary placeholder-textSecondary"
          placeholder="Tell us about your project..."
        />
      </div>
      
      {submitMessage && (
        <div className={`p-3 rounded-lg text-sm ${
          submitMessage.includes('successfully') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {submitMessage}
        </div>
      )}
      
      <Button 
        type="submit"
        disabled={isSubmitting}
        className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-3 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
