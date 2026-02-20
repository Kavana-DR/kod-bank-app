import Link from "next/link";

export default function Home() {
  return (
    <main className="auth-screen">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <section className="auth-card w-full max-w-2xl text-center">
        <div className="mx-auto mb-4 flex justify-center">
          <span className="brand-logo brand-logo-animated" aria-hidden>
            KB
          </span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">Kodbank</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100 sm:text-4xl">Secure Digital Banking</h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Register, login with JWT authentication, and check your balance on a protected dashboard.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="auth-button text-center sm:max-w-48" href="/register">
            Register
          </Link>
          <Link
            className="auth-button text-center sm:max-w-48"
            href="/login">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
