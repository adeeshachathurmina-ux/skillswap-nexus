import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', rooms: [] });
  const { data, error } = await supabase.from('rooms').select('*, room_members(*)').order('starts_at');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ mode: 'supabase', rooms: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', room: body }, { status: 201 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { data: room, error } = await supabase.from('rooms').insert({ ...body, host_id: user.id }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await supabase.from('room_members').insert({ room_id: room.id, profile_id: user.id });
  return NextResponse.json({ mode: 'supabase', room }, { status: 201 });
}
