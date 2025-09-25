import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'

export function useSupabase() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test connection by trying to query the products table
        const { error } = await supabase
          .from('products')
          .select('id')
          .limit(1)

        if (error && error.code === 'PGRST116') {
          // Table doesn't exist, but connection is working
          setIsConnected(true)
          setError(null)
        } else if (error) {
          // Try a simple auth test as fallback
          const { error: authError } = await supabase.auth.getSession()
          if (authError) {
            setIsConnected(false)
            setError(error.message)
          } else {
            setIsConnected(true)
            setError(null)
          }
        } else {
          setIsConnected(true)
          setError(null)
        }
      } catch (err) {
        setIsConnected(false)
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    checkConnection()
  }, [])

  return {
    supabase,
    isConnected,
    error
  }
}

export { supabase }
