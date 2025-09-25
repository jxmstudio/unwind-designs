import { createSupabaseServerClientWithAuth } from '@/lib/supabase/server'
import { getUserOrders } from '@/lib/db/orders'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AccountPage() {
  const supabase = createSupabaseServerClientWithAuth()
  
  // Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect('/login')
  }

  // Get user's orders
  let orders: any[] = []
  try {
    orders = await getUserOrders(user.id)
  } catch (error) {
    console.error('Error fetching orders:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>
            
            {/* User Info */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Account Information</h2>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-body-small text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-body-small text-gray-600">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              </div>
            </div>

            {/* Orders */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link 
                    href="/shop" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-body-small font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order: any) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-body-small font-medium text-gray-900">
                            Order #{order.id.slice(-8)}
                          </h3>
                          <p className="text-body-small text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-body-small font-medium text-gray-900">
                            ${(order.total_cents / 100).toFixed(2)}
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium ${
                            order.payment_status === 'succeeded' 
                              ? 'bg-green-100 text-green-800'
                              : order.payment_status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {order.payment_status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div className="mt-3">
                        <h4 className="text-body-small font-medium text-gray-700 mb-2">Items:</h4>
                        <div className="space-y-1">
                          {order.order_items.map((item: any) => (
                            <div key={item.id} className="flex justify-between text-body-small">
                              <span className="text-gray-600">
                                {item.title} × {item.quantity}
                              </span>
                              <span className="text-gray-900">
                                ${((item.unit_price_cents * item.quantity) / 100).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      {order.shipments && order.shipments.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h4 className="text-body-small font-medium text-gray-700 mb-2">Shipping:</h4>
                          {order.shipments.map((shipment: any) => (
                            <div key={shipment.id} className="text-body-small text-gray-600">
                              <p>Service: {shipment.service_code}</p>
                              {shipment.tracking_number && (
                                <p>Tracking: {shipment.tracking_number}</p>
                              )}
                              {shipment.status && (
                                <p>Status: <span className="capitalize">{shipment.status.replace('_', ' ')}</span></p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Shipping Address */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h4 className="text-body-small font-medium text-gray-700 mb-1">Shipping Address:</h4>
                        <div className="text-body-small text-gray-600">
                          <p>{order.shipping_address.name}</p>
                          <p>{order.shipping_address.line1}</p>
                          {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
                          <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                          <p>{order.shipping_address.country}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}