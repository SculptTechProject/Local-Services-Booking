"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PreregisterProvider() {
  const router = useRouter();

  // Stan pól formularza
  const [serviceType, setServiceType] = useState("");
  const [voivodeship, setVoivodeship] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isVoivodeshipDropdownOpen, setIsVoivodeshipDropdownOpen] =
    useState(false);

  // Lista usług do sugestii
  const services = [
    "hydraulik",
    "elektryk",
    "mechanik",
    "stolarz",
    "malarz",
    "ogrodnik",
  ];

  // Lista województw
  const voivodeships = [
    "dolnośląskie",
    "kujawsko-pomorskie",
    "lubelskie",
    "lubuskie",
    "łódzkie",
    "małopolskie",
    "mazowieckie",
    "opolskie",
    "podkarpackie",
    "podlaskie",
    "pomorskie",
    "śląskie",
    "świętokrzyskie",
    "warmińsko-mazurskie",
    "wielkopolskie",
    "zachodniopomorskie",
  ];

  // Filtr usług
  const filteredServices = services.filter((s) =>
    s.toLowerCase().includes(serviceType.toLowerCase())
  );
  // Filtr województw
  const filteredVoivodeships = voivodeships.filter((v) =>
    v.toLowerCase().includes(voivodeship.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!serviceType || !voivodeship) {
      setError("Uzupełnij wszystkie pola!");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5173/api/v1/providers/preregister",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ serviceType, region: voivodeship }),
        }
      );
      if (res.ok) {
            console.log("Zarejestrowano pomyślnie!");
            router.push("login-provider");
      } else {
            throw new Error("Coś poszło nie tak przy zapisie!");
      }
    } catch (err) {
      console.error(err);
      setError("Coś poszło nie tak przy zapisie!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Zarejestruj swoją usługę
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Rodzaj usługi */}
          <div className="relative">
            <label className="block mb-1 text-gray-700 font-medium">
              Rodzaj usługi
            </label>
            <input
              type="text"
              placeholder="np. Hydraulik"
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value);
                // Otwórz dropdown, jeśli wpis jest niepusty
                setIsServiceDropdownOpen(e.target.value.length > 0);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-full 
                         focus:outline-none focus:border-emerald-500 transition"
              onFocus={() => {
                if (serviceType.length > 0) {
                  setIsServiceDropdownOpen(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setIsServiceDropdownOpen(false), 100);
              }}
            />
            {/* Dropdown z sugestiami dla usług */}
            {isServiceDropdownOpen && filteredServices.length > 0 && (
              <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow z-10">
                {filteredServices.map((service) => (
                  <li
                    key={service}
                    className="px-4 py-2 hover:bg-emerald-50 cursor-pointer"
                    onMouseDown={() => {
                      // onMouseDown, żeby blur się nie wykonał zbyt wcześnie
                      setServiceType(service);
                    }}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Województwo */}
          <div className="relative">
            <label className="block mb-1 text-gray-700 font-medium">
              Region / Lokalizacja
            </label>
            <input
              type="text"
              placeholder="Województwo"
              value={voivodeship}
              onChange={(e) => {
                setVoivodeship(e.target.value);
                setIsVoivodeshipDropdownOpen(e.target.value.length > 0);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-full
                         focus:outline-none focus:border-emerald-500 transition"
              onFocus={() => {
                if (voivodeship.length > 0) {
                  setIsVoivodeshipDropdownOpen(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setIsVoivodeshipDropdownOpen(false), 100);
              }}
            />
            {/* Dropdown z sugestiami dla województw */}
            {isVoivodeshipDropdownOpen && filteredVoivodeships.length > 0 && (
              <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow z-10">
                {filteredVoivodeships.map((v) => (
                  <li
                    key={v}
                    className="px-4 py-2 hover:bg-emerald-50 cursor-pointer"
                    onMouseDown={() => {
                      setVoivodeship(v);
                    }}
                  >
                    {v}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 
                         text-white font-medium rounded-full transition"
            >
              Zapisz usługę
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
