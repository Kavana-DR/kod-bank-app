"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-screen">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <section className="auth-card">
        <div className="flex items-center gap-3">
          <span className="brand-logo" aria-hidden>
            KB
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">Kodbank</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Trusted digital banking</p>
          </div>
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">Welcome back</h1>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />

          {error && <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>}

          <button className="auth-button" disabled={loading} type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
          <Link className="font-semibold text-sky-700 underline decoration-sky-400/80 dark:text-sky-300 dark:decoration-sky-300/80" href="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p className="mt-6 text-sm text-slate-700 dark:text-slate-300">
          Need an account?{" "}
          <Link className="font-semibold text-sky-700 underline decoration-sky-400/80 dark:text-sky-300 dark:decoration-sky-300/80" href="/register">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
