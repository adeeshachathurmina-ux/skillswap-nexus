import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createDemoRequest, demoPersonExists, listDemoRequests, updateDemoRequest, type DemoRequest } from '@/lib/demo-store';
import { isSupabaseConfigured } from '@/lib/supabase/env';

const transitions: Record<DemoRequest['status'], DemoRequest['status'][]> = { pending: ['accepted', 'declined', 'cancelled'], accepted: ['scheduled', 'cancelled'], declined: [], scheduled: ['scheduled', 'in_progress', 'cancelled'], in_progress: ['completed', 'cancelled'], completed: [], cancelled: [] };

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = await createClient();
  if (!supabase) {
    const personId = Number(body.personId);
    if (!demoPersonExists(personId)) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    return NextResponse.json({ mode: 'demo', request: createDemoRequest(personId, String(body.message || body.goal || 'Skill exchange')) }, { status: 201 });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const receiverId = String(body.receiverId || '');
  const goal = String(body.goal || body.message || '').trim();
  if (!receiverId || !goal) return NextResponse.json({ error: 'receiverId and goal are required' }, { status: 400 });
  const { data: request, error } = await supabase.from('swap_requests').insert({ sender_id: user.id, receiver_id: receiverId, goal, session_type: body.sessionType || 'Online', proposed_at: body.proposedAt || null }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const { data: conversation } = await supabase.from('conversations').insert({ request_id: request.id }).select().single();
  if (conversation) await supabase.from('conversation_members').insert([{ conversation_id: conversation.id, profile_id: user.id }, { conversation_id: conversation.id, profile_id: receiverId }]);
  await supabase.from('notifications').insert({ profile_id: receiverId, kind: 'request', title: 'New skill-swap request', body: goal, link: `/requests/${request.id}` });
  return NextResponse.json({ mode: 'supabase', request }, { status: 201 });
}

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', requests: listDemoRequests(), history: true });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { data, error } = await supabase.from('swap_requests').select('*, request_events(*)').or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ mode: isSupabaseConfigured ? 'supabase' : 'demo', requests: data, history: true });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const nextStatus = body.status as DemoRequest['status'];
  if (!Object.keys(transitions).includes(nextStatus)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  const supabase = await createClient();
  if (!supabase) {
    const current = listDemoRequests().find((item) => item.id === body.id);
    if (!current || !transitions[current.status].includes(nextStatus)) return NextResponse.json({ error: 'Invalid status transition' }, { status: 409 });
    return NextResponse.json({ mode: 'demo', request: updateDemoRequest(body.id, nextStatus) });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { data: current, error: readError } = await supabase.from('swap_requests').select('*').eq('id', body.id).single();
  if (readError || !current || ![current.sender_id, current.receiver_id].includes(user.id)) return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  if (!transitions[current.status as DemoRequest['status']].includes(nextStatus)) return NextResponse.json({ error: 'Invalid status transition' }, { status: 409 });
  const { data, error } = await supabase.from('swap_requests').update({ status: nextStatus, scheduled_at: body.scheduledAt || current.scheduled_at }).eq('id', body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const notifyId = current.sender_id === user.id ? current.receiver_id : current.sender_id;
  await supabase.from('notifications').insert({ profile_id: notifyId, kind: 'request', title: `Request ${nextStatus}`, body: `Your skill-swap request is now ${nextStatus}.`, link: `/requests/${body.id}` });
  return NextResponse.json({ mode: 'supabase', request: data });
}
