"use client";

import Image from "next/image";
import { psikolog } from "@/constants";
import { useState } from "react";

export default function Terkait() {
    // State untuk mengatur apakah menampilkan semua atau tidak
    const [lihatSemua, setLihatSemua] = useState(false);

    // Batasi tampilan psikolog hanya dua jika "Lihat Semua" belum diaktifkan
    const psikologTampil = lihatSemua ? psikolog : psikolog.slice(0, 2);

    return (
        <div className="mr-4 lg:mr-8 ml-4 lg:ml-8 px-14 mb-10">
            <hr className="border-t border-gray-300 mb-4" />
            {/* Kontainer untuk judul dan tombol Lihat Semua */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-h2 text-textcolor font-semibold">Psikolog Terkait</h2>
                {/* Button Lihat Semua jika konten lebih dari 2 */}
                {psikolog.length > 2 && !lihatSemua && (
                    <button
                        onClick={() => setLihatSemua(true)}
                        className="bg-none text-black py-2 px-4"
                    >
                        Lihat Semua
                    </button>
                )}
            </div>
            {/* Container untuk menampung konten psikolog */}
            <div className="flex flex-wrap gap-10">
                {psikologTampil.map((item, index) => (
                    <div key={index} className="flex gap-3 w-[45%]">
                        {/* Konten Kiri: Foto Psikolog */}
                        <div>
                            <Image
                                src={item.photos}
                                alt={`Foto ${item.name}`}
                                width={100}
                                height={100}
                            />
                        </div>
                        {/* Konten Kanan: Informasi Psikolog */}
                        <div className="flex flex-col gap-4"> {/* Menambah jarak antar elemen di konten kanan */}
                            {/* Baris 1: Nama Psikolog dan Jumlah Jadwal */}
                            <div className="flex justify-between">
                                <p className="mr-10">{item.name}</p> {/* Menambah margin-right agar lebih jauh dari jadwal */}
                                <p>{item.jadwal.length} jadwal tersedia</p>
                            </div>
                            {/* Baris 2: Rating, Pengalaman, dan Role */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    <Image
                                        src="/icons/bintang.png"
                                        alt="Icon Star"
                                        width={18}
                                        height={18}
                                    />
                                    <p className="ml-1">{item.rating}</p>
                                </div>
                                <span className="text-gray-400">|</span>
                                <div className="flex items-center">
                                    <Image
                                        src="/icons/i-konsultasi.png"
                                        alt="Icon Konsultasi"
                                        width={18}
                                        height={18}
                                    />
                                    <p className="ml-1">{item.pengalaman} tahun</p>
                                </div>
                                <span className="text-gray-400">|</span>
                                <div className="flex items-center">
                                    <Image
                                        src="/icons/role.png"
                                        alt="Icon Role"
                                        width={18}
                                        height={18}
                                    />
                                    <p className="ml-1">{item.role}</p>
                                </div>
                            </div>
                            {/* Baris 3: Topik dan Button dalam satu baris */}
                            <div className="flex justify-between items-center mt-4 gap-4"> {/* Menambah margin-top agar topik lebih jauh dari button */}
                                <p>
                                    {item.topik.slice(0, 2).join(", ")} {/* Menampilkan dua topik awal */}
                                    {item.topik.length > 2 && <span className="ml-2">+{item.topik.length - 2}</span>} {/* Menampilkan jumlah sisa topik */}
                                </p>
                                <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded ml-10"> {/* Menambah margin-left pada button */}
                                    Pilih psikolog
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
