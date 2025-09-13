# 🧪 Stripe & BigPost Testing Guide for Unwind Designs

## 🚀 **Quick Start Testing**

### **1. Set Up Test Environment**

1. **Create .env.local file** (copy from env.example):
   ```bash
   cp env.example .env.local
   ```

2. **Get Stripe Test Keys**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Make sure you're in **Test mode** (toggle in top right)
   - Go to Developers → API keys
   - Copy your test keys to `.env.local`:

```bash
# Stripe Configuration (AUD)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# BigPost Shipping (Optional for testing)
BIGPOST_API_URL=https://api.bigpost.com.au
BIG_POST_API_TOKEN=your_bigpost_api_token_here
NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING=true
```

### **2. Test Card Numbers**

Use these test card numbers (they won't charge real money):

```
✅ SUCCESSFUL PAYMENTS:
4242 4242 4242 4242  (Visa)
4000 0566 5566 5556  (Visa Debit)
5555 5555 5555 4444  (Mastercard)

❌ DECLINED PAYMENTS:
4000 0000 0000 0002  (Card declined)
4000 0000 0000 9995  (Insufficient funds)
4000 0000 0000 0069  (Expired card)

🔐 3D SECURE (Authentication required):
4000 0025 0000 3155  (Requires authentication)
```

**For all test cards:**
- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any valid postal code

### **3. Testing Workflow**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test Shipping Quotes (Optional):**
   - Go to http://localhost:3000/cart
   - Add items to cart
   - Check shipping calculation in cart or checkout
   - Verify BigPost integration or fallback rates

3. **Add products to cart:**
   - Go to http://localhost:3000/flat-packs
   - Add some flat pack products to your cart

4. **Go to checkout:**
   - Visit http://localhost:3000/cart
   - Click "Proceed to Checkout"

5. **Fill out the form:**
   - Add customer details (use test email)
   - Use a test card number from above
   - Click "Complete Order"

6. **Verify redirect:**
   - Should redirect to Stripe checkout page
   - Complete payment with test card
   - Should redirect back to success page

### **4. What to Check**

#### ✅ **Payment Success Flow**
- [ ] Cart shows correct items and prices
- [ ] Shipping quotes are calculated (BigPost or fallback)
- [ ] Checkout form accepts customer details
- [ ] Redirects to Stripe checkout page
- [ ] Stripe shows correct amount in AUD
- [ ] Test card payment succeeds
- [ ] Redirects to success page
- [ ] Cart is cleared after successful payment

#### 🚚 **Shipping Integration Flow**
- [ ] Shipping quotes load correctly
- [ ] Multiple shipping options available
- [ ] Prices are in AUD
- [ ] Delivery estimates are shown
- [ ] Fallback rates work when BigPost is disabled

#### ❌ **Payment Failure Flow**
- [ ] Test with declined card (4000 0000 0000 0002)
- [ ] Shows appropriate error message
- [ ] Redirects to cancelled page
- [ ] Cart items are preserved

#### 🔍 **Data Validation**
- [ ] Check Stripe dashboard for test payments
- [ ] Verify correct amounts (in cents)
- [ ] Check metadata is included
- [ ] Verify customer email is captured

## 🐛 **Common Issues & Solutions**

### **"STRIPE_SECRET_KEY is undefined"**
```bash
# Check your .env.local file exists and has the key
echo $STRIPE_SECRET_KEY

# Make sure you're using the correct test key format:
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Restart your dev server after changing .env.local
npm run dev
```

### **"BigPost API not available"**
```bash
# Check if BigPost feature is enabled
NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING=true

# If you don't have BigPost API token, disable the feature:
NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING=false
# The system will use fallback shipping rates
```

### **"No such payment_intent"**
- This usually means the API key is wrong
- Make sure you're using the TEST key, not live key
- Restart your dev server after changing .env.local

### **CORS Errors**
- Make sure you're testing on localhost:3000
- Check your NEXT_PUBLIC_SITE_URL environment variable

### **Currency Issues**
- All prices should be in AUD (Australian Dollars)
- Check the API routes are using 'aud' as currency
- Verify amounts are converted to cents (multiply by 100)

## 📊 **Monitoring Test Payments**

### **Stripe Dashboard**
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Make sure you're in **Test mode**
3. Go to **Payments** to see test transactions
4. Check **Logs** for API call details

### **Browser Console**
- Open developer tools (F12)
- Check console for errors
- Look for network requests to `/api/create-checkout-session`

### **Server Logs**
- Check your terminal for server errors
- Look for Stripe API error messages
- Verify environment variables are loaded

## ⚡ **Quick Testing Checklist**

**Before Each Test:**
- [ ] Server is running (npm run dev)
- [ ] .env.local has correct test keys
- [ ] Browser cache is cleared
- [ ] Cart has items

**Test These Scenarios:**
- [ ] Successful payment with 4242 4242 4242 4242
- [ ] Declined payment with 4000 0000 0000 0002
- [ ] Cancel payment (click back button on Stripe page)
- [ ] Different product combinations
- [ ] Various cart totals

**After Each Test:**
- [ ] Check Stripe dashboard for payment record
- [ ] Verify user experience (success/error pages)
- [ ] Check browser network tab for API errors
- [ ] Clear cart and test again

## 🚀 **Ready for Production?**

Once all tests pass:

1. **Get Live Stripe Keys**
   - Complete Stripe account verification
   - Go to live mode in Stripe dashboard
   - Get live API keys

2. **Update Environment Variables**
   - Replace test keys with live keys
   - Update NEXT_PUBLIC_SITE_URL to your domain

3. **Final Testing**
   - Test with small real payment first
   - Verify webhook endpoints work
   - Check all email notifications

## 📞 **Need Help?**

If you encounter issues:

1. **Check Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
2. **Review Stripe Logs**: Dashboard → Developers → Logs
3. **Test with Different Cards**: Try multiple test card numbers
4. **Check Network Requests**: Browser dev tools → Network tab
