import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export function GET() {
  return NextResponse.json({ ok: true, mode: isSupabaseConfigured ? 'supabase' : 'demo' });
}
