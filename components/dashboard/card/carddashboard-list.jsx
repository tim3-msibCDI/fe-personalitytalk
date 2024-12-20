"use client";

import { useState, useEffect } from "react";
import { getDashboardData } from "@/api/manage-dashboard";

export default function CardDashboardList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardData();
      if (result.success) {
        setData({
          totalUsers: result.data.totalUser,
          totalTeachers: result.data.totalPsikolog,
          totalConsultants: result.data.totalConsultation,
          totalCourses: result.data.totalCourse,
        });
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        icon="/icons/dashboard/total-pengguna.svg"
        title="Total Pengguna"
        count={data?.totalUsers || 0}
        isLoading={isLoading}
      />
      <Card
        icon="/icons/dashboard/total-psikolog.svg"
        title="Total Psikolog"
        count={data?.totalTeachers || 0}
        isLoading={isLoading}
      />
      <Card
        icon="/icons/dashboard/total-konsultasi.svg"
        title="Total Konsultasi"
        count={data?.totalConsultants || 0}
        isLoading={isLoading}
      />
      <Card
        icon="/icons/dashboard/total-course.svg"
        title="Total Course"
        count={data?.totalCourses || 0}
        isLoading={isLoading}
      />
    </div>
  );
}

function Card({ icon, title, count, isLoading }) {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      let start = 0;
      const duration = 1000; // 1 detik untuk animasi
      const increment = Math.ceil(count / (duration / 16)); // Hitung setiap frame (16ms)

      const interval = setInterval(() => {
        start += increment;
        if (start >= count) {
          setAnimatedCount(count);
          clearInterval(interval);
        } else {
          setAnimatedCount(start);
        }
      }, 16); // 16ms per frame

      return () => clearInterval(interval); // Bersihkan interval saat unmount
    }
  }, [isLoading, count]);

  return (
    <div className="bg-orange-100 p-5 rounded-lg flex items-center shadow-md">
      <div className="rounded-lg flex items-center justify-center">
        <img src={icon} alt={`${title} Icon`} className="w-10 h-10" />
      </div>
      <div className="ml-4">
        <p className="text-h2 font-bold text-black">
          {animatedCount.toLocaleString()}
        </p>
        <h3 className="text-vs font-medium text-gray-700">{title}</h3>
      </div>
    </div>
  );
}
