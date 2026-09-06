import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { people } from '@/lib/data';
import { ProfileActions } from '@/components/profile-actions';

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();
  const profile = supabase ? (await supabase.from('profiles').select('*, profile_skills(direction, level, skills(name, category)), reviews_received:reviews!reviewee_id(rating)').eq('username', username).single()).data : people.find((person) => person.name.toLowerCase().replace(/\s+/g, '') === username);
  if (!profile) notFound();
  const name = 'full_name' in profile ? profile.full_name : profile.name;
  const reviews = 'reviews_received' in profile ? profile.reviews_received ?? [] : [];
  const rating = reviews.length ? (reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length).toFixed(1) : ('rating' in profile ? profile.rating : 'New');
  return <main className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/10 px-5 py-16 text-white"><article className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8"><p className="text-sm text-mint">Public skill profile</p><h1 className="mt-2 font-display text-4xl font-bold">{name}</h1><p className="mt-4 text-white/70">{'bio' in profile ? profile.bio : profile.bio}</p><div className="mt-6 flex gap-6 text-sm text-white/60"><span>Trust rating: <strong className="text-mint">{rating}</strong></span><span>{reviews.length || ('reviews' in profile ? profile.reviews : 0)} reviews</span></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-violet/15 p-5"><p className="text-sm text-white/60">Teaching</p><p className="mt-2 font-semibold">{'teach' in profile ? profile.teach : (profile.profile_skills ?? []).filter((item: any) => item.direction === 'teach').map((item: any) => item.skills?.name).join(', ')}</p></div><div className="rounded-2xl bg-mint/10 p-5"><p className="text-sm text-white/60">Learning</p><p className="mt-2 font-semibold">{'learn' in profile ? profile.learn : (profile.profile_skills ?? []).filter((item: any) => item.direction === 'learn').map((item: any) => item.skills?.name).join(', ')}</p></div></div>{'id' in profile && <ProfileActions profileId={profile.id} />}</article></main>;
}
