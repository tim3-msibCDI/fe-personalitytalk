"use client";

import { useState, useEffect } from "react";
import DOMPurify from "dompurify"; // Install: npm install dompurify
import Loading from "@/components/loading/loading";
import Image from "next/image";

export default function DetailPenyakit() {
    const [diseaseDetail, setDiseaseDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ambil ID dari localStorage
        const diseaseId = localStorage.getItem("diseaseId");

        if (!diseaseId) {
            setError("ID penyakit tidak ditemukan di localStorage.");
            setLoading(false);
            return;
        }

        const fetchDiseaseDetail = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diseases/${diseaseId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();

                if (data.success) {
                    // Proses konten untuk fungsionalitas karakter escape
                    const processedContent = data.data.content
                        .replace(/\\n/g, "<br>") // Mengganti \n dengan <br> untuk baris baru
                        .replace(/\\t/g, "&emsp;") // Mengganti \t dengan spasi horizontal
                        .replace(/\\/g, ""); // Menghapus backslash lainnya

                    // Sanitasi konten HTML
                    setDiseaseDetail({
                        ...data.data,
                        content: DOMPurify.sanitize(processedContent),
                    });
                } else {
                    setError(data.message || "Gagal memuat data penyakit.");
                }
            } catch (err) {
                setError("Terjadi kesalahan saat mengambil data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDiseaseDetail();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!diseaseDetail) {
        return <div>Penyakit tidak ditemukan.</div>;
    }

    return (
        <section className="px-8 py-4">
            <div className="ml-4 lg:ml-8 mr-4 lg:mr-8 mt-10 mb-12 px-4">
                <h5 className="mb-4">Informasi Kesehatan</h5>
                <h1 className="text-3xl font-bold mb-4">{diseaseDetail.disease_name}</h1>
                <p className="mb-4">
                    Ditulis oleh <strong>{diseaseDetail.writer_name}</strong>
                </p>
                <div className="w-full h-[400px] mb-4">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${diseaseDetail.disease_img}`}
                        alt={diseaseDetail.disease_name}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Render konten HTML yang telah diproses */}
                <div
                className="text-justify"
                    dangerouslySetInnerHTML={{ __html: diseaseDetail.content }}
                />
            </div>
        </section>
    );
}
