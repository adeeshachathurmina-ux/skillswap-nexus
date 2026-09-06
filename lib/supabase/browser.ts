import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from './env';

let client: SupabaseClient | undefined;

export function createClient() {
  if (!isSupabaseConfigured) return null;
  client ??= createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  return client;
}
