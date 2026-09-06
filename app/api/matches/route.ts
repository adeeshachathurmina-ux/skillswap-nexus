import { NextResponse } from 'next/server';
import { people } from '@/lib/data';
import { reciprocalMatchScore } from '@/lib/matching';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', people, scoring: 'reciprocal teach/learn overlap plus language, location, and session compatibility' });
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profiles, error } = await supabase.from('profiles').select('id,username,full_name,bio,city,district,languages,session_type,profile_skills(direction,skills(name))').eq('onboarding_complete', true);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const current = profiles?.find((profile: any) => profile.id === user?.id) as any;
  const currentProfile = current ? { teach: current.profile_skills.filter((item: any) => item.direction === 'teach').map((item: any) => item.skills.name), learn: current.profile_skills.filter((item: any) => item.direction === 'learn').map((item: any) => item.skills.name), languages: current.languages, city: current.city, sessionType: current.session_type } : null;
  const matches = (profiles ?? []).filter((profile: any) => profile.id !== user?.id && !profile.is_blocked).map((profile: any) => ({ ...profile, match: currentProfile ? reciprocalMatchScore(currentProfile, { teach: profile.profile_skills.filter((item: any) => item.direction === 'teach').map((item: any) => item.skills.name), learn: profile.profile_skills.filter((item: any) => item.direction === 'learn').map((item: any) => item.skills.name), languages: profile.languages, city: profile.city, sessionType: profile.session_type }) : null })).sort((left: any, right: any) => (right.match ?? 0) - (left.match ?? 0));
  return NextResponse.json({ mode: 'supabase', people: matches, scoring: 'reciprocal teach/learn overlap plus language, location, and session compatibility' });
}
