import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.EMAIL_FROM || 'orders@unwinddesigns.com.au';

// Initialize Resend only if API key is present
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: {
    method: string;
    cost: number;
  };
  total: number;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export const emailService = {
  // Send order confirmation email
  sendOrderConfirmation: async (emailData: OrderEmailData): Promise<boolean> => {
    if (!resend) {
      console.warn('Resend is not configured. Skipping email send.');
      return false;
    }

    try {
      const html = generateOrderConfirmationHTML(emailData);

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: emailData.customerEmail,
        subject: `Order Confirmation #${emailData.orderId}`,
        html,
      });

      if (error) {
        console.error('Failed to send order confirmation email:', error);
        return false;
      }

      console.log('✅ Order confirmation email sent:', data?.id);
      return true;
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      return false;
    }
  },
};

// Generate HTML email template
function generateOrderConfirmationHTML(data: OrderEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #8B5A3C 0%, #654321 100%);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 30px;
    }
    .success-icon {
      text-align: center;
      margin-bottom: 20px;
    }
    .success-icon svg {
      width: 60px;
      height: 60px;
      fill: #10b981;
    }
    h2 {
      color: #8B5A3C;
      font-size: 20px;
      margin-top: 0;
      margin-bottom: 15px;
    }
    .order-details {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 6px;
      margin-bottom: 25px;
    }
    .order-number {
      font-size: 24px;
      font-weight: 600;
      color: #8B5A3C;
      margin-bottom: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th {
      background-color: #f5f5f5;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #e5e5e5;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
    }
    .item-name {
      font-weight: 500;
    }
    .total-row {
      font-weight: 600;
      font-size: 18px;
      border-top: 2px solid #8B5A3C;
    }
    .total-row td {
      padding-top: 15px;
      color: #8B5A3C;
    }
    .address-block {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 6px;
      margin-top: 10px;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px 30px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #8B5A3C;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #654321;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Thank You for Your Order!</h1>
    </div>
    
    <div class="content">
      <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
      </div>
      
      <p>Hi ${data.customerName},</p>
      
      <p>Thank you for your order! We're excited to get your custom Troopy fitout products to you.</p>
      
      <div class="order-details">
        <div class="order-number">Order #${data.orderId.substring(0, 8)}</div>
        <p style="margin: 5px 0; color: #666;">You'll receive a shipping confirmation email with tracking information once your order ships.</p>
      </div>
      
      <h2>📦 Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${data.items.map(item => `
            <tr>
              <td class="item-name">${item.name}</td>
              <td style="text-align: center;">${item.quantity}</td>
              <td style="text-align: right;">A$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
          <tr>
            <td colspan="2" style="text-align: right; font-weight: 500;">Subtotal:</td>
            <td style="text-align: right;">A$${data.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: right; font-weight: 500;">Shipping (${data.shipping.method}):</td>
            <td style="text-align: right;">A$${data.shipping.cost.toFixed(2)}</td>
          </tr>
          <tr class="total-row">
            <td colspan="2" style="text-align: right;">Total:</td>
            <td style="text-align: right;">A$${data.total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      
      <h2>🚚 Shipping Address</h2>
      <div class="address-block">
        <strong>${data.shippingAddress.name}</strong><br>
        ${data.shippingAddress.line1}<br>
        ${data.shippingAddress.line2 ? `${data.shippingAddress.line2}<br>` : ''}
        ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postal_code}<br>
        ${data.shippingAddress.country}
      </div>
      
      <p style="margin-top: 30px;">If you have any questions about your order, please don't hesitate to contact us.</p>
      
      <p>Cheers,<br>
      <strong>The Unwind Designs Team</strong></p>
    </div>
    
    <div class="footer">
      <p>This is an automated email from Unwind Designs.<br>
      For support, visit our website or contact us directly.</p>
      <p style="margin-top: 15px; font-size: 12px;">
        © ${new Date().getFullYear()} Unwind Designs. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
