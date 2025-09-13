"use client";

import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

export function CartPageContent() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    window.location.href = '/checkout';
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
        <div className="lg:col-span-2">
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
                      <span className="text-xs text-textSecondary text-center">
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
                      <span className="text-sm font-medium text-textPrimary">Quantity:</span>
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
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream-400 rounded-2xl p-6 shadow-soft border border-borderNeutral sticky top-24">
            <h2 className="text-xl font-semibold text-textPrimary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-textSecondary">
                <span>Subtotal ({state.itemCount} items)</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-textSecondary">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-textSecondary">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-borderNeutral pt-4">
                <div className="flex justify-between text-xl font-bold text-textPrimary">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-brown-500 hover:bg-darkBrown text-cream-400 py-4 text-lg"
            >
              Proceed to Checkout
            </Button>

            <p className="text-xs text-textSecondary text-center mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
