import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', challenges: [] });
  const { data, error } = await supabase.from('challenges').select('*, challenge_members(*)').eq('status', 'active').order('starts_at');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ mode: 'supabase', challenges: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', joined: true });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { error } = await supabase.from('challenge_members').upsert({ challenge_id: body.challengeId, profile_id: user.id });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ mode: 'supabase', joined: true });
}
