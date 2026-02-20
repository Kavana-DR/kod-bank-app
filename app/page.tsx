import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-[#081735] via-[#0A1F44] to-[#102C5C] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-white">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-md">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">KB</span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">KodBank Secure</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Secure Digital Banking For Everyday Finance</h1>
            <p className="mt-4 max-w-xl text-base text-gray-300 sm:text-lg">
              Manage accounts, move money instantly, and monitor your balance with enterprise-grade security and a
              modern banking experience.
            </p>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(5,12,30,0.45)] backdrop-blur-md sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">KodBank</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">Welcome Back</h2>
            <p className="mt-3 text-sm text-gray-300">Access your account securely and continue your banking journey.</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)]"
                href="/register"
              >
                Register
              </Link>
              <Link
                className="w-full rounded-lg border border-blue-400 px-5 py-3 text-center text-sm font-semibold text-blue-200 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)]"
                href="/login"
              >
                Login
              </Link>
            </div>

            <div className="mt-6 space-y-2 text-xs text-gray-300 sm:text-sm">
              <p>🔒 Protected with 256-bit SSL Encryption</p>
              <p>Trusted by 1M+ customers</p>
              <p>RBI Compliant | ISO Certified</p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(6,16,42,0.45)]">
            <p className="text-sm font-semibold text-blue-100">🔐 Bank-Level Security</p>
            <p className="mt-2 text-sm text-gray-300">Multi-layer protection and trusted standards for every transaction.</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(6,16,42,0.45)]">
            <p className="text-sm font-semibold text-blue-100">⚡ Instant Transfers</p>
            <p className="mt-2 text-sm text-gray-300">Send and receive funds in seconds with reliable transfer rails.</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(6,16,42,0.45)]">
            <p className="text-sm font-semibold text-blue-100">📊 Real-Time Account Insights</p>
            <p className="mt-2 text-sm text-gray-300">Track balances and activity with up-to-date account intelligence.</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(6,16,42,0.45)]">
            <p className="text-sm font-semibold text-blue-100">📱 Mobile Friendly</p>
            <p className="mt-2 text-sm text-gray-300">Responsive experience designed for desktop, tablet, and mobile.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
