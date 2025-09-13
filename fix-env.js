#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Your API keys - keeping them on single lines to avoid truncation
const STRIPE_SECRET_KEY = 'sk_test_51S3Bs4Ce9f7mPhgDGzA9s9VlNfouMm2SldTkuCWbGVs1sfhorgwKm45yDUpFAvBLHjl5g9eKADJDjIk0EfzoUTwE00qY3Gm7F';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51S3Bs4Ce9f7mPhgDk306d1byf1DZLL804BsmIMHcnI87TJKKLcpanYmvE6vLd68RxTXXkahTe2FmRe6xL6Ba6dym00MUUr4XAf';
const BIGPOST_API_TOKEN = 'ty4DNjHlmkmHe96p39iv5Q';

// Create the .env.local file with proper formatting
const envContent = `# Stripe Configuration (AUD)
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# BigPost Shipping API (AU)
BIGPOST_API_URL=https://api.bigpost.com.au
BIG_POST_API_TOKEN=${BIGPOST_API_TOKEN}

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING=true
NEXT_PUBLIC_FEATURE_MOTION_BOOKING=false
NEXT_PUBLIC_FEATURE_VIDEO_PLAYER=true
NEXT_PUBLIC_FEATURE_UPSELLS=true
NEXT_PUBLIC_FEATURE_FLAT_PACK_CONFIGURATOR=false
NEXT_PUBLIC_FEATURE_ENHANCED_GALLERY=true
NEXT_PUBLIC_FEATURE_TEXT_CLARITY=true
NEXT_PUBLIC_FEATURE_REDUCED_BLUR=true
NEXT_PUBLIC_FEATURE_SMOOTH_ANIMATIONS=true
NEXT_PUBLIC_FEATURE_HIGH_CONTRAST=false

# UploadThing Configuration
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# NextAuth.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Animation Configuration
NEXT_PUBLIC_ENABLE_ANIMATIONS=true
`;

// Write the file
const envPath = path.join(process.cwd(), '.env.local');
fs.writeFileSync(envPath, envContent, 'utf8');

console.log('✅ .env.local file created successfully!');
console.log('🔑 Stripe keys configured');
console.log('🚚 BigPost API token configured');
console.log('🎯 Feature flags enabled');
console.log('');
console.log('🚀 Ready to start development!');
console.log('Run: npm run dev');
