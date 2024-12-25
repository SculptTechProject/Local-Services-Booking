"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/navigation";
import Logout from "@/app/components/Logout";

interface Provider {
  name: string;
}

export default function ProviderDashboard() {
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5173/api/v1/providers/me", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setProvider(data.provider);
      })
      .catch(() => {
        router.push("/login-provider");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <div>Ładowanie...</div>;
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Bookings",
        data: [30, 25, 18, 22, 15, 15],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Nagłówek */}
      <h1 className="text-2xl font-bold">{provider.name}s Dashboard</h1>
      <Logout />

      {/* Statystyki w prostych divach */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-sm font-medium text-gray-600">Total Bookings</h2>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-sm font-medium text-gray-600">Revenue</h2>
          <p className="text-2xl font-bold">${stats.totalRevenue}</p>
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
          Booking Trends
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
    </div>
  );
}
