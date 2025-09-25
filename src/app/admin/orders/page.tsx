import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminOrdersPage() {
  const supabase = createSupabaseServerClient()
  
  // Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect('/login')
  }

  // Simple admin check - in production, you'd want proper role-based access
  // For now, we'll just check if the user email contains 'admin' or is a specific admin email
  const isAdmin = user.email?.includes('admin') || user.email === 'admin@unwinddesigns.com'
  
  if (!isAdmin) {
    redirect('/account')
  }

  // Get all orders with related data
  let orders: any[] = []
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*),
        shipments (*)
      `)
      .order('created_at', { ascending: false })
      .limit(50) // Limit to latest 50 orders for performance

    if (error) {
      console.error('Error fetching orders:', error)
    } else {
      orders = data || []
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Admin - Order Management</h1>
              <Link 
                href="/account"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-body-small font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Account
              </Link>
            </div>
            
            {/* Orders Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-body-small font-medium text-blue-600">Total Orders</h3>
                <p className="text-2xl font-bold text-blue-900">{orders.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-body-small font-medium text-green-600">Successful Payments</h3>
                <p className="text-2xl font-bold text-green-900">
                  {orders.filter(o => o.payment_status === 'succeeded').length}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-body-small font-medium text-yellow-600">Processing</h3>
                <p className="text-2xl font-bold text-yellow-900">
                  {orders.filter(o => o.order_status === 'processing').length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-body-small font-medium text-purple-600">Shipped</h3>
                <p className="text-2xl font-bold text-purple-900">
                  {orders.filter(o => o.order_status === 'shipped').length}
                </p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-caption font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-caption font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-caption font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-caption font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-caption font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-caption font-medium text-gray-500 uppercase tracking-wider">
                      Shipping
                    </th>
                    <th className="px-6 py-3 text-left text-caption font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order: any) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-body-small font-medium text-gray-900">
                            #{order.id.slice(-8)}
                          </div>
                          <div className="text-body-small text-gray-500">
                            {order.stripe_payment_intent_id ? 
                              `PI: ${order.stripe_payment_intent_id.slice(-8)}` : 
                              'No Payment Intent'
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-body-small text-gray-900">{order.email}</div>
                          <div className="text-body-small text-gray-500">
                            {order.user_id ? 'Registered User' : 'Guest'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium ${
                              order.payment_status === 'succeeded' 
                                ? 'bg-green-100 text-green-800'
                                : order.payment_status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              Payment: {order.payment_status}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium ${
                              order.order_status === 'delivered' 
                                ? 'bg-green-100 text-green-800'
                                : order.order_status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.order_status === 'processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              Order: {order.order_status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-body-small text-gray-900">
                          ${(order.total_cents / 100).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-body-small text-gray-500">
                          {order.order_items?.length || 0} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.shipments && order.shipments.length > 0 ? (
                            <div className="text-body-small">
                              {order.shipments.map((shipment: any, index: number) => (
                                <div key={shipment.id} className={index > 0 ? 'mt-1' : ''}>
                                  <div className="text-gray-900">{shipment.service_code}</div>
                                  {shipment.tracking_number && (
                                    <div className="text-gray-500 text-caption">
                                      Track: {shipment.tracking_number}
                                    </div>
                                  )}
                                  <div className={`text-caption ${
                                    shipment.status === 'delivered' ? 'text-green-600' :
                                    shipment.status === 'in_transit' ? 'text-blue-600' :
                                    shipment.status === 'booked' ? 'text-yellow-600' :
                                    'text-gray-500'
                                  }`}>
                                    {shipment.status.replace('_', ' ')}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-body-small">No shipment</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-body-small text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-body-small font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Refresh Orders
                </button>
                <Link
                  href="/admin/orders/export"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-body-small font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Export Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}