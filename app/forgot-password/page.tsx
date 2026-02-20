"use client";

import Link from "next/link";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setResetLink("");
    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as {
        message?: string;
        resetLink?: string;
        error?: string;
      };

      if (!response.ok) {
        setError(data.error || "Failed to generate reset link.");
        return;
      }

      setMessage(data.message || "Reset link generated");
      setResetLink(data.resetLink || "");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/90">Kodbank</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Forgot password</h1>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          />

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}

          {resetLink && (
            <p className="break-all rounded-lg bg-white/10 p-3 text-sm text-cyan-200">
              <span className="font-semibold text-cyan-100">Reset Link:</span>{" "}
              <Link className="underline" href={resetLink}>
                {resetLink}
              </Link>
            </p>
          )}

          <button className="auth-button" disabled={loading} type="submit">
            {loading ? "Generating..." : "Generate Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-sm text-emerald-100/90">
          Back to{" "}
          <Link className="font-semibold text-white underline decoration-emerald-300/70" href="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
