"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import Image from "next/image";
import Loading from "@/components/loading/loading";

export default function LihatJadwal() {
    const [selectedDate, setSelectedDate] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDateChange = async (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        setIsLoading(true);

        try {
            const token = getToken();
            if (!token) {
                alert("Anda perlu login untuk mengakses halaman ini.");
                router.push("/login");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/psikolog/schedule/selected-by-date?date=${date}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "69420",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch schedule");
            }

            const data = await response.json();

            if (data.success) {
                setSchedule(data.data);
            } else {
                console.error(data.message);
                setSchedule([]);
            }
        } catch (error) {
            console.error("Error fetching schedule:", error);
            setSchedule([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (id) => {
        setSchedule((prevSchedule) =>
            prevSchedule.map((slot) =>
                slot.id === id ? { ...slot, is_available: slot.is_available === 1 ? 0 : 1 } : slot
            )
        );
    };

    return (
        <div className="px-4">
            <div className="bg-primarylight2 rounded-lg">
                <div className="px-6 py-4">
                    <p className="text-s">Pilih Tanggal</p>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="mt-2 border rounded px-2 py-1"
                    />
                </div>

                {selectedDate && (
                    isLoading ? (
                        <Loading />
                    ) : schedule.length > 0 ? (
                        <div className="mt-2 px-6">
                            <p className="text-s mb-2">Jadwal Konsultasi</p>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {schedule.map((slot) => (
                                    <div key={slot.id} className="mb-6 bg-white px-4 py-3 text-s rounded-lg">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={slot.is_available === 1}
                                                onChange={() => handleCheckboxChange(slot.id)}
                                            />
                                            <span>{slot.time_slot}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4 py-6 flex flex-col gap-y-2 justify-center items-center">
                            <Image
                                src="/icons/psikolog/jadwal-kosong.svg"
                                alt="Icon Jadwal Kosong"
                                width={70}
                                height={70}
                            />
                            <h3 className="text-h3 font-semibold">Tidak Memiliki Jadwal</h3>
                            <p className="text-s mb-7">Anda belum memiliki jadwal pada hari tersebut, anda bisa membuat jadwal terlebih dahulu</p>
                        </div>
                    )
                )}
            </div>
            <p className="text-xs mt-4">*Uncheckbox untuk menonaktifkan sesi konsultasi</p>
        </div>
    );
}
