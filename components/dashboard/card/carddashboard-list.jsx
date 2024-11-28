"use client";

import { useState, useEffect } from "react";
import { SkeletonCard } from "./skeleton-card";

export default function CardDashboardList() {
  // Dummy data
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Simulasi fetch data dengan delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setData({
        totalUsers: 1500,
        totalTeachers: 250,
        totalConsultants: 80,
        totalCourses: 500,
      });
    }, 2000); // 2 detik untuk simulasi loading

    return () => clearTimeout(timeout);
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <SkeletonCard />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card icon="/icons/dashboard/total-pengguna.svg" title="Total Pengguna" count={data.totalUsers} />
      <Card icon="/icons/dashboard/total-psikolog.svg" title="Total Pendidik" count={data.totalTeachers} />
      <Card icon="/icons/dashboard/total-konsultasi.svg" title="Total Konsultan" count={data.totalConsultants} />
      <Card icon="/icons/dashboard/total-course.svg" title="Total Courses" count={data.totalCourses} />
    </div>
  );
}

function Card({ icon, title, count }) {
  return (
    <div className="bg-orange-100 p-5 rounded-lg flex items-center shadow-md">
      <div className="rounded-lg flex items-center justify-center">
        <img src={icon} alt={`${title} Icon`} className="w-10 h-10" />
      </div>
      <div className="ml-4">
        <p className="text-h2 font-bold text-black">{count}</p>
        <h3 className="text-vs font-medium text-gray-700">{title}</h3>
      </div>
    </div>
  );
}
