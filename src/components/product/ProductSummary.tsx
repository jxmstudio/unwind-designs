"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductSummaryProps {
  title: string;
  subtitle?: string;
  price: number;
  inStock?: boolean;
}

export default function ProductSummary({ title, subtitle, price, inStock = true }: ProductSummaryProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h1 className="text-3xl font-bold text-textPrimary mb-2">{title}</h1>
      {subtitle && <p className="text-textSecondary mb-4">{subtitle}</p>}
      <div className="flex items-center justify-between mb-6">
        <div className="text-4xl font-bold">${price.toLocaleString()}</div>
        <Badge className={inStock ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
          {inStock ? 'In Stock' : 'Coming Soon'}
        </Badge>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium">Qty</span>
        <div className="flex items-center border rounded-lg">
          <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
          <span className="px-4 py-2 border-x">{qty}</span>
          <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>+</button>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white py-4 text-lg">Add to Cart</Button>
        <Button variant="outline" className="w-full border-2 border-accent-500 text-accent-600 py-4">Configure & Buy</Button>
      </div>
    </div>
  );
}


