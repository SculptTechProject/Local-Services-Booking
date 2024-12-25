"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5173/api/v1/clients/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Błąd wylogowania");
      }

      router.push("/login-client");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
    >
      Wyloguj się
    </button>
  );
}
