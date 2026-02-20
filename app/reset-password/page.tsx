"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      setMessage(data.message || "Password reset successful");
      setNewPassword("");
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
        <h1 className="mt-2 text-3xl font-semibold text-white">Reset password</h1>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
          />

          {!token && <p className="text-sm text-rose-300">Missing reset token.</p>}
          {error && <p className="text-sm text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}

          <button className="auth-button" disabled={loading || !token} type="submit">
            {loading ? "Resetting..." : "Reset Password"}
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
