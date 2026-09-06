import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ mode: 'demo', path: `${body.bucket || 'avatars'}/demo-${Date.now()}-${body.filename}` });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const bucket = body.bucket === 'message-attachments' ? 'message-attachments' : 'avatars';
  const path = `${user.id}/${crypto.randomUUID()}-${String(body.filename || 'upload').replace(/[^a-zA-Z0-9._-]/g, '-')}`;
  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ mode: 'supabase', bucket, path, token: data.token });
}
