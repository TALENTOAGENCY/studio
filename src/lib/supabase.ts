import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// To avoid initializing the client multiple times in the same request lifecycle.
let supabase: SupabaseClient | undefined;

export const getSupabase = () => {
  if (supabase) {
    return supabase;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing. Please check your environment variables and ensure they are available in your deployment environment.');
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
};
