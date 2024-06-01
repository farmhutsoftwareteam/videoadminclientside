import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL // Replace with your Supabase project URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Replace with your Supabase anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase