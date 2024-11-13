"use client";

import { artikel, TOPARTIKEL } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Artikel() {
    const router = useRouter();

    // Gunakan state untuk memantau apakah tombol 'Lihat Artikel Lainnya' diklik
    const [showAll, setShowAll] = useState(false);

    // Tentukan artikel yang akan ditampilkan (hanya 3 atau semua)
    const displayedArticles = showAll ? artikel : TOPARTIKEL;

    return (
        <section id="artikel" className="mb-20">
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-h1 text-textcolor font-bold">Artikel</h1>
                <p className="text-m text-textcolor text-center mt-2">
                    Menyediakan berbagai informasi berkaitan dengan Psikologi dan Kehidupan sehari-hari yang terbaru
                </p>
            </div>
            {/* Card Artikel */}
            <div className="flex flex-wrap justify-center gap-12">
                {displayedArticles.map((item) => (
                    <div
                        key={item.id}
                        className="max-w-sm bg-primarylight2 rounded-lg shadow-md p-4"
                    >
                        <Image
                            src={item.images}
                            alt={item.alt}
                            width={300}
                            height={200}
                            className="rounded-t-lg"
                        />
                        <div className="p-4">
                            <h5 className="text-m font-bold text-textcolor">{item.name}</h5>
                            <p className="text-s text-textcolor">{item.tanggal}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Tombol Lihat Artikel Lainnya */}
            {artikel.length > 3 && !showAll && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => router.push("/article")}
                        className="flex items-center bg-primary text-h3 text-white py-2 px-4 rounded-md"
                    >
                        Lihat Artikel Lainnya
                        <Image
                            src="/icons/arrow.png"
                            alt="Arrow"
                            width={15}
                            height={15}
                            className="ml-2"
                        />
                    </button>
                </div>
            )}
        </section>
    );
}
