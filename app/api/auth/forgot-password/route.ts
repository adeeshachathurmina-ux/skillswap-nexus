import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '').trim();
  const supabase = await createClient();
  if (!supabase) return NextResponse.redirect(new URL('/auth/forgot-password?sent=demo', request.url));
  const redirectTo = `${new URL(request.url).origin}/auth/callback?next=/auth/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) return NextResponse.redirect(new URL(`/auth/forgot-password?error=${encodeURIComponent(error.message)}`, request.url));
  return NextResponse.redirect(new URL('/auth/forgot-password?sent=1', request.url));
}
