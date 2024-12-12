"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import Loading from "@/components/loading/loading";

export default function BuatJadwal() {
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]); // Track selected day
  const [currentDay, setCurrentDay] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]); // Track selected slots
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Fetch data dari API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = getToken();
        if (!token) {
          alert("Anda perlu login untuk mengakses halaman ini.");
          router.push("/login");
          return;
        }

        const response = await fetch(`
          ${process.env.NEXT_PUBLIC_API_URL}/psikolog/schedule/main-schedules`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (result.success) {
          setSchedules(result.data);
        } else {
          throw new Error(result.message || "Gagal memuat data jadwal.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // Jika sedang loading
  if (loading) {
    return <Loading />;
  }

  // Jika terjadi error
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

  const currentMonthIndex = new Date().getMonth();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Fungsi untuk menangani perubahan checkbox
  const handleCheckboxChange = (day, slotId) => {
    setSelectedSlots((prev) => {
      const updatedSlots = { ...prev };
      if (!updatedSlots[day]) {
        updatedSlots[day] = [];
      }

      if (updatedSlots[day].includes(slotId)) {
        updatedSlots[day] = updatedSlots[day].filter((id) => id !== slotId);
      } else {
        updatedSlots[day] = [...updatedSlots[day], slotId];
      }

      return updatedSlots;
    });
  };

  // Fungsi untuk menangani klik pada hari
  const handleDayClick = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const updatedDays = prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day];

      setCurrentDay(updatedDays[updatedDays.length - 1] || null);
      return updatedDays;
    });
  };

  // Fungsi untuk mengirim data
  const handleSubmit = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("Anda perlu login untuk mengakses halaman ini.");
        router.push("/login");
        return;
      }

      const formattedSchedules = Object.entries(selectedSlots).map(
        ([day, slotIds]) => ({
          day,
          main_schedule_ids: slotIds,
        })
      );

      const response = await fetch(`
        ${process.env.NEXT_PUBLIC_API_URL}/psikolog/schedule/generate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            schedules: formattedSchedules,
            month: selectedMonth,
            year: selectedYear,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Jadwal berhasil dibuat!");
      } else {
        throw new Error(result.message || "Gagal membuat jadwal.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="px-4">
      <div className="bg-primarylight2 rounded-lg">
        <div className="px-6 py-4">
          {/* Pilih tahun dan bulan */}
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Pilih Tahun</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Pilih Bulan</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pilih Hari */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pilih Hari (Boleh Pilih Lebih Dari 1 Hari)</label>
            <div className="flex space-x-7">
              {Object.keys(schedules).map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`px-4 py-2 rounded-lg ${selectedDays.includes(day) ? "bg-primary text-white" : "bg-primarylight"
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Pilih Waktu untuk Hari Terpilih */}
          {currentDay && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Waktu Konsultasi untuk {currentDay}
              </label>
              <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                {schedules[currentDay]?.map((slot) => (
                  <div key={slot.id} className="mb-2 bg-white px-4 py-3 text-s rounded-lg">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={slot.id}
                        onChange={() => handleCheckboxChange(currentDay, slot.id)}
                        checked={selectedSlots[currentDay]?.includes(slot.id) || false}
                        className="form-checkbox rounded border-gray-300"
                      />
                      <span>{slot.time_slot}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-primarylight2 rounded-lg">
        <div className="px-6 py-4">
          <h3 className="text-lg font-bold mb-2">Jadwal Terpilih:</h3>
          <div className="grid grid-cols-7 gap-4">
            {Object.entries(selectedSlots).map(([day, slots]) => (
              <div key={day} className="mb-4 bg-primarylight rounded-lg">
                <div className="p-4">
                  <p className="font-semibold mb-2 text-center">{day}:</p>
                  <ul className="list-none text-center">
                    {slots.map((slotId) => {
                      const slot = schedules[day].find((s) => s.id === slotId);
                      return <li key={slotId} className="text-s text-center">{slot?.time_slot}</li>;
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {Object.keys(selectedSlots).length > 0 && (
        <div className="mt-4 flex justify-end">
          <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg mb-6">
            Buat Jadwal
          </button>
        </div>
      )}
    </div>
  );
}
