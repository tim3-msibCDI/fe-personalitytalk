import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function FormPilihJadwal({ onBack, onNext }) {
    const router = useRouter();

    // State for selected psychologist details and schedule
    const [selectedPsikolog, setSelectedPsikolog] = useState(null);
    const [weeklySchedule, setWeeklySchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        const psikologId = localStorage.getItem("selectedPsikologId");
        if (psikologId) {
            fetchPsikologData(psikologId);
        }
    }, []);

    const fetchPsikologData = async (psikologId) => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/consultation/psikolog/${psikologId}/details-and-schedules`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch psikolog data");
            }

            const result = await response.json();
            console.log("API response:", result);

            // Set psychologist details and weekly schedule data
            setSelectedPsikolog(result.data.psikolog);
            setWeeklySchedule(result.data.weekly_schedule);

            // Set reviews data
            setReviews(result.data.psikolog.list_top_ratings);

            // Automatically select the first available date
            if (result.data.weekly_schedule.length > 0) {
                setSelectedDate(result.data.weekly_schedule[0]);
            }

        } catch (error) {
            console.error("Error fetching psikolog data:", error);
        } finally {
            setIsLoading(false); // Data fetching is complete
        }
    };

    // Format harga
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(price).replace('Rp', 'Rp ');
    };

    const handleSelectSchedule = () => {
        if (selectedTime) {
            //Simpan psch_id ke localstorage
            localStorage.setItem("selectedPschId", selectedTime.psch_id);

            //Pindah ke langkah berikutnya
            onNext();
        }
    };

    //Fungsi navigasi review
    const handlePrevReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    const handleNextReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };


    return (
        <div className="py-6">
            {/* Tombol Back */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
                <Image
                    src="/icons/arrow_back.png"
                    alt="icon kembali"
                    width={9}
                    height={14}
                />
                <p className="text-m font-bold">Kembali</p>
            </div>

            {/* Loading */}
            {isLoading ? (
                <div className="mt-4 text-center">
                    <p className="text-m text-gray-500">Memuat data, harap tunggu...</p>
                </div>
            ) : (
                <div className="flex gap-8 mt-6">
                    {/* Konten Kanan */}
                    <div className="w-2/5 bg-primarylight2 rounded-md">
                        <div className="p-4">
                            <h3 className="text-h3 font-semibold text-textcolor mb-4">Detail Profil Psikolog</h3>
                            <div className="flex flex-row gap-4">
                                <div className="w-28 h-28 rounded overflow-hidden">
                                    <Image className="mb-2 object-cover w-full h-full"
                                        src={`https://fdf0-36-79-78-130.ngrok-free.app/${selectedPsikolog?.photo_profile}`}
                                        alt={`Photo ${selectedPsikolog?.name}`}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-m font-semibold">{selectedPsikolog?.name}</p>
                                    {/* Rating, Pengalaman, dan Role */}
                                    <div className="flex items-center gap-3 mt-1">
                                        {selectedPsikolog?.rating && selectedPsikolog?.rating > 0 && (
                                            <>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/icons/bintang.png"
                                                        alt="Icon Star"
                                                        width={18}
                                                        height={18}
                                                    />
                                                    <span className="ml-1">{selectedPsikolog?.rating}</span>
                                                </div>
                                                <span className="text-gray-400">|</span>
                                            </>
                                        )}
                                        <div className="flex items-center">
                                            <Image
                                                src="/icons/i-konsultasi.png"
                                                alt="Icon Konsultasi"
                                                width={18}
                                                height={18}
                                            />
                                            <p className="ml-1">{selectedPsikolog?.years_of_experience} tahun</p>
                                        </div>
                                        <span className="text-gray-400">|</span>
                                        <div className="flex items-center">
                                            <Image
                                                src="/icons/role.png"
                                                alt="Icon Role"
                                                width={18}
                                                height={18}
                                            />
                                            <p className="ml-1">{selectedPsikolog?.category_name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex gap-2 mt-3">
                                            <p className="text-s font-semibold">No SIPP</p>
                                            <p className="text-s">{selectedPsikolog?.sipp}</p>
                                        </div>
                                    </div>
                                    <p className="mt-1 text-m font-bold">
                                        {selectedPsikolog ? formatPrice(selectedPsikolog?.price) : "Rp 0,00"}/sesi
                                    </p>
                                </div>
                            </div>

                            <hr className="my-4 border-1 border-gray-400" />

                            <p className="text-justify">{selectedPsikolog?.description}</p>

                            <hr className="my-4 border-1 border-gray-400" />
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
                                        {selectedPsikolog?.topics?.map((topic, index) => (
                                            <li
                                                key={index}
                                                className="bg-primarylight px-3 py-1 rounded-md text-primary"
                                            >
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <hr className="my-4 border-1 border-gray-400" />

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Image
                                        src="/icons/bintang.png"
                                        alt="Icon Star"
                                        width={24}
                                        height={24}
                                    />
                                    <p className="text-m font-semibold">Review</p>
                                </div>
                                {reviews.length > 0 ? (
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
                                            {reviews[currentReviewIndex].review}
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
                                ) : (
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
                                        <p className="mx-4 bg-primarylight rounded text-s px-4 py-2 w-[380px] h-[100px] overflow-y-auto flex justify-center items-center">
                                            Belum ada review
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
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Konten Kiri */}
                    <div className="w-3/5 h-fit bg-primarylight2 rounded-md">
                        <div className="p-4">
                            <h3 className="text-h3 font-semibold">Jadwal {selectedPsikolog?.category_name}</h3>
                            <p className="text-m">Pilih jadwal untuk sesi Konsultasi kamu</p>

                            {/* Tanggal dan Hari */}
                            <div className="flex gap-4 overflow-x-scroll w-full mt-4 mb-2"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {weeklySchedule?.length > 0 ? (
                                    weeklySchedule.map((schedule, index) => {
                                        // Pisahkan bagian hari dan tanggal
                                        const [day, ...dateParts] = schedule.date.split(" ");
                                        const date = dateParts.join(" ");

                                        return (
                                            <div
                                                key={index}
                                                className={`flex flex-col items-center cursor-pointer py-2 px-4 w-24 rounded-md ${selectedDate === schedule
                                                    ? "bg-primary text-white"
                                                    : "bg-primarylight text-black"
                                                    }`}
                                                onClick={() => setSelectedDate(schedule)}
                                            >
                                                <p className="text-s px-2 whitespace-nowrap text-center">{date}</p>
                                                <p className="text-m font-semibold text-center">{day}</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-m text-gray-500">Tidak ada jadwal tersedia.</p>
                                )}
                            </div>

                            {/* Tampilkan waktu untuk tanggal yang dipilih */}
                            {selectedDate && (
                                <div className="mt-6">
                                    <h4 className="text-h3 font-semibold mb-2">Pilih Waktu Konsultasi</h4>
                                    <ul className="grid grid-cols-2 gap-4">
                                        {selectedDate.schedules.map((timeSlot, timeIndex) => (
                                            <li
                                                key={timeIndex}
                                                className={`py-2 rounded-md text-center text-m font-semibold cursor-pointer ${selectedTime === timeSlot
                                                    ? "bg-primary text-white"
                                                    : "bg-primarylight"
                                                    }`}
                                                onClick={() => setSelectedTime(timeSlot)}
                                            >
                                                {timeSlot.time_slot}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button
                                className={`mt-8 text-m w-full py-2 rounded-md font-semibold ${selectedTime
                                    ? "bg-primary text-white"
                                    : "bg-disable text-whitebg"
                                    }`}
                                onClick={handleSelectSchedule}
                                disabled={!selectedTime}
                            >
                                Pilih Jadwal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
