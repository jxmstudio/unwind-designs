"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';

export function CSVImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    
    // Parse CSV
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        return row;
      }).filter(row => row.name); // Only rows with names

      setPreview(data);
    };
    reader.readAsText(uploadedFile);
  };

  const downloadTemplate = () => {
    const template = `name,price,description,image,category
"Premium Adventure Pack","299.99","High-quality outdoor gear","https://example.com/image1.jpg","flat-packs"
"Compact Storage System","199.99","Modular storage solution","https://example.com/image2.jpg","troopy-packs"`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-template.csv';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            CSV Product Import
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Upload a CSV file with your products. Download the template below to get started.
            </p>
            
            <Button onClick={downloadTemplate} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Template
            </Button>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium">Click to upload CSV file</p>
              <p className="text-sm text-gray-500">or drag and drop</p>
            </label>
          </div>

          {preview.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Preview ({preview.length} products)</h3>
              <div className="max-h-60 overflow-y-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(0, 10).map((product, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.price}</td>
                        <td className="p-2">{product.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Button className="w-full" size="lg">
                Import {preview.length} Products
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
