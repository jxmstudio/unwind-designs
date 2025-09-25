import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendOrderConfirmationEmail({
  email,
  orderId,
  orderData
}: {
  email: string
  orderId: string
  orderData: any
}) {
  try {
    // If Resend is not configured, just log the email
    if (!process.env.RESEND_API_KEY) {
      console.log('Order confirmation email (Resend not configured):', {
        to: email,
        orderId,
        orderData: {
          total: orderData.totals.total,
          items: orderData.order_items?.length || 0,
          shippingAddress: orderData.shipping_address
        }
      })
      return { success: true, message: 'Email logged (Resend not configured)' }
    }

    const { data, error } = await resend!.emails.send({
      from: 'Unwind Designs <orders@unwinddesigns.com>',
      to: [email],
      subject: `Order Confirmation - #${orderId.slice(-8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Order Confirmation</h1>
          
          <p>Thank you for your order! Here are the details:</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Order #${orderId.slice(-8)}</h2>
            <p><strong>Order Date:</strong> ${new Date(orderData.created_at).toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${orderData.totals.total.toFixed(2)}</p>
            <p><strong>Status:</strong> ${orderData.payment_status}</p>
          </div>
          
          <h3>Items Ordered:</h3>
          <ul style="list-style: none; padding: 0;">
            ${orderData.order_items?.map((item: any) => `
              <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <strong>${item.product_name}</strong> × ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
              </li>
            `).join('') || '<li>No items found</li>'}
          </ul>
          
          <h3>Shipping Address:</h3>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
            <p>${orderData.shipping_address.name}</p>
            <p>${orderData.shipping_address.line1}</p>
            ${orderData.shipping_address.line2 ? `<p>${orderData.shipping_address.line2}</p>` : ''}
            <p>${orderData.shipping_address.city}, ${orderData.shipping_address.state} ${orderData.shipping_address.postal_code}</p>
            <p>${orderData.shipping_address.country}</p>
          </div>
          
          ${orderData.shipments && orderData.shipments.length > 0 ? `
            <h3>Shipping Information:</h3>
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
              ${orderData.shipments.map((shipment: any) => `
                <p><strong>Service:</strong> ${shipment.service_code}</p>
                ${shipment.tracking_number ? `<p><strong>Tracking Number:</strong> ${shipment.tracking_number}</p>` : ''}
                <p><strong>Status:</strong> ${shipment.status.replace('_', ' ')}</p>
              `).join('')}
            </div>
          ` : ''}
          
          <p style="margin-top: 30px;">
            You can view your order details and track your shipment in your 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account" style="color: #4f46e5;">account dashboard</a>.
          </p>
          
          <p>Thank you for choosing Unwind Designs!</p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending order confirmation email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error in sendOrderConfirmationEmail:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function sendShippingNotificationEmail({
  email,
  orderId,
  trackingNumber,
  carrier
}: {
  email: string
  orderId: string
  trackingNumber: string
  carrier: string
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('Shipping notification email (Resend not configured):', {
        to: email,
        orderId,
        trackingNumber,
        carrier
      })
      return { success: true, message: 'Email logged (Resend not configured)' }
    }

    const { data, error } = await resend!.emails.send({
      from: 'Unwind Designs <orders@unwinddesigns.com>',
      to: [email],
      subject: `Your Order #${orderId.slice(-8)} Has Shipped!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Your Order Has Shipped! 🚚</h1>
          
          <p>Great news! Your order has been shipped and is on its way to you.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Order #${orderId.slice(-8)}</h2>
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
            <p><strong>Carrier:</strong> ${carrier}</p>
          </div>
          
          <p>You can track your package using the tracking number above on the carrier's website.</p>
          
          <p style="margin-top: 30px;">
            View your order details in your 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account" style="color: #4f46e5;">account dashboard</a>.
          </p>
          
          <p>Thank you for choosing Unwind Designs!</p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending shipping notification email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error in sendShippingNotificationEmail:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
