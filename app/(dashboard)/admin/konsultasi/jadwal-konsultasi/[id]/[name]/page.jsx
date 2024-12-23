"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import TableHead from "@/components/dashboard/table/table-head";
import TableBody from "@/components/dashboard/table/table-body";
import { getPsychologistSchedule, updateScheduleAvailability } from "@/api/manage-konsultasi";

export default function DetailJadwalKonsultasiPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [id, setId] = useState(null);
  const [nama, setNama] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const extractedId = pathSegments[4];
    const extractedNama = pathSegments[5];

    setId(extractedId);
    setNama(decodeURIComponent(extractedNama));

    if (extractedId) {
      fetchSchedule(extractedId);
    }
  }, [pathname]);

  const fetchSchedule = async (id, date = null) => {
    try {
      const res = await getPsychologistSchedule(id, date);
      if (res.success) {
        setScheduleData(res.data.data);
      } else {
        console.error("Failed to fetch schedule:", res.message);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleButtonClick = () => {
    if (id) {
      fetchSchedule(id, selectedDate || null);
    }
  };

  const handleUpdateAvailability = async (scheduleId, currentAvailability) => {
    const newAvailability = currentAvailability === 0 ? 1 : 0; // Toggle availability
    const result = await updateScheduleAvailability(scheduleId, newAvailability);
    if (result.success) {
      alert("Ketersediaan berhasil diperbarui!");
      fetchSchedule(id, selectedDate || null); // Refresh data
    } else {
      console.error("Gagal memperbarui ketersediaan:", result.message);
      alert("Terjadi kesalahan saat memperbarui ketersediaan.");
    }
  };

  const heads = ["Waktu", "Status", "Ketersediaan"];
  const columns = [
    {
      key: "time_slot",
      render: (value) => <span>{value}</span>,
    },
    {
      key: "consul_status",
      render: (value) => {
        let colorClass =
          value === "available" ? "bg-primarylight" : "bg-gray-400";
        return (
          <div
            className={`${colorClass} font-semibold text-whitebg py-4 px-6 rounded-md m-1`}
          >
            {value === "available" ? "Tersedia" : value}
          </div>
        );
      },
    },
    {
      key: "is_available",
      render: (value, row) => (
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleUpdateAvailability(row.id, value)}
            className="focus:outline-none"
          >
            {value === 0 ? (
              <img
                src="/icons/dashboard/checkbox_disabled.svg"
                alt="Checkbox Disabled"
                width={25}
                height={25}
              />
            ) : (
              <img
                src="/icons/dashboard/checkbox.svg"
                alt="Checkbox"
                width={25}
                height={25}
              />
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <HeaderAdmin />

      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <label
                htmlFor="date"
                className="text-lg font-semibold text-gray-700 block mb-1"
              >
                Pilih Tanggal
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-3 pl-4 pr-10 border rounded-md bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-primary px-7 py-3 border rounded-md mt-7 text-whitebg"
            >
              Pilih
            </button>
          </div>

          {scheduleData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg border-collapse overflow-hidden">
                <TableHead heads={heads} />
                <TableBody rows={scheduleData} columns={columns} />
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              Tidak ada data jadwal tersedia.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
