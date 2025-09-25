import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client for browser usage
export const createSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey)

// For use in client components
export const supabase = createSupabaseClient()

// Database types (will be generated from schema)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          email: string
          stripe_payment_intent_id: string | null
          payment_status: 'pending' | 'succeeded' | 'failed' | 'cancelled'
          order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          billing_address: any
          shipping_address: any
          totals: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          stripe_payment_intent_id?: string | null
          payment_status?: 'pending' | 'succeeded' | 'failed' | 'cancelled'
          order_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          billing_address: any
          shipping_address: any
          totals: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          stripe_payment_intent_id?: string | null
          payment_status?: 'pending' | 'succeeded' | 'failed' | 'cancelled'
          order_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          billing_address?: any
          shipping_address?: any
          totals?: any
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name: string
          product_handle: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_name: string
          product_handle: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          product_name?: string
          product_handle?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      shipments: {
        Row: {
          id: string
          order_id: string
          service_code: string
          bigpost_job_id: string | null
          consignment_number: string | null
          tracking_number: string | null
          label_url: string | null
          status: 'pending' | 'booked' | 'in_transit' | 'delivered' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          service_code: string
          bigpost_job_id?: string | null
          consignment_number?: string | null
          tracking_number?: string | null
          label_url?: string | null
          status?: 'pending' | 'booked' | 'in_transit' | 'delivered' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          service_code?: string
          bigpost_job_id?: string | null
          consignment_number?: string | null
          tracking_number?: string | null
          label_url?: string | null
          status?: 'pending' | 'booked' | 'in_transit' | 'delivered' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
