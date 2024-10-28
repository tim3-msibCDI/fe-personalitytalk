import { jadwalPsikolog } from "@/constants";
import { useState } from "react";
import Image from "next/image";

export default function Psikolog() {
    // State untuk menyimpan data psikolog yang dipilih
    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]); // Misalkan ambil psikolog pertama

    return (
        <div className="flex gap-4">
            <div className="w-28 h-28 rounded overflow-hidden">
                <Image className="mb-2 object-cover w-full h-full"
                    src={selectedPsikolog.photos}
                    alt={`Photo ${selectedPsikolog.name}`}
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex flex-col">
                <p className="text-m font-semibold">{selectedPsikolog.name}</p>
                {/* Rating, Pengalaman, dan Role */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center">
                        <Image
                            src="/icons/bintang.png"
                            alt="Icon Star"
                            width={18}
                            height={18}
                        />
                        <p className="ml-1">{selectedPsikolog.rating}</p>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="flex items-center">
                        <Image
                            src="/icons/i-konsultasi.png"
                            alt="Icon Konsultasi"
                            width={18}
                            height={18}
                        />
                        <p className="ml-1">{selectedPsikolog.pengalaman} tahun</p>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="flex items-center">
                        <Image
                            src="/icons/role.png"
                            alt="Icon Role"
                            width={18}
                            height={18}
                        />
                        <p className="ml-1">{selectedPsikolog.role}</p>
                    </div>
                </div>
                {/* Status Pembayaran */}
                {selectedPsikolog.status_pembayaran && (
                    <div className="mt-3 flex items-center">
                        <div className={`px-4 py-2 rounded-md text-white font-semibold text-sm ${
                            selectedPsikolog.status_pembayaran === 1 ? "bg-wait" :
                            selectedPsikolog.status_pembayaran === 2 ? "bg-success" :
                            "bg-fail"
                        }`}>
                            {selectedPsikolog.status_pembayaran === 1 && "Menunggu pembayaran"}
                            {selectedPsikolog.status_pembayaran === 2 && "Transaksi berhasil"}
                            {selectedPsikolog.status_pembayaran === 3 && "Transaksi gagal"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}