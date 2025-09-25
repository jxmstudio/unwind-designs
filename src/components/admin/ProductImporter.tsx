"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface ScrapedProduct {
  name: string;
  price: string;
  image?: string;
  description?: string;
  url: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  products?: any[];
  error?: string;
}

export function ProductImporter() {
  const [sourceUrl, setSourceUrl] = useState('');
  const [scrapedData, setScrapedData] = useState<ScrapedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleScrapeData = async () => {
    if (!sourceUrl) return;

    setIsLoading(true);
    setResult(null);

    try {
      // This would typically call your scraping service
      // For demo purposes, we'll simulate the scraping
      const mockData: ScrapedProduct[] = [
        {
          name: "Premium Adventure Pack",
          price: "$299.99",
          image: "https://example.com/image1.jpg",
          description: "High-quality adventure pack for outdoor enthusiasts",
          url: sourceUrl
        },
        {
          name: "Compact Storage System",
          price: "$199.99", 
          image: "https://example.com/image2.jpg",
          description: "Modular storage solution for small spaces",
          url: sourceUrl
        }
      ];

      setScrapedData(mockData);
      setResult({
        success: true,
        message: `Found ${mockData.length} products to import`
      });

    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to scrape products from URL'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportProducts = async () => {
    if (scrapedData.length === 0) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/import-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: scrapedData,
          sourceUrl,
          overwrite: false
        }),
      });

      const data = await response.json();
      setResult(data);

    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to import products'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualInput = () => {
    const manualData = `[
  {
    "name": "Custom Product Name",
    "price": "$199.99",
    "image": "https://example.com/image.jpg",
    "description": "Product description here",
    "url": "${sourceUrl}"
  }
]`;

    try {
      const parsed = JSON.parse(manualData);
      setScrapedData(parsed);
      setResult({
        success: true,
        message: 'Manual data loaded successfully'
      });
    } catch (error) {
      setResult({
        success: false,
        error: 'Invalid JSON format'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Product Importer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="sourceUrl">Source Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="sourceUrl"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://example-store.com/products"
                className="flex-1"
              />
              <Button 
                onClick={handleScrapeData}
                disabled={!sourceUrl || isLoading}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Scrape
              </Button>
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-2">
            <Label>Or Paste Scraped Data (JSON)</Label>
            <Textarea
              placeholder="Paste your scraped product data here..."
              className="min-h-[200px] font-mono text-sm"
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setScrapedData(parsed);
                } catch (error) {
                  // Invalid JSON, ignore
                }
              }}
            />
            <Button 
              onClick={handleManualInput}
              variant="outline"
              className="w-full"
            >
              Load Manual Data
            </Button>
          </div>

          {/* Results */}
          {result && (
            <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <AlertDescription>
                  {result.message || result.error}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Scraped Products Preview */}
          {scrapedData.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Scraped Products ({scrapedData.length})</h3>
              <div className="grid gap-4 max-h-60 overflow-y-auto">
                {scrapedData.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex gap-4">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.price}</p>
                        {product.description && (
                          <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Import Button */}
          {scrapedData.length > 0 && (
            <Button 
              onClick={handleImportProducts}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Importing...' : `Import ${scrapedData.length} Products`}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
