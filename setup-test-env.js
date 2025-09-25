// Setup script for testing environment variables
const fs = require('fs')
const path = require('path')

console.log('🔧 Setting up test environment variables...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), 'env.example')

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local from env.example...')
  
  if (fs.existsSync(envExamplePath)) {
    const envExample = fs.readFileSync(envExamplePath, 'utf8')
    fs.writeFileSync(envPath, envExample)
    console.log('✅ .env.local created')
  } else {
    console.log('❌ env.example not found')
    process.exit(1)
  }
} else {
  console.log('✅ .env.local already exists')
}

// Load environment variables (simple approach without dotenv)
let envContent = ''
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8')
  // Simple env parsing
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim()
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
}

console.log('\n🔍 Checking required environment variables:')

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
  'SUPABASE_SERVICE_ROLE_KEY'
]

let missingVars = []

requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (!value || value.includes('your_') || value.includes('_here')) {
    missingVars.push(varName)
    console.log(`❌ ${varName}: ${value || 'NOT SET'}`)
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`)
  }
})

if (missingVars.length > 0) {
  console.log('\n⚠️  Missing or incomplete environment variables:')
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`)
  })
  
  console.log('\n📋 To fix this:')
  console.log('1. Open .env.local in your editor')
  console.log('2. Replace the placeholder values with your actual Supabase credentials')
  console.log('3. Get your Supabase credentials from: https://app.supabase.com/project/[your-project]/settings/api')
  console.log('\nExample:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
  console.log('SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
  
  console.log('\n🔄 After updating .env.local, run:')
  console.log('   node test-end-to-end.js')
  
  process.exit(1)
}

console.log('\n✅ All required environment variables are set!')
console.log('🚀 You can now run: node test-end-to-end.js')
