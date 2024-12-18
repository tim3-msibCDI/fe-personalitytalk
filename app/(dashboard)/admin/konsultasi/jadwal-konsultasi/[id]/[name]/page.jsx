"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import TableHead from "@/components/dashboard/table/table-head";
import TableBody from "@/components/dashboard/table/table-body";

export default function DetailJadwalKonsultasiPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false); // State untuk menandai jika tombol sudah ditekan

  // State for holding extracted id and nama from the path
  const [id, setId] = useState(null);
  const [nama, setNama] = useState(null);

  const searchParams = useSearchParams(); // Mengambil query params dari URL
  const pathname = usePathname(); // Mengambil path URL

  useEffect(() => {
    // Mengambil id dan nama dari URL (berbasis path atau query params)
    const extractedId = pathname.split("/").pop(); // Ambil parameter terakhir dari path
    const extractedNama = searchParams.get("nama"); // Ambil "nama" dari query params

    setId(extractedId);
    setNama(extractedNama);
  }, [pathname, searchParams]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleButtonClick = () => {
    if (selectedDate) {
      setIsDateSelected(true); // Mengaktifkan tampilan tabel jika tanggal dipilih
    }
  };

  // Data untuk Table
  const heads = ["Waktu", "Status", "Detail"];
  const rows = [
    { id: 1, waktu: "06:00 - 07:00", status: "Selesai", detail: "1" },
    {
      id: 2,
      waktu: "07:00 - 08:00",
      status: "Sedang Berlangsung",
      detail: "1",
    },
    { id: 3, waktu: "13:00 - 14:00", status: "Dijadwalkan", detail: "0" },
    { id: 4, waktu: "18:00 - 19:00", status: "Tersedia", detail: "0" },
  ];

  const columns = [
    {
      key: "waktu",
      render: (value) => <span>{value}</span>,
    },
    {
      key: "status",
      render: (value) => {
        let colorClass = "";
        if (value === "Selesai") colorClass = "bg-green-500";
        else if (value === "Sedang Berlangsung") colorClass = "bg-yellow-500";
        else if (value === "Dijadwalkan") colorClass = "bg-primary";
        else if (value === "Tersedia") colorClass = "bg-primarylight";

        return (
          <div
            className={`${colorClass} font-semibold text-whitebg py-4 px-6 rounded-md m-1`}
          >
            {value}
          </div>
        );
      },
    },
    {
      key: "detail",
      render: (value) => (
        <div className="flex justify-center items-center">
          {value === "0" ? (
            <img
              src="/icons/dashboard/checkbox.svg"
              alt="Checkbox"
              width={25}
              height={25}
            />
          ) : (
            <img
              src="/icons/dashboard/checkbox_disabled.svg"
              alt="Checkbox Disabled"
              width={25}
              height={25}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Header Admin with Add Button */}
      <HeaderAdmin />

      {/* Wrapper for the Table */}
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
                placeholder="Pilih Tanggal"
              />
            </div>

            {/* Tombol Pilih */}
            <button
              type="button"
              onClick={handleButtonClick} // Setiap klik tombol, akan memeriksa dan menampilkan tabel
              className="bg-primary px-7 py-3 border rounded-md mt-7 text-whitebg"
            >
              Pilih
            </button>
          </div>

          {/* Table Component - Muncul hanya jika tombol "Pilih" sudah ditekan dan tanggal sudah dipilih */}
          {isDateSelected && selectedDate ? (
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg border-collapse overflow-hidden">
                <TableHead heads={heads} />
                <TableBody rows={rows} columns={columns} />
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              Silakan pilih tanggal dan klik tombol "Pilih" untuk melihat jadwal konsultasi.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
