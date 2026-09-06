import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', ok: true });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  let error;
  if (body.action === 'save') {
    ({ error } = await supabase.from('saved_profiles').insert({ profile_id: user.id, saved_profile_id: body.profileId }));
  } else if (body.action === 'block') {
    ({ error } = await supabase.from('blocks').insert({ blocker_id: user.id, blocked_id: body.profileId }));
  } else {
    ({ error } = await supabase.from('reports').insert({ reporter_id: user.id, reported_profile_id: body.profileId, reason: body.reason || 'Unspecified', details: body.details || '' }));
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ mode: 'supabase', ok: true });
}
