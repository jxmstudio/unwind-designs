#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envContent = `# ===========================================
# STRIPE CONFIGURATION (AUD) - REQUIRED
# ===========================================
# Get these from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ===========================================
# SUPABASE CONFIGURATION - REQUIRED
# ===========================================
# Get these from https://supabase.com/dashboard/project/[your-project]/settings/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ===========================================
# BIGPOST SHIPPING API (AU) - OPTIONAL
# ===========================================
# Get this from BigPost API - will use fallback rates if not provided
BIGPOST_API_URL=https://api.bigpost.com.au
BIG_POST_API_TOKEN=your_bigpost_api_token_here

# ===========================================
# SITE CONFIGURATION
# ===========================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ===========================================
# FEATURE FLAGS
# ===========================================
NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING=true
NEXT_PUBLIC_FEATURE_MOTION_BOOKING=false
NEXT_PUBLIC_FEATURE_VIDEO_PLAYER=true
NEXT_PUBLIC_FEATURE_UPSELLS=true
NEXT_PUBLIC_FEATURE_FLAT_PACK_CONFIGURATOR=false
NEXT_PUBLIC_FEATURE_ENHANCED_GALLERY=true

# Animation and Text Clarity Flags
NEXT_PUBLIC_FEATURE_TEXT_CLARITY=true
NEXT_PUBLIC_FEATURE_REDUCED_BLUR=true
NEXT_PUBLIC_FEATURE_SMOOTH_ANIMATIONS=true
NEXT_PUBLIC_FEATURE_HIGH_CONTRAST=false

# NextAuth.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Animation Configuration
NEXT_PUBLIC_ENABLE_ANIMATIONS=true
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Backing up to .env.local.backup');
    fs.copyFileSync(envPath, envPath + '.backup');
  }

  // Write the new .env.local file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('');
  console.log('🔧 Next steps:');
  console.log('1. Get your Stripe keys from: https://dashboard.stripe.com/test/apikeys');
  console.log('2. Get your Supabase keys from: https://supabase.com/dashboard');
  console.log('3. Replace the placeholder values in .env.local with your actual keys');
  console.log('4. Run: npm run dev');
  console.log('');
  console.log('📝 Required keys to replace:');
  console.log('   - STRIPE_SECRET_KEY');
  console.log('   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  console.log('   - STRIPE_WEBHOOK_SECRET');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY');
  console.log('');
  console.log('🚀 Your cart and checkout system will work with fallback shipping rates');
  console.log('   even without BigPost API keys!');

} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  process.exit(1);
}
