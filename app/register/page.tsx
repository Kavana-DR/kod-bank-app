"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      router.push("/login");
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
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">Kodbank</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">Create account</h1>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="input-with-icon">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="8" r="4" />
            </svg>
            <input
              className="auth-input"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-with-icon">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 7 9-7" />
            </svg>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-with-icon">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-with-icon">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h4l2 5-2 1a12 12 0 0 0 4 4l1-2 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2h2Z" />
            </svg>
            <input
              className="auth-input"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button className="auth-button" disabled={loading} type="submit">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-300">
          Already have an account?{" "}
          <Link className="font-semibold text-blue-200 underline decoration-blue-300/80 hover:text-white" href="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
