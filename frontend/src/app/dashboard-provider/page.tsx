"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/navigation";
import Logout from "@/app/components/Logout";
import LoadingScreen from "../components/Loadingscreen";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Provider {
  name: string;
  region: string;
  servicetype: string;
}

export default function ProviderDashboard() {
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:5173/api/v1/providers/me", {
      method: "GET",
      credentials: "include", // potrzebne, by wysłać ciasteczko
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        const { provider } = data;

        if (!provider.region || !provider.servicetype) {
          router.push("/preregister-provider");
        } else {
          setProvider(provider);
        }
      })
      .catch(() => {
        router.push("/login-provider");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!provider) {
    return null;
  }

  const stats = {
    totalBookings: 125,
    totalRevenue: 3500,
    pendingBookings: 8,
    completedBookings: 117,
  };

  const chartData = {
    year: currentYear,
    labels: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    datasets: [
      {
        label: "Monthly Bookings",
        data: [30, 25, 18, 22, 15, 15],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const recentBookings = [
    { id: 1, customer: "Jan Kowalski", date: "2024-12-20", status: "Pending" },
    { id: 2, customer: "Anna Nowak", date: "2024-12-19", status: "Completed" },
    {
      id: 3,
      customer: "Piotr Zieliński",
      date: "2024-12-18",
      status: "Cancelled",
    },
  ];

  const notifications = [
    "Nowa rezerwacja od Jan Kowalski",
    "Przypomnienie: Zaktualizuj swój profil",
    "Twoja usługa ogrodnicza zdobyła 5-gwiazdkową recenzję!",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Nagłówek */}
      <div className="flex flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold">{provider.name} Dashboard</h1>
        <Logout />
      </div>
      <p className="text-sm text-gray-500">
        Region: {provider.region}, Typ Usługi: {provider.servicetype}
      </p>

      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-sm font-medium text-gray-600">Total Bookings</h2>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-sm font-medium text-gray-600">Revenue</h2>
          <p className="text-2xl font-bold">{stats.totalRevenue}zł</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-sm font-medium text-gray-600">Pending</h2>
          <p className="text-2xl font-bold">{stats.pendingBookings}</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-sm font-medium text-gray-600">Completed</h2>
          <p className="text-2xl font-bold">{stats.completedBookings}</p>
        </div>
      </div>

      {/* Wykres */}
      <div className="bg-white rounded shadow border p-4">
        <h2 className="text-sm font-medium text-gray-600 mb-2">
          Booking Trends {chartData.year}
        </h2>
        <div className="h-[300px]">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>

      {/* Ostatnie rezerwacje */}
      <div className="bg-white rounded shadow border p-4">
        <h2 className="text-sm font-medium text-gray-600 mb-2">
          Recent Bookings
        </h2>
        <ul className="divide-y divide-gray-200">
          {recentBookings.map((booking) => (
            <li key={booking.id} className="py-2 flex justify-between">
              <span>{booking.customer}</span>
              <span className="text-sm text-gray-500">{booking.date}</span>
              <span className="text-sm font-medium text-gray-700">
                {booking.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Powiadomienia */}
      <div className="bg-white rounded shadow border p-4">
        <h2 className="text-sm font-medium text-gray-600 mb-2">
          Notifications
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {notifications.map((note, index) => (
            <li key={index} className="text-sm text-gray-700">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
