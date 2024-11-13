"use client";

import Image from "next/image";
import { artikel } from "@/constants";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Article() {
    // Ambil kategori unik dari data artikel
    const uniqueCategories = [...new Set(artikel.map(item => item.kategori))];

    //Setup state untuk pagination
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    //State untuk kategori aktif
    const [activeCategory, setActiveCategory] = useState(null);

    // State for controlling category scrolling
    const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
    const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);
    const categoryRef = useRef(null);

    //Menghitung artikel yang akan ditampilkan di halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Filter artikel
    const filteredArticles = activeCategory
        ? artikel.filter(item => item.kategori === activeCategory)
        : artikel;
    const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);

    //Total Halaman
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

    //Fungsi untuk mengubah halaman
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //Handle Clik Category
    const handleCategoryClick = (category) => {
        setActiveCategory(category === activeCategory ? null : category);
        setCurrentPage(1); // Reset to first page on category change
    };

    // Handle category scrolling
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

    // Update arrow visibility based on scroll position
    const updateArrowVisibility = () => {
        if (categoryRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current;
            setIsLeftArrowVisible(scrollLeft > 0);
            setIsRightArrowVisible(scrollLeft < scrollWidth - clientWidth);
        }
    };

    // Check overflow ketika komponen di-mount atau ukuran tampilan berubah
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
            <div className="flex justify-center p-4">
                <Image
                    src="/image/ilustrasi/article.svg"
                    alt="Ilustrasi Artikel"
                    width={503}
                    height={304}
                />
            </div>
            <div className="relative flex mt-10 mb-12">
                <input
                    type="search"
                    className="relative m-0 -me-0.5 block flex-auto rounded-s-md border border-solid border-primary bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none placeholder:textsec"
                    placeholder="Cari Artikel"
                    aria-label="Search"
                    id="exampleFormControlInput3"
                    aria-describedby="button-addon3"
                />
                <button
                    className="z-[2] inline-flex items-center gap-1 rounded-e-md border-2 bg-primary border-primary px-6 pb-[6px] pt-2 font-medium text-white"
                    data-twe-ripple-init
                    data-twe-ripple-color="white"
                    type="button"
                    id="button-addon3"
                >
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
                        {uniqueCategories.map((kategori, index) => (
                            <li
                                key={index}
                                className={`text-m cursor-pointer ${activeCategory === kategori ? 'text-primary font-semibold' : ''}`}
                                onClick={() => handleCategoryClick(kategori)}
                            >
                                {kategori}
                            </li>
                        ))}
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
            <div className="flex flex-wrap gap-x-10 gap-5 mt-2">
                {currentItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/article/${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                        passHref
                        className="max-w-sm p-4"
                    >
                        <Image
                            src={item.images}
                            alt={item.alt}
                            width={330}
                            height={200}
                            className="rounded-t-lg"
                        />
                        <div className="py-4">
                            <h5 className="text-m font-bold text-textcolor">{item.name}</h5>
                            <p className="text-s text-textcolor">{item.tanggal}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Paginasi */}
            {filteredArticles.length > itemsPerPage && (
                <div className="flex justify-center mt-6 mb-10">
                    {currentPage > 1 && (
                        <button
                            className="px-3 mx-2 border border-primary"
                            onClick={() => handlePageChange(currentPage - 1)}
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
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button
                            className="px-3 mx-2 border border-primary"
                            onClick={() => handlePageChange(currentPage + 1)}
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