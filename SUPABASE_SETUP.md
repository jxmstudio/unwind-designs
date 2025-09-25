# Supabase Setup for Local Development

This document outlines the Supabase integration setup for the Unwind Designs Next.js project.

## Files Created

### 1. Environment Configuration
- **Updated `env.example`** - Added Supabase environment variables template
- **Create `.env.local`** - Add your actual Supabase credentials (not tracked in git)

### 2. Supabase Client Configuration
- **`src/lib/supabase.ts`** - Main Supabase client configuration
  - `supabase` - Client-side client with anonymous key
  - `supabaseAdmin` - Server-side client with service role key

### 3. API Routes
- **`src/app/api/supabase/health/route.ts`** - Health check endpoints
  - `GET /api/supabase/health` - Test client connection
  - `POST /api/supabase/health` - Test admin connection

### 4. React Hooks
- **`src/hooks/useSupabase.ts`** - React hook for Supabase integration
  - Provides connection status and error handling
  - Exports the supabase client for use in components

### 5. Test Page
- **`src/app/supabase-test/page.tsx`** - Test page to verify Supabase setup
  - Visual connection status indicators
  - Test buttons for both client and admin connections
  - Environment variable validation
  - Setup instructions

## Environment Variables Required

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Getting Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Testing the Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/supabase-test`
3. Check the connection status indicators
4. Test both client and admin connections using the test buttons

## Usage in Your Application

### Client-Side Usage
```tsx
import { useSupabase } from '@/hooks/useSupabase'

function MyComponent() {
  const { supabase, isConnected, error } = useSupabase()
  
  if (!isConnected) {
    return <div>Connecting to database...</div>
  }
  
  // Use supabase client for database operations
}
```

### Server-Side Usage
```tsx
import { supabase, supabaseAdmin } from '@/lib/supabase'

// In API routes or server components
export async function GET() {
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  return Response.json({ data, error })
}
```

## Health Check Endpoints

- **GET** `/api/supabase/health` - Test client connection
- **POST** `/api/supabase/health` - Test admin connection

Both endpoints return JSON with connection status and any errors.

## Next Steps

1. Set up your Supabase project and add the environment variables
2. Create your database schema and tables
3. Set up Row Level Security (RLS) policies
4. Implement authentication if needed
5. Add your business logic using the Supabase client

## Troubleshooting

- **Connection errors**: Verify your environment variables are correct
- **CORS issues**: Ensure your Supabase project allows your domain
- **RLS errors**: Check your Row Level Security policies
- **Type errors**: Generate TypeScript types from your Supabase schema

For more information, visit the [Supabase documentation](https://supabase.com/docs).
