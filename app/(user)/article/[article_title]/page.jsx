"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BannerKonsultasi from "@/components/banner";

export default function DetailArtikel({ params }) {
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk ikon sosial media
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const socialMediaIcons = [
        { name: "instagram", defaultSrc: "/image/sosmed/b-instagram.svg", hoverSrc: "/image/sosmed/instagram.svg" },
        { name: "facebook", defaultSrc: "/image/sosmed/b-facebook.svg", hoverSrc: "/image/sosmed/facebook.svg" },
        { name: "x", defaultSrc: "/image/sosmed/b-x.svg", hoverSrc: "/image/sosmed/x.svg" },
        { name: "whatsapp", defaultSrc: "/image/sosmed/b-whatsapp.svg", hoverSrc: "/image/sosmed/whatsapp.svg" }
    ];

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articleId = localStorage.getItem("selectedArticleId"); // Mendapatkan ID dari localStorage
                if (!articleId) {
                    setError("Artikel tidak ditemukan di localStorage.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Gagal memuat data artikel.");
                }

                const data = await response.json();
                if (data.success) {
                    setArticle(data.data.article);
                    setRelatedArticles(data.data.related_articles);
                } else {
                    throw new Error(data.message || "Gagal memuat data artikel.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Handle klik article
    const handleArticleClick = (articleId) => {
        localStorage.setItem("selectedArticleId", articleId);
    };

    return (
        <div className="py-4 px-6 md:px-8 lg:px-12 ml-4 lg:ml-8">
            <div className="flex gap-8 min-h-screen mb-10">
                <div className="w-2/3">
                    <div>
                        <p className="text-m">{article.category || " "}</p>
                        <h1 className="text-h1 font-semibold">{article.article_title}</h1>
                        <p className="text-s mb-5">{article.publication_date}</p>
                        <div className="w-full h-[300px] mb-5">
                            <img
                                src={`https://4ab6-180-254-243-79.ngrok-free.app/${article.article_img}`}
                                alt={article.article_title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            className="text-justify"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
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
                                href={`/article/${item.article_title.replace(/\s+/g, '-').toLowerCase()}`}
                                onClick={() => handleArticleClick(item.id)}
                            >
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 aspect-square overflow-hidden flex-shrink-0">
                                        <Image
                                            src={`https://4ab6-180-254-243-79.ngrok-free.app/${item.article_img}`}
                                            alt={item.article_title}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="self-start">
                                        <h5 className="text-m font-bold text-textcolor">{item.article_title}</h5>
                                        <p className="text-s text-textcolor">{item.publication_date}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <BannerKonsultasi />
        </div>
    );
}
