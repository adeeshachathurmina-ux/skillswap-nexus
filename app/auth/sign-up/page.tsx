import Link from 'next/link';

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
    <h1 className="font-display text-3xl font-bold">Create your account</h1>
    <p className="mt-2 text-white/60">Join a respectful community of teachers and learners.</p>
    <form action="/api/auth/sign-up" method="post" className="mt-8 space-y-4">
      <input required name="name" placeholder="Full name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      <input required type="email" name="email" placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      <input required type="password" name="password" placeholder="Password (8+ characters)" minLength={8} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      {params.error && <p className="text-sm text-coral">{params.error}</p>}
      <button className="w-full rounded-full bg-violet px-5 py-3 font-semibold text-white">Create account</button>
    </form>
    <p className="mt-6 text-sm text-white/60">Already registered? <Link className="text-mint" href="/auth/sign-in">Sign in</Link></p>
  </section>;
}
