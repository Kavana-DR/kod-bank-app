import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <section className="relative z-10 max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-200/90">Kodbank</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Secure Digital Banking</h1>
        <p className="mt-4 text-base text-slate-200/90">
          Register, login with JWT authentication, and check your balance on a protected dashboard.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="auth-button text-center" href="/register">
            Register
          </Link>
          <Link
            className="rounded-xl border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            href="/login"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
