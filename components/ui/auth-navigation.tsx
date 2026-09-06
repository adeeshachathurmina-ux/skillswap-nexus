'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';

export function AuthNavigation({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setEmail(session?.user?.email ?? null));
    return () => data.subscription.unsubscribe();
  }, []);
  if (email) return <div className="flex items-center gap-3"><Link href="/dashboard" className="text-sm text-white/70 hover:text-white">Dashboard</Link><Link href="/auth/sign-out" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">Sign out</Link></div>;
  return <div className="flex items-center gap-3"><Link href="/auth/sign-in" className={`text-sm text-white/70 hover:text-white ${compact ? '' : 'hidden sm:inline'}`}>Sign in</Link><Link href="/auth/sign-up" className="rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white">Get started</Link></div>;
}
