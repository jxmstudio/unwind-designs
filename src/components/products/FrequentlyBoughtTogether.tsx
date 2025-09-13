"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface AddOnProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  variants?: { id: string; name: string; price: number }[];
  defaultVariant?: string;
}

interface FrequentlyBoughtTogetherProps {
  addOns: AddOnProduct[];
  onAddToCart: (items: { productId: string; variantId?: string; quantity: number }[]) => void;
}

export function FrequentlyBoughtTogether({ addOns, onAddToCart }: FrequentlyBoughtTogetherProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, { selected: boolean; variantId?: string; quantity: number }>>({});

  const updateSelection = (productId: string, selected: boolean, variantId?: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: {
        selected,
        variantId: variantId || prev[productId]?.variantId,
        quantity: prev[productId]?.quantity || 1
      }
    }));
  };

  const updateVariant = (productId: string, variantId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        variantId,
        selected: true
      }
    }));
  };

  const getSelectedItems = () => {
    return Object.entries(selectedItems)
      .filter(([, item]) => item.selected)
      .map(([productId, item]) => ({
        productId,
        variantId: item.variantId,
        quantity: item.quantity
      }));
  };

  const calculateSubtotal = () => {
    return Object.entries(selectedItems)
      .filter(([, item]) => item.selected)
      .reduce((total, [productId, item]) => {
        const product = addOns.find(p => p.id === productId);
        if (!product) return total;
        
        const variant = product.variants?.find(v => v.id === item.variantId);
        const price = variant?.price || product.price;
        
        return total + (price * item.quantity);
      }, 0);
  };

  const handleAddToCart = () => {
    const items = getSelectedItems();
    onAddToCart(items);
  };

  const selectedCount = getSelectedItems().length;
  const subtotal = calculateSubtotal();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-soft border border-borderNeutral"
    >
      <h3 className="text-xl font-bold text-textPrimary mb-6">Frequently Bought Together</h3>
      
      <div className="space-y-4">
        {addOns.map((product) => {
          const isSelected = selectedItems[product.id]?.selected || false;
          const selectedVariant = product.variants?.find(v => v.id === selectedItems[product.id]?.variantId);
          const displayPrice = selectedVariant?.price || product.price;
          
          return (
            <Card key={product.id} className={`transition-all duration-200 ${isSelected ? 'ring-2 ring-accent-500 bg-accent-50' : 'hover:shadow-md'}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => updateSelection(product.id, checked as boolean)}
                    className="flex-shrink-0"
                  />
                  
                  <div className="w-16 h-16 bg-cream-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-textPrimary text-sm mb-1 truncate">
                      {product.name}
                    </h4>
                    <p className="text-lg font-bold text-accent-600">
                      ${displayPrice.toFixed(2)}
                    </p>
                  </div>
                  
                  {product.variants && (
                    <div className="flex-shrink-0">
                      <Select
                        value={selectedItems[product.id]?.variantId || product.defaultVariant || product.variants[0].id}
                        onValueChange={(value) => updateVariant(product.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {product.variants.map((variant) => (
                            <SelectItem key={variant.id} value={variant.id}>
                              {variant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-borderNeutral"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-textPrimary/70">Subtotal for {selectedCount} item{selectedCount !== 1 ? 's' : ''}</p>
              <p className="text-2xl font-bold text-textPrimary">
                ${subtotal.toFixed(2)}
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add {selectedCount} item{selectedCount !== 1 ? 's' : ''} to cart
          </Button>
        </motion.div>
      )}
    </motion.section>
  );
}
