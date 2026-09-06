import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', review: { ...body, created_at: new Date().toISOString() } }, { status: 201 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { data: swap } = await supabase.from('swap_requests').select('sender_id, receiver_id, status').eq('id', body.requestId).single();
  if (!swap || swap.status !== 'completed' || ![swap.sender_id, swap.receiver_id].includes(user.id)) return NextResponse.json({ error: 'Reviews are available only after a completed swap.' }, { status: 403 });
  const revieweeId = user.id === swap.sender_id ? swap.receiver_id : swap.sender_id;
  const { data, error } = await supabase.from('reviews').insert({ request_id: body.requestId, reviewer_id: user.id, reviewee_id: revieweeId, rating: body.rating, body: body.body || '' }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ mode: 'supabase', review: data }, { status: 201 });
}
