'use client';
import { useEffect, useState } from 'react';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [roomName, setRoomName] = useState('');
  const load = async () => {
    try {
      const [challengeResponse, roomResponse] = await Promise.all([fetch('/api/challenges'), fetch('/api/rooms')]);
      if (!challengeResponse.ok || !roomResponse.ok) throw new Error();
      const challengeData = await challengeResponse.json();
      const roomData = await roomResponse.json();
      setChallenges(challengeData.challenges ?? []);
      setRooms(roomData.rooms ?? []);
      setState('ready');
    } catch { setState('error'); }
  };
  useEffect(() => { void load(); }, []);
  const join = async (id: string) => { await fetch('/api/challenges', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ challengeId: id }) }); };
  const createRoom = async () => { if (!roomName.trim()) return; await fetch('/api/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: roomName, description: 'A peer learning room' }) }); setRoomName(''); await load(); };
  if (state === 'loading') return <main className="min-h-screen bg-ink p-8"><div className="mx-auto h-72 max-w-6xl animate-pulse rounded-3xl bg-white/5" /></main>;
  if (state === 'error') return <main className="min-h-screen bg-ink p-12 text-center text-coral">Challenges and rooms could not load. <button className="underline" onClick={() => void load()}>Try again</button></main>;
  return <main className="min-h-screen bg-gradient-to-b from-ink to-violet/10 px-5 py-12 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm text-mint">Learn together</p><h1 className="mt-2 font-display text-5xl font-bold">Challenges & rooms</h1><section className="mt-10"><h2 className="font-display text-2xl font-bold">Active challenges</h2>{!challenges.length && <p className="mt-4 rounded-2xl border border-dashed border-white/15 p-8 text-white/50">No active challenges yet.</p>}<div className="mt-5 grid gap-5 md:grid-cols-3">{challenges.map((item) => <article key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6"><span className="text-4xl">✦</span><h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3><p className="mt-2 text-white/60">{item.description}</p><button onClick={() => void join(item.id)} className="mt-6 rounded-full bg-mint px-5 py-3 font-semibold text-ink">Join challenge</button></article>)}</div></section><section className="mt-12"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="font-display text-2xl font-bold">Peer learning rooms</h2><div className="flex gap-2"><input aria-label="Room name" value={roomName} onChange={(event) => setRoomName(event.target.value)} placeholder="New room name" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white" /><button onClick={() => void createRoom()} className="rounded-full bg-violet px-4 py-2 font-semibold">Create room</button></div></div>{!rooms.length && <p className="mt-4 rounded-2xl border border-dashed border-white/15 p-8 text-white/50">No rooms yet. Start one for a shared learning goal.</p>}<div className="mt-5 grid gap-5 md:grid-cols-3">{rooms.map((room) => <article key={room.id} className="rounded-3xl border border-white/10 bg-white/5 p-6"><h3 className="font-display text-xl font-bold">{room.name}</h3><p className="mt-2 text-white/60">{room.description}</p><p className="mt-4 text-xs text-white/40">{room.room_members?.length ?? 0} members</p></article>)}</div></section></div></main>;
}
