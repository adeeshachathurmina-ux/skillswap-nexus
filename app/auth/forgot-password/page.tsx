import Link from 'next/link';

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const params = await searchParams;
  return <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
    <h1 className="font-display text-3xl font-bold">Reset your password</h1>
    <p className="mt-2 text-white/60">Enter your email and we will send a secure reset link.</p>
    <form action="/api/auth/forgot-password" method="post" className="mt-8 space-y-4">
      <input required type="email" name="email" placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      {params.error && <p className="text-sm text-coral">{params.error}</p>}
      {params.sent && <p className="text-sm text-mint">Check your email for the reset link.</p>}
      <button className="w-full rounded-full bg-violet px-5 py-3 font-semibold text-white">Send reset link</button>
    </form>
    <Link className="mt-6 block text-sm text-mint" href="/auth/sign-in">Back to sign in</Link>
  </section>;
}
