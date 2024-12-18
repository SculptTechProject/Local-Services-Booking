"use client";
import router from "next/router";
import { useState } from "react";
import React from "react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5173/api/v1/clients/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Błąd rejestracji");
      }

      const data = await res.json();
      console.log("Zarejestrowano pomyślnie:", data);
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-gray-100 to-emerald-100">
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Rejestracja
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Wpisz swój email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Hasło
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Wpisz swoje hasło"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded transition ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Rejestrowanie..." : "Zarejestruj się"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Masz już konto?{" "}
          <a
            href="/login-client"
            className="text-emerald-700 hover:underline"
          >
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
}
