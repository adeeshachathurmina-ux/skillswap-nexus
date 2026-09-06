import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get('password') || '');
  const confirmPassword = String(form.get('confirmPassword') || '');
  if (password !== confirmPassword) return NextResponse.redirect(new URL('/auth/reset-password?error=password-mismatch', request.url));
  const supabase = await createClient();
  if (!supabase) return NextResponse.redirect(new URL('/auth/sign-in?reset=demo', request.url));
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return NextResponse.redirect(new URL(`/auth/reset-password?error=${encodeURIComponent(error.message)}`, request.url));
  return NextResponse.redirect(new URL('/auth/sign-in?reset=1', request.url));
}
