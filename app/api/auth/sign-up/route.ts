import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const password = String(form.get('password') || '');
  const supabase = await createClient();
  if (!supabase) return NextResponse.redirect(new URL('/?mode=demo&auth=signup', request.url));
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name }, emailRedirectTo: `${new URL(request.url).origin}/auth/callback` },
  });
  if (error) return NextResponse.redirect(new URL(`/auth/sign-up?error=${encodeURIComponent(error.message)}`, request.url));
  if (!data.session) return NextResponse.redirect(new URL('/auth/sign-in?confirmed=check-email', request.url));
  return NextResponse.redirect(new URL('/onboarding', request.url));
}
