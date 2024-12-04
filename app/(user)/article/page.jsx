"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Article() {
    // State untuk menyimpan kategori dan artikel
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    // State untuk status loading kategori dan artikel
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingArticles, setLoadingArticles] = useState(false);
    // State untuk menangani error
    const [error, setError] = useState(null);

    // State untuk pagination dan kategori aktif
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState(null);

    // State untuk kontrol scrolling kategori
    const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
    const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);
    const categoryRef = useRef(null);

    // Mengambil data kategori dari API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/articles/categories`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();

                if (data.success) {
                    setCategories(data.data); // Simpan data kategori
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                setError(err.message || "Terjadi kesalahan saat mengambil data kategori.");
            } finally {
                setLoadingCategories(false); // Set status loading selesai
            }
        };

        fetchCategories();
    }, []);

    const fetchArticles = async (categoryId = 1) => {
        setLoadingArticles(true);
        try {
            const categoryId = localStorage.getItem("selectedCategoryId"); // Ambil ID kategori dari localStorage
            if (!categoryId) {
                setArticles([]); // Kosongkan artikel jika kategori tidak dipilih
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/articles?category_id=${categoryId}`,
                {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            if (data.success) {
                // Ambil data artikel dari respons API
                const articlesData = data.data.data.map((item) => ({
                    id: item.id,
                    image: `https://4ab6-180-254-243-79.ngrok-free.app/${item.article_img}`,
                    title: item.article_title,
                    date: item.publication_date,
                    category: item.article_category.category_name || "Tanpa Kategori",
                }));
                setArticles(articlesData);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            setError(err.message || "Gagal memuat artikel.");
        } finally {
            setLoadingArticles(false);
        }
    };

    useEffect(() => {
        // Fetch articles for the default category (ID 1) on mount
        fetchArticles();
    }, []);

    // Menghitung artikel yang akan ditampilkan di halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(articles.length / itemsPerPage);

    // Handle klik kategori
    const handleCategoryClick = (category) => {
        setActiveCategory(category === activeCategory ? null : category);
        setCurrentPage(1);

        if (category) {
            const selectedCategory = categories.find((cat) => cat.name === category);
            if (selectedCategory) {
                localStorage.setItem("selectedCategoryId", selectedCategory.category_id); // Simpan id kategori di localStorage
                fetchArticles();
            }
        } else {
            localStorage.removeItem("selectedCategoryId"); // Hapus kategori jika tidak ada yang dipilih
            setArticles([]); // Reset artikel
        }
    };

    // Handle scrolling kategori
    const scrollCategories = (direction) => {
        const scrollAmount = 150;
        if (categoryRef.current) {
            categoryRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
            updateArrowVisibility();
        }
    };

    // Handle klik article
    const handleArticleClick = (articleId) => {
        localStorage.setItem("selectedArticleId", articleId);
    };

    // Update visibilitas panah scroll
    const updateArrowVisibility = () => {
        if (categoryRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current;
            setIsLeftArrowVisible(scrollLeft > 0);
            setIsRightArrowVisible(scrollLeft < scrollWidth - clientWidth);
        }
    };

    // Check overflow saat mount atau resize
    useEffect(() => {
        const checkOverflow = () => {
            if (categoryRef.current) {
                const { scrollWidth, clientWidth } = categoryRef.current;
                setIsRightArrowVisible(scrollWidth > clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, []);

    return (
        <div className="py-4 px-6 md:px-8 lg:px-12 ml-4 lg:ml-8 mr-8 lg:mr-12">
            <div className="relative flex mt-10 mb-12">
                <input
                    type="search"
                    className="relative m-0 block flex-auto rounded-s-md border border-solid border-primary bg-transparent px-3 py-1 text-base placeholder:textsec"
                    placeholder="Cari Artikel"
                />
                <button className="z-[2] inline-flex items-center bg-primary rounded-e-md px-6 py-2 text-white">
                    <Image
                        src="/icons/search.svg"
                        alt="Ikon Pencarian"
                        width={24}
                        height={24}
                    />
                    Cari
                </button>
            </div>
            <div>
                <h3 className="text-h3 font-semibold">Kategori</h3>
                <div className="relative flex items-center mt-4 px-6">
                    {isLeftArrowVisible && (
                        <button onClick={() => scrollCategories('left')} className="absolute left-0 z-10">
                            <Image
                                src="/icons/arrow-b-left.svg"
                                alt="Scroll Left"
                                width={16}
                                height={16}
                            />
                        </button>
                    )}
                    <ul
                        ref={categoryRef}
                        onScroll={updateArrowVisibility}
                        className="flex items-center gap-16 overflow-hidden whitespace-nowrap"
                    >
                        {loadingCategories ? (
                            <p>Loading kategori...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            categories.map((kategori) => (
                                <li
                                    key={kategori.category_id}
                                    className={`text-m cursor-pointer ${activeCategory === kategori.name ? 'text-primary font-semibold' : ''}`}
                                    onClick={() => handleCategoryClick(kategori.name)}
                                >
                                    {kategori.name}
                                </li>
                            ))
                        )}
                    </ul>
                    {isRightArrowVisible && (
                        <button onClick={() => scrollCategories('right')} className="absolute right-0 z-10">
                            <Image
                                src="/icons/arrow-b-right.svg"
                                alt="Scroll Right"
                                width={16}
                                height={16}
                            />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap gap-y-5 gap-x-4 mt-2">
                {loadingArticles ? (
                    <p>Loading artikel...</p>
                ) : currentItems.length > 0 ? (
                    currentItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/article/${item.title.replace(/\s+/g, '-').toLowerCase()}`}
                            passHref
                            className="w-96 p-4"
                            onClick={() => handleArticleClick(item.id)}
                        >
                            <div className="aspect-video w-80 h-auto overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={330}
                                    height={200}
                                    className="rounded-lg w-full h-full"
                                />
                            </div>
                            <div className="py-4">
                                <h5 className="text-m font-bold text-textcolor">{item.title}</h5>
                                <p className="text-s text-textcolor">{item.date}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex flex-col w-full justify-center items-center p-16">
                        <Image
                            src="/icons/sad.png"
                            alt="Icons Sad"
                            width={111}
                            height={111}
                            className="mx-auto"
                        />
                        <h2 className="text-h2 font-semibold">Maaf, Belum ada artikel</h2>
                        <p className="text-m">Maaf, untuk saat ini belum ada artikel pada kategori tersebut</p>
                    </div>
                )}
            </div>

            {/* Paginasi */}
            {articles.length > itemsPerPage && (
                <div className="flex justify-center mt-6 mb-10">
                    {currentPage > 1 && (
                        <button
                            className="px-3 mx-2 border border-primary"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <Image
                                src="/icons/arrow_left.png"
                                alt="Previous Page"
                                width={20}
                                height={20}
                            />
                        </button>
                    )}
                    {[...Array(totalPages).keys()].map(page => (
                        <button
                            key={page + 1}
                            className={`px-4 py-2 mx-2 ${page + 1 === currentPage ? 'bg-primary text-white' : 'border border-primary text-primary'}`}
                            onClick={() => setCurrentPage(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button
                            className="px-3 mx-2 border border-primary"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <Image
                                src="/icons/arrow_right.png"
                                alt="Next Page"
                                width={20}
                                height={20}
                            />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
