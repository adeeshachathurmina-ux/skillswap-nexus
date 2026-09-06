import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-ink px-5 py-12 text-white">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-10 block text-center font-display text-2xl font-bold">
          SkillSwap <span className="text-mint">LK</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
