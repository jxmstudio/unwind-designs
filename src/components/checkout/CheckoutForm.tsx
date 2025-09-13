"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, User, MapPin, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

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
  const { state } = useCart();
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

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
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
      // Create checkout session with Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items,
          customerEmail: formData.email,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout/cancelled`,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again or contact support.');
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
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
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
              {step < 3 && (
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
                      <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
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
                      <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
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
                      <Label htmlFor="phone" className="text-sm font-semibold">Phone *</Label>
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
                    <Label htmlFor="address" className="text-sm font-semibold">Street Address *</Label>
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
                      <Label htmlFor="city" className="text-sm font-semibold">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                        placeholder="Enter your city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-semibold">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                        placeholder="Enter your state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode" className="text-sm font-semibold">Postcode *</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        required
                        placeholder="Enter your postcode"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-semibold">Country *</Label>
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

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-accent-600" />
                    </div>
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName" className="text-sm font-semibold">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      required
                      placeholder="Enter the name on your card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-sm font-semibold">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      required
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-sm font-semibold">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        required
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm font-semibold">CVV *</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        required
                        placeholder="123"
                      />
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
                {currentStep < 3 ? (
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
                    {isProcessing ? 'Processing...' : 'Complete Order'}
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
                      <p className="text-sm text-textSecondary">Qty: {item.quantity}</p>
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
                  <span className="font-medium">$12.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-textPrimary pt-2 border-t border-borderNeutral/30">
                  <span>Total</span>
                  <span>${(state.total + 12).toFixed(2)}</span>
                </div>
              </div>

              {/* Security Note */}
              <div className="flex items-center gap-2 text-sm text-textSecondary bg-surface-100 p-3 rounded-lg">
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
