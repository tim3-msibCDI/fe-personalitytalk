import Image from "next/image";
import { jadwalPsikolog } from "@/constants";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { getToken } from "@/lib/auth";

export default function Rating({ 
    onClose, 
    consulId, 
    psikologId,
    psikologInfo,
    consultationTime
}) {
    // State untuk menyimpan data psikolog yang dipilih
    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]); // Misalkan ambil psikolog pertama
    const [rating, setRating] = useState(0); // Nilai rating (1-5)
    const [review, setReview] = useState(""); // Masukan ulasan
    const [errorMessage, setErrorMessage] = useState(""); // Untuk pesan error
    const [hasSubmitted, setHasSubmitted] = useState(false); // Track if review exists

    // console.log("consulId:", consulId);
    // console.log("psikologId:", psikologId);
    // console.log("psikologInfo:", psikologInfo);
    // console.log("consultationTime:", consultationTime);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const token = getToken();
                if (!token) throw new Error("Token tidak ditemukan!");
    
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consultation/detail-review`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420",
                    },
                    params: { consul_id: consulId },
                });
    
                if (response.data.success && response.data.data) {
                    const { rating, review } = response.data.data;
                    setRating(rating || 0); // Tetap 0 jika tidak ada nilai rating
                    setReview(review || ""); // Tetap string kosong jika tidak ada ulasan
                    setHasSubmitted(Boolean(rating || review)); // Tandai sebagai sudah disubmit jika ada data
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn("Review tidak ditemukan, pengguna bisa membuat review baru.");
                } else {
                    console.error("Error fetching review:", error);
                }
            }
        };
    
        fetchReview();
    }, [consulId]);
    

    const handleRatingSubmit = async () => {
        if (rating < 1 || rating > 5) {
            setErrorMessage("Silakan pilih rating antara 1 hingga 5 bintang.");
            return;
        }

        if (!review.trim()) {
            setErrorMessage("Silakan masukkan ulasan kamu.");
            return;
        }

        try {
            const token = getToken();
            if (!token) throw new Error("Token tidak ditemukan!");

            const data = {
                psi_id: psikologId,
                consul_id: consulId,
                rating,
                review,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultation/submit-review`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Review berhasil dikirim!");
                setHasSubmitted(true); // Prevent further submission
                onClose();
            } else {
                setErrorMessage(result.message || "Terjadi kesalahan.");
            }
        } catch (error) {
            console.error("Error saat mengirim review:", error);
            setErrorMessage("Gagal mengirim review. Silakan coba lagi nanti.");
        }
    };   

    const formattedDate = useMemo(() => {
        const date = new Date(consultationTime.date);
        const options = { day: "numeric", month: "short", year: "numeric" };
        return date.toLocaleDateString("id-ID", options).replace(".", ""); // Remove extra dot
    }, [consultationTime.date]);

    // console.log("Psikolog Info:", psikologInfo);
    // console.log("Consultation Time:", consultationTime);

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
                        <Image
                            className="mb-2 object-cover w-full h-full"
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${psikologInfo.photo_profile}`}
                            alt={`Photo ${psikologInfo.name}`}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-m font-semibold">{psikologInfo.name}</p>
                        {/* Tanggal, Waktu konsultasi */}
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center">
                                <Image
                                      // src={selectedPsikolog.photos}
                            // alt={`Photo ${selectedPsikolog.name}`}
                                    src="/icons/i-konsultasi.png"
                                    alt="Icon Star"
                                    width={18}
                                    height={18}
                                />
                                <p className="ml-1">{formattedDate}</p>
                            </div>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center">
                                <Image
                                    src="/icons/time.svg"
                                    alt="Icon Konsultasi"
                                    width={18}
                                    height={18}
                                />
                                <p className="ml-1">
                                    {consultationTime.start_time} - {consultationTime.end_time}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border border-1 border-gray-300 mt-3" />
                <div className="mt-2 flex justify-between items-center">
                    <p>Rating Psikolog</p>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Image
                                key={star}
                                src={star <= rating ? "/icons/star-filled.png" : "/icons/star-outline.png"}
                                alt={`Star ${star}`}
                                width={24}
                                height={24}
                                className={`cursor-pointer ${hasSubmitted ? "cursor-not-allowed" : ""}`}
                                onClick={() => !hasSubmitted && setRating(star)}
                            />
                        ))}
                    </div>
                </div>
                <textarea
                    className="w-full h-32 p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Masukkan Ulasan Kamu"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    disabled={hasSubmitted}
                ></textarea>
                {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleRatingSubmit}
                        className={`bg-primary text-white px-4 py-2 rounded-md ${hasSubmitted ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={hasSubmitted}
                    >
                        {hasSubmitted ? "Sudah Dikirim" : "Nilai"}
                    </button>
                </div>
            </div>
        </div>
    );
}
