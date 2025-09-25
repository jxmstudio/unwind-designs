import { supabaseAdmin } from '@/lib/supabase/server'

export async function upsertProfile(userId: string, email: string, fullName?: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        email,
        full_name: fullName || null,
        updated_at: new Date().toISOString()
      } as any)
      .select()
      .single()

    if (error) {
      console.error('Error upserting profile:', error)
      throw new Error(`Failed to create/update profile: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in upsertProfile:', error)
    throw error
  }
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in getProfile:', error)
    throw error
  }
}
