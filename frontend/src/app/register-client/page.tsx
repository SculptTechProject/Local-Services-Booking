"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function RegisterClient() {
  const router = useRouter();
  const [name, setName] = useState("");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      if (res.status === 409) {
        const { error } = await res.json();
        throw new Error(
          error || "Użytkownik o takim adresie e-mail już istnieje!"
        );
      }

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Błąd rejestracji");
      }

      const data = await res.json();
      console.log("Zarejestrowano pomyślnie:", data);
      router.push("/login-client");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-300 rounded shadow">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Rejestracja
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Imię
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Wpisz swoje imię"
              />
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Wpisz swoje hasło"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {loading ? "Rejestrowanie..." : "Zarejestruj się"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Masz już konto?{" "}
            <a
              href="/login-client"
              className="text-gray-800 hover:underline font-medium"
            >
              Zaloguj się
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
