import Image from "next/image";
import Psikolog from "../psikolog";
import PilihPembayaran from "../pilih_bayar";
import Pembayaran from "../pembayaran";
import { jadwalPsikolog } from "@/constants";
import { useState } from "react";

export default function FormBayar() {
    
    // State untuk menyimpan data psikolog yang dipilih
    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]);

    return (
        <div className="py-6">
            {/* Tombol Back */}
            <div className="flex items-center gap-4">
                <Image
                    src="/icons/arrow_back.png"
                    alt="icon kembali"
                    width={9}
                    height={14}
                />
                <p className="text-m font-bold">Kembali</p>
            </div>
            <div className="flex gap-8 mt-6">
                {/* Konten Kiri */}
                <div className="w-2/5">
                    <div className="py-4">
                        <h3 className="text-h3 font-semibold text-textcolor mb-2">Pemesanan</h3>
                        <p className="text-s text-textcolor mb-4">Lakukan pembayaran agar pemesanan sesi konsultasi kamu dapat dijadwalkan</p>
                        <div className="bg-primarylight2 rounded-md">
                            <div className="p-4">
                                <Psikolog/>
                                <hr className="border-1 border-black mb-4 mt-2" />
                                {/* Detail Konsultasi */}
                                <div className="text-m gap-2">
                                    <p className="font-semibold mb-2">Detail Konsultasi</p>
                                    <div className="grid grid-cols-2 gap-y-2 text-m text-textcolor">
                                        <p>Topik Konsultasi</p>
                                        <p>: Umum</p>

                                        <p>Durasi Konsultasi</p>
                                        <p>: 60 menit</p>

                                        <p>Jadwal Konsultasi</p>
                                        <p>: Sabtu, 26 Oktober 2024</p>

                                        <p>Waktu Konsultasi</p>
                                        <p>: 13.00 - 14.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Konten Kanan */}
                <div className="w-3/5">
                    {/* Tampilkan PilihPembayaran jika status_pembayaran null, sebaliknya tampilkan Pembayaran */}
                    {selectedPsikolog.status_pembayaran === null ? (
                        <PilihPembayaran />
                    ) : (
                        <Pembayaran statusPembayaran={selectedPsikolog.status_pembayaran}/>
                    )}
                </div>
            </div>
        </div>
    );
}