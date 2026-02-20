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
    <main className="auth-screen">
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

      <section className="auth-card dashboard-card">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">Kodbank Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">Banking at a glance</h1>
        <p className="mt-2 text-slate-300">
          Click below to securely verify your JWT token and fetch the latest balance.
        </p>

        <div className="mt-8">
          <button className="auth-button" onClick={checkBalance} disabled={loading}>
            {loading ? "Checking..." : "Check Balance"}
          </button>
        </div>

        {message && <p className="mt-6 rounded-xl bg-emerald-400/20 p-4 text-emerald-200">{message}</p>}
        {error && <p className="mt-6 rounded-xl bg-rose-400/20 p-4 text-rose-200">{error}</p>}
      </section>
    </main>
  );
}
