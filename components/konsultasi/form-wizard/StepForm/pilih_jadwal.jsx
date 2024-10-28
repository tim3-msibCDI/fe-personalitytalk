import { jadwalPsikolog } from "@/constants";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function FormPilihJadwal() {
    // State untuk menyimpan data psikolog yang dipilih
    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]); // Misalkan ambil psikolog pertama

    //State untuk menyimpan indeks review saat ini
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    //State untuk menyimpan tanggal yang dipilih
    const [selectedDate, setSelectedDate] = useState(null);

    //State untuk menyimpan jadwal yang dipilih
    const [selectedTime, setSelectedTime] = useState(null);

    //Atur tanggal pertama sebagai default
    useEffect(() => {
        if (selectedPsikolog.jadwal && selectedPsikolog.jadwal.length > 0) {
            setSelectedDate(selectedPsikolog.jadwal[0]);
        }
    }, [selectedPsikolog]);

    // Fungsi untuk menangani tombol Previous
    const handlePrevReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : selectedPsikolog.review.length - 1 // Balik ke review terakhir jika mencapai indeks 0
        );
    };

    // Fungsi untuk menangani tombol Next
    const handleNextReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex < selectedPsikolog.review.length - 1 ? prevIndex + 1 : 0 // Kembali ke review pertama jika mencapai indeks terakhir
        );
    };

    return (
        <div className="p-6">
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
                {/* Konten Kanan */}
                <div className="w-2/5 bg-primarylight2 rounded-md">
                    <div className="p-4">
                        <h3 className="text-h3 font-semibold text-textcolor mb-2">Detail Profil Psikolog</h3>
                        <div className="flex flex-row gap-4">
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
                                <div className="flex items-center gap-3 mt-1">
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
                                <div>
                                    <div className="flex gap-2 mt-3">
                                        <p className="text-s font-semibold">No SIPP</p>
                                        <p className="text-s">{selectedPsikolog.sipp}</p>
                                    </div>
                                </div>
                                <p className="mt-1 text-m font-bold">Rp. {selectedPsikolog.harga}/sesi</p>
                            </div>
                        </div>

                        <hr className="my-4 border-1 border-black" />

                        <p className="text-justify">{selectedPsikolog.deskripsi}</p>

                        <hr className="my-4 border-1 border-black" />

                        <div>
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/icons/topik_detail.png"
                                    alt="Icon Topik"
                                    width={24}
                                    height={24}
                                />
                                <p className="text-m font-semibold">Topik</p>
                            </div>
                            <div className="mt-2">
                                <ul className="flex flex-wrap items-center gap-4">
                                    {selectedPsikolog.topik.map((topic, index) => (
                                        <li key={index} className="bg-primarylight px-3 py-1 rounded-md text-primary">{topic}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <hr className="my-4 border-1 border-black" />

                        <div>
                            <p className="text-m font-semibold mb-4">Review</p>
                            <div className="flex items-center justify-between mb-3">
                                {/* Tombol Previous */}
                                <button onClick={handlePrevReview}>
                                    <Image
                                        src="/icons/kiri.png"
                                        alt="Icon Previous"
                                        width={11}
                                        height={30}
                                    />
                                </button>
                                {/* Review saat ini */}
                                <p className="mx-4 bg-primarylight rounded text-s px-4 py-2 w-[380px] h-[100px] overflow-y-auto">
                                    {selectedPsikolog.review[currentReviewIndex].comment}
                                </p>
                                {/* Tombol Next */}
                                <button onClick={handleNextReview}>
                                    <Image
                                        src="/icons/kanan.png"
                                        alt="Icon Next"
                                        width={11}
                                        height={30}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Konten Kiri */}
                <div className="w-3/5 h-fit bg-primarylight2 rounded-md">
                    <div className="p-4">
                        <h3 className="text-h3 font-semibold">Jadwal {selectedPsikolog.role}</h3>
                        <p className="text-m">Pilih jadwal untuk sesi Konsultasi kamu</p>
                        {/* Tanggal dan Hari */}
                        <div className="flex gap-4 mt-4 mb-2">
                            {selectedPsikolog.jadwal.map((schedule, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center cursor-pointer py-2 px-4 w-24 rounded-md ${selectedDate === schedule ? 'bg-primary text-white' : 'bg-primarylight text-black'
                                        }`}
                                    onClick={() => setSelectedDate(schedule)}
                                >
                                    <p
                                        className="text-s px-2 whitespace-nowrap text-center">{new Date(schedule.tanggal).getDate()} {new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(schedule.tanggal))}
                                    </p>
                                    <p className="text-m font-semibold text-center">{new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date(schedule.tanggal))}</p> {/* Menampilkan hari */}
                                </div>
                            ))}
                        </div>
                        {/* Tampilkan waktu untuk tanggal yang dipilih */}
                        {selectedDate && (
                            <div className="mt-6">
                                <h4 className="text-h3 font-semibold mb-2">Pilih Waktu Konsultasi</h4>
                                <ul className="grid grid-cols-2 gap-4">
                                    {selectedDate.waktu.map((time, timeIndex) => (
                                        <li
                                            key={timeIndex}
                                            className={`py-2 rounded-md text-center text-m font-semibold cursor-pointer ${selectedTime === time ? 'bg-primary text-white' : 'bg-primarylight'}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time.jam}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button
                            className={`mt-8 text-m w-full py-2 rounded-md font-semibold ${selectedTime ? 'bg-primary text-white' : 'bg-disable text-whitebg'}`}
                            disabled={!selectedTime}
                        >
                            Pilih Jadwal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
