"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export function CartSidebar() {
  const { state, removeItem, updateQuantity, closeCart, clearCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    closeCart();
    window.location.href = '/checkout';
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
          />
          
          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream-400 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-borderNeutral">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-brown-500" />
                <h2 className="text-xl font-semibold text-textPrimary">
                  Shopping Cart ({state.itemCount})
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeCart}
                className="p-2 hover:bg-brown-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-cream-200 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-textSecondary mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-textSecondary">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-cream-300 rounded-lg border border-borderNeutral"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-cream-200 rounded-lg flex-shrink-0 flex items-center justify-center">
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
                        <h4 className="font-medium text-textPrimary text-body-small mb-1 truncate">
                          {item.name}
                        </h4>
                        <p className="text-brown-500 font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0 border-borderNeutral hover:bg-brown-100"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="w-8 text-center text-body-small font-medium text-textPrimary">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0 border-borderNeutral hover:bg-brown-100"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 hover:bg-red-100 hover:text-red-600 text-textSecondary"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-borderNeutral p-6 space-y-4">
                {/* Cart Summary */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-textPrimary">Total:</span>
                  <span className="text-2xl font-bold text-brown-500">
                    ${state.total.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-brown-500 hover:bg-darkBrown text-cream-400 py-3"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-borderNeutral text-textSecondary hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
