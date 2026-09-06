import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function SignOutPage() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect('/');
}
