'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Clock, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Package
} from 'lucide-react';

interface QuoteOption {
  ServiceCode: string;
  ServiceName: string;
  Price: number;
  EstimatedDeliveryDays: number;
  CarrierId: number;
  CarrierName: string;
  Description?: string;
  AuthorityToLeave?: boolean;
  Restrictions?: string[];
}

interface QuoteOptionsProps {
  quotes: QuoteOption[];
  selectedQuote: QuoteOption | null;
  onQuoteSelect: (quote: QuoteOption) => void;
  className?: string;
}

export function QuoteOptions({ 
  quotes, 
  selectedQuote, 
  onQuoteSelect, 
  className 
}: QuoteOptionsProps) {
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const formatDeliveryDays = (days: number): string => {
    if (days === 0) return 'Same day';
    if (days === 1) return '1 business day';
    return `${days} business days`;
  };

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.toLowerCase().includes('express')) {
      return <Truck className="w-5 h-5 text-orange-500" />;
    }
    if (serviceName.toLowerCase().includes('standard')) {
      return <Package className="w-5 h-5 text-blue-500" />;
    }
    return <Truck className="w-5 h-5 text-gray-500" />;
  };

  const getServiceBadgeColor = (serviceName: string) => {
    if (serviceName.toLowerCase().includes('express')) {
      return 'bg-orange-100 text-orange-800';
    }
    if (serviceName.toLowerCase().includes('standard')) {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  if (quotes.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Available Shipping Options
        </CardTitle>
        <p className="text-sm text-gray-600">
          Select your preferred shipping method
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotes.map((quote, index) => (
            <div
              key={`${quote.ServiceCode}-${index}`}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedQuote?.ServiceCode === quote.ServiceCode
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onQuoteSelect(quote)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getServiceIcon(quote.ServiceName)}
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {quote.ServiceName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {quote.CarrierName}
                      </p>
                    </div>
                    <Badge className={getServiceBadgeColor(quote.ServiceName)}>
                      {quote.ServiceCode}
                    </Badge>
                  </div>

                  {quote.Description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {quote.Description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDeliveryDays(quote.EstimatedDeliveryDays)}</span>
                    </div>
                    
                    {quote.AuthorityToLeave && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Shield className="w-4 h-4" />
                        <span>Authority to Leave</span>
                      </div>
                    )}
                  </div>

                  {quote.Restrictions && quote.Restrictions.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-start gap-1">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                        <div className="text-sm text-amber-700">
                          <strong>Restrictions:</strong> {quote.Restrictions.join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(quote.Price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {quote.EstimatedDeliveryDays === 0 ? 'Same day' : 
                     quote.EstimatedDeliveryDays === 1 ? 'Next day' : 
                     `In ${quote.EstimatedDeliveryDays} days`}
                  </div>
                </div>
              </div>

              {selectedQuote?.ServiceCode === quote.ServiceCode && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Selected</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedQuote && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Quote Selected</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              {selectedQuote.ServiceName} - {formatPrice(selectedQuote.Price)} 
              ({formatDeliveryDays(selectedQuote.EstimatedDeliveryDays)})
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
