"use client";

import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MapPin, Truck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import Link from "next/link";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";
import { CheckoutSummary } from "./CheckoutSummary";

export function CartPageContent() {
  // Force cache bust - v4 - ${Date.now()} - ${Math.random()}
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    setShippingAddress, 
    getShippingQuotes, 
    selectShippingQuote 
  } = useCart();
  
  const [shippingAddressForm, setShippingAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia'
  });

  // Order options state
  const [orderOptions, setOrderOptions] = useState({
    paymentSurcharge: '',
    shippingInsurance: '',
    specialInstructions: ''
  });

  // Autocomplete for suburb/city
  const suburbAutocomplete = useAddressAutocomplete({
    type: 'suburb',
    state: shippingAddressForm.state
  });

  // Ensure shippingAddressForm is always defined
  if (!shippingAddressForm) {
    console.error('shippingAddressForm state is undefined - this should not happen');
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = async () => {
    if (!state.shipping.selectedQuote) {
      alert('Please calculate shipping first');
      return;
    }

    try {
      // Create checkout session with Stripe directly
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
    }
  };

  const handleAddressChange = (field: string, value: string) => {
    // Defensive check to ensure setShippingAddressForm is defined
    if (!setShippingAddressForm) {
      console.error('setShippingAddressForm is not defined');
      return;
    }
    setShippingAddressForm(prev => ({ ...prev, [field]: value }));
  };

  const handleGetQuotes = async () => {
    // Defensive check to ensure shippingAddressForm is defined
    if (!shippingAddressForm) {
      console.error('shippingAddressForm is not defined');
      return;
    }
    
    console.log('Getting shipping quotes for:', shippingAddressForm);
    
    if (!shippingAddressForm?.street || !shippingAddressForm?.city || !shippingAddressForm?.state || !shippingAddressForm?.postcode) {
      alert('Please fill in all address fields');
      return;
    }
    
    setShippingAddress(shippingAddressForm);
    const quotes = await getShippingQuotes(shippingAddressForm);
    console.log('Shipping quotes result:', quotes);
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-cream-200 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-textPrimary mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-textSecondary mb-8">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <div className="space-x-4">
            <Link href="/shop">
              <Button className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-8">
        <Link href="/shop" className="inline-flex items-center text-brown-500 hover:text-darkBrown mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-4xl font-bold text-textPrimary">Shopping Cart</h1>
        <p className="text-lg text-textSecondary mt-2">
          {state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-cream-400 rounded-2xl p-6 shadow-soft border border-borderNeutral">
            <h2 className="text-xl font-semibold text-textPrimary mb-6">Cart Items</h2>
            
            <div className="space-y-6">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-cream-300 rounded-lg border border-borderNeutral"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-cream-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-caption text-textSecondary text-center">
                        {item.category || 'Image'}
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-textPrimary text-lg mb-2">
                      {item.name}
                    </h3>
                    <p className="text-brown-500 font-semibold text-lg mb-3">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <span className="text-body-small font-medium text-textPrimary">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-10 h-10 p-0 border-borderNeutral hover:bg-brown-100"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="w-12 text-center text-lg font-medium text-textPrimary">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-10 h-10 p-0 border-borderNeutral hover:bg-brown-100"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-brown-500 mb-3">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-6 pt-6 border-t border-borderNeutral">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
              >
                Clear All Items
              </Button>
            </div>
          </div>

          {/* Shipping Address & Quotes */}
          <Card className="shadow-soft border border-borderNeutral">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brown-600" />
                </div>
                Shipping Address & Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={shippingAddressForm?.street || ''}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    placeholder="Enter street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City/Suburb</Label>
                  <div className="relative">
                    <Input
                      id="city"
                      value={suburbAutocomplete.query}
                      onChange={(e) => suburbAutocomplete.setQuery(e.target.value)}
                      placeholder="Start typing suburb name..."
                      maxLength={30}
                    />
                    
                    {/* Autocomplete dropdown */}
                    {suburbAutocomplete.results.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {suburbAutocomplete.results.map((result, index) => (
                          <div
                            key={`${result.value}-${index}`}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setShippingAddressForm(prev => ({
                                ...prev,
                                city: result.suburb,
                                state: result.state,
                                postcode: result.postcode
                              }));
                              suburbAutocomplete.clearResults();
                            }}
                          >
                            <div className="font-medium">{result.label}</div>
                            <div className="text-sm text-gray-500">{result.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {suburbAutocomplete.isLoading && (
                      <div className="absolute right-3 top-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {shippingAddressForm?.city?.length || 0}/30 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={shippingAddressForm?.state || ''}
                    disabled
                    className="bg-gray-100"
                    placeholder="Auto-filled from suburb"
                  />
                  <p className="text-xs text-gray-500">
                    Auto-populated from suburb selection
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    value={shippingAddressForm?.postcode || ''}
                    disabled
                    className="bg-gray-100"
                    placeholder="Auto-filled from suburb"
                  />
                  <p className="text-xs text-gray-500">
                    Auto-populated from suburb selection
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleGetQuotes}
                disabled={state.shipping.loading || !shippingAddressForm?.street || !shippingAddressForm?.city || !shippingAddressForm?.state || !shippingAddressForm?.postcode}
                className="w-full bg-brown-500 hover:bg-darkBrown text-cream-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {state.shipping.loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-cream-400 border-t-transparent rounded-full animate-spin"></div>
                    Getting Quotes...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Calculate Shipping Cost
                  </div>
                )}
              </Button>
              {state.shipping.error && (
                <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>{state.shipping.error}</span>
                  </div>
                </div>
              )}

              {/* Shipping Quotes */}
              {state.shipping.quotes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-textPrimary">Select Shipping Method:</h3>
                  {state.shipping.quotes.map((quote, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        state.shipping.selectedQuote === quote
                          ? 'border-brown-500 bg-brown-50'
                          : 'border-borderNeutral hover:border-brown-300'
                      }`}
                      onClick={() => selectShippingQuote(quote)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-textPrimary">{quote.service}</div>
                          <div className="text-sm text-textSecondary">
                            {quote.deliveryDays} business days • {quote.carrier || 'Standard carrier'}
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-brown-500">
                          ${quote.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {state.shipping.error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {state.shipping.error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Options */}
          <Card className="shadow-soft border border-borderNeutral">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-brown-600" />
                </div>
                Order Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Special Instructions */}
              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Order Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={orderOptions.specialInstructions}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOrderOptions(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  placeholder="Any special instructions for your order..."
                  className="min-h-[100px] resize-y"
                />
              </div>

              {/* Payment Surcharge */}
              <div className="space-y-2">
                <Label htmlFor="paymentSurcharge" className="flex items-center gap-2">
                  Payment Surcharge *
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <Select
                  value={orderOptions.paymentSurcharge}
                  onValueChange={(value) => setOrderOptions(prev => ({ ...prev, paymentSurcharge: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-- Please select --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Surcharge</SelectItem>
                    <SelectItem value="credit-card">Credit Card Fee (2.5%)</SelectItem>
                    <SelectItem value="paypal">PayPal Fee (3.5%)</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer (No Fee)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Shipping Insurance */}
              <div className="space-y-2">
                <Label htmlFor="shippingInsurance" className="flex items-center gap-2">
                  Shipping Insurance *
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <Select
                  value={orderOptions.shippingInsurance}
                  onValueChange={(value) => setOrderOptions(prev => ({ ...prev, shippingInsurance: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-- Please select --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">NO INSURANCE - I UNDERSTAND THE RISKS</SelectItem>
                    <SelectItem value="basic">Basic Insurance - $50.00</SelectItem>
                    <SelectItem value="standard">Standard Insurance - $119.00</SelectItem>
                    <SelectItem value="premium">Premium Insurance - $250.00</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Terms and conditions apply. Please read before checkout.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary orderOptions={orderOptions} />
          
          <div className="mt-6 space-y-4">
            <Button
              onClick={handleCheckout}
              disabled={!state.shipping.selectedQuote}
              className={`w-full py-4 text-lg ${
                state.shipping.selectedQuote 
                  ? 'bg-brown-500 hover:bg-darkBrown text-cream-400' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {state.shipping.selectedQuote ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Pay with Stripe</span>
                  <span className="text-sm opacity-90">
                    (${(() => {
                      let total = state.total + (state.shipping.selectedQuote?.price || 0);
                      if (orderOptions.paymentSurcharge === 'credit-card') {
                        total += state.total * 0.025;
                      } else if (orderOptions.paymentSurcharge === 'paypal') {
                        total += state.total * 0.035;
                      }
                      if (orderOptions.shippingInsurance === 'basic') {
                        total += 50;
                      } else if (orderOptions.shippingInsurance === 'standard') {
                        total += 119;
                      } else if (orderOptions.shippingInsurance === 'premium') {
                        total += 250;
                      }
                      return total.toFixed(2);
                    })()})
                  </span>
                </div>
              ) : (
                'Calculate Shipping First'
              )}
            </Button>

            <p className="text-caption text-textSecondary text-center">
              {state.shipping.selectedQuote 
                ? 'You will be redirected to Stripe to enter your payment details' 
                : 'Enter your address and calculate shipping to continue'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
