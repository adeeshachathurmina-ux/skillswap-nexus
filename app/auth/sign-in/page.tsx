import Link from 'next/link';

export default function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  return <AuthForm title="Welcome back" action="/api/auth/sign-in" submit="Sign in" searchParams={searchParams}>
    <p className="text-sm text-white/60">New here? <Link className="text-mint" href="/auth/sign-up">Create an account</Link></p>
    <Link className="text-sm text-mint" href="/auth/forgot-password">Forgot your password?</Link>
  </AuthForm>;
}

async function AuthForm({ title, action, submit, children, searchParams }: { title: string; action: string; submit: string; children: React.ReactNode; searchParams: Promise<{ error?: string; next?: string }> }) {
  const params = await searchParams;
  return <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
    <h1 className="font-display text-3xl font-bold">{title}</h1>
    <p className="mt-2 text-white/60">Share what you know. Learn what you need.</p>
    <form action={action} method="post" className="mt-8 space-y-4">
      <input required type="email" name="email" placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      <input required type="password" name="password" placeholder="Password" minLength={8} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      <input type="hidden" name="next" value={params.next ?? '/dashboard'} />
      {params.error && <p className="text-sm text-coral">{params.error}</p>}
      <button className="w-full rounded-full bg-violet px-5 py-3 font-semibold text-white">{submit}</button>
    </form>
    <div className="mt-6 space-y-3">{children}</div>
  </section>;
}
