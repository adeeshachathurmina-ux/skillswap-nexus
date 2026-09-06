import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import OnboardingForm from './onboarding-form';

export default async function OnboardingPage() {
  const supabase = await createClient();
  if (!supabase) return <OnboardingForm demo />;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/sign-in?next=/onboarding');
  const { data: skills } = await supabase.from('skills').select('id,name,category').order('category').order('name');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return <OnboardingForm skills={skills ?? []} profile={profile} />;
}
