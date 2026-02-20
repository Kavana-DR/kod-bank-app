"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(new Date());

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
    <main className="min-h-screen bg-[#0A1F44] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#081735] p-6 md:flex md:flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">KodBank</p>
          <h1 className="mt-2 text-xl font-bold tracking-tight">Dashboard</h1>
          <nav className="mt-8 space-y-2">
            <a className="block rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15" href="#">
              Dashboard
            </a>
            <a className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white" href="#">
              Accounts
            </a>
            <a className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white" href="#">
              Transactions
            </a>
            <a className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white" href="#">
              Transfers
            </a>
            <a className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white" href="#">
              Settings
            </a>
            <a className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white" href="#">
              Logout
            </a>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#081735] px-4 py-4 md:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">KodBank</p>
            <button className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-slate-200">Menu</button>
          </header>

          <section className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-300">Welcome back, User</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Your Banking Dashboard</h2>
                <p className="mt-2 text-sm text-slate-300">{today}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold shadow-lg">
                U
              </div>
            </div>

            <article className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md transition hover:shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Account Summary</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-slate-300">Account Type</p>
                  <p className="mt-1 text-sm font-semibold">Savings Account</p>
                </div>
                <div>
                  <p className="text-xs text-slate-300">Account Number</p>
                  <p className="mt-1 text-sm font-semibold">**** 4582</p>
                </div>
                <div>
                  <p className="text-xs text-slate-300">Available Balance</p>
                  <p className="mt-1 text-lg font-bold text-emerald-300">{message || "Click Check Balance"}</p>
                </div>
              </div>

              <div className="mt-6">
                <button className="auth-button max-w-xs" onClick={checkBalance} disabled={loading}>
                  {loading ? "Checking..." : "Check Balance"}
                </button>
              </div>

              {error && <p className="mt-4 rounded-lg bg-rose-400/20 p-3 text-sm text-rose-200">{error}</p>}
            </article>

            <section className="mt-8">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button className="rounded-lg border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 hover:shadow-xl">
                  <p className="text-sm font-semibold text-blue-200">Transfer Money</p>
                  <p className="mt-1 text-xs text-slate-300">Move funds instantly to saved beneficiaries.</p>
                </button>
                <button className="rounded-lg border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 hover:shadow-xl">
                  <p className="text-sm font-semibold text-blue-200">Pay Bills</p>
                  <p className="mt-1 text-xs text-slate-300">Pay utilities and recurring bills securely.</p>
                </button>
                <button className="rounded-lg border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 hover:shadow-xl">
                  <p className="text-sm font-semibold text-blue-200">Transaction History</p>
                  <p className="mt-1 text-xs text-slate-300">View your recent debits and credits.</p>
                </button>
                <button className="rounded-lg border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 hover:shadow-xl">
                  <p className="text-sm font-semibold text-blue-200">Download Statement</p>
                  <p className="mt-1 text-xs text-slate-300">Get monthly account statements as PDF.</p>
                </button>
              </div>
            </section>

            <section className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <div className="mt-4 divide-y divide-white/10">
                <div className="grid grid-cols-3 gap-2 py-3 text-xs font-semibold uppercase tracking-wide text-slate-300">
                  <p>Date</p>
                  <p>Description</p>
                  <p className="text-right">Amount</p>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3 text-sm transition hover:bg-white/5">
                  <p>12 Feb 2026</p>
                  <p>Salary Credit</p>
                  <p className="text-right font-semibold text-emerald-300">+ $2,400.00</p>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3 text-sm transition hover:bg-white/5">
                  <p>10 Feb 2026</p>
                  <p>Electricity Bill</p>
                  <p className="text-right font-semibold text-rose-300">- $120.50</p>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3 text-sm transition hover:bg-white/5">
                  <p>08 Feb 2026</p>
                  <p>UPI Transfer</p>
                  <p className="text-right font-semibold text-rose-300">- $85.00</p>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3 text-sm transition hover:bg-white/5">
                  <p>05 Feb 2026</p>
                  <p>Refund Received</p>
                  <p className="text-right font-semibold text-emerald-300">+ $42.00</p>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
