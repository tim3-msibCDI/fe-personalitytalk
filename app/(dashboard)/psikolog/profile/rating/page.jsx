"use client";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function PsikologRating() {
    const router = useRouter();
    const [averageRating, setAverageRating] = useState(null);
    const [totalRatings, setTotalRatings] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // URL API
        const url = `${process.env.NEXT_PUBLIC_API_URL}/psikolog/list-review`;

        // Fungsi untuk mengambil data dari API
        const fetchData = async () => {
            try {
                // Ambil token autentikasi
                const token = getToken();
                if (!token) {
                    alert("Anda perlu login untuk mengakses halaman ini.");
                    router.push("/login");
                    return;
                }
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();

                if (result.success) {
                    const data = result.data;
                    setAverageRating(data.average_rating);
                    setTotalRatings(data.total_ratings);
                    setReviews(data.reviews);
                } else {
                    console.error("Gagal mengambil data:", result.message);
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h3 className="text-h3 font-semibold">Ratings & Reviews</h3>

            {/* Tampilkan Average Rating dan Total Ratings */}
            {averageRating && totalRatings && (
                <div className="mb-4">
                    <p className="text-lg">
                        {averageRating} dari {totalRatings} rating
                    </p>
                </div>
            )}

            {/* Tampilkan Daftar Reviews */}
            <div>
                {reviews.length > 0 ? (
                    <ul className="space-y-4">
                        {reviews.map((review, index) => (
                            <li key={index} className="p-4 border border-primary rounded-lg shadow">
                                <p>
                                    <span className="font-bold">{review.user_name}</span> rated{" "}
                                    <span className="font-bold">{review.rating}</span>
                                </p>
                                <p className="italic">{review.review}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Belum ada review</p>
                )}
            </div>
        </div>
    );
}
