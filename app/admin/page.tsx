import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminRoute from '@/components/routes/admin-route';
export default async function AdminPage() { const supabase = await createClient(); if (!supabase) return <AdminRoute />; const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect('/auth/sign-in?next=/admin'); const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single(); if (!profile?.is_admin) redirect('/dashboard'); return <AdminRoute />; }
