"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/lib/auth";
import Loading from "@/components/loading/loading";
import Image from "next/image";
import BarChart from "@/components/dashboard/chart/bar-chart";
import DoughnutChart from "@/components/dashboard/chart/doughnut-chart";

export default function PsikologDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedCounts, setAnimatedCounts] = useState({
    totalClients: 0,
    totalConsultations: 0,
    totalScheduledConsultations: 0,
    averageRating: 0,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("Unauthorized");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/psikolog/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (dashboardData) {
      const animate = (key, target) => {
        let start = 0;
        const duration = 1000; // Durasi animasi dalam milidetik
        const stepTime = 16; // Waktu setiap langkah animasi dalam milidetik
        const increment = Math.ceil(target / (duration / stepTime));

        const interval = setInterval(() => {
          start += increment;
          if (start >= target) {
            setAnimatedCounts((prev) => ({ ...prev, [key]: target }));
            clearInterval(interval);
          } else {
            setAnimatedCounts((prev) => ({ ...prev, [key]: start }));
          }
        }, stepTime);
      };

      for (const key of Object.keys(animatedCounts)) {
        animate(key, dashboardData[key] || 0);
      }
    }
  }, [dashboardData]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { consultationChart, topicChart } = dashboardData;

  return (
    <div className="flex flex-col p-6">
      {dashboardData && (
        <>
          {/* Grid for Total Clients, Consultations, Scheduled Consultations, and Satisfaction */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center rounded-lg p-4 shadow-md bg-primarylight2">
              <div className="w-12 h-12 mr-4">
                <Image
                  src="/image/icons/psikolog/dashboard/client.svg"
                  alt="Total Clients Icon"
                  className="w-full h-full object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h2 className="text-h2 font-semibold">
                  {animatedCounts.totalClients.toLocaleString()}
                </h2>
                <p className="text-s">Total Klien</p>
              </div>
            </div>
  
            <div className="flex items-center rounded-lg p-4 shadow-md bg-primarylight2">
              <div className="w-12 h-12 mr-4">
                <Image
                  src="/image/icons/psikolog/dashboard/konsultasi.svg"
                  alt="Total Consultations Icon"
                  className="w-full h-full object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h2 className="text-h2 font-semibold">
                  {animatedCounts.totalConsultations.toLocaleString()}
                </h2>
                <p className="text-s">Total Konsultasi</p>
              </div>
            </div>
  
            <div className="flex items-center rounded-lg p-4 shadow-md bg-primarylight2">
              <div className="w-12 h-12 mr-4">
                <Image
                  src="/image/icons/psikolog/dashboard/jadwal.svg"
                  alt="Total Scheduled Consultations Icon"
                  className="w-full h-full object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h2 className="text-h2 font-semibold">
                  {animatedCounts.totalScheduledConsultations.toLocaleString()}
                </h2>
                <p className="text-s">Jadwal Konsultasi</p>
              </div>
            </div>
  
            <div className="flex items-center rounded-lg p-4 shadow-md bg-primarylight2">
              <div className="w-12 h-12 mr-4">
                <Image
                  src="/image/icons/psikolog/dashboard/kepuasan.svg"
                  alt="Average Rating Icon"
                  className="w-full h-full object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h2 className="text-h2 font-semibold">
                  {animatedCounts.averageRating.toLocaleString()}
                </h2>
                <p className="text-s">Kepuasan Klien</p>
              </div>
            </div>
          </div>
  
          {/* Charts Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primarylight2 p-3 rounded-lg shadow-md">
              <div className="ml-1">
                <h3 className="text-m font-bold text-black">Total Konsultasi (6 Bulan Terakhir)</h3>
              </div>
            </div>
            <div className="bg-primarylight2 p-3 rounded-lg shadow-md">
              <div className="ml-1">
                <h3 className="text-m font-bold text-black">Total Topik Konsultasi (6 Bulan terakhir)</h3>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primarylight2 p-5 rounded-lg shadow-md">
              <BarChart
                months={consultationChart.months}
                totals={consultationChart.totals}
              />
            </div>
            <div
              className="bg-primarylight2 p-5 rounded-lg shadow-md flex justify-center items-center"
            >
              <DoughnutChart topicChart={topicChart} />
            </div>
          </div>
        </>
      )}
    </div>
  );  
}
