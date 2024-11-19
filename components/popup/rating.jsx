import Image from "next/image";
import { jadwalPsikolog } from "@/constants";
import { useState } from "react";

export default function Rating({ onClose }) {
    // State untuk menyimpan data psikolog yang dipilih
    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]); // Misalkan ambil psikolog pertama

    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg px-6 py-3 rounded-t-lg flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-m font-semibold">Nilai Konsultasi</p>
                    <p className="text-s font-light">Berikan penilain sesi konsultasi</p>
                </div>
                <Image
                    src="/icons/close.png"
                    alt="Tutup"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="p-6">
                <div className="flex gap-4">
                    <div className="w-20 h-20 rounded overflow-hidden">
                        <Image className="mb-2 object-cover w-full h-full"
                            src={selectedPsikolog.photos}
                            alt={`Photo ${selectedPsikolog.name}`}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-m font-semibold">{selectedPsikolog.name}</p>
                        {/* Tanggal, Waktu konsultasi */}
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center">
                                <Image
                                    src="/icons/i-konsultasi.png"
                                    alt="Icon Star"
                                    width={18}
                                    height={18}
                                />
                                <p className="ml-1">1 Okt 2024</p>
                            </div>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center">
                                <Image
                                    src="/icons/time.svg"
                                    alt="Icon Konsultasi"
                                    width={18}
                                    height={18}
                                />
                                <p className="ml-1">13.00-14.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border border-1 border-gray-300 mt-3"/>
                <div className="mt-2">
                    <p>Rating Layanan</p>
                    <p>Rating Psikolog</p>
                </div>
                <textarea
                    className="w-full h-32 p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Masukkan Ulasan Kamu"
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={onClose}
                        className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                        Nilai
                    </button>
                </div>
            </div>
        </div>
    );
}