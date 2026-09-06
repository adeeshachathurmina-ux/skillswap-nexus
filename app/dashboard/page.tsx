import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  let profile: any = null;
  if (supabase) { const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect('/auth/sign-in?next=/dashboard'); profile = (await supabase.from('profiles').select('*').eq('id', user!.id).single()).data; }
  return <main className="min-h-screen bg-gradient-to-b from-ink to-violet/10 px-5 py-12 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm text-mint">Your learning space</p><h1 className="mt-2 font-display text-5xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}</h1><p className="mt-3 text-white/60">Track requests, conversations, and your next session.</p><div className="mt-10 grid gap-5 md:grid-cols-3"><Link href="/requests" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-mint/40"><p className="text-sm text-white/50">Swap workflow</p><h2 className="mt-2 font-display text-2xl font-bold">Requests</h2><p className="mt-3 text-white/60">Accept, schedule, complete, or review exchanges.</p></Link><Link href="/messages" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-mint/40"><p className="text-sm text-white/50">Stay connected</p><h2 className="mt-2 font-display text-2xl font-bold">Messages</h2><p className="mt-3 text-white/60">Continue conversations with your partners.</p></Link><Link href="/onboarding" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-mint/40"><p className="text-sm text-white/50">Profile</p><h2 className="mt-2 font-display text-2xl font-bold">Edit profile</h2><p className="mt-3 text-white/60">Keep your skills and availability current.</p></Link></div></div></main>;
}
