'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/browser';

export function useRealtimeMessages(conversationId: string | undefined, onMessage: (message: unknown) => void) {
  useEffect(() => {
    const supabase = createClient();
    if (!supabase || !conversationId) return;
    const channel = supabase.channel(`conversation:${conversationId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) => onMessage(payload.new)).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [conversationId, onMessage]);
}
