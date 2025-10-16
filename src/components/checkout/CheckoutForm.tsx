"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, User, MapPin, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";
import { SuburbAutocomplete } from "@/components/checkout/SuburbAutocomplete";

interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  
  // Payment
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  
  // Additional
  notes: string;
  subscribeNewsletter: boolean;
}

export function CheckoutForm() {
  const { state, setShippingAddress, getShippingQuotes, selectShippingQuote } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    notes: '',
    subscribeNewsletter: false
  });

  // Autocomplete for suburb/city
  const suburbAutocomplete = useAddressAutocomplete({
    type: 'suburb',
    state: formData.state
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Update shipping address when form changes, but don't recalculate quotes
  useEffect(() => {
    if (formData.address && formData.city && formData.state && formData.postcode && formData.country) {
      const shippingAddress = {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        country: formData.country
      };
      
      setShippingAddress(shippingAddress);
      // Don't recalculate quotes - use the ones already selected in cart
    }
  }, [formData.address, formData.city, formData.state, formData.postcode, formData.country]);

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error('Please fill in all required customer information');
      }
      
      if (!formData.address || !formData.city || !formData.state || !formData.postcode) {
        throw new Error('Please fill in all required shipping information');
      }

      // Set shipping address in cart context
      const shippingAddress = {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        country: formData.country
      };
      
      // Get shipping quotes
      setShippingAddress(shippingAddress);
      const quotes = await getShippingQuotes(shippingAddress);
      
      if (!quotes || quotes.length === 0) {
        throw new Error('No shipping options available for this address');
      }
      
      // The first quote should already be selected by getShippingQuotes
      if (!state.shipping.selectedQuote) {
        throw new Error('Please wait for shipping options to load');
      }

      // Create checkout session with Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            shortDescription: item.shortDescription || item.name || 'Product from Unwind Designs',
            images: [item.image]
          })),
          customerEmail: formData.email,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout/cancelled`,
          shippingCost: state.shipping.selectedQuote.price,
          shippingMethod: state.shipping.selectedQuote.service,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-textPrimary mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-textSecondary mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link href="/shop">
            <Button variant="default" size="lg" className="px-8 py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Enhanced Header */}
      <div className="mb-12">
        <Link 
          href="/cart" 
          className="inline-flex items-center text-accent-600 hover:text-accent-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-4xl font-bold text-textPrimary mb-3">Checkout</h1>
        <p className="text-lg text-textSecondary">
          Complete your order securely
        </p>
      </div>

      {/* Enhanced Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center space-x-6">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-body-small font-medium transition-all duration-300 ${
                step <= currentStep 
                  ? 'bg-accent-500 text-white shadow-medium' 
                  : 'bg-surface-200 text-textSecondary'
              }`}>
                {step < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step
                )}
              </div>
              {step < 2 && (
                <div className={`w-20 h-1 mx-4 rounded-full transition-all duration-300 ${
                  step < currentStep ? 'bg-accent-500' : 'bg-surface-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-accent-600" />
                    </div>
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-body-small font-semibold">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-body-small font-semibold">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-body-small font-semibold">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-body-small font-semibold">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent-600" />
                    </div>
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-body-small font-semibold">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-body-small font-semibold">Suburb *</Label>
                      <SuburbAutocomplete
                        state={formData.state as any}
                        value={formData.city}
                        onChange={(value) => handleInputChange('city', value)}
                        onSuburbSelect={(suburb) => {
                          setFormData(prev => ({
                            ...prev,
                            city: suburb.Suburb,
                            state: suburb.State,
                            postcode: suburb.Postcode
                          }));
                        }}
                        placeholder="Start typing suburb name..."
                      />
                      <p className="text-xs text-gray-500">
                        Select from dropdown or type manually ({formData.city.length}/30)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-body-small font-semibold">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        disabled
                        className="bg-gray-100"
                        placeholder="Auto-filled from suburb"
                      />
                      <p className="text-xs text-gray-500">
                        Auto-populated from suburb selection
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode" className="text-body-small font-semibold">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        disabled
                        className="bg-gray-100"
                        placeholder="Auto-filled from suburb"
                      />
                      <p className="text-xs text-gray-500">
                        Auto-populated from suburb selection
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-body-small font-semibold">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      required
                      placeholder="Enter your country"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information - Note: Stripe handles payment on their secure page */}
            {currentStep === 2 && (
              <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-accent-600" />
                    </div>
                    Ready to Pay
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-accent-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-accent-800 mb-2">Secure Payment Processing</h3>
                        <p className="text-accent-700 text-body-small mb-4">
                          Your payment will be processed securely by Stripe. You'll be redirected to their secure payment page where you can enter your card details safely.
                        </p>
                        <div className="text-caption text-accent-600">
                          <p>• Your card information is never stored on our servers</p>
                          <p>• All payments are encrypted and secure</p>
                          <p>• You can use test card: 4242 4242 4242 4242</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="px-8 py-3"
                >
                  Previous
                </Button>
              )}
              <div className="ml-auto">
                {currentStep < 2 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-3 bg-accent-500 hover:bg-accent-600"
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Enhanced Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-borderNeutral/30">
                    <div className="flex-1">
                      <p className="font-medium text-textPrimary">{item.name}</p>
                      <p className="text-body-small text-textSecondary">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-accent-600">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-borderNeutral/30">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Subtotal</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Shipping</span>
                  <span className="font-medium">
                    {state.shipping.selectedQuote 
                      ? `$${state.shipping.selectedQuote.price.toFixed(2)}` 
                      : 'Calculating...'
                    }
                  </span>
                </div>
                {state.shipping.selectedQuote && (
                  <div className="text-sm text-textSecondary">
                    {state.shipping.selectedQuote.service} 
                    ({state.shipping.selectedQuote.deliveryDays} business days)
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-textPrimary pt-2 border-t border-borderNeutral/30">
                  <span>Total</span>
                  <span>
                    ${(state.total + (state.shipping.selectedQuote?.price || 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Security Note */}
              <div className="flex items-center gap-2 text-body-small text-textSecondary bg-surface-100 p-3 rounded-lg">
                <Shield className="w-4 h-4 text-accent-500" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
