"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { psikolog } from "@/constants";

const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export default function FormPilihPsikolog() {
    const [weekDates, setWeekDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedProfessional, setSelectedProfessional] = useState("Psikolog");

    useEffect(() => {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);

            const day = futureDate.getDate();
            const month = months[futureDate.getMonth()];
            const dayName = daysOfWeek[futureDate.getDay()];

            dates.push({ day, month, dayName, fullDate: futureDate });
        }

        setWeekDates(dates);
        setSelectedDate(today.getDate());
    }, []);

    return (
        <div className="flex justify-between gap-8 p-6">
            <div className="w-1/2">
                <h1 className="text-h3 font-semibold text-textcolor mb-2">Jenis Profesional</h1>
                <p className="text-s mb-6">Terdapat 2 Jenis profesional yang disediakan oleh PersonalityTalk</p>

                {/* Card Konselor */}
                <div className="bg-primarylight rounded-lg p-4 mb-6">
                    <h2 className="font-semibold text-m mb-2">Konselor</h2>
                    <hr className="mb-4 border-t-1 border-black" />
                    <ul className="list-disc list-inside text-s">
                        <li>Lulusan <b>S1 Psikologi</b> atau <b>Bimbingan Konseling</b></li>
                        <li>Memiliki <b>Sertifikat Pelatihan</b></li>
                        <li>Pendekatan terapi berbasis <b>konseling psikologi</b></li>
                        <li>Harga mulai dari <b>Rp.XXX.XXX</b></li>
                    </ul>
                </div>

                {/* Card Psikolog */}
                <div className="bg-primarylight rounded-lg p-4 mb-6">
                    <h2 className="font-semibold text-m mb-2">Psikolog</h2>
                    <hr className="mb-4 border-t-1 border-black" />
                    <ul className="list-disc list-inside text-s">
                        <li>Lulusan <b>Profesi Psikologi</b></li>
                        <li>Memiliki <b>Surat Ijin Praktik Psikologi</b></li>
                        <li>Mampu melakukan <b>Asesmen Psikologi</b></li>
                        <li>Pendekatan terapi dengan beragam <b>teknik psikoterapi</b></li>
                        <li>Harga mulai dari <b>Rp.XXX.XXX</b></li>
                    </ul>
                </div>
            </div>

            <div className="w-1/2">
                {/* Card Pilih Psikolog */}
                <div className="border bg-primarylight rounded-lg p-4 mb-6 shadow">
                    <div className="flex gap-4 overflow-x-scroll overflow-hidden w-full mb-5"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {weekDates.map((date, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedDate(date.day)}
                                className={`flex flex-col items-center justify-center rounded py-2 px-4 w-24 cursor-pointer
                                    ${selectedDate === date.day ? 'bg-primary text-white' : 'bg-primarylight text-black'}`}
                            >
                                <p className="text-s px-2 whitespace-nowrap text-center">
                                    {date.day} {date.month}
                                </p>
                                <p className="text-m font-semibold text-center">{date.dayName}</p>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-h font-semibold">Pilih Jenis Profesional</h1>
                    <p className="mb-6 text-s">Kamu dapat memilih Psikolog / Konselor sesuai dengan yang kamu inginkan</p>

                    {/* Button Psikolog dan Konselor */}
                    <div className="flex justify-between gap-4 text-h3 font-semibold mb-4">
                        <button
                            onClick={() => setSelectedProfessional("Psikolog")}
                            className={`py-2 w-full rounded 
                                ${selectedProfessional === "Psikolog" ? 'bg-primary text-white' : 'border border-primary text-primary'}`}
                        >
                            Psikolog
                        </button>
                        <button
                            onClick={() => setSelectedProfessional("Konselor")}
                            className={`py-2 w-full rounded 
                                ${selectedProfessional === "Konselor" ? 'bg-primary text-white' : 'border border-primary text-primary'}`}
                        >
                            Konselor
                        </button>
                    </div>

                    {/* Search */}
                    <div>
                        <form className="w-full">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-text2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-text2 border border-text2 rounded-lg bg-whitebg focus:ring-primary focus:border-primary" placeholder="Cari Nama Psikolog" required />
                            </div>
                        </form>
                    </div>

                    {/* List Psikolog/Konselor */}
                    <div className="mt-6">
                        {psikolog.map((item, index) => (
                            <div key={index} className="flex gap-3 mb-4 border-b border-textcolor pb-4">
                                {/* Foto Psikolog */}
                                <Image
                                    src={item.photos}
                                    alt={`Foto ${item.name}`}
                                    width={100}
                                    height={50}
                                    className="rounded"
                                />
                                {/* Informasi Psikolog */}
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-primary">{item.jadwal.length} jadwal tersedia</p>
                                    </div>
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
                                    <div className="flex justify-between items-center mt-4 gap-4"> {/* Menambah margin-top agar topik lebih jauh dari button */}
                                        <p>
                                            {item.topik.slice(0, 2).join(", ")} {/* Menampilkan dua topik awal */}
                                            {item.topik.length > 2 && <span className="ml-2">+{item.topik.length - 2}</span>} {/* Menampilkan jumlah sisa topik */}
                                        </p>
                                        <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded ml-10"> {/* Menambah margin-left pada button */}
                                            Pilih Psikolog
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
