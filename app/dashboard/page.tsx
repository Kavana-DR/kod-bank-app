"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        delay: `${(index % 12) * 0.4}s`,
        duration: `${5 + (index % 5)}s`,
      })),
    []
  );

  const checkBalance = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/balance", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("");
        setError(data.error || "Unable to fetch balance.");

        if (response.status === 401) {
          router.push("/login");
        }

        return;
      }

      setMessage(data.message);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#031b24] px-4 py-12">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <div className="pointer-events-none absolute inset-0">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="confetti"
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-200/90">Kodbank Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold">Banking at a glance</h1>
        <p className="mt-2 text-teal-100/90">
          Click below to securely verify your JWT token and fetch the latest balance.
        </p>

        <div className="mt-8">
          <button className="auth-button" onClick={checkBalance} disabled={loading}>
            {loading ? "Checking..." : "Check Balance"}
          </button>
        </div>

        {message && <p className="mt-6 rounded-xl bg-emerald-500/25 p-4 text-emerald-100">{message}</p>}
        {error && <p className="mt-6 rounded-xl bg-rose-500/20 p-4 text-rose-100">{error}</p>}
      </section>
    </main>
  );
}
