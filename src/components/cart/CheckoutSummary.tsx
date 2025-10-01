"use client";

import { useCart } from "@/lib/cart-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, CreditCard, Shield, Package } from "lucide-react";

interface CheckoutSummaryProps {
  orderOptions: {
    paymentSurcharge: string;
    shippingInsurance: string;
    specialInstructions: string;
  };
}

export function CheckoutSummary({ orderOptions }: CheckoutSummaryProps) {
  const { state } = useCart();

  const calculateTotal = () => {
    let total = state.total + (state.shipping.selectedQuote?.price || 0);
    
    // Add payment surcharge
    if (orderOptions.paymentSurcharge === 'credit-card') {
      total += state.total * 0.025;
    } else if (orderOptions.paymentSurcharge === 'paypal') {
      total += state.total * 0.035;
    }
    
    // Add shipping insurance
    if (orderOptions.shippingInsurance === 'basic') {
      total += 50;
    } else if (orderOptions.shippingInsurance === 'standard') {
      total += 119;
    } else if (orderOptions.shippingInsurance === 'premium') {
      total += 250;
    }
    
    return total;
  };

  const getPaymentSurchargeAmount = () => {
    if (orderOptions.paymentSurcharge === 'credit-card') {
      return state.total * 0.025;
    } else if (orderOptions.paymentSurcharge === 'paypal') {
      return state.total * 0.035;
    }
    return 0;
  };

  const getShippingInsuranceAmount = () => {
    if (orderOptions.shippingInsurance === 'basic') return 50;
    if (orderOptions.shippingInsurance === 'standard') return 119;
    if (orderOptions.shippingInsurance === 'premium') return 250;
    return 0;
  };

  const total = calculateTotal();
  const paymentSurcharge = getPaymentSurchargeAmount();
  const shippingInsurance = getShippingInsuranceAmount();

  return (
    <Card className="bg-gradient-to-br from-cream-50 to-cream-100 border-2 border-brown-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-brown-800 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          <h4 className="font-semibold text-brown-700">Items ({state.itemCount})</h4>
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white rounded-lg p-3 border border-brown-100">
              <div className="flex-1">
                <p className="font-medium text-brown-800">{item.name}</p>
                <p className="text-sm text-brown-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-brown-800">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center py-2 border-t border-brown-200">
          <span className="font-medium text-brown-700">Subtotal</span>
          <span className="font-semibold text-brown-800">${state.total.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        {state.shipping.selectedQuote && (
          <div className="flex justify-between items-center py-2 border-t border-brown-200">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-green-600" />
              <span className="font-medium text-brown-700">Shipping</span>
              <Badge variant="secondary" className="text-xs">
                {state.shipping.selectedQuote.service}
              </Badge>
            </div>
            <span className="font-semibold text-green-600">${state.shipping.selectedQuote.price.toFixed(2)}</span>
          </div>
        )}

        {/* Payment Surcharge */}
        {paymentSurcharge > 0 && (
          <div className="flex justify-between items-center py-2 border-t border-brown-200">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-brown-700">Payment Fee</span>
            </div>
            <span className="font-semibold text-blue-600">${paymentSurcharge.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping Insurance */}
        {shippingInsurance > 0 && (
          <div className="flex justify-between items-center py-2 border-t border-brown-200">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-brown-700">Insurance</span>
            </div>
            <span className="font-semibold text-purple-600">${shippingInsurance.toFixed(2)}</span>
          </div>
        )}

        {/* Tax Note */}
        <div className="text-sm text-brown-600 bg-brown-50 p-3 rounded-lg border border-brown-200">
          <p className="font-medium">Tax Information</p>
          <p>GST will be calculated and added at checkout based on your location.</p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 border-t-2 border-brown-300 bg-brown-50 rounded-lg px-4 -mx-4">
          <span className="text-xl font-bold text-brown-800">Total (excl. GST)</span>
          <span className="text-2xl font-bold text-brown-800">${total.toFixed(2)}</span>
        </div>

        {/* Checkout Note */}
        <div className="text-center text-sm text-brown-600 bg-white p-3 rounded-lg border border-brown-200">
          <p className="font-medium">Ready for Payment</p>
          <p>You'll be redirected to Stripe to enter your payment and shipping details.</p>
        </div>
      </CardContent>
    </Card>
  );
}
