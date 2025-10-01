#!/usr/bin/env node

/**
 * Environment Setup Script for Unwind Designs
 * This script creates the .env.local file with the provided API keys
 */

const fs = require('fs');
const path = require('path');

// Your API keys - Replace with your actual keys
const STRIPE_SECRET_KEY = 'sk_test_your_stripe_secret_key_here';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_stripe_publishable_key_here';
const BIGPOST_API_TOKEN = 'your_bigpost_api_token_here';

// Environment file content
const envContent = `# ===========================================
# UNWIND DESIGNS - PRODUCTION ENVIRONMENT
# ===========================================
# Server-only environment variables for Stripe and BigPost integration
# DO NOT commit this file to version control

# ===========================================
# STRIPE CONFIGURATION (AUD)
# ===========================================
# Stripe secret key for server-side operations
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}

# Stripe publishable key for client-side operations
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}

# Stripe webhook secret for verifying webhook signatures
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ===========================================
# BIGPOST SHIPPING API (AU)
# ===========================================
# BigPost API configuration for Australian shipping
BIGPOST_API_URL=https://api.bigpost.com.au
BIG_POST_API_TOKEN=${BIGPOST_API_TOKEN}

# ===========================================
# SITE CONFIGURATION
# ===========================================
# Base URL for the application
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ===========================================
# FEATURE FLAGS
# ===========================================
# Enable BigPost shipping integration
NEXT_PUBLIC_FEATURE_BIG_POST_SHIPPING=true

# Other feature flags
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

# ===========================================
# UPLOADTHING CONFIGURATION
# ===========================================
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# ===========================================
# NEXT.JS CONFIGURATION
# ===========================================
# NextAuth.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Animation Configuration
NEXT_PUBLIC_ENABLE_ANIMATIONS=true

# ===========================================
# OPTIONAL SERVICES
# ===========================================
# Database Configuration (if using a database)
# DATABASE_URL=your_database_connection_string_here

# Email Configuration (if using email services)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_email_password_here

# Redis Configuration (if using Redis for caching)
# REDIS_URL=redis://localhost:6379

# Google Analytics (optional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (optional, for error tracking)
# SENTRY_DSN=your_sentry_dsn_here

# Cloudinary (optional, for image optimization)
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
`;

// Create the .env.local file
const envPath = path.join(process.cwd(), '.env.local');

try {
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ .env.local file created successfully!');
  console.log('🔑 Stripe keys configured');
  console.log('🚚 BigPost API token configured');
  console.log('🎯 Feature flags enabled');
  console.log('');
  console.log('🚀 Ready to start development!');
  console.log('Run: npm run dev');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  process.exit(1);
}
