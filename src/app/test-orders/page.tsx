'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TestOrdersPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createTestOrder = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/test/create-order', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Test order created successfully! Check the admin dashboard.');
      } else {
        setMessage('❌ Failed to create test order: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Test Order Creation</h1>
      
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Create Test Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Since webhooks don't work with localhost, create a test order to see the order management system in action.
          </p>
          
          <Button 
            onClick={createTestOrder}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating...' : 'Create Test Order'}
          </Button>
          
          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
          
          <div className="pt-4 border-t">
            <Link 
              href="/admin/orders"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View Orders Dashboard →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
