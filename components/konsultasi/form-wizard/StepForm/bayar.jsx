import Image from "next/image";
import PilihPembayaran from "../pilih_bayar";
import Pembayaran from "../pembayaran";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function FormBayar({ onBack }) {
    const router = useRouter();
    const [selectedPsikolog, setSelectedPsikolog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const fetchData = async () => {
        try {
            const token = getToken();
            if (!token) {
                throw new Error("Token tidak tersedia");
            }

            const psi_id = localStorage.getItem("selectedPsikologId");
            const psch_id = localStorage.getItem("selectedPschId");
            const topic_id = localStorage.getItem("selectedTopic");

            if (!psi_id || !psch_id || !topic_id) {
                throw new Error("Data ID tidak lengkap di localStorage");
            }

            const url = `${process.env.NEXT_PUBLIC_API_URL}/consultation/preview-before-payment?psi_id=${psi_id}&psch_id=${psch_id}&topic_id=${topic_id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
            });

            if (!response.ok) {
                throw new Error("Gagal memuat data dari API");
            }

            const { data } = await response.json();
            console.log("Data dari API:", data);
            setSelectedPsikolog(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Memuat data...</p>;
    if (error) return <p>Error: {error}</p>;

    //Fungsi kalkulasi durasi konsultasi
    function calculateDuration(consultationTime) {
        if (!consultationTime) return 0;
    
        try {
            // Memisahkan waktu mulai dan waktu selesai
            const [startTime, endTime] = consultationTime.split(" - ");
    
            // Memecah jam dan menit dari waktu mulai
            const [startHour, startMinute] = startTime.split(":").map(Number);
    
            // Memecah jam dan menit dari waktu selesai
            const [endHour, endMinute] = endTime.split(":").map(Number);
    
            // Mengubah waktu ke dalam format Date
            const startDate = new Date(0, 0, 0, startHour, startMinute);
            const endDate = new Date(0, 0, 0, endHour, endMinute);
    
            // Menghitung durasi dalam menit
            const duration = (endDate - startDate) / (1000 * 60);
    
            return duration > 0 ? duration : 0; // Pastikan durasi tidak negatif
        } catch (error) {
            console.error("Error saat menghitung durasi:", error);
            return 0; // Kembalikan 0 jika ada error
        }
    }    

    return (
        <div className="py-6">
            <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
                <Image src="/icons/arrow_back.png" alt="icon kembali" width={9} height={14} />
                <p className="text-m font-bold">Kembali</p>
            </div>
            <div className="flex gap-8 mt-6">
                <div className="w-2/5">
                    <div className="py-4">
                        <h3 className="text-h3 font-semibold text-textcolor mb-2">Pemesanan</h3>
                        <p className="text-s text-textcolor mb-4">Lakukan pembayaran agar pemesanan sesi konsultasi kamu dapat dijadwalkan</p>
                        <div className="bg-primarylight2 rounded-md">
                            <div className="p-4">
                                <div className="flex gap-4">
                                    <div className="w-28 h-28 rounded overflow-hidden">
                                        <Image
                                            className="object-cover w-full h-full"
                                            src={`https://3fcd-114-10-19-172.ngrok-free.app/${selectedPsikolog.photo_profile}`}
                                            alt={`Photo ${selectedPsikolog.psikolog_name}`}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-m font-semibold">{selectedPsikolog.psikolog_name}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center">
                                                <Image src="/icons/bintang.png" alt="Icon Star" width={18} height={18} />
                                                <p className="ml-1">{selectedPsikolog.rating}</p>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center">
                                                <Image src="/icons/i-konsultasi.png" alt="Icon Konsultasi" width={18} height={18} />
                                                <p className="ml-1">{selectedPsikolog.years_of_experience} tahun</p>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center">
                                                <Image src="/icons/role.png" alt="Icon Role" width={18} height={18} />
                                                <p className="ml-1">{selectedPsikolog.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-1 border-black mb-4 mt-2" />
                                <div className="text-m gap-2">
                                    <p className="font-semibold mb-2">Detail Konsultasi</p>
                                    <div className="grid grid-cols-2 gap-y-2 text-m text-textcolor">
                                        <p>Topik Konsultasi</p>
                                        <p>: {selectedPsikolog.topic}</p>
                                        <p>Durasi Konsultasi</p>
                                        <p>: {calculateDuration(selectedPsikolog.consultation_time)} menit</p>
                                        <p>Jadwal Konsultasi</p>
                                        <p>: {selectedPsikolog.consultation_date}</p>
                                        <p>Waktu Konsultasi</p>
                                        <p>: {selectedPsikolog.consultation_time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
