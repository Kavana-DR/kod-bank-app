"use client";

import { useState } from "react";

export default function ResetPasswordForm({ token }: { token?: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleReset}
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-80"
      >
        <h1 className="text-xl mb-4 text-center">Reset Password</h1>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 mb-4 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 py-2 rounded">
          Reset Password
        </button>

        {message && (
          <p className="mt-4 text-center text-green-400">{message}</p>
        )}
      </form>
    </div>
  );
}