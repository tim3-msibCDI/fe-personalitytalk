"use client";

import { useState, useEffect } from "react";
import CardDashboardList from "@/components/dashboard/card/carddashboard-list";
import BarChart from "@/components/dashboard/chart/bar-chart";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import Loading from "@/components/loading/loading";
import { getDashboardData } from "@/api/manage-dashboard";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true); 
    async function fetchDashboardData() {
      try {
        const { success, data, message } = await getDashboardData();
        if (success) {
          setDashboardData(data);
        } else {
          setError(message || "Failed to fetch dashboard data");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);
  
  if (error) return <p>Error: {error}</p>;

   // Only destructure after confirming data is not null
   if (!dashboardData) {
    return (
      <div>
        <Loading/>
      </div>
    );  
  }

  const { totalUser, totalPsikolog, totalConsultation, totalCourse, consultationChart } = dashboardData;

  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <CardDashboardList />

        {/* Charts Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primarylight2 p-3 rounded-lg shadow-md">
            <div className="ml-1">
              <h3 className="text-m font-bold text-black">Total Konsultasi (6 Bulan Terakhir)</h3>
            </div>
          </div>
          <div className="bg-primarylight2 p-3 rounded-lg shadow-md">
            <div className="ml-1">
              <h3 className="text-m font-bold text-black">Total Pembelian Course (6 Bulan Terakhir)</h3>
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
          <div className="bg-primarylight2 p-5 rounded-lg shadow-md">
            <BarChart
              months={consultationChart.months}
              totals={consultationChart.totals} 
            />
        </div>
      </div>
    </div>
    </>
  );
}
