export default function ResetPasswordPage() {
  return <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
    <h1 className="font-display text-3xl font-bold">Choose a new password</h1>
    <form action="/api/auth/reset-password" method="post" className="mt-8 space-y-4">
      <input required type="password" name="password" minLength={8} placeholder="New password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      <input required type="password" name="confirmPassword" minLength={8} placeholder="Confirm new password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-mint" />
      <button className="w-full rounded-full bg-violet px-5 py-3 font-semibold text-white">Update password</button>
    </form>
  </section>;
}
