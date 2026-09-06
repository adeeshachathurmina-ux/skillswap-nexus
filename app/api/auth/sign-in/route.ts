import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '');
  const password = String(form.get('password') || '');
  const next = String(form.get('next') || '/dashboard');
  const supabase = await createClient();
  if (!supabase) return NextResponse.redirect(new URL('/?mode=demo&auth=signin', request.url));
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return NextResponse.redirect(new URL(`/auth/sign-in?error=${encodeURIComponent(error.message)}`, request.url));
  return NextResponse.redirect(new URL(isSupabaseConfigured ? next : '/', request.url));
}
