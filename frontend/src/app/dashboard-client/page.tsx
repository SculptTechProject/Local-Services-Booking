import React from "react";

export default function dashboardClient() {
  const clientName = "Mati";
  const services = [
    { name: "Sprzątanie", status: "Zarezerwowane", date: "2024-12-15" },
    {
      name: "Naprawa zmywarki",
      status: "W trakcie realizacji",
      date: "2024-12-16",
    },
    { name: "Ogrodnictwo", status: "Zakończone", date: "2024-12-10" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Nagłówek */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-emerald-700">Panel Klienta</h1>
        <div className="text-gray-700">
          Zalogowany jako: <span className="font-semibold">{clientName}</span>
        </div>
      </header>

      {/* Sekcja powitalna */}
      <section className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-emerald-700 mb-2">
          Witaj, {clientName}!
        </h2>
        <p className="text-gray-600">
          Tutaj znajdziesz swoje ostatnie rezerwacje, statusy usług oraz
          statystyki.
        </p>
      </section>

      {/* Usługi */}
      <section className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Twoje Usługi
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 font-medium text-gray-700">Nazwa Usługi</th>
              <th className="py-2 font-medium text-gray-700">Status</th>
              <th className="py-2 font-medium text-gray-700">Data</th>
              <th className="py-2 font-medium text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={i} className="border-b hover:bg-gray-100 transition">
                <td className="py-2 text-gray-700">{service.name}</td>
                <td className="py-2 text-gray-700">{service.status}</td>
                <td className="py-2 text-gray-700">{service.date}</td>
                <td className="py-2">
                  <button className="text-emerald-600 hover:text-emerald-800 font-medium">
                    Szczegóły
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Statystyki */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Statystyki
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-emerald-100 rounded p-4 text-center">
            <div className="text-2xl font-bold text-emerald-700">3</div>
            <div className="text-gray-700">Rezerwacje</div>
          </div>
          <div className="bg-emerald-100 rounded p-4 text-center">
            <div className="text-2xl font-bold text-emerald-700">1</div>
            <div className="text-gray-700">W trakcie</div>
          </div>
          <div className="bg-emerald-100 rounded p-4 text-center">
            <div className="text-2xl font-bold text-emerald-700">1</div>
            <div className="text-gray-700">Zakończone w tym miesiącu</div>
          </div>
        </div>
      </section>
    </div>
  );
}
