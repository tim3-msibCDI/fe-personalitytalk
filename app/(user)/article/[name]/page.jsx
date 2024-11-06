"use client";

import { artikel } from "@/constants";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DetailArtikel({ params }) {
    const { name } = params;

    // Cari artikel berdasarkan nama di URL
    const article = artikel.find((item) => item.name.replace(/\s+/g, '-').toLowerCase() === name);

    if (!article) return <p>Artikel tidak ditemukan</p>;

    // State untuk artikel terkait
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        // Filter artikel lain dengan kategori yang sama, selain artikel yang sedang ditampilkan
        let filteredArticles = artikel.filter(
            (item) => item.kategori === article.kategori && item.name !== article.name
        );

        // Jika jumlah artikel terkait kurang dari 5, tambahkan artikel lainnya secara acak
        if (filteredArticles.length < 5) {
            const remainingArticles = artikel.filter(
                (item) => item.kategori !== article.kategori && item.name !== article.name
            );

            // Tambahkan artikel lainnya secara random di klien
            const randomArticles = remainingArticles
                .sort(() => 0.5 - Math.random()) // Acak urutan
                .slice(0, 5 - filteredArticles.length); // Ambil artikel secukupnya untuk memenuhi 5 artikel

            filteredArticles = [...filteredArticles, ...randomArticles];
        }

        // Set hanya 5 artikel terkait
        setRelatedArticles(filteredArticles.slice(0, 5));
    }, [article]);

    // State untuk mengatur ikon sosial media
    const [hoveredIcon, setHoveredIcon] = useState(null);

    // Daftar ikon sosial media dengan gambar berwarna hitam dan berwarna
    const socialMediaIcons = [
        { name: "instagram", defaultSrc: "/image/sosmed/b-instagram.svg", hoverSrc: "/image/sosmed/instagram.svg" },
        { name: "facebook", defaultSrc: "/image/sosmed/b-facebook.svg", hoverSrc: "/image/sosmed/facebook.svg" },
        { name: "x", defaultSrc: "/image/sosmed/b-x.svg", hoverSrc: "/image/sosmed/x.svg" },
        { name: "whatsapp", defaultSrc: "/image/sosmed/b-whatsapp.svg", hoverSrc: "/image/sosmed/whatsapp.svg" }
    ];

    return (
        <div className="flex gap-8 py-4 px-6 md:px-8 lg:px-12 min-h-screen">
            <div className="w-2/3">
                <div>
                    <p className="text-m">{article.kategori}</p>
                    <h1 className="text-h1 font-semibold">{article.name}</h1>
                    <p className="text-s mb-5">{article.tanggal}</p>
                    <div className="w-full h-[300px] mb-5">
                        <img
                            src={article.images}
                            alt={article.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-justify">{article.description}</p>
                </div>
                <div className="mt-10">
                    <h2 className="text-h2 font-semibold">Bagikan artikel ini:</h2>
                    <div className="flex flex-row gap-4 mt-3">
                        {socialMediaIcons.map((icon) => (
                            <img
                                key={icon.name}
                                src={hoveredIcon === icon.name ? icon.hoverSrc : icon.defaultSrc}
                                alt={icon.name}
                                onMouseEnter={() => setHoveredIcon(icon.name)}
                                onMouseLeave={() => setHoveredIcon(null)}
                                className="cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Garis Vertikal */}
            <div className="flex justify-center items-center">
                <div className="w-px bg-gradient-to-b from-transparent via-neutral-500 to-transparent opacity-50 dark:via-neutral-400 self-stretch"></div>
            </div>

            {/* Konten Artikel Lainnya dengan Centering */}
            <div className="w-1/3 flex flex-col justify-center">
                <div className="flex justify-center items-center">
                    <img src="/image/ilustrasi/detail_artikel.svg" alt="Ilustrasi" />
                </div>
                <div className="mt-5 flex justify-center">
                    <h2 className="text-h2 font-semibold">Artikel Lainnya</h2>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                    {relatedArticles.map((item) => (
                        <Link
                            key={item.id}
                            href={`/article/${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                            <div className="flex gap-4 items-start">
                                <div className="w-16 h-16">
                                    <Image
                                        src={item.images}
                                        alt={item.alt}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                                <div className="self-start">
                                    <h5 className="text-m font-bold text-textcolor">{item.name}</h5>
                                    <p className="text-s text-textcolor">{item.tanggal}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
