import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', conversations: [], messages: [], unread: 0 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { data: memberships, error } = await supabase.from('conversation_members').select('conversation_id, last_read_at, conversations(*, messages(*))').eq('profile_id', user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const unread = (memberships ?? []).reduce((count, item: any) => count + (item.conversations?.messages ?? []).filter((message: any) => message.sender_id !== user.id && (!item.last_read_at || message.created_at > item.last_read_at)).length, 0);
  return NextResponse.json({ mode: 'supabase', conversations: memberships ?? [], unread });
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', message: { id: crypto.randomUUID(), body: body.body, created_at: new Date().toISOString() } }, { status: 201 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { data: member } = await supabase.from('conversation_members').select('conversation_id').eq('conversation_id', body.conversationId).eq('profile_id', user.id).single();
  if (!member) return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
  const bodyText = String(body.body || '').trim();
  if (!bodyText && !body.attachmentPath) return NextResponse.json({ error: 'Message body or attachment required' }, { status: 400 });
  const { data, error } = await supabase.from('messages').insert({ conversation_id: body.conversationId, sender_id: user.id, body: bodyText, attachment_path: body.attachmentPath || null }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ mode: 'supabase', message: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', ok: true });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { error } = await supabase.from('conversation_members').update({ last_read_at: new Date().toISOString() }).eq('conversation_id', body.conversationId).eq('profile_id', user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ mode: 'supabase', ok: true });
}
