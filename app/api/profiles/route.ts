import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { people } from '@/lib/data';

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', profiles: people });
  const { data, error } = await supabase.from('profiles').select('*, profile_skills(skill_id, direction, level, skills(name, category))').eq('onboarding_complete', true).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ mode: 'supabase', profiles: data });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', profile: body });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { skills, ...profile } = body;
  const { data, error } = await supabase.from('profiles').update({ ...profile, onboarding_complete: true }).eq('id', user.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (Array.isArray(skills)) {
    await supabase.from('profile_skills').delete().eq('profile_id', user.id);
    const rows = skills.filter((skill: any) => skill.skillId && ['teach', 'learn'].includes(skill.direction)).map((skill: any) => ({ profile_id: user.id, skill_id: skill.skillId, direction: skill.direction, level: skill.level || 'Intermediate' }));
    if (rows.length) await supabase.from('profile_skills').insert(rows);
  }
  return NextResponse.json({ mode: 'supabase', profile: data });
}
